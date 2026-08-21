import { Project, SkillCategory } from '../types';
import heroPortrait from '../assets/images/ihsan_hero_portrait.png';
{/* Flutter Pos Desk Path*/ }
import flutterPosHero from '../assets/images/flutter_pos_desk_1786880366618.jpg';
import posDashboardTab from '../assets/images/pos_dashboard_tab_1786880438601.jpg';
import posTerminalTab from '../assets/images/pos_terminal_tab_1786880461370.jpg';
{/* Mobile Showroom App Path*/ }
import showroomHero from '../assets/images/gallery/automobile_app/showroom_mobile_thumb.png';
import showroomGalleryHero from '../assets/images/gallery/automobile_app/automobile_mobile_app_hero.png';
import showroomGallery1 from '../assets/images/gallery/automobile_app/automobile_app_1.png';
import showroomGallery2 from '../assets/images/gallery/automobile_app/automobile_app_2.png';
import showroomGallery3 from '../assets/images/gallery/automobile_app/automobile_app_3.png';
import showroomGallery4 from '../assets/images/gallery/automobile_app/automobile_app_4.png';
import showroomGallery5 from '../assets/images/gallery/automobile_app/automobile_app_5.png';
import showroomGallery6 from '../assets/images/gallery/automobile_app_6.png';
{/* Adult Analysis Path*/ }
import adultAnalysisHero from '../assets/images/gallery/sensus_analyst/sensus_analyst_1.png';
import adultAnalysis1 from '../assets/images/gallery/sensus_analyst/sensus_analyst_2.png';
import adultAnalysis2 from '../assets/images/gallery/sensus_analyst/sensus_analyst_3.png';
{/* Automobile Web Path*/ }
import automobileHero from '../assets/images/automobile_showroom_web.png';
import automobileThumb from '../assets/images/automobile_showroom_thumb.jpg';

export const PERSONAL_INFO = {
  name: 'MUHAMMAD IHSAN PRATAMA',
  brandName: 'Saan.dev',
  role: 'CREATIVE DEVELOPER & DIGITAL BUILDER',
  tagline: 'I BUILD THINGS WITH CODE.',
  bio: 'With a foundation in Informatics Engineering, I specialize in bridging the gap between complex logic and seamless user experiences. My expertise spans across Web, Mobile, Data Engineering, and Desktop Applications, allowing me to approach digital problem-solving from multiple architectural angles.',
  email: 'ihsanpratama457@gmail.com',
  github: 'https://github.com/Saaannn27',
  linkedin: 'https://www.linkedin.com/in/muhammad-ihsan-pratama/',
  twitter: 'https://twitter.com',
  copyrightYear: '2024',
  photos: {
    hero: heroPortrait,
  }
};

export const PILLARS = [
  { id: 'web', number: '01', title: 'WEB DEV', code: '01 / WEB DEV', description: 'High performance web applications, responsive systems, and micro-frontends with modern TypeScript stacks.' },
  { id: 'mobile', number: '02', title: 'MOBILE', code: '02 / MOBILE', description: 'Cross-platform mobile apps with offline-first SQLite databases, fluid 60FPS animations, and reactive BLoC state.' },
  { id: 'data', number: '03', title: 'DATA', code: '03 / DATA', description: 'ETL pipelines, machine learning algorithms, unsupervised clustering, and interactive visual data dashboards.' },
  { id: 'desktop', number: '04', title: 'DESKTOP APP', code: '04 / DESKTOP APP', description: 'Cross-platform desktop software architectures with offline-first SQLite persistence, high performance rendering, and desktop windowing.' },
];

