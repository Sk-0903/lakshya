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

export interface RuleItem {
  id: string;
  number: number;
  title: string;
  content: string;
  category: 'Eligibility & Team' | 'Submission & Originality' | 'Venue & Conduct' | 'Evaluation & Authority';
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

export interface AssociationData {
  name: string;
  logo: string;
  alt: string;
  url: string;
}

export interface LeadershipMemberData {
  role: string;
  designation: string;
  department: string;
  name: string;
  photo: string;
  message: string;
}

export interface LeadershipData {
  sectionLabel: string;
  heading: string;
  subtitle: string;
  members: LeadershipMemberData[];
}

export interface TeamMemberData {
  role: string;
  group: 'faculty' | 'core' | 'crew';
  name: string;
  photo: string;
  phone: string;
  email: string;
  linkedin: string;
}

export interface VenueHowToReachItem {
  label: string;
  text: string;
}

export interface VenueData {
  name: string;
  campusTag: string;
  address: string;
  dates: string;
  mapEmbedUrl: string;
  mapLinkUrl: string;
  directionsUrl: string;
  howToReach: VenueHowToReachItem[];
  note: string;
}

export const EVENT_DATA = {
  collegeName: 'SJB Institute of Technology',
  collegeShort: 'SJBIT',
  eventName: "Lakshya'26",
  duration: '24',
  durationHours: 24,
  dates: '05-06 November 2026',
  startTimestampISO: '2026-11-05T09:00:00+05:30',
  venue: {
    name: 'CSE Seminar Hall, SJBIT',
    campusTag: 'SJBIT CAMPUS, KENGERI',
    address:
      'Department of CSE & ISE, SJB Institute of Technology, BGS Health & Education City, Dr. Vishnuvardhan Road, Kengeri, Bangalore - 560060',
    dates: '05–06 November 2026',
    mapEmbedUrl: '',
    mapLinkUrl: '',
    directionsUrl: '',
    howToReach: [],
    note: '',
  } as VenueData,
  participants: '200+',
  participantsCount: 200,
  teams: '50+',
  prizePool: '₹35,000',
  prizePoolAmount: 35000,
  tracksCount: 3,
  registrationUrl: 'https://forms.gle/65PbpDexmsZuxSGE9',
  tagline: 'One Vision. Infinite Innovations.',

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
    "Lakshya'26 is SJBIT's flagship hackathon — One Vision. Infinite Innovations. — where students come together for 24 hours of building, learning and breaking limits. Whether you are a first-time coder or a seasoned hacker, this is your stage to turn ideas into impact.",

  stats: [
    { value: 24, suffix: ' Hours', label: 'Continuous Sprint' },
    { value: 200, suffix: '+', label: 'Participants' },
    { value: 35000, prefix: '₹', suffix: '', label: 'Prize Pool' },
    { value: 3, suffix: ' Tracks', label: 'Domains of Innovation' },
  ],

  tracks: [
    {
      number: '01',
      name: 'Agritech',
      description:
        '“Rooted in tradition, powered by innovation — cultivating solutions from the ground up.”',
    },
    {
      number: '02',
      name: 'Smart and Sustainable Future',
      description:
        '“Engineering a resilient planet today where technology and ecology thrive as one.”',
    },
    {
      number: '03',
      name: 'Governance',
      description:
        '“Code in service of the people — empowering citizens, elevating transparency, and engineering trust.”',
    },
  ] as TrackData[],

  schedule: [
    {
      day: 'DAY 1',
      time: '08:30',
      title: 'Registration & Check-in',
      description: 'Doors open, badge pickup & kit distribution.',
    },
    {
      day: 'DAY 1',
      time: '09:30',
      title: 'Inauguration',
      description: 'Opening ceremony & keynote address.',
    },
    {
      day: 'DAY 1',
      time: '10:30',
      title: 'Hackathon Starts',
      description: '24-hour innovation sprint officially kicks off.',
    },
    {
      day: 'DAY 1',
      time: '18:00',
      title: 'Mentor Round 1',
      description: 'Architecture review and technical guidance.',
    },
    {
      day: 'DAY 2',
      time: '01:00',
      title: 'Midnight Break',
      description: 'Energy refresh, midnight coffee & mini games.',
    },
    {
      day: 'DAY 2',
      time: '08:00',
      title: 'Mentor Round 2',
      description: 'Final code polish & demo review.',
    },
    {
      day: 'DAY 2',
      time: '10:30',
      title: 'Hackathon Ends',
      description: '24-hour sprint completes. Submission freeze & setup.',
    },
    {
      day: 'DAY 2',
      time: '12:00',
      title: 'Final Pitches',
      description: 'Top squads pitch live to grand jury.',
    },
    {
      day: 'DAY 2',
      time: '15:30',
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
      amount: 20000,
      displayAmount: '₹20,000',
      perks: [
        'Direct cash grant of ₹20,000',
        'Guaranteed Internship',
        'Official Winner Trophy',
        'Certificates & Goodies',
      ],
      illustration: 'trophy',
    },
    {
      id: 'p2',
      number: '02',
      label: 'Runner-Up',
      category: '1st Runner-Up',
      amount: 10000,
      displayAmount: '₹10,000',
      perks: [
        'Direct cash grant of ₹10,000',
        'Guaranteed Internship',
        'Official Runner-Up Trophy',
        'Certificates & Goodies',
      ],
      illustration: 'medal',
    },
    {
      id: 'p3',
      number: '03',
      label: 'Second Runner-Up',
      category: '2nd Runner-Up',
      amount: 5000,
      displayAmount: '₹5,000',
      perks: [
        'Direct cash grant of ₹5,000',
        'Guaranteed Internship',
        'Official Second Runner-Up Trophy',
        'Certificates & Goodies',
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

  rulesSubtitle: 'LAKSHYA 2026 — ONE VISION. INFINITE INNOVATIONS. OFFICIAL RULES & REGULATIONS',

  rules: [
    {
      id: 'r1',
      number: 1,
      title: 'Eligibility',
      content:
        'The hackathon is open to currently enrolled undergraduate and postgraduate engineering students. A valid student ID or official proof of enrollment is mandatory.',
      category: 'Eligibility & Team',
    },
    {
      id: 'r2',
      number: 2,
      title: 'Team Composition',
      content:
        'Each team must consist of a minimum of 2 and a maximum of 4 registered members. Cross-college, interdisciplinary, and multi-year teams are allowed.',
      category: 'Eligibility & Team',
    },
    {
      id: 'r3',
      number: 3,
      title: 'Team Leader and Team Changes',
      content:
        'Each team must designate one team leader as the primary point of contact. Team members cannot be changed after the registration deadline without prior approval from the organizing committee. No changes are permitted after the event begins.',
      category: 'Eligibility & Team',
    },
    {
      id: 'r4',
      number: 4,
      title: 'Mandatory Identification and Consent',
      content:
        'Every participant must carry a valid college ID card and a hard copy of a government-issued ID, such as Aadhaar, a driving licence, or a passport. A signed hardcopy parent or guardian consent form is mandatory for all participants.',
      category: 'Eligibility & Team',
    },
    {
      id: 'r5',
      number: 5,
      title: 'Registration and On-Site Verification',
      content:
        'All participants must complete registration and confirm their attendance at the registration desk upon arrival. On-site verification is mandatory for entry.',
      category: 'Eligibility & Team',
    },
    {
      id: 'r6',
      number: 6,
      title: 'Bring Your Own Laptop',
      content:
        'Teams must bring their own laptops, chargers, and essential development equipment. Laptops will not be provided by the organizers.',
      category: 'Submission & Originality',
    },
    {
      id: 'r7',
      number: 7,
      title: 'Approved Problem Domains',
      content:
        'Projects must align with one of the official themes: Agritech, Smart and Sustainable Future, or Governance. Off-topic submissions may be disqualified.',
      category: 'Submission & Originality',
    },
    {
      id: 'r8',
      number: 8,
      title: 'Project Originality',
      content:
        'All projects must be original and developed during the 24-hour hackathon. Previously completed projects must not be presented as newly developed solutions.',
      category: 'Submission & Originality',
    },
    {
      id: 'r9',
      number: 9,
      title: 'Code, Libraries, and APIs',
      content:
        'Open-source libraries, APIs, and frameworks are permitted where allowed, provided they are properly credited. Unauthorized proprietary material, plagiarism, and intellectual property violations are prohibited.',
      category: 'Submission & Originality',
    },
    {
      id: 'r10',
      number: 10,
      title: 'Submission Deadline',
      content:
        'All projects, source code, and required presentation materials must be submitted in the prescribed format before the official deadline. Late submissions will not be evaluated.',
      category: 'Submission & Originality',
    },
    {
      id: 'r11',
      number: 11,
      title: 'Project Demonstration and Evaluation',
      content:
        'Teams must demonstrate their solutions and explain their functionality, technical implementation, innovation, and real-world impact. Members should be prepared to answer questions from the judges.',
      category: 'Evaluation & Authority',
    },
    {
      id: 'r12',
      number: 12,
      title: 'Judges\' Decision Is Final',
      content:
        'The judges\' decisions regarding evaluation, scores, rankings, and winners are final and binding.',
      category: 'Evaluation & Authority',
    },
    {
      id: 'r13',
      number: 13,
      title: 'On-Site Presence and Minimum Team Availability',
      content:
        'All team members must remain physically present at the venue throughout the hackathon. Remote participation is not permitted. At least two team members from each team must remain at the venue at all times.',
      category: 'Venue & Conduct',
    },
    {
      id: 'r14',
      number: 14,
      title: 'Leaving the Venue',
      content:
        'Any participant who needs to leave campus due to an emergency must inform the coordinators and obtain prior approval. All exit and re-entry procedures must be followed.',
      category: 'Venue & Conduct',
    },
    {
      id: 'r15',
      number: 15,
      title: 'Campus Entry and Security',
      content:
        'Only registered participants and authorized personnel may enter the campus and designated event areas. Mandatory security checks, including bag checks, will be conducted at the campus entrance.',
      category: 'Venue & Conduct',
    },
    {
      id: 'r16',
      number: 16,
      title: 'Prohibited Items',
      content:
        'Perfumes, lighters, sharp objects, and outside food or snacks are prohibited inside the venue. Participants must comply with all campus security instructions.',
      category: 'Venue & Conduct',
    },
    {
      id: 'r17',
      number: 17,
      title: 'Food Arrangements',
      content:
        'Lunch, snacks, and dinner will be provided on 5 November 2026. Breakfast will be provided on 6 November 2026.',
      category: 'Venue & Conduct',
    },
    {
      id: 'r18',
      number: 18,
      title: 'Fair Play and Professional Conduct',
      content:
        'Cheating, unauthorized assistance, tampering with another team\'s work, harassment, abusive behaviour, intimidation, and deliberate interference with the competition are prohibited. Serious violations may result in immediate disqualification.',
      category: 'Venue & Conduct',
    },
    {
      id: 'r19',
      number: 19,
      title: 'Eligibility Conflicts and Campus Safety',
      content:
        'Participants may register with only one team. Organizers, sponsors, and their family members are ineligible where prohibited by the event\'s conflict-of-interest policy. All participants must follow campus safety rules, protect college property, and avoid restricted areas without authorization.',
      category: 'Evaluation & Authority',
    },
    {
      id: 'r20',
      number: 20,
      title: 'Organizer Authority',
      content:
        'The organizing committee reserves the right to verify eligibility, enforce these rules, resolve disputes, and take appropriate action for violations. Official instructions and updates issued by the committee must be followed.',
      category: 'Evaluation & Authority',
    },
  ] as RuleItem[],

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
        'Teams must consist of 2 to 4 members per team. Inter-college and inter-branch teams are fully allowed and encouraged.',
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
    email: 'lakshya26.sjbit@gmail.com',
    phone: '+91 78925 86349',
    address: 'SJBIT, BGS Health & Education City, Dr. Vishnuvardhan Road, Kengeri, Bangalore - 560060',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },

  associations: [
    {
      name: 'DLithe',
      logo: '/partners/dlithe.png',
      alt: 'DLithe, Be Agile. Be in Demand',
      url: '',
    },
  ] as AssociationData[],

  leadership: {
    sectionLabel: 'LEADERSHIP',
    heading: 'WORDS OF ENCOURAGEMENT',
    subtitle: "A few words on Lakshya'26",
    members: [
      {
        role: 'Principal',
        designation: 'Principal',
        department: 'SJB Institute of Technology',
        name: 'Dr. K. V. Mahendra Prashanth',
        photo: '/leadership/principal.jpg',
        message:
          'It gives me immense pleasure to extend my best wishes to Lakshya – A National-Level 24-Hour Hackathon, organized by the Department of Information Science and Engineering, SJBIT.\n\nI am confident that this initiative will inspire young innovators to transform creative ideas into impactful solutions through technology, collaboration, and problem-solving. I wish all participants a rewarding experience and the organizing team great success.',
      },
      {
        role: 'Dean',
        designation: 'Dean – Academics',
        department: 'SJB Institute of Technology',
        name: 'Dr. Babu N V',
        photo: '/leadership/dean.jpg',
        message:
          'Lakshya – A National-Level 24-Hour Hackathon is a remarkable initiative that inspires young innovators to think beyond boundaries, embrace challenges, and transform their ideas into impactful technological solutions.\n\nOrganized by the Department of Information Science and Engineering, SJB Institute of Technology, this event provides an opportunity for students to showcase their creativity, strengthen their problem-solving skills, and collaborate towards a better future.\n\nMay Lakshya spark new ideas, nurture entrepreneurial thinking, and empower aspiring technologists to become the innovators and leaders of tomorrow. I extend my best wishes to all participants and the organizing team for a successful and inspiring event.',
      },
      {
        role: 'Head of the Department',
        designation: 'Head of the Department',
        department: 'Department of Information Science and Engineering, SJBIT',
        name: 'Dr. Gopalakrishna M T',
        photo: '/leadership/hod.jpg',
        message:
          'Lakshya – A National-Level 24-Hour Hackathon is an opportunity for young minds to innovate, collaborate, and transform ideas into impactful solutions.\n\nWe aim to inspire students to think creatively, embrace challenges, and apply technology to solve real-world problems. I wish all participants an enriching experience and the organizing team great success.',
      },
    ],
  } as LeadershipData,

  teamSubtitle: "The people behind Lakshya'26",

  team: [
    // 3 Faculty Coordinators (Order: Dr. Pavitra Bai S, Prof. Prarthana J V, Prof. Gayathri S)
    {
      role: 'Faculty Coordinator',
      group: 'faculty',
      name: 'Dr. Pavitra Bai S',
      photo: '/team/pavitra-bai-s.jpg',
      phone: '+91 96112 77994',
      email: '',
      linkedin: '',
    },
    {
      role: 'Faculty Coordinator',
      group: 'faculty',
      name: 'Prof. Prarthana J V',
      photo: '/team/prarthana-jv.jpg',
      phone: '+91 99801 77733',
      email: '',
      linkedin: '',
    },
    {
      role: 'Faculty Coordinator',
      group: 'faculty',
      name: 'Prof. Gayathri S',
      photo: '/team/gayathri-s.jpg?v=2',
      phone: '+91 63647 38864',
      email: '',
      linkedin: '',
    },

    // 3 Core Leads
    {
      role: 'Lead Student Coordinator',
      group: 'core',
      name: 'Keshav S',
      photo: '/team/keshav-s.jpg',
      phone: '+91 78925 86349',
      email: '',
      linkedin: '',
    },
    {
      role: 'Technical Lead',
      group: 'core',
      name: 'Deekshitha J A',
      photo: '/team/deekshitha-ja.jpg',
      phone: '+91 80504 62087',
      email: '',
      linkedin: '',
    },
    {
      role: 'Operations & Execution Lead',
      group: 'core',
      name: 'Sushanth N S',
      photo: '/team/sushanth-ns.jpg',
      phone: '+91 83100 34078',
      email: '',
      linkedin: '',
    },

    // 21 Organizing Crew Members
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Keshav S',
      photo: '/team/keshav-s.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Deekshitha J A',
      photo: '/team/deekshitha-ja.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Sushanth N S',
      photo: '/team/sushanth-ns.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Praneel C Kulkarni',
      photo: '/team/praneel-c-kulkarni.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Likitha B S',
      photo: '/team/likitha-bs.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Hemanth U',
      photo: '/team/hemanth-u.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Dimpana P',
      photo: '/team/dimpana.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Dhruva K',
      photo: '/team/dhruva-k.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Sumedha Bhat',
      photo: '/team/sumedha-bhat.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Swati Hegde',
      photo: '/team/swati-hegde.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Abhijith D',
      photo: '/team/abhijit.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Lekhashree R',
      photo: '/team/lekhashree-r.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Modakapriya S P',
      photo: '/team/modakapriya-sp.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Karan',
      photo: '',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Renu',
      photo: '/team/renu.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Sinchana K N',
      photo: '/team/sinchana-kn.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Ujwal',
      photo: '',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Chaya R',
      photo: '/team/chaya-r.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Drushya Gowda',
      photo: '/team/drushya-gowda.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Tharun R',
      photo: '/team/tharun-r.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
    {
      role: 'Crew Member',
      group: 'crew',
      name: 'Sagar S',
      photo: '/team/sagar-s.jpg',
      phone: '',
      email: '',
      linkedin: '',
    },
  ] as TeamMemberData[],
};
