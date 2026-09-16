# Axios '26 — Deployment Notes (internal, not committed)

How the site gets from a push on GitHub to its two live homes: the college
server at `axios.psgtech.ac.in` and Cloudflare Pages at `axios.live`. Written
and last revised 16 Sep 2026. This file is ignored by git on
purpose — it names internal hosts and paths, so keep it off the public repo.

**Policy:** both domains ship every release and both must stay current.
`axios.psgtech.ac.in` is the canonical address and carries the search weight;
`axios.live` (Cloudflare Pages) is a second public entry point, not a retired
one. Never delete either workflow.

---

## 1. The short version

Push or merge to `main` → GitHub Actions job runs **on the college server
itself** → builds the Astro site → copies it into `/var/www/axios` → nginx
serves it. A separate workflow also deploys the same commit to Cloudflare
Pages at `axios.live`.

Nothing runs over SSH from GitHub. The server talks outward to GitHub; GitHub
never connects inward.

---

## 2. The server

| Item | Value |
|---|---|
| Host | `nucleus-server` |
| Address, campus DNS | `10.1.67.158` (private, reachable on campus only) |
| Address, public DNS | `193.149.151.166`, forwarded inward to this box |
| Login user | `axios` |
| Web root | `/var/www/axios` (owned by `axios`) |
| nginx site file | `/etc/nginx/sites-available/axios`, symlinked into `sites-enabled` |
| Runner directory | `~/actions-runner` (`/home/AXIOS/sep_2026/axios/actions-runner`) |
| Runner service | `actions.runner.CSA-Tech-Team.axios-v5-nucleus-server` |

This box is shared. It also serves confluence, codingclub, foundationday,
amcsbiometric, amcsnucleus and others. Never restart nginx; only reload it,
and never touch another site's config file.

---

## 3. Network constraints discovered along the way

These shaped every decision below.

1. **Outbound SSH is blocked**, on port 22 and on 443. The block is at the
   protocol level, so `ssh` to GitHub fails with a connection reset even on
   port 443. Git over HTTPS works fine.
2. **The server's address is private.** GitHub-hosted runners live on the
   public internet and cannot reach `10.1.67.158` at all. This is why the
   deploy runs on a self-hosted runner instead of rsync-over-SSH.
3. **TLS is terminated on this server, by certbot.** The live file
   `/etc/nginx/sites-available/axios` carries a second `listen 443 ssl` server
   block that certbot added, pointing at
   `/etc/letsencrypt/live/axios.psgtech.ac.in/`. An earlier version of this
   note claimed TLS was handled upstream. That was wrong.

   **Never copy `deploy/nginx-axios.conf` over the live file.** The repo copy
   carries no 443 block, so overwriting the live file deletes HTTPS, and
   requests for the hostname then fall through to another site's SSL block
   (foundationday) and present its certificate. This happened on
   16 Sep 2026. Recovery:

   ```bash
   sudo certbot --nginx -d axios.psgtech.ac.in   # reinstalls the 443 block
   sudo nginx -t && sudo systemctl reload nginx
   ```

   Apply future nginx changes by editing the live file by hand.

---

## 4. One-time setup, in the order it was done

### 4a. Fix apt (Ubuntu 24.10 is end-of-life)

Its packages were pulled from the normal mirrors, so `apt update` 404s.
EOL releases move to `old-releases.ubuntu.com`:

```bash
sudo sed -i 's|http://archive.ubuntu.com/ubuntu|http://old-releases.ubuntu.com/ubuntu|g; s|http://security.ubuntu.com/ubuntu|http://old-releases.ubuntu.com/ubuntu|g' /etc/apt/sources.list.d/ubuntu.sources
sudo apt update
sudo apt install -y nginx rsync
```

This server should eventually be moved to an LTS release. 24.10 gets no
security patches.

### 4b. Clone the repo (optional, not used by the deploy)

Outbound SSH is blocked, so the deploy key route does not work. Use HTTPS with
a fine-grained token (Contents: Read-only, scoped to this repo):

```bash
git config --global credential.helper store
git clone https://github.com/CSA-Tech-Team/axios-v5.git /var/www/axios-repo
# username = GitHub username, password = the token
```

The clone at `/var/www/axios-repo` is **not** part of the deployment. The
runner checks out its own copy under `~/actions-runner/_work`. The clone can
be deleted.

### 4c. Web root and nginx

```bash
sudo mkdir -p /var/www/axios
sudo chown -R $USER:$USER /var/www/axios
sudo nano /etc/nginx/sites-available/axios      # contents: see deploy/nginx-axios.conf in the repo
sudo ln -s /etc/nginx/sites-available/axios /etc/nginx/sites-enabled/axios
sudo nginx -t && sudo systemctl reload nginx
```

