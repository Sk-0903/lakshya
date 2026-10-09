/**
 * Event Configuration & Content for Lakshya '26 Hackathon
 * All copy and customizable event data live here.
 */

export interface TrackData {
  id: string;
  number: string;
  name: string;
  shortName: string;
  description: string;
  icon: string; // Lucide icon identifier
  color: string;
}

export interface MilestoneData {
  id: string;
  day: 'DAY 1' | 'DAY 2';
  time: string;
  label: string;
  description: string;
  icon: string;
}

export interface PrizeCardData {
  id: string;
  number: string;
  category: string;
  name: string;
  amount: number;
  displayAmount: string;
  perks: string[];
  tier: 'gold' | 'silver' | 'bronze';
  image?: string; // Optional image field (falls back to code-generated visuals)
}

export interface CriterionData {
  name: string;
  weight: number;
  description: string;
}

export interface SponsorData {
  id: string;
  name: string;
  category: string;
  icon: string;
  tier: 'platinum' | 'gold' | 'silver' | 'partner';
  logo?: string; // Optional custom logo image (falls back to code-generated wordmark)
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const EVENT_DATA = {
  collegeName: 'SJB Institute of Technology',
  collegeShort: 'SJBIT',
  eventName: "Lakshya'26",
  edition: '2026',
  durationHours: 24,
  dates: '05-06 November 2026',
  startTimestampISO: '2026-11-05T09:00:00+05:30', // Start timestamp for countdown
  venue: 'SJBIT Campus Auditorium & Tech Hub, Bangalore',
  tagline: 'innovate. build. aim higher.',
  registrationUrl: 'https://forms.gle/lakshya26',
  formEndpoint: '', // Optional POST API endpoint; if empty, simulated client-side

  metrics: {
    participants: '500+',
    participantsNum: 500,
    teams: '100+',
    teamsNum: 100,
    prizePool: '₹45,000',
    prizePoolNum: 45000,
    tracksCount: '5 Tracks',
    tracksCountNum: 5,
    hours: '24 Hours',
    hoursNum: 24,
  },

  aboutParagraph:
    "Lakshya'26 is SJB Institute of Technology's flagship national hackathon, where passionate builders and designers from across the country unite for 24 hours of non-stop engineering, learning, and breaking limits. Whether you are a first-time hacker or an experienced developer, this is your arena to turn bold ideas into impactful real-world products. Aim high. Build bold!",

  terminalLines: [
    '> init lakshya --year=2026',
    '✔ loading ideas... done',
    '✔ assembling teams... done',
    '✔ caffeine levels: critical',
    '> status: registrations OPEN_',
  ],

  tracks: [
    {
      id: 'ai-ml',
      number: '01',
      name: 'AI & Machine Learning',
      shortName: 'AI & Agents',
      description:
        'Build intelligent systems, from computer vision and multi-modal LLMs to autonomous agents and predictive models that solve tangible real-world problems.',
      icon: 'Cpu',
      color: '#B600A8',
    },
    {
      id: 'web-app',
      number: '02',
      name: 'Web & App Development',
      shortName: 'Web & Mobile',
      description:
        'Create ultra-fast, accessible, and delightful digital products for the modern web, cross-platform mobile ecosystems, and real-time interactive experiences.',
      icon: 'Code2',
      color: '#38bdf8',
    },
    {
      id: 'web3-blockchain',
      number: '03',
      name: 'Web3 & Blockchain',
      shortName: 'Decentralized',
      description:
        'Explore decentralized apps, smart contract architectures, zero-knowledge proofs, and trustless systems that reimagine transparency and digital ownership.',
      icon: 'Layers',
      color: '#a855f7',
    },
    {
      id: 'iot-robotics',
      number: '04',
      name: 'IoT & Robotics',
      shortName: 'Hardware & IoT',
      description:
        'Connect hardware and software to automate, sense, and respond to the physical realm using microcontrollers, smart edge nodes, and autonomous robots.',
      icon: 'Radio',
      color: '#f59e0b',
    },
    {
      id: 'open-innovation',
      number: '05',
      name: 'Open Innovation',
      shortName: 'Moonshot',
      description:
        "Have an idea that doesn't fit a standard box? Pitch moonshots across healthcare, clean energy, smart campuses, accessibility, or social impact.",
      icon: 'Sparkles',
      color: '#BE4C00',
    },
  ] as TrackData[],

  schedule: [
    {
      id: 's1',
      day: 'DAY 1',
      time: '09:00',
      label: 'Registration & Check-in',
      description: 'Doors open, badge pickup, team networking, and hacker kit distribution.',
      icon: 'Clock',
    },
    {
      id: 's2',
      day: 'DAY 1',
      time: '10:30',
      label: 'Inauguration & Keynote',
      description: 'Opening ceremony, problem statement reveals, and guest addresses.',
      icon: 'Sparkles',
    },
    {
      id: 's3',
      day: 'DAY 1',
      time: '12:00',
      label: 'Hacking Begins',
      description: 'The 24-hour clock officially ticks! Start your engines and push initial repos.',
      icon: 'Rocket',
    },
    {
      id: 's4',
      day: 'DAY 1',
      time: '20:00',
      label: 'Mentor Round 1',
      description: 'Technical evaluation, architecture review, and live feedback from industry mentors.',
      icon: 'Users',
    },
    {
      id: 's5',
      day: 'DAY 2',
      time: '02:00',
      label: 'Midnight Snacks & Mini-Games',
      description: 'Energy reboots, laser tag, Mario Kart tournaments, and hot coffee.',
      icon: 'Gamepad2',
    },
    {
      id: 's6',
      day: 'DAY 2',
      time: '09:00',
      label: 'Mentor Round 2',
      description: 'Final code audit, demo test run, and polish before submission freeze.',
      icon: 'Target',
    },
    {
      id: 's7',
      day: 'DAY 2',
      time: '12:00',
      label: 'Hacking Ends',
      description: 'Code freeze! Commit push, presentation uploads, and demo setup.',
      icon: 'Lock',
    },
    {
      id: 's8',
      day: 'DAY 2',
      time: '14:00',
      label: 'Final Pitches',
      description: 'Top shortlisted teams pitch live before the grand jury panel.',
      icon: 'Trophy',
    },
    {
      id: 's9',
      day: 'DAY 2',
      time: '17:00',
      label: 'Prize Distribution & Closing',
      description: 'Announcing winners, handing awards, certificates, and celebration photo session.',
      icon: 'Award',
    },
  ] as MilestoneData[],

  prizes: [
    {
      id: 'p1',
      number: '01',
      category: 'Grand Champion',
      name: 'Winner',
      amount: 25000,
      displayAmount: '₹25,000',
      perks: [
        'Hard Cash Prize of ₹25,000',
        'Official Lakshya Bullseye Trophy',
        'Direct Fast-Track Mentorship',
        'Exclusive Swag & Merit Certificates',
      ],
      tier: 'gold',
    },
    {
      id: 'p2',
      number: '02',
      category: '1st Runner-Up',
      name: 'Runner-Up',
      amount: 15000,
      displayAmount: '₹15,000',
      perks: [
        'Hard Cash Prize of ₹15,000',
        'Official Lakshya Silver Trophy',
        'Developer Toolkits & API Credits',
        'Swag Pack & Certificates of Merit',
      ],
      tier: 'silver',
    },
    {
      id: 'p3',
      number: '03',
      category: 'Category Excellence',
      name: 'Track Winners & Special Prizes',
      amount: 5000,
      displayAmount: '₹5,000',
      perks: [
        'Cash Bounty for Best Innovation',
        'Best First-Year Rookie Squad Award',
        'Best UI/UX Polish Award',
        'Sponsor Tooling & Certificates',
      ],
      tier: 'bronze',
    },
  ] as PrizeCardData[],

  judgingCriteria: [
    {
      name: 'Innovation & Originality',
      weight: 25,
      description: 'How novel and creative is the solution compared to existing products?',
    },
    {
      name: 'Technical Complexity',
      weight: 25,
      description: 'Depth of engineering, architecture soundness, and code craftsmanship.',
    },
    {
      name: 'Real-World Impact',
      weight: 20,
      description: 'Market viability, scalability, and ability to solve genuine user problems.',
    },
    {
      name: 'Design & User Experience',
      weight: 15,
      description: 'Elegance of UI, ergonomics, accessibility, and visual polish.',
    },
    {
      name: 'Presentation & Pitch',
      weight: 15,
      description: 'Clarity of communication, live demo execution, and handling Q&A.',
    },
  ] as CriterionData[],

  sponsors: [
    { id: 'sp1', name: 'DevFolio', category: 'Platform Partner', icon: 'Terminal', tier: 'platinum' },
    { id: 'sp2', name: 'Polygon', category: 'Web3 Sponsor', icon: 'Layers', tier: 'platinum' },
    { id: 'sp3', name: 'GitHub', category: 'Developer Partner', icon: 'Code2', tier: 'gold' },
    { id: 'sp4', name: 'Vercel', category: 'Deployment Partner', icon: 'Rocket', tier: 'gold' },
    { id: 'sp5', name: 'Supabase', category: 'Backend Partner', icon: 'Database', tier: 'silver' },
    { id: 'sp6', name: 'Postman', category: 'API Partner', icon: 'Send', tier: 'silver' },
    { id: 'sp7', name: 'Auth0', category: 'Security Sponsor', icon: 'Shield', tier: 'silver' },
    { id: 'sp8', name: 'Resend', category: 'Communication', icon: 'Mail', tier: 'partner' },
  ] as SponsorData[],

  faqs: [
    {
      id: 'f1',
      question: 'Who can participate in Lakshya’26?',
      answer:
        'Any currently enrolled undergraduate, postgraduate, or diploma college student from any recognized institution across India can participate. Inter-college teams are fully permitted!',
    },
    {
      id: 'f2',
      question: 'What is the team size limit?',
      answer:
        'Teams can consist of 2 to 4 members. You can either register with your squad pre-formed, or find teammates in our pre-event Discord networking channel.',
    },
    {
      id: 'f3',
      question: 'Is there any registration fee?',
      answer:
        'Zero! Lakshya’26 is 100% free for all shortlisted teams, including complimentary food, snacks, hacker kits, and Wi-Fi access.',
    },
    {
      id: 'f4',
      question: 'What should we bring with us to the venue?',
      answer:
        'Bring your laptop, chargers, hardware kits (if participating in IoT), valid college ID card, government photo ID, water bottle, and your passion to build!',
    },
    {
      id: 'f5',
      question: 'Will food and accommodation be provided?',
      answer:
        'Yes! Full meals (lunch, dinner, breakfast), midnight pizzas, 24/7 coffee, and dedicated resting zones inside SJBIT campus are arranged for all confirmed participants.',
    },
    {
      id: 'f6',
      question: 'Can our project belong to multiple tracks?',
      answer:
        'You choose one primary track upon final submission for category prize evaluation, but your project is still eligible for the Grand Champion and special awards.',
    },
  ] as FAQItem[],

  contacts: {
    email: 'lakshya26@sjbit.edu.in',
    phone: '+91 98765 43210',
    location: 'BGS Health & Education City, Kengeri, Bengaluru, Karnataka 560060',
    instagram: 'https://instagram.com/lakshya_sjbit',
    linkedin: 'https://linkedin.com/company/sjbit-lakshya',
    github: 'https://github.com/lakshya26',
    discord: 'https://discord.gg/lakshya26',
  },
};