export const PROJECTS: Project[] = [
  {
    id: 'automobile-showroom',
    title: 'AUTOMOBILE SHOWROOM WEBSITE',
    subtitle: 'Web-Based Automotive Showroom',
    category: 'WEB APP',
    year: '2024',
    role: 'FULL STACK DEVELOPER',
    tech: ['HTML', 'CSS', 'JAVASCRIPT', 'PHP', 'MYSQL'],
    pillar: 'WEB DEV',
    image: automobileThumb,
    imageAlt: 'Automobile Showroom Web Application Hero Banner',
    featured: true,
    gridSpan: 'col-span-1 md:col-span-8',
    overview: {
      problem: 'Car buyers and dealerships require a clean, fast, and responsive web portal to explore diverse vehicle models, compare specs and pricing, and filter inventory by manufacturer without heavy client-side delays.',
      solution: 'Engineered a full-stack web application using HTML, CSS, JavaScript, PHP, and MySQL. Features dynamic manufacturer filtering (BMW, Toyota, Honda, Daihatsu, Porsche, Mercedes-Benz), structured vehicle catalog cards, responsive layout, and customer inquiry management.'
    },
    technicalDive: [
      {
        title: 'DYNAMIC BRAND FILTERING',
        tag: 'JAVASCRIPT / PHP',
        description: 'Implemented client-side and server-side filtering logic allowing users to instantaneously sort vehicle inventory by manufacturer, model year, and price range.'
      },
      {
        title: 'RESPONSIVE CATALOG UI',
        tag: 'HTML5 / CSS3',
        description: 'Designed a dark/gold contrast visual theme featuring responsive vehicle product cards, clean hero banner sections, and intuitive navigation.'
      },
      {
        title: 'BACKEND & DATABASE REPOSITORY',
        tag: 'PHP / MYSQL',
        description: 'Architected relational MySQL database tables to store vehicle specs, pricing, availability status, and customer purchase inquiries.'
      }
    ],
    gallery: [
      {
        image: automobileHero,
        title: 'FULL AUTOMOBILE SHOWROOM CATALOG',
        description: 'Full page view showing hero banner, manufacturer brand filters, and complete car catalog grid.',
        orientation: 'landscape'
      }
    ],
    metrics: [
      { label: 'Catalog Models', value: '12+ Cars' },
      { label: 'Brand Partners', value: '6 Makes' },
      { label: 'Page Speed', value: '< 0.8s' }
    ],
    liveDemoAvailable: false
  },
  {
    id: 'flutter-pos',
    title: 'FLUTTER POS',
    subtitle: 'Desktop Application Architecture',
    category: 'DESKTOP APP',
    year: '2024',
    role: 'FULL STACK DEVELOPER',
    tech: ['FLUTTER', 'SQLITE', 'BLOC', 'DART STREAMS'],
    pillar: 'DESKTOP',
    image: flutterPosHero,
    imageAlt: 'Flutter POS System Desktop Workspace Setup',
    featured: true,
    gridSpan: 'col-span-1 md:col-span-8',
    overview: {
      problem: 'Small businesses often struggle with clunky, outdated Point of Sale systems that lack offline capabilities and modern user interfaces. Existing solutions were either too expensive or required constant internet connectivity, causing operational friction in areas with unreliable networks.',
      solution: 'A robust, offline-first desktop POS system built with Flutter and SQLite. Designed with a focus on speed, reliability, and an intuitive user experience. It allows for seamless transaction processing, inventory management, and reporting without the absolute need for an internet connection.'
    },
    technicalDive: [
      {
        title: 'OFFLINE-FIRST ARCHITECTURE',
        tag: 'SQLITE / BLOC',
        description: 'Utilized local SQLite databases to ensure zero downtime. Transactions are queued locally and synced with a remote server only when connectivity is restored, employing a robust conflict resolution strategy.'
      },
      {
        title: 'RESPONSIVE DESKTOP UI',
        tag: 'FLUTTER / CUSTOM PAINTER',
        description: 'Crafted a fluid, high-contrast interface optimized for touchscreens and traditional mouse inputs. Custom widgets were developed to handle dense tabular data without compromising performance.'
      },
      {
        title: 'REAL-TIME INVENTORY',
        tag: 'DART STREAMS',
        description: 'Implemented reactive streams to instantly update inventory levels across the application the moment a transaction is completed, preventing overselling.'
      }
    ],
    gallery: [
      {
        image: posDashboardTab,
        title: 'DASHBOARD VIEW',
        description: 'Real-time metrics and daily sales summaries presented in a clean, uncluttered layout.',
        orientation: 'landscape'
      },
      {
        image: posTerminalTab,
        title: 'TRANSACTION SCREEN',
        description: 'Optimized for rapid entry with large touch targets and distinct visual hierarchy.',
        orientation: 'landscape'
      }
    ],
    metrics: [
      { label: 'Sync Latency', value: '< 45ms' },
      { label: 'Offline Uptime', value: '100%' },
      { label: 'Frame Rate', value: '60 FPS' }
    ],
    liveDemoAvailable: true
  },
  {
    id: 'showroom-app',
    title: 'AUTOMOBILE SHOWROOM APP',
    subtitle: 'Mobile Engineering',
    category: 'MOBILE APP',
    year: '2023',
    role: 'MOBILE ARCHITECT',
    tech: ['FLUTTER', 'DART', 'GESTURE HANDLER', 'REANIMATED'],
    pillar: 'MOBILE',
    image: showroomGalleryHero,
    imageAlt: 'Luxury Fashion and Accessories Mobile Showroom App',
    featured: false,
    gridSpan: 'col-span-1 md:col-span-4',
    overview: {
      problem: 'High-end luxury brands require an ultra-tactile, fluid mobile shopping experience where users can inspect detailed textures, compare variations, and order without lag or jitter.',
      solution: 'Engineered a bespoke mobile showroom client with smooth 120Hz gesture physics, intelligent image caching, and localized catalog synchronization.'
    },
    technicalDive: [
      {
        title: 'INTERACTIVE GESTURE PHYSICS',
        tag: 'REANIMATED / GESTURE',
        description: 'Built micro-interaction physics pipelines enabling continuous swipe-to-inspect 360-degree rotation on mobile hardware without dropping frames.'
      },
      {
        title: 'CLIENT-SIDE PRE-FETCHING',
        tag: 'TYPESCRIPT / MMKV',
        description: 'Instantaneous local storage utilizing fast MMKV memory mapped caches to render high-resolution product thumbnails in under 16ms.'
      }
    ],
    gallery: [
      {
        image: showroomGallery1,
        title: 'Modern Showroom App',
        description: 'A modern automotive showroom platform designed to provide a clean, intuitive, and engaging car shopping experience.',
        orientation: 'landscape'
      },
      {
        image: showroomGallery2,
        title: 'Car Search & Discovery',
        description: 'Browse vehicles by brand with fast search and easy filtering to quickly find the right car.',
        orientation: 'landscape'
      },
      {
        image: showroomGallery3,
        title: 'Vehicle Detail',
        description: 'Explore detailed vehicle information, pricing, location, and quick actions for test drives and dealer contact.',
        orientation: 'landscape'
      },
      {
        image: showroomGallery4,
        title: 'Detailed Specifications',
        description: 'View essential vehicle specifications, including engine, transmission, fuel type, power, and passenger capacity.',
        orientation: 'landscape'
      },
      {
        image: showroomGallery5,
        title: 'Premium Services',
        description: 'Access key automotive services such as vehicle comparison, credit simulation, and trusted dealer connections.',
        orientation: 'landscape'
      },
      {
        image: showroomGallery6,
        title: 'Company & Locations',
        description: 'Discover company information, business hours, contact details, and showroom locations across different cities.',
        orientation: 'landscape'
      }
    ],
    metrics: [
      { label: 'Interaction Rate', value: '+42%' },
      { label: 'Cold Start', value: '0.4s' }
    ],
    liveDemoAvailable: true
  },
  {
    id: 'census-analyst',
    title: 'SENSUS ANALYST',
    subtitle: 'Data Analysis',
    category: 'DATA ANALYSIS',
    year: '2025',
    role: 'DATA ANALYST',
    tech: ['PYTHON', 'NUMPY', 'PANDAS', 'MATPLOTLIB', 'SEABORN'],
    pillar: 'DATA',
    image: adultAnalysisHero,
    imageAlt: 'Decision Tree Algorithm',
    featured: false,
    gridSpan: 'col-span-1 md:col-span-4',
    overview: {
      problem: 'High-dimensional customer demographic and behavioral data sets are difficult for business stakeholders to interpret without real-time multi-dimensional visual feedback.',
      solution: 'Developed an end-to-end unsupervised data processing pipeline and D3.js graphical canvas that renders iterative centroid convergence in real-time.'
    },
    technicalDive: [
      {
        title: 'ITERATIVE CONVERGENCE ENGINE',
        tag: 'NUMPY / FASTAPI',
        description: 'Parallelized Euclidean distance calculations across vectorized data arrays, streaming epoch updates to the frontend via WebSockets.'
      },
      {
        title: 'DYNAMIC VORONOI TESSELLATION',
        tag: 'D3.JS / CANVAS',
        description: 'Rendered real-time Voronoi partition boundaries as cluster centroids shift with each algorithmic iteration.'
      }
    ],
    gallery: [
      {
        image: adultAnalysis1,
        title: 'CLUSTER CONVERGENCE',
        description: 'Multi-node visual representation showing partitioned vector clusters in high contrast dark mode.',
        orientation: 'landscape'
      }
    ],
    metrics: [
      { label: 'Vector Dimension', value: '128-D' },
      { label: 'Convergence Time', value: '1.2s' }
    ],
    liveDemoAvailable: true
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'web-stack',
    number: '01',
    title: 'WEB ARCHITECTURE',
    description: 'Modern front-end and full-stack development focusing on speed, accessible UI, and clean design patterns.',
    skills: [
      { name: 'TypeScript / JavaScript (ESNext)', level: 'Advanced', highlight: true },
      { name: 'React 19 & Next.js App Router', level: 'Advanced', highlight: true },
      { name: 'Tailwind CSS & Motion Animations', level: 'Advanced', highlight: true },
      { name: 'Node.js & Express / Fastify', level: 'Proficient' },
      { name: 'REST APIs & GraphQL Services', level: 'Proficient' },
      { name: 'WebSockets & Real-time Feeds', level: 'Proficient' }
    ]
  },
  {
    id: 'mobile-stack',
    number: '02',
    title: 'MOBILE ENGINEERING',
    description: 'Cross-platform native applications with offline persistence and high-performance rendering.',
    skills: [
      { name: 'Flutter & Dart Ecosystem', level: 'Advanced', highlight: true },
      { name: 'BLoC & Reactive State Streams', level: 'Advanced', highlight: true },
      { name: 'SQLite / Drift Offline Databases', level: 'Advanced', highlight: true },
      { name: 'React Native & Expo Ecosystem', level: 'Proficient' },
      { name: 'Platform Channels & Native Plugins', level: 'Proficient' },
      { name: 'Push Notifications & Background Tasks', level: 'Proficient' }
    ]
  },
  {
    id: 'data-stack',
    number: '03',
    title: 'DATA ENGINEERING & ML',
    description: 'Data ingestion pipelines, statistical analysis, unsupervised machine learning algorithms, and data visualization.',
    skills: [
      { name: 'Python (NumPy, Pandas, Scikit-learn)', level: 'Advanced', highlight: true },
      { name: 'K-Means & Clustering Algorithms', level: 'Advanced', highlight: true },
      { name: 'D3.js Data Visualizations', level: 'Proficient', highlight: true },
      { name: 'PostgreSQL, MySQL & SQL Modeling', level: 'Advanced' },
      { name: 'ETL Pipelines & FastAPI Microservices', level: 'Proficient' },
      { name: 'Data Normalization & Feature Scaling', level: 'Proficient' }
    ]
  },
  {
    id: 'desktop-stack',
    number: '04',
    title: 'DESKTOP ENGINEERING',
    description: 'Cross-platform desktop software architectures, local SQLite persistence, windowing & system desktop integrations.',
    skills: [
      { name: 'Flutter Desktop (Windows/macOS)', level: 'Advanced', highlight: true },
      { name: 'SQLite & Local System Caching', level: 'Advanced', highlight: true },
      { name: 'BLoC & Reactive State Streams', level: 'Advanced', highlight: true },
      { name: 'Dart Native Systems & FFI', level: 'Proficient' },
      { name: 'Desktop UI & Custom Windowing', level: 'Proficient' }
    ]
  }
];


