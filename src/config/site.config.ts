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

export interface SponsorLogo {
  label: string;
  alt: string;
  logo: string;
}

export interface SponsorTier {
  title: string;
  logos: SponsorLogo[];
}

export interface AlumniSponsor {
  name: string;
  batch: string;
}

export interface SponsorsContent {
  heading: string;
  subheading: string;
  tiers: SponsorTier[];
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
  team: TeamMember[];
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
  presentedByLine: "Computational Sciences Association presents",
  symposiumType: "Technical Symposium",
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
    collegeName: "PSG College of Technology, Coimbatore, 641004",
    collegeUrl: "https://www.psgtech.edu",
  },
};

const meta: SiteMeta = {
  title: "Axios '26 | PSGCT",
  description:
    "Axios '26: The premier national technical symposium presented by the Computational Sciences Association (CSA) at PSG College of Technology, Coimbatore. 9 arenas, 2 days, ₹1,50,000 prize pool. Sept 25–26, 2026.",
  keywords:
    "Axios 2026, Axios PSG Tech, Technical Symposium Coimbatore, Computational Sciences Association, CSA PSG, Breach Point CTF, DataQuest, Math Mania, QFactor, Survivors Court, Valorant tournament",
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
  arenaSummary: "9 arenas · 2 days",
  hint: "✂ tap any name for the full brief",
  technicalHeading: "technical events",
  nonTechnicalHeading: "non-technical events",
  gamingLeadIn: "plus",
  gamingHeading: "GAME OVER",
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
    { image: "/assets/court-statue.webp", alt: "Axios Edition I Highlights", caption: "edition i · '24" },
    { image: "/assets/eye-crop.webp", alt: "Axios Tech Challenge" },
    { image: "/assets/lens-cut.webp", alt: "Axios Event Crowd" },
    { image: "/assets/thinker-halftone.webp", alt: "Axios Edition II Highlights", caption: "edition ii · '25" },
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
    prize: "₹60,000",
    logo: "/assets/logo-tri.webp",
    posterLabel: "Tech Triathlon",
    tag: "RELAY · 3 ROUNDS",
    shortDescription:
      "Three back-to-back rounds against the clock: code, logic, build. One team, one relay.",
    about:
      "Three back-to-back rounds run relay-style against a shared clock. Your team splits the load across code, logic and build, and hands off cleanly, because the timer never stops. Fastest cumulative finish takes the crown.",
    rounds: [
      { title: "Round 1 · Code Sprint", description: "Timed algorithmic problems on the judge. Clear as many as you can before the handoff." },
      { title: "Round 2 · Logic Grid", description: "Pen-and-paper puzzles, circuit tracing and bit-twiddling. No compiler, just wits." },
      { title: "Round 3 · Build & Ship", description: "A mini-spec dropped live. Ship a working prototype before the buzzer." },
    ],
    convenors: [
      { name: "Aravind Kumar", phone: "+91 90000 00001" },
      { name: "Nisha Verma", phone: "+91 90000 00002" },
    ],
    prizeSplits: [
      { place: "Champion", amount: "₹35,000", widthPercent: "100%" },
      { place: "Runner-up", amount: "₹15,000", widthPercent: "58%" },
      { place: "Third", amount: "₹10,000", widthPercent: "38%" },
    ],
    timeline: [
      { round: "Round 1", day: "Day 1", startTime: "09:00", endTime: "13:00", duration: "4:00", location: "4 rooms – G Block Classroom" },
      { round: "Round 2", day: "Day 1", startTime: "14:30", endTime: "16:00", duration: "1:30", location: "2 rooms – G Block Classroom" },
      { round: "Round 3", day: "Day 2", startTime: "16:30", endTime: "17:30", duration: "1:00", location: "F-Block Assembly Hall" },
    ],
    isSignature: true,
  },
  {
    key: "brc",
    name: "Breach Point",
    category: "Technical",
    teamSize: "4 Members",
    prize: "₹75,000",
    logo: "/assets/logo-brc.webp",
    tag: "CTF · 5 TRACKS",
    shortDescription:
      "A capture-the-flag arena. Crypto, web, forensics, reversing. Find the flag, own the board.",
    about:
      "A jeopardy-style capture-the-flag arena. Five tracks, dozens of flags, one scoreboard. Points scale with difficulty and drop as more teams solve, so first blood is worth the most.",
    rounds: [
      { title: "Cryptography", description: "Break the cipher, recover the key, read what was never meant for you." },
      { title: "Web Exploitation", description: "Find the bug in the stack and pop the flag out of it." },
      { title: "Forensics", description: "Carve the truth out of packet captures and disk images." },
      { title: "Reverse Engineering", description: "Read the binary like it owes you money." },
      { title: "Miscellaneous", description: "OSINT, steganography and the curveballs that do not fit a box." },
    ],
    convenors: [
      { name: "Rahul Menon", phone: "+91 90000 00003" },
      { name: "Sana Iqbal", phone: "+91 90000 00004" },
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
    prize: "₹70,000",
    logo: "/assets/logo-dq.webp",
    tag: "DATA · 2 ROUNDS",
    shortDescription:
      "A dataset, a deadline, and a story to find in the noise. Model it, explain it, defend it.",
    about:
      "One raw dataset, one deadline, one story hiding in the noise. Clean it, model it, and defend your findings to a panel. There are marks for rigour and marks for a narrative that lands.",
    rounds: [
      { title: "Round 1 · Modelling", description: "Wrangle the dataset and build your model in a fixed window. Push predictions to the live leaderboard." },
      { title: "Round 2 · Finals & Defence", description: "Top teams present their insight and defend the method to the judges." },
    ],
    convenors: [
      { name: "Priya Nair", phone: "+91 90000 00005" },
      { name: "Karthik R", phone: "+91 90000 00006" },
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
    prize: "₹50,000",
    logo: "/assets/logo-mm.webp",
    tag: "MATH · 2 ROUNDS",
    shortDescription:
      "An integration bee with teeth. From clean substitutions to problems that fight back.",
    about:
      "An integration bee with teeth. Solve against the clock, one integral at a time, head-to-head. Clean substitutions early; by the finals the problems fight back.",
    rounds: [
      { title: "Round 1 · Warm-up", description: "Timed integrals of rising difficulty. Accuracy and speed both count." },
      { title: "Round 2 · The Gauntlet", description: "Head-to-head elimination at the board. Last solver standing wins." },
    ],
    convenors: [
      { name: "Vivek Anand", phone: "+91 90000 00009" },
      { name: "Meera Joshi", phone: "+91 90000 00010" },
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
    prize: "₹45,000",
    logo: "/assets/logo-qz.webp",
    tag: "QUIZ · PRELIM+FINAL",
    shortDescription:
      "Prelims to knockout finals. Tech, trivia and lateral thinking on the buzzer. Boot your brain.",
    about:
      "Prelims to knockout finals. Tech, trivia and lateral thinking on the buzzer. Boot your brain and test your knowledge against the brightest minds.",
    rounds: [
      { title: "Written Prelims", description: "Top scoring teams advance to the stage." },
      { title: "Stage Finals", description: "Buzzer rounds, pounce and bounce, and speed trivia." },
    ],
    convenors: [
      { name: "Siddharth M", phone: "+91 90000 00007" },
      { name: "Ananya S", phone: "+91 90000 00008" },
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
    teamSize: "Solo Entry",
    prize: "₹40,000",
    logo: "/assets/logo-svc.webp",
    tag: "STRATEGY · ELIMINATION",
    shortDescription:
      "Alliances, betrayals and one immunity token. Outwit the room across rounds of negotiation, then survive the vote.",
    about:
      "A social-strategy game of alliances and betrayals. Talk your way into a bloc, spot the double-cross before it lands, and hold an immunity token when the room turns.",
    rounds: [
      { title: "Round 1 · Alliances", description: "Open negotiation. Form blocs, trade favours and read the table." },
      { title: "Round 2 · The Trials", description: "Challenges hand out immunity and information." },
      { title: "Final · The Verdict", description: "The jury of the eliminated decides who outplayed whom." },
    ],
    convenors: [
      { name: "Anjali Rao", phone: "+91 90000 00021" },
      { name: "Suresh Babu", phone: "+91 90000 00022" },
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
    name: "Game Over: Valorant",
    category: "Gaming",
    teamSize: "5 Members",
    prize: "₹55,000",
    logo: "/assets/logo-val.webp",
    posterLabel: "Valorant",
    tag: "5v5 · KNOCKOUT",
    shortDescription:
      "Five-a-side tactical shooter on a single-elimination bracket. Clutch the round, take the map, advance.",
    about:
      "Five-a-side tactical shooter run on a single-elimination bracket. Lock in your agents, trade sites, and win rounds on economy and nerve.",
    rounds: [
      { title: "Group Stage", description: "Best-of-one seeding matches." },
      { title: "Playoffs", description: "Best-of-three, double elimination." },
      { title: "Grand Final", description: "Best-of-five on the main stage." },
    ],
    convenors: [
      { name: "Rohit Sharma", phone: "+91 90000 00023" },
      { name: "Farhan Ali", phone: "+91 90000 00024" },
    ],
    prizeSplits: [
      { place: "Champion", amount: "₹30,000", widthPercent: "100%" },
      { place: "Runner-up", amount: "₹16,000", widthPercent: "54%" },
      { place: "Third", amount: "₹9,000", widthPercent: "32%" },
    ],
    timeline: [
      { round: "Round 1", day: "Day 1", startTime: "09:30", endTime: "17:00", duration: "7:30", location: "F203" },
      { round: "Round 2", day: "Day 2", startTime: "09:30", endTime: "12:30", duration: "3:00", location: "Same as Round 1 (F203)" },
    ],
  },
  {
    key: "fifa",
    name: "Game Over: FIFA",
    category: "Gaming",
    teamSize: "Solo Entry",
    prize: "₹30,000",
    logo: "/assets/logo-fifa.webp",
    posterLabel: "FIFA",
    tag: "1v1 · KNOCKOUT",
    shortDescription:
      "One on one on the pitch. Short halves, single-elimination, and the golden boot on the line.",
    about:
      "One on one on the pitch. Short halves keep it frantic, single-elimination keeps it honest. Pick your club, park the bus or press high.",
    rounds: [
      { title: "Group Stage", description: "Round-robin within small groups." },
      { title: "Knockouts", description: "Single-elimination ties with golden goal." },
      { title: "Final", description: "One match for the golden boot." },
    ],
    convenors: [
      { name: "Naveen Kumar", phone: "+91 90000 00025" },
      { name: "Aditya Menon", phone: "+91 90000 00026" },
    ],
    prizeSplits: [
      { place: "Champion", amount: "₹16,000", widthPercent: "100%" },
      { place: "Runner-up", amount: "₹9,000", widthPercent: "56%" },
      { place: "Third", amount: "₹5,000", widthPercent: "32%" },
    ],
    timeline: [
      { round: "Round 1", day: "Day 1", startTime: "09:30", endTime: "17:00", duration: "7:30", location: "F202" },
      { round: "Round 2", day: "Day 2", startTime: "09:30", endTime: "12:30", duration: "3:00", location: "Same as Round 1 (F202)" },
    ],
  },
  {
    key: "bb",
    name: "Big Bull",
    category: "Non Technical",
    teamSize: "2 Members",
    prize: "₹35,000",
    logo: "/assets/logo-bb.webp",
    tag: "MARKET SIM · 3 ROUNDS",
    shortDescription:
      "A live stock market simulation. Trade smart, read the swings, and finish with the fattest portfolio.",
    about:
      "A three-round trading simulation where virtual capital meets real market psychology. Build a portfolio, react to breaking news events, and out-trade the room without going bust.",
    rounds: [
      { title: "Round 1 · Market Open", description: "Initial capital allocation across a live simulated index. React fast as prices move." },
      { title: "Round 2 · Volatility Event", description: "A market shock hits the floor. Hedge, short, or double down before the dust settles." },
      { title: "Round 3 · Closing Bell", description: "Final trades locked in. Portfolios are marked to market and ranked." },
    ],
    convenors: [
      { name: "Arjun Das", phone: "+91 90000 00027" },
      { name: "Divya Suresh", phone: "+91 90000 00028" },
    ],
    prizeSplits: [
      { place: "Champion", amount: "₹18,000", widthPercent: "100%" },
      { place: "Runner-up", amount: "₹10,000", widthPercent: "55%" },
      { place: "Third", amount: "₹7,000", widthPercent: "38%" },
    ],
    timeline: [
      { round: "Round 1", day: "Day 1", startTime: "09:30", endTime: "13:00", duration: "3:30", location: "F-Block Assembly Hall" },
      { round: "Round 2", day: "Day 2", startTime: "14:00", endTime: "17:00", duration: "3:00", location: "F-Block Assembly Hall" },
      { round: "Round 3", day: "Day 2", startTime: "09:30", endTime: "13:00", duration: "3:30", location: "F201" },
    ],
  },
];

const team: TeamMember[] = [
  { name: "Dinesh", role: "Secretary", photo: "/assets/court-statue.webp" },
  { name: "Thithiksha", role: "Joint Secretary", photo: "/assets/eye-crop.webp" },
  { name: "Ashvanth", role: "Treasurer", photo: "/assets/lens-cut.webp" },
  { name: "Bhuvanesh", role: "Executive Coordinator", photo: "/assets/thinker-halftone.webp" },
  { name: "Ravi Varma", role: "Convenor", photo: "/assets/heart-hands.webp" },
];

const sponsors: SponsorsContent = {
  heading: "OUR PARTNERS",
  subheading: "with a little help from",
  tiers: [
    {
      title: "Title Sponsors",
      logos: [
        { label: "Title Sponsor", alt: "Title Sponsor", logo: "/assets/psg-logo.webp" },
        { label: "Title Co-Sponsor", alt: "Title Co-Sponsor", logo: "/assets/csa-logo.webp" },
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
        "Any undergraduate or postgraduate student from any college can register. You do not need to be from a computing branch, the events reward clear thinking as much as technical skill.",
    },
    {
      question: "Do I need to be an expert coder?",
      answer:
        "No. Only Breach Point and the Triathlon build round assume coding comfort. DataQuest, the Quiz and Math Mania are open to anyone who enjoys problem-solving, beginners regularly place well.",
    },
    {
      question: "Can I register solo, or need a team?",
      answer:
        "Both work. A Delegate pass lets you enter every individual event alone; a Team of Five is best for the relay. You can also form teams on-site during boot-up.",
    },
    {
      question: "What should I bring?",
      answer:
        "A laptop with a charger, your college ID, and the registration QR from your confirmation email. Wi-Fi and power strips are provided at every station.",
    },
    {
      question: "Is accommodation available?",
      answer:
        "Yes, limited hostel accommodation is available on request at a nominal charge. Flag it during registration or write to the contact below.",
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
    { name: "Dinesh", role: "Secretary", phone: "+91 90000 00001" },
    { name: "Bhuvanesh", role: "Executive Co-ordinator", phone: "+91 90000 00002" },
    { name: "Aravind", role: "Tech Co-ordinator", phone: "+91 90000 00003" },
    { name: "Ravi Varma", role: "Accommodation Co-ordinator", phone: "+91 90000 00004" },
  ],
  email: "axios@psgtech.ac.in",
  links: [
    { label: "▸ Axios Web App", href: "#about" },
    { label: "▸ PSG College of Technology", href: "https://www.psgtech.edu", external: true },
  ],
  socials: [
    { label: "Instagram", href: "#about" },
    { label: "LinkedIn", href: "#about" },
    { label: "Email", href: "mailto:axios@psgtech.ac.in" },
  ],
  copyright:
    "© MMXXVI Computational Sciences Association · PSG College of Technology, best viewed at 800×600 or higher ✦ Not licensed for resale to any garage startup.",
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
