/* ============================================================================
   PORTFOLIO CONTENT — SINGLE SOURCE OF TRUTH
   ----------------------------------------------------------------------------
   ⚡ EDIT THIS FILE to make the site yours. Every section of the website reads
   from here. Real data below was provided by Rowdro Mrong (live project URLs,
   LinkedIn, GitHub, Upwork). Values wrapped in [ ... ] or marked "EDIT ME" are
   editable placeholders — replace them with your real information. Nothing on
   the site is fabricated: where real data was missing, editable placeholders
   were used instead.
   ========================================================================== */

export const owner = {
  name: "Rowdro Mrong",
  firstName: "Rowdro",
  lastName: "Mrong",
  initials: "RM",

  roles: ["Web Developer", "Shopify Developer", "Digital Experience Creator"],

  // Short professional introduction (hero)
  intro:
    "I design and build fast, conversion-focused storefronts and web experiences — from customizable Shopify themes to full web apps and Chrome extensions — blending clean engineering with motion-rich design.",

  // Availability badge in the hero
  availability: {
    // Flip this to false when you're fully booked
    open: true,
    label: "Available for new projects",
    note: "Working worldwide from Bangladesh",
  },

  // Real email — provided by Rowdro
  email: "rowdroofficial@gmail.com",
  // ✏️ EDIT ME → https://wa.me/<your-number-with-country-code> (digits only)
  whatsapp: "https://wa.me/000000000000",
  whatsappDisplay: "[+880 XXXX XXXXXX]",
  location: "Bangladesh",
  timezone: "GMT+6",

  // Real profiles — verified links
  socials: [
    { label: "GitHub", url: "https://github.com/rowdro" },
    { label: "LinkedIn", url: "https://bd.linkedin.com/in/rowdro-mrong-99b710370" },
    { label: "Upwork", url: "https://www.upwork.com/freelancers/~017de18485f4f98c92" },
    { label: "Facebook", url: "https://www.facebook.com/share/1HcrVBxTMs/" },
  ],
};

export const hero = {
  headlineLines: ["Building Digital", "Experiences That Move", "Businesses Forward."],
  orbitWords: ["Design", "Develop", "Launch", "Optimize"],
  scrollHint: "Scroll to explore",
};

export const about = {
  heading: "About Me",
  // Editorial lead paragraph — large type
  lead: "I'm Rowdro — a web developer and Shopify specialist from Bangladesh who treats every storefront like a flagship product: engineered for speed, designed for feeling, and built to turn visitors into customers.",
  paragraphs: [
    "My work sits at the intersection of commerce and craft. I specialize in Shopify and eCommerce development — from customizable Liquid themes to full storefront builds — and I care equally about a perfectly-typed heading and a perfectly-structured schema. The same mindset carries into my own shipped products: Eventora, Taskly, Stashly and MRONG·CAR, all live in production — alongside a suite of Chrome extensions (WebLens, PriceSnap, TimeTrace) that I design, build and maintain.",
    "Alongside client work I support digital operations and project coordination at Devpixels, a software company building digital solutions for businesses around the globe — so I know both sides of the table: shipping the product and keeping the process smooth.",
    "Beyond that, I'm perpetually exploring creative development — WebGL, interaction design, and the small details that make digital products feel alive.",
  ],
  principles: [
    { title: "Business first", text: "Every pixel serves a commercial purpose — clarity converts." },
    { title: "Motion with meaning", text: "Animation guides attention; it never decorates for its own sake." },
    { title: "Performance is design", text: "A beautiful site that loads slowly is neither." },
    { title: "Own the details", text: "From meta tags to easing curves, nothing ships by accident." },
  ],
  image: "/images/rowdro-portrait.jpg",
  imageAlt: "Portrait of Rowdro Mrong at a Himalayan mountain viewpoint — snow-capped peaks and a green valley behind him",
};

