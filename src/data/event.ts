/**
 * Lakshya'26 Event Data & Copy
 * ALL copy lives here.
 */

export interface TrackData {
  number: string;
  name: string;
  description: string;
}

export interface MilestoneData {
  day: 'DAY 1' | 'DAY 2';
  time: string;
  title: string;
  description: string;
}

export interface PrizeData {
  id: string;
  number: string;
  label: string;
  category: string;
  amount: number;
  displayAmount: string;
  perks: string[];
  illustration: 'trophy' | 'medal' | 'stars';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SponsorData {
  id: string;
  name: string;
  category: string;
  logo?: string;
}

export const EVENT_DATA = {
  collegeName: 'SJB Institute of Technology',
  collegeShort: 'SJBIT',
  eventName: "Lakshya'26",
  duration: '24',
  durationHours: 24,
  dates: '05-06 November 2026',
  startTimestampISO: '2026-11-05T09:00:00+05:30',
  venue: 'SJBIT Campus Auditorium & Tech Hub, Bangalore',
  participants: '500+',
  participantsCount: 500,
  teams: '100+',
  prizePool: '₹45,000',
  prizePoolAmount: 45000,
  tracksCount: 5,
  registrationUrl: 'https://forms.gle/lakshya26',
  tagline: 'innovate. build. aim higher.',

  // Scroll sequence multi-segment frame configuration
  desktopFrameCount: 240,
  mobileFrameCount: 120,
  segmentA: {
    desktopFrames: 240,
    mobileFrames: 120,
    // Trim initial tunnel sequence so the journey starts a few seconds before the logo emergence (frame 48 desktop, frame 24 mobile)
    startFrameDesktop: 48,
    startFrameMobile: 24,
    desktopPath: '/frames/a/desktop',
    mobilePath: '/frames/a/mobile',
  },
  segmentB: {
    desktopFrames: 240,
    mobileFrames: 120,
    startFrameDesktop: 1,
    startFrameMobile: 1,
    desktopPath: '/frames/b/desktop',
    mobilePath: '/frames/b/mobile',
  },

  aboutText:
    "Lakshya'26 is SJBIT's flagship hackathon, where students come together for 24 hours of building, learning and breaking limits. Whether you are a first-time coder or a seasoned hacker, this is your stage to turn ideas into impact.",

  stats: [
    { value: 24, suffix: ' Hours', label: 'Continuous Sprint' },
    { value: 500, suffix: '+', label: 'Participants' },
    { value: 45000, prefix: '₹', suffix: '', label: 'Prize Pool' },
    { value: 5, suffix: ' Tracks', label: 'Domains of Innovation' },
  ],

  tracks: [
    {
      number: '01',
      name: 'AI & Machine Learning',
      description:
        'Build intelligent systems, from computer vision to generative AI tools that solve real problems.',
    },
    {
      number: '02',
      name: 'Web & App Development',
      description:
        'Create fast, accessible and delightful digital products.',
    },
    {
      number: '03',
      name: 'Web3 & Blockchain',
      description:
        'Explore decentralized apps and trustless systems.',
    },
    {
      number: '04',
      name: 'IoT & Robotics',
      description:
        'Connect hardware and software to sense and respond to the physical world.',
    },
    {
      number: '05',
      name: 'Open Innovation',
      description:
        'Pitch any idea that makes campus, community or the planet better.',
    },
  ] as TrackData[],

  schedule: [
    {
      day: 'DAY 1',
      time: '09:00',
      title: 'Registration & Check-in',
      description: 'Doors open, badge pickup & kit distribution.',
    },
    {
      day: 'DAY 1',
      time: '10:30',
      title: 'Inauguration',
      description: 'Opening ceremony & keynote address.',
    },
    {
      day: 'DAY 1',
      time: '12:00',
      title: 'Hacking Begins',
      description: '24-hour innovation sprint starts.',
    },
    {
      day: 'DAY 1',
      time: '20:00',
      title: 'Mentor Round',
      description: 'Architecture review and technical guidance.',
    },
    {
      day: 'DAY 2',
      time: '02:00',
      title: 'Midnight Break',
      description: 'Energy refresh, midnight coffee & mini games.',
    },
    {
      day: 'DAY 2',
      time: '09:00',
      title: 'Mentor Round 2',
      description: 'Final code polish & demo review.',
    },
    {
      day: 'DAY 2',
      time: '12:00',
      title: 'Hacking Ends',
      description: 'Submission freeze & project showcase setup.',
    },
    {
      day: 'DAY 2',
      time: '14:00',
      title: 'Final Pitches',
      description: 'Top squads pitch live to grand jury.',
    },
    {
      day: 'DAY 2',
      time: '17:00',
      title: 'Prizes & Closing',
      description: 'Winner announcements & award ceremony.',
    },
  ] as MilestoneData[],

  prizes: [
    {
      id: 'p1',
      number: '01',
      label: 'Winner',
      category: 'Grand Champion',
      amount: 25000,
      displayAmount: '₹25,000',
      perks: [
        'Direct cash grant of ₹25,000',
        'Official Lakshya Gold Bullseye Trophy',
        'Direct mentorship & fast-track incubation',
        'Exclusive swag kit & certificate of excellence',
      ],
      illustration: 'trophy',
    },
    {
      id: 'p2',
      number: '02',
      label: 'Runner-Up',
      category: '1st Runner-Up',
      amount: 15000,
      displayAmount: '₹15,000',
      perks: [
        'Direct cash grant of ₹15,000',
        'Official Lakshya Silver Trophy',
        'Cloud API toolkits & developer credits',
        'Merit certificate & premium swag',
      ],
      illustration: 'medal',
    },
    {
      id: 'p3',
      number: '03',
      label: 'Special Awards',
      category: 'Track & Innovation Bounties',
      amount: 5000,
      displayAmount: '₹5,000',
      perks: [
        'Cash bounty for best rookie & innovative projects',
        'Best UI/UX Polish Category Award',
        'Sponsor tooling credits & vouchers',
        'Official certificate of commendation',
      ],
      illustration: 'stars',
    },
  ] as PrizeData[],

  sponsors: [
    { id: 'sp1', name: 'GITHUB CAMPUS', category: 'Platform Partner' },
    { id: 'sp2', name: 'POLYGON LABS', category: 'Web3 Sponsor' },
    { id: 'sp3', name: 'VERCEL', category: 'Deployment Partner' },
    { id: 'sp4', name: 'POSTMAN', category: 'API Partner' },
    { id: 'sp5', name: 'DEVPOST', category: 'Hackathon Community' },
    { id: 'sp6', name: 'AWS STARTUPS', category: 'Cloud Infrastructure' },
    { id: 'sp7', name: 'SUPABASE', category: 'Database Partner' },
  ] as SponsorData[],

  faqs: [
    {
      id: 'f1',
      question: 'Who can participate in Lakshya\'26?',
      answer:
        'Undergraduate and graduate students from any accredited college or university across India are welcome. You only need a valid college ID card to enter.',
    },
    {
      id: 'f2',
      question: 'What is the permitted team size?',
      answer:
        'Teams can consist of 2 to 4 members. Inter-college and inter-branch teams are fully allowed and encouraged.',
    },
    {
      id: 'f3',
      question: 'Is there any registration fee?',
      answer:
        'The registration fee is ₹1,000 per squad (2 to 4 members). This covers 24-hour hackathon participation, all meals, energy snacks, mentor reviews, hacker kit, and full eligibility for all track prizes.',
    },
    {
      id: 'f4',
      question: 'What should we bring with us?',
      answer:
        'Bring your laptops, chargers, extension cords, personal hardware components (if competing in IoT/Robotics), student ID cards, and your ambition.',
    },
    {
      id: 'f5',
      question: 'Will food and accommodation be provided?',
      answer:
        'Yes. All meals, midnight coffee, energy snacks, and designated rest/recharge zones are arranged inside the SJBIT campus throughout the 24 hours.',
    },
    {
      id: 'f6',
      question: 'Can teams submit to multiple tracks?',
      answer:
        'Each project must declare one primary track upon final submission, though cross-disciplinary solutions bridging multiple domains are welcomed.',
    },
  ] as FAQItem[],

  contacts: {
    email: 'lakshya@sjbit.edu.in',
    phone: '+91 98450 12345',
    address: 'SJBIT, BGS Health & Education City, Dr. Vishnuvardhan Road, Kengeri, Bangalore - 560060',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
};
