/**
 * Technical Capabilities & Architecture Domain Matrix
 */

export const skillCategories = [
  {
    category: "Languages & Core",
    description: "Core programming languages for application and systems programming",
    items: [
      { name: "JavaScript / TypeScript", proficiency: "Advanced", experienceYears: "4+ yrs", context: "Full-stack apps, async architectures, type contracts" },
      { name: "Python", proficiency: "Proficient", experienceYears: "3+ yrs", context: "Scripting, data processing, backend microservices" },
      { name: "Dart", proficiency: "Proficient", experienceYears: "2+ yrs", context: "Cross-platform mobile apps with Flutter" },
      { name: "C++ / Java", proficiency: "Intermediate", experienceYears: "2+ yrs", context: "Systems foundations, OOP patterns, DSA" },
      { name: "SQL", proficiency: "Advanced", experienceYears: "3+ yrs", context: "Relational queries, indexing, CTEs, optimization" },
    ],
  },
  {
    category: "Frontend Architecture",
    description: "Component systems, performance optimization, and modern UI engineering",
    items: [
      { name: "React / Next.js", proficiency: "Advanced", experienceYears: "4+ yrs", context: "SSR/SSG, state machines, custom hooks, atomic design" },
      { name: "Tailwind CSS", proficiency: "Advanced", experienceYears: "4+ yrs", context: "Design token architecture, responsive design systems" },
      { name: "State Management", proficiency: "Advanced", experienceYears: "3+ yrs", context: "Zustand, Redux Toolkit, React Context API" },
      { name: "Browser Performance", proficiency: "Proficient", experienceYears: "3+ yrs", context: "Core Web Vitals, code-splitting, bundle analysis, zero CLS" },
      { name: "Framer Motion", proficiency: "Proficient", experienceYears: "2+ yrs", context: "Physics-based micro-interactions, layout transitions" },
    ],
  },
  {
    category: "Backend & Distributed Systems",
    description: "Server architecture, data storage, and API design",
    items: [
      { name: "Node.js / Express", proficiency: "Advanced", experienceYears: "4+ yrs", context: "RESTful services, JWT auth, middleware pipelines" },
      { name: "PostgreSQL", proficiency: "Advanced", experienceYears: "3+ yrs", context: "Prisma ORM, PostGIS, transactional integrity, index tuning" },
      { name: "MongoDB", proficiency: "Advanced", experienceYears: "3+ yrs", context: "Aggregation pipelines, Mongoose schemas, compound indexes" },
      { name: "Redis", proficiency: "Proficient", experienceYears: "2+ yrs", context: "In-memory caching, rate-limiting, pub/sub messaging" },
      { name: "WebSockets", proficiency: "Proficient", experienceYears: "2+ yrs", context: "Real-time bidirectional event streaming" },
    ],
  },
  {
    category: "DevOps & Tooling",
    description: "Infrastructure, build systems, and development workflow",
    items: [
      { name: "Git & Version Control", proficiency: "Advanced", experienceYears: "4+ yrs", context: "Trunk-based development, rebase workflows, submodules" },
      { name: "Docker", proficiency: "Proficient", experienceYears: "2+ yrs", context: "Multi-stage container builds, local dev environments" },
      { name: "Vite & Build Tooling", proficiency: "Advanced", experienceYears: "3+ yrs", context: "Rollup plugins, bundle optimization, HMR configuration" },
      { name: "Cloud & Edge Deployment", proficiency: "Proficient", experienceYears: "3+ yrs", context: "Vercel, AWS (EC2/S3), Cloudflare DNS/CDN, cPanel" },
      { name: "Linux / Shell", proficiency: "Proficient", experienceYears: "3+ yrs", context: "Bash scripting, systemd service management, SSH" },
    ],
  },
];