export const services = [
  {
    icon: "store",
    title: "Shopify Store Development",
    description:
      "End-to-end Shopify store builds — from architecture and custom themes to apps and launch. Designed to sell, engineered to scale.",
    tags: ["Custom Themes", "OS 2.0", "App Integration", "Launch"],
  },
  {
    icon: "palette",
    title: "Shopify Theme Customization",
    description:
      "Tailored sections, templates and design refinements that make your store unmistakably yours — without breaking upgrade paths.",
    tags: ["Liquid", "Sections & Blocks", "Design Systems"],
  },
  {
    icon: "globe",
    title: "WordPress & WooCommerce Development",
    description:
      "Custom WordPress sites and WooCommerce stores with clean architecture, editorial flexibility and a CMS your team will actually enjoy.",
    tags: ["Custom Themes", "WooCommerce", "Performance"],
  },
  {
    icon: "cart",
    title: "eCommerce Website Development",
    description:
      "Conversion-focused online stores on the platform that fits you best — product architecture, checkout flow and everything between.",
    tags: ["CRO", "Product UX", "Payments", "Analytics"],
  },
  {
    icon: "pen",
    title: "UI/UX Design",
    description:
      "Interfaces designed in Figma and Google Stitch with intent — wireframes to polished design systems that developers (including me) love to build.",
    tags: ["Figma", "Google Stitch", "Wireframing", "Design Systems", "Prototyping"],
  },
  {
    icon: "gauge",
    title: "Website Optimization",
    description:
      "Speed, SEO and Core Web Vitals audits that turn sluggish sites into fast, findable, friction-free experiences.",
    tags: ["Core Web Vitals", "SEO", "Speed Audits"],
  },
  {
    icon: "wrench",
    title: "Website Maintenance",
    description:
      "Ongoing care plans — updates, backups, monitoring and improvements, so your store keeps performing long after launch.",
    tags: ["Care Plans", "Monitoring", "Updates", "Support"],
  },
];

export type Project = {
  name: string;
  platform: string;
  category: string;
  year: string; // ✏️ EDIT ME — add the real year when known (leave "" to hide)
  description: string;
  tech: string[];
  image: string;
  accent: string;
  // Set your real live URL. While null, the "Live Preview" button shows a
  // friendly reminder instead of a broken link.
  liveUrl: string | null;
};

