export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "x";
};

export type Experience = {
  company: string;
  role: string;
  href?: string;
  start: string;
  end: string;
  contributions: string[];
};

export type ResearchItem = {
  title: string;
  href: string;
  venue?: string;
  year?: string;
};

export type Project = {
  title: string;
  description: string;
  href: string;
  repo?: string;
  stackSlugs: string[];
  highlight?: string;
};

export type AppItem = {
  title: string;
  href: string;
  description: string;
  stack: string[];
};

export type OpenSourceItem = {
  title: string;
  href: string;
  stars: number;
  description?: string;
  stack: string[];
};

export type PersonalProject = {
  title: string;
  href: string;
  description: string;
  stack: string[];
};

export type PortfolioData = {
  name: string;
  tagline: string;
  socials: SocialLink[];
  experiences: Experience[];
  research: ResearchItem[];
  projects: Project[];
  apps: AppItem[];
  openSource: OpenSourceItem[];
  personalProjects: PersonalProject[];
};

const PERSON_NAME = "Fariz Wibisono";
const TAGLINE =
  "Full Stack Software Engineer";

export const portfolio: PortfolioData = {
  name: PERSON_NAME,
  tagline: TAGLINE,
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/frzxw",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/frzxw/",
      icon: "linkedin",
    },
    {
      label: "X",
      href: "https://x.com/frzwibisono",
      icon: "x",
    },
  ],
  experiences: [
    {
      company: "Enclavium",
      role: "Community Technical Team",
      start: "2023",
      end: "Present",
      href: undefined,
      contributions: [
        "Developed and maintained a public landing page to present Web3 research and community initiatives.",
        "Supported internal tools and technical resources related to blockchain education and on-chain research."
      ],
    },
    {
      company: "KEMAKOM Universitas Pendidikan Indonesia",
      role: "Web Development Volunteer",
      start: "2024",
      end: "2025",
      href: undefined,
      contributions: [
        "Developed an event information website for Dinamik 19 (Dies Natalis KEMAKOM UPI), covering competition details and technical guidelines.",
        "Built a tourism and information website for P2M KEMAKOM UPI to support a community-based camping ground project."
      ],
    },
    {
      company: "Exsaverse",
      role: "Community Operations Team",
      start: "2022",
      end: "2023",
      href: undefined,
      contributions: [
        "Acted as an intermediary in peer-to-peer blockchain transactions by holding buyer funds in escrow and releasing them upon completion.",
        "Coordinated transaction processes between buyers and sellers to ensure secure and transparent transfers.",
        "Supported operational activities for a Web3 community with 14,000+ social followers and 71,000+ Discord members."
      ],
    },
    {
      company: "InearDAO",
      role: "Co-Founder",
      start: "2021",
      end: "2023",
      href: undefined,
      contributions: [
        "Co-founded and managed a Web3 education community with 500+ active members and 3,600+ social followers.",
        "Delivered curated Web3 research insights on airdrops, NFTs, and DeFi opportunities, helping members identify and participate in early-stage blockchain initiatives."
      ],
    },
  ],
  research: [
    {
      title: "No research papers yet",
      href: "#",
      venue: undefined,
      year: undefined,
    },
  ],
  projects: [
    {
      title: "17RentCar",
      description: "Built a responsive web application for vehicle catalog and WhatsApp-based booking flow. Designed data models for vehicle availability and scheduling to support rental operations.",
      href: "https://17rentcar.com/",
      repo: "https://github.com/frzxw/17rentcar",
      stackSlugs: ["nextdotjs", "tailwindcss", "postgresql", "supabase", "vercel"],
      highlight: "Web rental and booking platform"
    },
    {
      title: "Eventix",
      description: "Developed a cloud-based ticket booking system with safeguards to prevent double booking. Designed system flows for read-heavy traffic and controlled write operations during high-demand events. Implemented backend logic to ensure data consistency and transactional safety.",
      href: "https://lemon-grass-000ece900.3.azurestaticapps.net/",
      repo: "https://github.com/frzxw/eventix-app/",
      stackSlugs: ["react", "typescript", "azurefunctions", "azuresql", "cosmosdb", "redis"],
      highlight: "Online ticket booking system"
    },
    {
      title: "Rasain",
      description: "Built a cross-platform mobile application for recipe discovery and pantry tracking. Developed RESTful backend APIs to support content delivery, user interaction, and future feature scalability. Integrated frontend and backend systems to ensure smooth data synchronization.",
      href: "",
      repo: "https://github.com/frzxw/rasain-app",
      stackSlugs: ["flutter", "expressjs", "postgresql", "supabase"],
      highlight: "Mobile recipe application"
    },
    {
      title: "Runtastic",
      description: "Developed a public-facing company profile website for a Bandung-based running community. Implemented responsive layouts and structured content to improve community visibility and brand presence.",
      href: "https://runtastic-landing.vercel.app/",
      repo: undefined,
      stackSlugs: ["react", "typescript", "vite", "radixui", "vercel"],
      highlight: "Running community website"
    },
    {
      title: "Laksana",
      description: "Built a multilingual company profile website to represent a personal software agency and freelance services. Designed scalable layout and content structure for future service expansion.",
      href: "https://laksana.dev/",
      repo: undefined,
      stackSlugs: ["react", "typescript", "vite", "tailwindcss", "i18n", "vercel"],
      highlight: "Software agency website"
    },
  ],
  apps: [
    {
      title: "No applications yet",
      href: "#",
      description: "Stay tuned for upcoming apps!",
      stack: [],
    },
  ],
  openSource: [
    {
      title: "No open source projects yet",
      href: "#",
      stars: 0,
      description: "Open source contributions will appear here.",
      stack: [],
    },
  ],
  personalProjects: [
    {
      title: "No personal projects yet",
      href: "#",
      description: "Fun and personal projects will be listed soon!",
      stack: [],
    },
  ],
};
