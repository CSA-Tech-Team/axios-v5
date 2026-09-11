// ---------------------------------------------------------------------------
// Axios site content configuration.
//
// This file is the single source of truth for every piece of *copy* on the
// site — event names/dates, descriptions, team & partner details, FAQ and
// footer contact info. Components import from here instead of hardcoding
// text, so content can be updated without touching markup/design.
//
// Every export is typed — see the interfaces below — so a malformed edit
// (missing field, wrong shape) fails `astro check` / `tsc` instead of
// silently rendering broken markup.
// ---------------------------------------------------------------------------

export interface SiteMeta {
  title: string;
  description: string;
  keywords: string;
  author: string;
  ogImagePath: string;
}

export interface EventDateInfo {
  /** Human readable date range shown in the hero, e.g. "25-26 SEP '26" */
  label: string;
  /** Full ISO 8601 start datetime (with offset), used for structured data */
  startISO: string;
  /** Full ISO 8601 end datetime (with offset), used for structured data */
  endISO: string;
  /** Google Calendar template start date, format YYYYMMDD */
  calendarStart: string;
  /** Google Calendar template end date (exclusive), format YYYYMMDD */
  calendarEnd: string;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  venueState: string;
  venuePostalCode: string;
  venueCountry: string;
  venueMapsUrl: string;
  /** Short venue label used in tight UI, e.g. "PSG TECH" */
  venueShort: string;
}

export interface OrganizerInfo {
  name: string;
  shortName: string;
  department: string;
  departmentUrl: string;
  collegeName: string;
  collegeUrl: string;
}

export interface EventInfo {
  name: string;
  edition: string;
  editionYear: string;
  volumeLabel: string;
  yearRoman: string;
  tagline: string;
  presentedByLine: string;
  symposiumType: string;
  /** External registration portal the header CTA opens */
  registrationUrl: string;
  date: EventDateInfo;
  organizer: OrganizerInfo;
}

export interface NavLink {
  label: string;
  target: string;
}

export interface HeroContent {
  eyebrow: string;
  taglineQuote: string;
  registerCta: string;
  lineupCta: string;
}

export interface LineupContent {
  eyebrow: string;
  arenaSummary: string;
  hint: string;
  technicalHeading: string;
  nonTechnicalHeading: string;
  gamingLeadIn: string;
  gamingHeading: string;
  /** Cover card that stands in for the gaming events until it is split open */
  gameOver: {
    tag: string;
    description: string;
    poolLabel: string;
  };
  signatureBadge: string;
  prizeLabel: string;
}

export interface PastEditionsStat {
  value: string;
  label: string;
}

export interface PastEditionsPhoto {
  image: string;
  alt: string;
  caption?: string;
}

export interface PastEditionsContent {
  badge: string;
  heading: string;
  paragraphs: string[];
  stats: PastEditionsStat[];
  photos: PastEditionsPhoto[];
  stickerText: string;
  footerNote: string;
}

export interface PrizePoolContent {
  totalPrize: string;
  subtext: string;
  ctaLabel: string;
  calloutText: string;
}

export type EventCategory = 'Technical' | 'Non Technical' | 'Gaming';

export interface EventRound {
  title: string;
  description: string;
}

export interface EventConvenor {
  name: string;
  phone: string;
}

export interface EventPrizeSplit {
  place: string;
  amount: string;
  /** Bar-fill width as a CSS percentage string, e.g. "100%" */
  widthPercent: string;
}

export interface EventTimelineEntry {
  /** Round label, e.g. "Round 1" */
  round: string;
  /** Symposium day label, e.g. "Day 1" */
  day: string;
  /** 24h time, e.g. "10:00" */
  startTime: string;
  /** 24h time, e.g. "11:30" */
  endTime: string;
  /** Human duration label, e.g. "1:30" */
  duration: string;
  location: string;
}