/* ── REAL, LIVE PROJECTS — screenshots captured from the production sites ── */
export const projects: Project[] = [
  {
    name: "Eventora OS",
    platform: "Web Platform",
    category: "Event Management SaaS",
    year: "",
    description:
      "A complete operating system for high-stakes events — dynamic QR ticketing that rotates every 15 seconds, real-time gate telemetry, live signal dashboards and fraud-blocking security for summits, festivals and arena broadcasts.",
    tech: ["Event OS", "Dynamic QR & NFC", "Real-time Telemetry", "Gate Security"],
    image: "/images/projects/eventora.jpg",
    accent: "#cdfb4e",
    liveUrl: "https://eventora-011.vercel.app/",
  },
  {
    name: "Taskly",
    platform: "PWA",
    category: "Productivity App",
    year: "",
    description:
      "A privacy-first task manager built as an installable PWA — priorities, categories, reminders, swipe gestures, four themes and a 30-day archive. Everything is stored locally on the device, so the data never leaves the browser.",
    tech: ["HTML5", "CSS3", "JavaScript ES6+", "PWA", "localStorage"],
    image: "/images/projects/taskly.jpg",
    accent: "#37e2a2",
    liveUrl: "https://rowdro.github.io/TASKLY-APP/",
  },
  {
    name: "Stashly",
    platform: "SaaS · Web App",
    category: "Cloud Storage",
    year: "",
    description:
      "A secure cloud storage service — drag-and-drop multi-file uploads with progress tracking, instant search, infinite nested folders and a real-time storage meter, secured with Google Sign-In and Supabase row-level security.",
    tech: ["Supabase", "Google OAuth 2.0", "RLS Security", "Virtual File System"],
    image: "/images/projects/stashly.jpg",
    accent: "#ffd166",
    liveUrl: "https://stashly-amber.vercel.app/",
  },
  {
    name: "MRONG·CAR",
    platform: "Marketplace",
    category: "Automotive · Bangladesh",
    year: "",
    description:
      "A trusted fleet marketplace connecting car owners with NID-verified drivers, physically-inspected workshops and OEM-certified auto parts — complete with transparent pricing, bookings, reviews and a driver job board.",
    tech: ["Marketplace", "Verified Listings", "Bookings & Reviews", "Job Board"],
    image: "/images/projects/mrong-car.jpg",
    accent: "#ff8c5a",
    liveUrl: "https://mrong-car-service.vercel.app/",
  },
  {
    name: "Custom Shopify Themes",
    platform: "Shopify · Liquid",
    category: "eCommerce Theming",
    year: "",
    description:
      "Customizable Shopify themes built on modular, maintainable Liquid — structured around Shopify's best practices so merchants can reshape every section of their storefront without breaking upgrade paths.",
    tech: ["Liquid", "Modular Sections", "OS 2.0", "Theme Architecture"],
    image: "/images/projects/shopify-theme.jpg",
    accent: "#95bf47",
    liveUrl: "https://github.com/rowdro/skeleton-theme",
  },
  {
    name: "WebLens",
    platform: "Chrome Extension",
    category: "Developer Tool · MV3",
    year: "",
    description:
      "A component inspector that reads any element's real computed-style DNA — colors, fonts, spacing, shadows — on any website, then regenerates it as clean HTML/CSS, React or Tailwind. A design-system scanner with WCAG contrast checks, page rebuild, component library, A/B compare, performance X-ray, animation inspector, bring-your-own-key AI assistant and Figma export stack on top — around 3,400 lines of dependency-free vanilla JS, all processed locally.",
    tech: ["Manifest V3", "Side Panel API", "Content Scripts", "Code Generators", "Zero Dependencies"],
    image: "/images/projects/weblens.jpg",
    accent: "#7c5cff",
    // ✏️ EDIT ME — add the Chrome Web Store URL when published
    liveUrl: null,
  },
  {
    name: "PriceSnap",
    platform: "Chrome Extension",
    category: "E-commerce Utility · MV3",
    year: "",
    description:
      "A price-comparison companion that detects the product you're viewing on Amazon, Flipkart, Myntra or Snapdeal and pulls competitor prices side-by-side — with a 30-day price-history chart, best-deal highlighting and a target-price watchlist that fires deal alerts through Chrome notifications.",
    tech: ["Manifest V3", "Content Scripts", "chrome.alarms", "Notifications API", "Canvas Charts"],
    image: "/images/projects/pricesnap.jpg",
    accent: "#e84393",
    // ✏️ EDIT ME — add the Chrome Web Store URL when published
    liveUrl: null,
  },
  {
    name: "TimeTrace",
    platform: "Chrome Extension",
    category: "Productivity · MV3",
    year: "",
    description:
      "A privacy-first tab time tracker — a service worker watches the active tab and per-minute alarms keep every session counted, while a dark mono UI shows your live session plus today and all-time site leaderboards. Zero setup, zero servers: nothing ever leaves chrome.storage on your device.",
    tech: ["Manifest V3", "Service Worker", "chrome.tabs", "chrome.alarms", "Local-Only Storage"],
    image: "/images/projects/timetrace.jpg",
    accent: "#7c6aff",
    // ✏️ EDIT ME — add the Chrome Web Store URL when published
    liveUrl: null,
  },
];

export const skills = {
  core: {
    label: "Core",
    items: ["HTML", "CSS", "JavaScript", "Python", "MySQL", "Chrome Extensions (MV3)", "Responsive Web Development"],
  },
  platforms: {
    label: "Platforms & Commerce",
    items: ["Shopify", "Liquid", "WordPress", "WooCommerce", "PHP"],
  },
  craft: {
    label: "Creative & Workflow",
    items: ["Three.js", "Git", "Figma", "Google Stitch"],
  },
};