The reference copy lives in the repo at `deploy/nginx-axios.conf`. It is a
reference only — nothing deploys it automatically, so edit both when it
changes.

`nginx -t` prints a warning about a conflicting `confluence.psgtech.ac.in`
server name. That is pre-existing, belongs to another site, and is unrelated.

### 4d. Self-hosted GitHub Actions runner

On GitHub: **Settings → Actions → Runners → New self-hosted runner**, Linux
x64. Then on the server, with the token that page shows:

```bash
mkdir ~/actions-runner && cd ~/actions-runner
curl -o actions-runner.tar.gz -L https://github.com/actions/runner/releases/download/<version>/actions-runner-linux-x64-<version>.tar.gz
tar xzf ./actions-runner.tar.gz
./config.sh --url https://github.com/CSA-Tech-Team/axios-v5 --token <TOKEN>
sudo ./svc.sh install
sudo ./svc.sh start
```

**Gotcha we hit:** the runner was registered against the *organization* URL
rather than the repo, and this repo is public. Organization runners in the
Default group refuse jobs from public repos, so the job sat queued forever
while the runner sat idle. Fixed at
**Organization → Settings → Actions → Runner groups → Default** by ticking
**Allow public repositories** and limiting repository access to `axios-v5`.

Tell them apart by the service name: a repo-level runner reads
`actions.runner.CSA-Tech-Team-axios-v5.<runner>`, an org-level one reads
`actions.runner.CSA-Tech-Team.<runner>`.

**Security note:** this repo is public, so anyone can fork it and open a pull
request. The deploy workflow only triggers on pushes to `main` and manual
runs, so fork pull requests cannot execute code on the server. Never add a
`pull_request` trigger to a workflow that uses the self-hosted runner.

### 4e. Point the hostname at the site

The site block originally listed only the IP as its `server_name`. Requests
carrying `axios.psgtech.ac.in` matched no block, so nginx served them from the
first site loaded on port 80 — the foundation day site. Symptom: the wrong
website appears at the Axios address.

```bash
sudo sed -i 's/^    server_name 10\.1\.67\.158;/    server_name axios.psgtech.ac.in 10.1.67.158;/' /etc/nginx/sites-available/axios
sudo nginx -t && sudo systemctl reload nginx
```

---

## 5. The workflows

Both live in `.github/workflows/` and both fire on every push to `main`.

**`deploy-server.yml`** — the college server. Runs on `self-hosted`, builds
with Node 20, then syncs into the web root:

```
rsync -a --delete --delay-updates dist/ /var/www/axios/
chmod -R a+rX /var/www/axios
```

`--delay-updates` stages the changed files and renames them at the end, so
nginx never serves a half-updated tree. It syncs *into* the directory rather
than swapping directories, because `/var/www` is root-owned and the runner
user cannot rename anything there.

**`deploy.yml`** — Cloudflare Pages at `axios.live`. Needs the
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets.

Delete one of them if two deployments per push is no longer wanted.

The SSH-related secrets from the original rsync-over-SSH design
(`SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`, `SSH_PORT`, `DEPLOY_PATH`) are
unused and can be removed from the repo settings.

---

## 6. Day-to-day

Deploying is just merging to `main`. Watch it in the Actions tab.

```bash
# from a laptop
gh run list --workflow deploy-server.yml --limit 3
gh run watch <run-id>
```

```bash
# on the server
sudo systemctl status actions.runner.CSA-Tech-Team.axios-v5-nucleus-server
tail -n 40 $(ls -t ~/actions-runner/_diag/Runner_*.log | head -1)
ls -la /var/www/axios | head
sudo nginx -t && sudo systemctl reload nginx
```

Verifying from a machine on the campus network:

```bash
curl -I https://axios.psgtech.ac.in
curl -s https://axios.psgtech.ac.in | grep -o -i "<title>[^<]*</title>"
```

---

## 7. Troubleshooting map

| Symptom | Cause | Fix |
|---|---|---|
| Job stuck on "queued", runner idle | Org runner blocked from a public repo | Allow public repositories in the Default runner group |
| A different site loads at the Axios address | Hostname not in `server_name` | Add it, reload nginx |
| 403 Forbidden | Web root empty, no `index.html` | The deploy has not run yet |
| 500 on a missing path | nginx falls back to `/404.html` and the build lacks it | Fixed 16 Sep 2026: `=404` plus `error_page 404 /404.html` and a real 404 page |
| Search results show last year's site | Crawling was blocked by 5xx `robots.txt`; canonical pointed elsewhere | Fixed; see section 9 |
| `Connection reset` from `ssh git@github.com` | Outbound SSH blocked by network policy | Use HTTPS with a token |
| `apt update` 404s | Ubuntu 24.10 is EOL | Point sources at `old-releases.ubuntu.com` |
| Runner offline after reboot | Service not enabled | `sudo ./svc.sh install && sudo ./svc.sh start` |
| HTTPS shows a different site, cert mismatch | The certbot 443 block was overwritten | `sudo certbot --nginx -d axios.psgtech.ac.in` |
| `curl https://axios.psgtech.ac.in` gives 000 *from the server itself* | Normal: test from a client, or use `curl -H "Host: axios.psgtech.ac.in" http://127.0.0.1/` | n/a |