export interface EventDetail {
  /** Stable slug used for anchors and the modal's data-open key, e.g. "tri" */
  key: string;
  name: string;
  category: EventCategory;
  teamSize: string;
  prize: string;
  logo: string;
  /** Optional CSS filter applied to the modal logo, for marks that need recolouring */
  logoFilter?: string;
  /** Modal logo blend mode. Defaults to "multiply" when omitted. */
  logoBlendMode?: 'normal' | 'multiply';
  /** Shortened display name for the big poster-style typography in the lineup header, e.g. "Tech Triathlon". Defaults to `name` when omitted. */
  posterLabel?: string;
  /** Short uppercase badge shown on the lineup card, e.g. "RELAY · 3 ROUNDS" */
  tag: string;
  /** One-line blurb on the lineup card */
  shortDescription: string;
  /** Longer paragraph shown in the modal's Overview tab */
  about: string;
  rounds: EventRound[];
  convenors: EventConvenor[];
  prizeSplits: EventPrizeSplit[];
  /** Schedule shown in the modal's Timeline tab — one entry per round */
  timeline: EventTimelineEntry[];
  isSignature?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

/** A titled sub-section of the "Meet the Team" wall, e.g. "Office Bearers". */
export interface TeamGroup {
  title: string;
  members: TeamMember[];
}

export interface SponsorLogo {
  label: string;
  alt: string;
  logo: string;
  href?: string;
  /** Optional tile background override, for marks that need a dark plate */
  background?: string;
}

export interface SponsorTier {
  title: string;
  logos: SponsorLogo[];
}

export interface AlumniSponsor {
  name: string;
  batch: string;
}

export interface PreviousSponsor {
  name: string;
  /** Omitted for sponsors without a logo file yet — the card falls back to a text-only treatment. */
  logo?: string;
}

export interface SponsorsContent {
  heading: string;
  subheading: string;
  tiers: SponsorTier[];
  previousSponsorsHeading: string;
  previousSponsors: PreviousSponsor[];
  alumniIntro: string;
  alumni: AlumniSponsor[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  heading: string;
  items: FaqItem[];
}

export interface FooterContact {
  name: string;
  role: string;
  phone: string;
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSocial {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterContent {
  addressLines: string[];
  mapsUrl: string;
  mapsLabel: string;
  contacts: FooterContact[];
  email: string;
  links: FooterLink[];
  socials: FooterSocial[];
  copyright: string;
}

export interface SiteConfig {
  meta: SiteMeta;
  event: EventInfo;
  nav: NavLink[];
  hero: HeroContent;
  lineup: LineupContent;
  pastEditions: PastEditionsContent;
  prizePool: PrizePoolContent;
  events: EventDetail[];
  team: TeamGroup[];
  sponsors: SponsorsContent;
  faq: FaqContent;
  footer: FooterContent;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const event: EventInfo = {
  name: "Axios",
  edition: "Vol. III",
  editionYear: "2026",
  volumeLabel: "Vol. III · MMXXVI",
  yearRoman: "MMXXVI",
  tagline: "where excellence awaits the worthy",
  presentedByLine: "PSG College of Technology x CSA Presents",
  symposiumType: "Technical Symposium",
  registrationUrl: "https://proleap.ewhizard.tech/join/cohort/axios-26-2",
  date: {
    label: "25-26 SEP '26",
    startISO: "2026-09-25T09:00:00+05:30",
    endISO: "2026-09-26T17:00:00+05:30",
    calendarStart: "20260925",
    calendarEnd: "20260927",
    venueName: "PSG College of Technology",
    venueAddress: "Avinashi Road, Peelamedu",
    venueCity: "Coimbatore",
    venueState: "Tamil Nadu",
    venuePostalCode: "641004",
    venueCountry: "IN",
    venueMapsUrl: "https://maps.google.com/?q=PSG+College+of+Technology+Coimbatore",
    venueShort: "PSG TECH",
  },
  organizer: {
    name: "Computational Sciences Association (CSA)",
    shortName: "CSA",
    department: "Department of Applied Mathematics & Computational Sciences",
    departmentUrl: "https://www.psgtech.edu/department_page.php?dept=AMCS",
    collegeName: "PSG College of Technology, Coimbatore, 641004",
    collegeUrl: "https://www.psgtech.edu",
  },
};

const meta: SiteMeta = {
  title: "Axios '26 | Technical Symposium at PSG Tech, Coimbatore",
  description:
    "Axios '26: The premier national technical symposium presented by the Computational Sciences Association (CSA) at PSG College of Technology, Coimbatore. 10 arenas, 2 days, ₹1,50,000 prize pool. Sept 25–26, 2026.",
  keywords:
    "Axios 2026, Axios '26, Axios PSG Tech, Axios technical symposium, national technical symposium Coimbatore, PSG College of Technology events, PSG Tech fest, Computational Sciences Association, CSA PSG, AMCS PSG Tech, Breach Point CTF, DataQuest, Math Mania, QFactor, Survivors Court, Technical Triathlon, Big Bull stock market event, Valorant tournament, FIFA tournament, chess tournament, college fest Coimbatore, hackathon Coimbatore, coding competition Tamil Nadu",
  author: "Computational Sciences Association (CSA)",
  ogImagePath: "/assets/axios-logo-text.webp",
};

const nav: NavLink[] = [
  { label: "Legacy", target: "board" },
  { label: "Lineup", target: "events" },
  { label: "Prizes", target: "prizes" },
  { label: "Sponsors", target: "sponsors" },
  { label: "Help", target: "faq" },
];

const hero: HeroContent = {
  eyebrow: event.presentedByLine,
  taglineQuote: event.tagline,
  registerCta: "▶ Register Now",
  lineupCta: "✂ See the lineup",
};

const lineup: LineupContent = {
  eyebrow: "The Event Lineup",
  arenaSummary: "10 arenas · 2 days",
  hint: "✂ tap any name for the full brief",
  technicalHeading: "technical events",
  nonTechnicalHeading: "non-technical events",
  gamingLeadIn: "plus",
  gamingHeading: "GAME OVER",
  gameOver: {
    tag: "GAMING · 3 ARENAS",
    description: "Three arenas for players who never press pause: a 5v5 shooter, a 1v1 pitch and a board of pure strategy. Pick your game.",
    poolLabel: "PRIZE POOL",
  },
  signatureBadge: "SIGNATURE",
  prizeLabel: "PRIZE",
};

const pastEditions: PastEditionsContent = {
  badge: "Third edition · 2026",
  heading: "AXIOS<br>IS BACK",
  paragraphs: [
    "The loudest technical fest on campus is back for its third edition! Two days of arenas that bring in students from all over Coimbatore and outside, making this a true spectacle.",
    "This year runs bigger: nine events, a signature triathlon, and a ₹1,50,000 pool. Here's what the last two looked like.",
  ],
  stats: [
    { value: "3,200+", label: "Past participants" },
    { value: "40+", label: "Colleges represented" },
  ],
  photos: [
    { image: "/assets/legacy-3.webp", alt: "A packed auditorium at the Axios '24 opening session", caption: "edition i · '24" },
    { image: "/assets/legacy-1.webp", alt: "A speaker addressing the crowd on the Axios '25 stage" },
    { image: "/assets/legacy-2.webp", alt: "The Axios '25 winners' trophy on display" },
    { image: "/assets/legacy-4.webp", alt: "A group photo on stage at Axios '25", caption: "edition ii · '25" },
  ],
  stickerText: "SAME CHAOS.<br>BIGGER STAKES.",
  footerNote: "you had to be there ✦",
};

const prizePool: PrizePoolContent = {
  totalPrize: "₹1,50,000",
  calloutText: "up for grabs!",
  subtext:
    "Excellence awaits the worthy at Axios. Do you have what it takes to bag it all and walk home a little heavier?",
  ctaLabel: "▶ Claim a seat",
};

const events: EventDetail[] = [
  {
    key: "tri",
    name: "Technical Triathlon",
    category: "Technical",
    teamSize: "3 Members",
    prize: "₹25,000",
    logo: "/assets/logo-tri.webp",
    posterLabel: "Tech Triathlon",
    tag: "RELAY · 3 ROUNDS",
    shortDescription: "Step into TRIATHLON: a battle where knowledge meets strategy and code.",
    about:
      "Step into TRIATHLON, a epic battle where knowledge meets strategy and code! Compete your way through rapid-fire technical challenges, strategic aptitude face-offs, and an intense multi-agent programming arena. Think fast, play smart, code smarter, and conquer every stage!",
    rounds: [
      { title: "Chrono Casino", description: "Navigate a carnival of fast-paced technical face-offs where your knowledge is currency. Wager wisely, outsmart rivals, and rise through the ranks to survive." },
      { title: "Card Conquest", description: "A high-stakes battle of aptitude and strategy where teams challenge rivals to capture opponents’ question cards. Sharp problem-solving, timing, and calculated risks decide who rises to the final round." },
      { title: "Turf Wars", description: "Teams program Python bots to capture territory, manage resources, and outsmart opponents on a hidden battlefield. Using strategy, pathfinding, and multi-agent decision-making, they compete to become the ultimate TRIATHLON champion." },
    ],
    convenors: [
      { name: "Arul Kevin", phone: "+91 80569 90243" },
      { name: "Anirudhan", phone: "+91 80885 72371" },
    ],
    prizeSplits: [
      { place: "Champion", amount: "₹35,000", widthPercent: "100%" },
      { place: "Runner-up", amount: "₹15,000", widthPercent: "58%" },
      { place: "Third", amount: "₹10,000", widthPercent: "38%" },
    ],
    timeline: [
      { round: "Round 1", day: "Day 1", startTime: "09:00", endTime: "13:00", duration: "4:00", location: "4 rooms · G Block Classroom" },
      { round: "Round 2", day: "Day 1", startTime: "14:30", endTime: "16:00", duration: "1:30", location: "2 rooms · G Block Classroom" },
      { round: "Round 3", day: "Day 2", startTime: "16:30", endTime: "17:30", duration: "1:00", location: "F-Block Assembly Hall" },
    ],
    isSignature: true,
  },
  {
    key: "brc",
    name: "Breach Point",
    category: "Technical",
    teamSize: "4 Members",
    prize: "₹17,500",
    logo: "/assets/logo-brc.webp",
    tag: "CTF · 5 TRACKS",
    shortDescription: "Every system has a weakness. Every story has a hidden layer.",
    about:
      "Every system has a weakness. Every story has a hidden layer. Step into Breach Point, where cybersecurity meets narrative, and every flag you capture unravels the next piece of the puzzle. From cracking jeopardy-style challenges woven into a gripping storyline to defending your own systems while breaching your rivals’, only the sharpest hackers will make it out with the final flag.",
    rounds: [
      { title: "Signal Zero", description: "Three dead systems just woke up after a decade of silence, broadcasting the same six words: “We have already tried this once.” Step into a jeopardy-style CTF told through an unfolding investigation — chase down who built ECHO, how it’s moving through the wires, and why its predictions keep coming true. Every flag you capture peels back another layer of a truth the story has been hiding in plain sight." },
      { title: "Red vs Blue", description: "An intense Attack-Defence CTF where teams must patch and defend their own vulnerable systems while simultaneously breaching opponents’ infrastructure to plant flags. Offense and defense in equal measure — falter on either side, and you’re exposed." },
    ],
    convenors: [
      { name: "Aditya", phone: "+91 77955 88955" },
      { name: "Saivenketraj", phone: "+91 80569 92112" },
    ],
    prizeSplits: [
      { place: "Champion", amount: "₹40,000", widthPercent: "100%" },
      { place: "Runner-up", amount: "₹20,000", widthPercent: "56%" },
      { place: "Third", amount: "₹15,000", widthPercent: "42%" },
    ],
    timeline: [
      { round: "Round 1", day: "Day 1", startTime: "09:30", endTime: "17:00", duration: "7:30", location: "D Block Assembly Hall" },
      { round: "Round 2", day: "Day 2", startTime: "09:30", endTime: "14:00", duration: "4:30", location: "M503" },
    ],
  },
  {
    key: "dq",
    name: "DataQuest",
    category: "Technical",
    teamSize: "3 Members",
    prize: "₹17,500",
    logo: "/assets/logo-dq.webp",
    tag: "DATA · 3 ROUNDS",
    shortDescription: "Time does not wait, and neither does data. Turn chaos into insight.",
    about:
      "Time doesn’t wait, and neither does data. Step into a data science showdown where every dataset hides a story — race the clock, decode the patterns, and prove you can turn chaos into insight before time runs out.",
    rounds: [
      { title: "Blitz", description: "A rapid volley of challenges tests how quickly and accurately you can think on your feet. Only the sharpest, fastest teams earn their place in what comes next." },
      { title: "Odyssey", description: "A web of interconnected puzzles, each one unlocking the next. Odyssey tests how well you can think, strategize, and adapt as the challenge deepens with every step." },
      { title: "Forge", description: "The final trial. Armed with a real-world dataset, teams forge insight into impact — analyzing, storytelling, and presenting a solution that can stand before the judges." },
    ],
    convenors: [
      { name: "Tanaz", phone: "+91 63800 22981" },
      { name: "Livin Joseph", phone: "+91 99943 92653" },
    ],
    prizeSplits: [
      { place: "Champion", amount: "₹40,000", widthPercent: "100%" },
      { place: "Runner-up", amount: "₹20,000", widthPercent: "56%" },
      { place: "Third", amount: "₹10,000", widthPercent: "34%" },
    ],
    timeline: [
      { round: "Round 1", day: "Day 1", startTime: "10:00", endTime: "11:30", duration: "1:30", location: "SIL, OSL, NSL, IIL" },
      { round: "Round 2", day: "Day 1", startTime: "13:00", endTime: "15:30", duration: "2:30", location: "SIL, OSL" },
      { round: "Round 3", day: "Day 2", startTime: "08:30", endTime: "13:00", duration: "4:30", location: "SIL, OSL" },
    ],
  },
  {
    key: "mm",
    name: "Math Mania",
    category: "Technical",
    teamSize: "2 Members",
    prize: "₹15,000",
    logo: "/assets/logo-mm.webp",
    tag: "MATH · 3 ROUNDS",
    shortDescription: "Precision is power. Logic, strategy, and problem-solving decide who advances.",
    about:
      "Precision is Power. Step beyond conventional mathematics with a competition that blends logic, strategy, and problem-solving. Take calculated risks, crack challenging puzzles, and prove that precision can lead you all the way to victory.",
    rounds: [
      { title: "Base Case", description: "A qualifier that puts mathematics, logic, reasoning, and visual problem-solving to the test. Think fast, work smart, and secure your place in the next round." },
      { title: "Math Heist", description: "Risk it, solve it, and build your loot. Teams make calculated decisions, tackle mathematical challenges, and use strategic power-ups to maximise their virtual fortune." },
      { title: "Trail to Triumph", description: "The final challenge is a race through an interconnected trail of mathematical and logical puzzles. Choose your path wisely, overcome every challenge, and make your way to triumph." },
    ],
    convenors: [
      { name: "Niveda", phone: "+91 93632 58127" },
      { name: "Keerthi Menon", phone: "+971 54 744 0352" },
    ],
    prizeSplits: [
      { place: "Champion", amount: "₹28,000", widthPercent: "100%" },
      { place: "Runner-up", amount: "₹14,000", widthPercent: "58%" },
      { place: "Third", amount: "₹8,000", widthPercent: "40%" },
    ],
    timeline: [
      { round: "Round 1", day: "Day 1", startTime: "09:30", endTime: "12:30", duration: "3:00", location: "J515, J514, J516" },
      { round: "Round 2", day: "Day 1", startTime: "14:00", endTime: "17:00", duration: "3:00", location: "J515, J516" },
      { round: "Round 3", day: "Day 2", startTime: "09:30", endTime: "12:00", duration: "2:30", location: "J515" },
    ],
  },
  {
    key: "qz",
    name: "QFactor",
    category: "Non Technical",
    teamSize: "2 Members",
    prize: "₹17,500",
    logo: "/assets/logo-qz.webp",
    tag: "QUIZ · PRELIM+FINAL",
    shortDescription: "Mind-boggling questions from almost every topic, with no expertise required.",
    about:
      "Prelims to knockout finals. Mind-boggling questions from (almost) every topic, no expertise or previous experience required. Test your knowledge against the brightest minds!",
    rounds: [
      { title: "Written Prelims", description: "Written round with questions displayed on screens, top 6 teams advance to the finals." },
      { title: "On-Stage Finals", description: "Dry rounds, pounce and bounce, and special rounds await those who can challenge questions from across time." },
    ],
    convenors: [
      { name: "Kaaviya", phone: "+91 63825 80231" },
      { name: "Shambhavi", phone: "+91 80959 43626" },
    ],
    prizeSplits: [
      { place: "Champion", amount: "₹25,000", widthPercent: "100%" },
      { place: "Runner-up", amount: "₹12,000", widthPercent: "50%" },
      { place: "Third", amount: "₹8,000", widthPercent: "32%" },
    ],
    timeline: [
      { round: "Round 1", day: "Day 2", startTime: "09:30", endTime: "12:00", duration: "2:30", location: "F-Block Assembly Hall" },
      { round: "Round 2", day: "Day 2", startTime: "13:00", endTime: "16:00", duration: "3:00", location: "F-Block Assembly Hall" },
    ],
  },
  {
    key: "svc",
    name: "Survivors' Court",
    category: "Non Technical",
    teamSize: "3 Members",
    prize: "₹15,000",
    logo: "/assets/logo-svc.webp",
    tag: "STRATEGY · ELIMINATION",
    shortDescription:
      "High-stakes crises where every decision has consequences. Defend your actions in court.",
    about:
      "Survivors Court puts teams at the centre of high-stakes crises where every decision has consequences. Navigate chaos, make strategic choices, and gather evidence — because when the dust settles, you’ll have to defend your actions in court.",
    rounds: [
      { title: "Round 1 — Survival / Scenario Phase", description: "Teams are placed in an unfolding crisis and must navigate challenges, make critical decisions, and work with limited resources. Every choice can create consequences that affect their journey and future conflicts." },
      { title: "Round 2 — Conflict / Bridging Phase", description: "Teams face the consequences of their decisions as their actions intersect with another team. Conflicts arise from competing choices, forcing teams to analyse events, build their case, and prepare to justify their actions. The provided scenario includes conflicts where one team’s decisions directly create setbacks for another." },
      { title: "Round 3 — Court / Trial Phase", description: "Teams enter the courtroom to defend their actions and challenge their opponents. Using the evidence and decisions from earlier rounds, they must present their case, respond to opposing arguments, and convince the court that their choices were justified." },
      { title: "Round 4 · Verdict", description: "The final verdict is delivered after teams present their evidence and defend the choices made throughout the crisis." },
    ],
    convenors: [
      { name: "Mithun Senthil", phone: "+91 74182 50339" },
      { name: "Ranjana", phone: "+91 94957 71225" },
    ],
    prizeSplits: [
      { place: "Champion", amount: "₹20,000", widthPercent: "100%" },
      { place: "Runner-up", amount: "₹12,000", widthPercent: "60%" },
      { place: "Third", amount: "₹8,000", widthPercent: "40%" },
    ],
    timeline: [
      { round: "Round 1", day: "Day 1", startTime: "10:00", endTime: "12:00", duration: "2:00", location: "M503, M504" },
      { round: "Round 2", day: "Day 1", startTime: "14:00", endTime: "16:00", duration: "2:00", location: "M503, M504" },
      { round: "Round 3", day: "Day 2", startTime: "10:00", endTime: "12:00", duration: "2:00", location: "D-Block Conference Hall" },
      { round: "Round 4", day: "Day 2", startTime: "16:15", endTime: "17:00", duration: "0:45", location: "D-Block Conference Hall" },
    ],
  },
  {
    key: "val",
    name: "Game Over — Valorant",
    category: "Gaming",
    teamSize: "5 Members",
    prize: "₹10,000",
    logo: "/assets/logo-val.webp",
    posterLabel: "Valorant",
    tag: "5v5 · KNOCKOUT",
    shortDescription: "Step onto the virtual battleground and lock in your agent.",
    about:
      "Step onto the virtual battleground and lock in your agent. Valorant is the ultimate test of precise gunplay, tactical synergy, and high-stakes strategy. Only the sharpest aim and smartest utility usage will withstand the crossfire.",
    rounds: [
      { title: "Knockout Phase", description: "Teams go head-to-head in single-elimination knockout matches where every round counts. Top 4 teams advance to Round 2." },
      { title: "Semi-Finals & Grand Finals", description: "The surviving teams step into a best-of-series showdown where adapting to opponents and economy management are critical. Out-aim, out-smart, and plant your flag at the top of the leaderboard to claim ultimate victory." },
    ],
    convenors: [
      { name: "Harshavardhan", phone: "+91 63697 21991" },
      { name: "Dharaneesh", phone: "+91 86678 57284" },
    ],
    prizeSplits: [
      { place: "Champion", amount: "₹30,000", widthPercent: "100%" },
      { place: "Runner-up", amount: "₹16,000", widthPercent: "54%" },
      { place: "Third", amount: "₹9,000", widthPercent: "32%" },
    ],
    timeline: [
      { round: "Round 1", day: "Day 1", startTime: "09:30", endTime: "17:00", duration: "7:30", location: "F203" },
      { round: "Round 2", day: "Day 2", startTime: "09:30", endTime: "12:00", duration: "2:30", location: "F203" },
    ],
  },
  {
    key: "fifa",
    name: "Game Over — FIFA",
    category: "Gaming",
    teamSize: "Solo Entry",
    prize: "₹4,000",
    logo: "/assets/logo-fifa.webp",
    posterLabel: "FIFA",
    tag: "1v1 · KNOCKOUT",
    shortDescription: "Lace up your boots and take control of the pitch.",
    about:
      "Lace up your boots and take control of the pitch. FIFA brings the electric thrill of world-class football right to your controller. From tactical build-up play to stunning long-range screamers, glory is only 90 minutes away.",
    rounds: [
      { title: "Knockout Phase", description: "In this intense knockout round, one mistake can end your tournament run. Keep your defense tight, clinical on the counter-attack, and make every shot count to survive the first whistle. Top 4 players advance to Round 2." },
      { title: "Semi-Finals & Grand Finals", description: "The top 4 players step into a high-stakes showdown where tactical adaptability and composure under pressure are critical. Out-play, out-smart, and dominate the pitch to lift the ultimate trophy." },
    ],
    convenors: [
      { name: "Harshavardhan", phone: "+91 63697 21991" },
      { name: "Dharaneesh", phone: "+91 86678 57284" },
    ],
    prizeSplits: [
      { place: "Champion", amount: "₹16,000", widthPercent: "100%" },
      { place: "Runner-up", amount: "₹9,000", widthPercent: "56%" },
      { place: "Third", amount: "₹5,000", widthPercent: "32%" },
    ],
    timeline: [
      { round: "Round 1", day: "Day 1", startTime: "09:30", endTime: "17:00", duration: "7:30", location: "F202" },
      { round: "Round 2", day: "Day 2", startTime: "09:30", endTime: "12:00", duration: "2:30", location: "F202" },
    ],
  },
  {
    key: "bb",
    name: "Big Bull",
    category: "Non Technical",
    teamSize: "2–4 Members",
    prize: "₹22,500",
    logo: "/assets/logo-bb-badge.webp",
    logoBlendMode: "normal",
    tag: "STOCK MARKET · STRATEGY",
    shortDescription:
      "Read the market. Back your instincts. Put your stock market strategy to the test and make your move as the next Big Bull.",
    about:
      "Read the market. Back your instincts. Big Bull is a stock market strategy challenge where teams build a simulated portfolio, react to breaking market news, and defend the choices behind every trade.",
    rounds: [
      { title: "Round 1 · Market Open", description: "Build a balanced portfolio from the stocks and market data provided within the opening window." },
      { title: "Round 2 · The Bull Run", description: "Respond to price swings, news alerts, and changing market conditions while protecting your returns." },
      { title: "Final · Closing Bell", description: "Present your final portfolio and explain the strategy, risks, and decisions that shaped your performance." },
    ],
    convenors: [
      { name: "Durga", phone: "+91 96989 20880" },
      { name: "Shansita", phone: "+91 83348 12473" },
    ],
    prizeSplits: [
      { place: "Winner", amount: "₹15,000", widthPercent: "100%" },
      { place: "Runner-up", amount: "₹7,000", widthPercent: "47%" },
      { place: "Third", amount: "₹3,000", widthPercent: "20%" },
    ],
    timeline: [
      { round: "Round 1", day: "Day 1", startTime: "09:30", endTime: "13:00", duration: "3:30", location: "F-Block Assembly Hall" },
      { round: "Round 2", day: "Day 1", startTime: "14:00", endTime: "17:00", duration: "3:00", location: "F-Block Assembly Hall" },
      { round: "Round 3", day: "Day 2", startTime: "09:30", endTime: "13:00", duration: "3:30", location: "F201" },
    ],
  },
  {
    key: "chess",
    name: "Game Over — Chess",
    category: "Gaming",
    teamSize: "Solo Entry",
    prize: "₹6,000",
    logo: "/assets/ev-go.webp",
    logoFilter: "invert(45%) sepia(65%) saturate(620%) hue-rotate(92deg) brightness(82%) contrast(88%)",
    posterLabel: "Chess",
    tag: "BOARD · STRATEGY",
    shortDescription: "Sit across the board and outsmart your opponent in an intellectual battle.",
    about:
      "Sit across the board and outsmart your opponent in the ultimate test of intellectual warfare. Chess demands absolute concentration, deep calculation, and flawless long-term strategy. Only the sharpest minds and most precise positional play will survive the grueling battle of wits.",
    rounds: [
      { title: "League Stage", description: "This is a custom matching system, the system pairs leaders against leaders, matching you exclusively with opponents on your exact point level. To stay at the top, you must continuously beat the very best. Only the top 10 players will secure a spot on the prize leaderboard." },
    ],
    convenors: [
      { name: "Harshavardhan", phone: "+91 63697 21991" },
      { name: "Dharaneesh", phone: "+91 86678 57284" },
    ],
    prizeSplits: [],
    timeline: [
      { round: "Round 1", day: "Day 1", startTime: "09:30", endTime: "17:00", duration: "7:30", location: "CSL 1, 2, 3" },
    ],
  },
];

const team: TeamGroup[] = [
  {
    title: "Office Bearers",
    members: [
      { name: "Dinesh", role: "Secretary", photo: "/assets/dinesh.webp" },
      { name: "Thithiksha", role: "Joint Secretary", photo: "/assets/joint-secretary.webp" },
      { name: "Ashvanth", role: "Treasurer", photo: "/assets/treasurer.webp" },
      { name: "Bhuvanesh", role: "Executive Coordinator", photo: "/assets/executive-coordinator.webp" },
      { name: "Ravi Varma", role: "Convenor", photo: "/assets/convenor.webp" },
    ],
  },
  // {
  //   title: "Tech Team",
  //   members: [
  //     { name: "Prem Dharshan", role: "Tech Team Director", photo: "/assets/robot-hand5.webp" },
  //     { name: "Mithun", role: "Tech Team Coordinator", photo: "/assets/floppy-cut.webp" },
  //     { name: "Ajay", role: "Tech Team Member", photo: "/assets/brain.webp" },
  //   ],
  // },
];

const sponsors: SponsorsContent = {
  heading: "OUR PARTNERS",
  subheading: "with a little help from",
  tiers: [
    {
      title: "Title Sponsors",
      logos: [
        { label: "Title Sponsor", alt: "Arcesium", logo: "/assets/arcesium-logo.webp", background: "#000" },
        // Title Co-Sponsor: none for now. KLA moved to previous sponsors.
        // { label: "Title Co-Sponsor", alt: "KLA", logo: "/assets/kla-logo.webp" },
      ],
    },
    {
      title: "Event Sponsors",
      logos: [
        { label: "Event Sponsor", alt: "Event Sponsor", logo: "/assets/logo-brc.webp" },
        { label: "Event Co-Sponsor", alt: "Event Co-Sponsor", logo: "/assets/logo-dq.webp" },
      ],
    },
    {
      title: "Partners",
      logos: [
        { label: "Partner 1", alt: "Partner 1", logo: "/assets/logo-qz.webp" },
        { label: "Partner 2", alt: "Partner 2", logo: "/assets/logo-mm.webp" },
        { label: "Partner 3", alt: "Partner 3", logo: "/assets/logo-svc.webp" },
        { label: "Partner 4", alt: "Partner 4", logo: "/assets/logo-val.webp" },
      ],
    },
  ],
  previousSponsorsHeading: "Previous Sponsors",
  previousSponsors: [
    { name: "Wavicle Data Solutions", logo: "/assets/wavicle.webp" },
    { name: "Foxsense Innovations", logo: "/assets/foxsense.webp" },
    { name: "The Cloud Company", logo: "/assets/thecloudcompany.webp" },
    { name: "Shankar IAS Academy", logo: "/assets/shankariasacademy.webp" },
    { name: "Zee Taurus", logo: "/assets/zeetaurus.webp" },
    { name: "Triumph Hub", logo: "/assets/triumphhub.webp" },
    { name: "Frozen Stick", logo: "/assets/frozenstick.webp" },
    { name: "Speed Step", logo: "/assets/speedstep.webp" },
    { name: "KLA", logo: "/assets/kla-logo.webp" },
  ],
  alumniIntro: "With gratitude to the graduates who keep the lights on.",
  alumni: [
    { name: "A. Ramanathan", batch: "'02" },
    { name: "Priya Chandran", batch: "'05" },
    { name: "K. Vignesh", batch: "'11" },
    { name: "S. Harini", batch: "'16" },
  ],
};

const faq: FaqContent = {
  heading: "HELP & FAQ",
  items: [
    {
      question: "Who can participate in Axios?",
      answer:
        "Any undergraduate or postgraduate student from any college can register. You do not need to be from a computing branch — the events reward clear thinking as much as technical skill.",
    },
    {
      question: "Can I participate in more than one event?",
      answer:
        "Absolutely! You can participate in multiple events given that event timings do not clash.",
    },
    {
      question: "Can I register solo, or need a team?",
      answer:
        "Both work. Each event has its own team size specification, so if you're in doubt, please feel free to reach a coordinator!",
    },
    {
      question: "What should I bring?",
      answer:
        "Your college ID, and the registration QR from your confirmation email. Wi-Fi and power strips are provided at appropriate event venues.",
    },
    {
      question: "Is accommodation available?",
      answer:
        "Yes. Limited hostel accommodation is available on a first come, first serve basis with a nominal cost. Place a request for accommodation at the time of registration.",
    },
  ],
};

const footer: FooterContent = {
  addressLines: [
    "PSG College of Technology,",
    "Avinashi Rd, Peelamedu,",
    "Coimbatore, Tamil Nadu 641004",
  ],
  mapsUrl: event.date.venueMapsUrl,
  mapsLabel: "▸ Open in Maps",
  contacts: [
    { name: "Dinesh", role: "Secretary", phone: "+91 98420 52589" },
    { name: "Ashvanth Kumar", role: "Treasurer", phone: "+91 93441 95468" },
    { name: "Prem Dharshan", role: "Tech Team Director", phone: "+91 94457 69716" },
    { name: "Ravi Varma", role: "Accommodation Co-ordinator", phone: "+91 89460 72123" },
  ],
  email: "axios@psgtech.ac.in",
  links: [
    { label: "▸ Axios managed by Proleap", href: "https://proleap.ewhizard.tech/", external: true },
    { label: "▸ PSG College of Technology", href: "https://www.psgtech.edu", external: true },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com/axios.psgtech", external: true },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/applied-mathematics-and-computational-sciences-psg-college-of-technology-a6aa58388",
      external: true,
    },
    { label: "Email", href: "mailto:csa.amcs@psgtech.ac.in" },
  ],
  copyright:
    "© MMXXVI Computational Sciences Association ✦ PSG College of Technology",
};

export const siteConfig: SiteConfig = {
  meta,
  event,
  nav,
  hero,
  lineup,
  pastEditions,
  prizePool,
  events,
  team,
  sponsors,
  faq,
  footer,
};

export default siteConfig;