export const experience = {
  heading: "Experience & Achievements",
  // Real roles below — dates use [20XX] placeholders because they were not
  // provided. ✏️ EDIT ME: fill in the real years.
  timeline: [
    {
      period: "Present",
      title: "Junior Executive, Digital Operations",
      org: "Devpixels Ltd.",
      text: "Supporting digital operations and ensuring smooth project coordination across teams at a software development company building digital solutions for businesses around the globe.",
    },
    {
      period: "Present",
      title: "Freelance Shopify Developer",
      org: "Self-employed · Upwork",
      text: "Shopify store setup, product listing management and customizable theme work for independent merchants — with completed projects delivered through Upwork.",
    },
    {
      // ✏️ EDIT ME — add your real years to `period` when known
      // (an empty period is simply hidden on the site).
      period: "",
      title: "Southeast University",
      org: "BSc in CSE",
      text: "Bachelor of Science in Computer Science & Engineering — where the engineering foundations began: problem-solving, fundamentals and the discipline that now shows up in every shipped build.",
    },
    {
      period: "Now",
      title: "Your project could be next",
      org: "Open for freelance & collaborations",
      text: "Available for Shopify stores, customizable themes, WooCommerce builds and web experiences that move businesses forward.",
    },
  ],
  achievements: [
    { title: "5 live projects in production", org: "Eventora · Taskly · Stashly · MRONG·CAR · Shopify themes", year: "Live" },
    { title: "3 Chrome extensions built on Manifest V3", org: "WebLens · PriceSnap · TimeTrace", year: "Shipped" },
    { title: "Freelance work delivered on Upwork", org: "Shopify product listings & store management", year: "Delivered" },
    { title: "Public Shopify theme maintained", org: "Liquid skeleton theme — github.com/rowdro", year: "Open Source" },
  ],
};

export const process = [
  {
    step: "01",
    title: "Discover",
    text: "Deep-dive into your business, audience and goals. I ask the uncomfortable questions early — they save expensive answers later.",
  },
  {
    step: "02",
    title: "Plan",
    text: "Architecture, scope and milestones mapped out. The right platform, a realistic timeline and no surprises halfway.",
  },
  {
    step: "03",
    title: "Design",
    text: "Wireframes to polished UI in Figma — design systems, motion prototypes and feedback loops that keep you in control.",
  },
  {
    step: "04",
    title: "Develop",
    text: "Clean, performant code with regular previews. You watch the site grow in the open, on staging you can click through.",
  },
  {
    step: "05",
    title: "Launch",
    text: "QA across devices, SEO fundamentals, analytics wired up — then a smooth, monitored go-live with zero drama.",
  },
  {
    step: "06",
    title: "Optimize",
    text: "Post-launch we measure, refine and improve — speed, conversion and content evolve with your business.",
  },
];

export const testimonials = {
  heading: "Kind Words",
  // ⚠️ Never fabricate real testimonials. While `items` is empty the site
  // shows one honest "references on request" card instead of fake quotes.
  // ✏️ EDIT ME — append real client feedback as { quote, name, role } when
  // you have it; each entry becomes its own card automatically.
  items: [] as { quote: string; name: string; role: string }[],
};

export const contact = {
  heading: "Let's Build Something",
  subheading:
    "Have a project in mind — or just want to say hello? My inbox is always open and I reply within 24 hours.",
  // Shown under the form once a real email is configured in `owner.email`.
  formNote:
    "This form opens your email client with the message pre-filled — or write to me directly at the address on the left.",
};

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const marqueeItems = [
  "Shopify Development",
  "eCommerce",
  "Chrome Extensions",
  "UI/UX Design",
  "WordPress",
  "WooCommerce",
  "Liquid",
  "Three.js",
  "Conversion-Focused",
  "Responsive Design",
];

export const seo = {
  title: "Rowdro Mrong — Web Developer & Shopify Developer",
  description:
    "Portfolio of Rowdro Mrong — Web Developer, Shopify Developer and Digital Experience Creator based in Bangladesh. Building digital experiences that move businesses forward.",
  keywords: [
    "Rowdro Mrong",
    "web developer",
    "shopify developer",
    "ecommerce developer",
    "wordpress developer",
    "chrome extension developer",
    "ui/ux design",
    "portfolio",
    "bangladesh",
  ],
};