---

## 8. Domains, DNS and TLS

The hostname has **split DNS**, which is worth knowing before debugging
anything that "works for me":

| Resolver | Answer |
|---|---|
| Campus DNS | `10.1.67.158`, this server directly |
| Public DNS (what Google uses) | `193.149.151.166`, the college's public address |

`psgtech.ac.in` runs on Cloudflare nameservers with a plain A record, no
Cloudflare proxying. The public address forwards inward to this box. You
cannot usually reach the public address from inside the campus network, so a
timeout there proves nothing. Test from mobile data, or use Search Console's
live URL inspection, which fetches from Google's side.

TLS is terminated **here**, by certbot, in the live nginx file. See the
warning in section 3.

---

## 9. Search and indexing

The site was showing the **Axios '25** listing for the college domain. Two
causes, both fixed on 16 Sep 2026:

1. The server returned **500** for `robots.txt` and every unknown path,
   because `try_files` fell back to a `/404.html` the build never produced. A
   5xx `robots.txt` tells Google to stop crawling the whole host, so it kept
   serving a year-old cached copy.
2. Both domains declared `axios.live` as canonical, so the college address
   looked like a duplicate of a different domain.

What is in place now:

- `astro.config.mjs` sets `site: 'https://axios.psgtech.ac.in'`, so canonical,
  `og:url` and the Event structured data all point at the college domain from
  **both** deployments.
- `public/robots.txt` and `public/sitemap.xml` are real files, served by both.
- `src/pages/404.astro` is emitted as `/404.html`. Cloudflare Pages uses it
  automatically; nginx points at it with `error_page 404 /404.html`, so
  unknown paths return a real 404 rather than the homepage.
- Last year's `/events`, `/signup`, `/app` and `/about` 301 to the homepage,
  via `public/_redirects` on Pages and `location =` blocks in nginx.
- Google Search Console ownership is proven two ways, both deployed:
  `public/google75386894167238d7.html` and a `google-site-verification` meta
  tag in the layout head.
- The Event structured data includes `performer`, which clears the only
  warning the rich results test reported.

Search Console state at the time of writing: property verified, sitemap
submitted (`sitemap.xml`), live URL inspection confirmed Googlebot fetches the
current '26 page over the public path, and indexing was requested for the
homepage. There is no queue view; check the **Last crawl** line in URL
Inspection, and the **Last read** column on the Sitemaps page. A freshly
submitted sitemap often reads "Couldn't fetch" for a few hours, which is
normal.

Expect the title and description to refresh within days, and the old
sitelinks to fall away over one to two weeks.

### Ideas not yet done, roughly by value

1. **Links from high-authority pages**, the biggest lever for a young
   subdomain: the AMCS department page, college news, CSA pages, the
   Instagram bio, a LinkedIn post, and fest aggregators.
2. **A page per event** generated from `site.config.ts`, ten indexable URLs
   instead of one, each targeting real queries.
3. **Structured data for the ten individual events**, for Google's event
   listing experience, plus social profiles on the Organization.
4. **`/favicon.ico`**, currently a 404. Google's icon crawler checks that
   path, and a stale icon is part of why the old logo lingers in results.
5. Skip FAQ structured data. Google stopped showing FAQ rich results for
   ordinary sites in 2023.

---

## 10. Known issues, still open

1. **Ubuntu 24.10 is end-of-life** and receives no security updates. Move to
   an LTS release when there is a maintenance window.
2. **`sitemap.xml` has a hard-coded `lastmod`** of 2026-09-16. Switch to
   `@astrojs/sitemap` if it should track each deploy.
3. **`/favicon.ico` returns 404.** Only an SVG icon is declared.
4. **The nginx config is not deployed automatically**, and the live file now
   differs from the repo copy on purpose, because certbot added the 443 block
   there. Mirror changes by hand in both directions.
5. **Two unrelated pre-existing warnings** on this shared server, both
   harmless to us: a conflicting `confluence.psgtech.ac.in` server name, and
   the Vite chunk-size warning during the build.
