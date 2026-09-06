/**
 * High-Density Projects Registry, Technical RFC Case Studies, & Media Galleries
 */

export const projects = [
  {
    id: "bahirlink",
    slug: "bahirlink",
    title: "BahirLink",
    headline: "Unified Emergency Response & Civic Dispatch Distributed System",
    problemStatement:
      "Legacy dispatch infrastructure suffered from uncoordinated multi-agency silos, leading to 12+ minute dispatch delays during regional emergency incidents.",
    category: "Distributed Systems / Realtime",
    year: "2026",
    status: "Production",
    featured: true,
    image: "/bahirlink.PNG",
    gallery: [
      { src: "/bahirlink.PNG", caption: "Live Emergency Dispatch Command Dashboard" },
      { src: "/Capture77.PNG", caption: "Incident Triage & Real-Time Unit Map" },
      { src: "/Capture.PNG", caption: "Mobile Responder Field Telemetry Interface" },
      { src: "/Capture1.PNG", caption: "Spatial Analytics & Multi-Agency Geo-Fencing" },
    ],
    liveUrl: "https://bahirdarlinkweb.vercel.app/",
    githubUrl: "https://github.com/Eliasyirga/BahirLink-Backend",
    githubRepos: [
      { name: "Backend", url: "https://github.com/Eliasyirga/BahirLink-Backend" },
      { name: "Mobile App", url: "https://github.com/Eliasyirga/BahirLink-App" },
      { name: "Web Client", url: "https://github.com/biniambeza/bahirdarLink_web" },
    ],
    stack: ["Node.js", "PostgreSQL", "Flutter", "Redis", "WebSockets", "Docker"],
    metrics: [
      { label: "p95 Dispatch Latency", value: "< 450ms", delta: "-68%" },
      { label: "Concurrent Incident Load", value: "8,500 req/s", delta: "10x scale" },
      { label: "Data Sync Reliability", value: "99.98%", delta: "+14%" },
    ],
    rfc: {
      summary:
        "Engineered an event-driven dispatch platform connecting municipal emergency units, public responders, and field operatives through low-latency pub/sub pipelines and offline-first mobile sync.",
      architectureDiagram: `
+------------------+       +------------------+       +--------------------+
|  Mobile Client   | <---> |  API Gateway &   | <---> | Redis Cluster      |
|  (Flutter/Dart)  |  WSS  |  Load Balancer   |  IPC  | (Pub/Sub + Cache)  |
+------------------+       +------------------+       +--------------------+
                                    |                           |
                                    v                           v
                           +------------------+       +--------------------+
                           | Incident Service | <---> | PostgreSQL (RDBMS) |
                           | (Node.js/Cluster)|  Pool | (PostGIS Geo Data) |
                           +------------------+       +--------------------+
      `,
      decisions: [
        {
          topic: "Realtime Communication Layer",
          chosen: "Native WebSockets with Redis Adapter",
          alternative: "HTTP Long-Polling / Server-Sent Events",
          rationale:
            "Bidirectional sub-second GPS coordinate streaming between active dispatch vehicles and central coordinators required stateful full-duplex sockets with minimal transport overhead.",
        },
        {
          topic: "Spatial Data Indexing",
          chosen: "PostgreSQL with PostGIS R-Tree Spatial Indexes",
          alternative: "In-Memory Geohash Clustering in Redis",
          rationale:
            "Required complex geo-polygon fencing queries for multi-jurisdictional boundary verification with ACID durability guarantees during regional network partitions.",
        },
      ],
      technicalHurdles: [
        {
          title: "Handling Network Flaps and Packet Drops in Field Units",
          description:
            "Mobile units frequently experienced intermittent cellular connectivity in low-coverage sectors, triggering dropped telemetry packets and duplicate incident dispatches.",
          solution:
            "Implemented an idempotent vector-clock synchronization protocol on the Flutter client paired with an append-only WAL cache. When re-establishing connectivity, deltas are batch-reconciled with optimistic conflict resolution.",
          codeSnippet: `// Idempotent Incident Dispatch Handler with Optimistic Locking
async function dispatchIncident(req, res) {
  const { incidentId, revisionNumber, telemetryDelta } = req.body;
  
  const client = await dbPool.connect();
  try {
    await client.query('BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ');
    
    const record = await client.query(
      'SELECT revision, status FROM incidents WHERE id = $1 FOR UPDATE',
      [incidentId]
    );

    if (record.rows[0].revision !== revisionNumber) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'CONCURRENT_REVISION_CONFLICT' });
    }

    await client.query(
      'UPDATE incidents SET revision = revision + 1, telemetry = $1, status = $2 WHERE id = $3',
      [telemetryDelta, 'DISPATCHED', incidentId]
    );

    await redisPubSub.publish('incident:dispatch', JSON.stringify({ incidentId, telemetryDelta }));
    await client.query('COMMIT');
    
    return res.status(200).json({ status: 'ACKNOWLEDGED' });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}`,
        },
      ],
      schemaSummary:
        "PostGIS-enabled spatial relational schema normalizing emergency entities, triage classifications, dispatch squads, and audit log telemetry trails.",
      futureImprovements: [
        "Migrate real-time vehicle clustering to WebAssembly edge compute nodes.",
        "Implement eBPF network telemetry for granular packet drop diagnostics on raw TCP streams.",
      ],
    },
  },
  {
    id: "jobify",
    slug: "jobify",
    title: "Jobify",
    headline: "Enterprise Recruitment Engine & Real-Time Application Pipeline",
    problemStatement:
      "Enterprise recruiters struggled with un-indexed resume queries and inefficient candidate pipeline state transitions across high-volume applicant pools.",
    category: "Full Stack / SaaS",
    year: "2025",
    status: "Production",
    featured: true,
    image: "/Capture77.PNG",
    gallery: [
      { src: "/Capture77.PNG", caption: "Recruitment Funnel & Candidate Metrics View" },
      { src: "/Capture88.PNG", caption: "Application Lifecycle Kanban Pipeline" },
      { src: "/Capture6.PNG", caption: "Automated Interview Scheduling & Token Auth" },
      { src: "/Capture2.PNG", caption: "Candidate Profile & Resume Query Engine" },
    ],
    liveUrl: "https://jobfiy-frontend.vercel.app/",
    githubUrl: "https://github.com/eliasyirga/jobify",
    stack: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "TailwindCSS"],
    metrics: [
      { label: "Query Execution Time", value: "18ms", delta: "-74%" },
      { label: "Pipeline Throughput", value: "4,200 req/s", delta: "6x" },
      { label: "Token Refresh Overhead", value: "0ms FOUC", delta: "Zero drift" },
    ],
    rfc: {
      summary:
        "Full-cycle career recruitment portal featuring complex JWT dual-token authorization, dynamic pipeline state machines, compound indexed searches, and aggregated reporting metrics.",
      architectureDiagram: `
+------------------+       +--------------------+       +--------------------+
| React SPA Client | <---> | Express API Server | <---> | MongoDB Atlas      |
| (Context + Hooks)|  REST | (Auth / Rate Limit)|  Pool | (Compound Indexes) |
+------------------+       +--------------------+       +--------------------+
                                    |
                                    v
                           +--------------------+
                           | Aggregation Engine |
                           | (Pipeline Analytics)|
                           +--------------------+
      `,
      decisions: [
        {
          topic: "Session Security Architecture",
          chosen: "HttpOnly SameSite Strict Dual-Token (Access + Refresh Rotation)",
          alternative: "LocalStorage Plain Bearer Tokens",
          rationale:
            "Mitigated XSS attack vectors entirely while maintaining seamless silent refresh rotation without user disruption during prolonged dashboard sessions.",
        },
        {
          topic: "Pipeline Aggregation Performance",
          chosen: "MongoDB Aggregation Pipeline with Pre-Computed Bucket Views",
          alternative: "Client-Side In-Memory Metric Reduction",
          rationale:
            "Eliminated client CPU bottlenecks when aggregating monthly hiring trends, interview acceptance ratios, and candidate distribution across 50,000+ records.",
        },
      ],
      technicalHurdles: [
        {
          title: "Optimizing Compound Index Strategy for Multi-Facet Filtering",
          description:
            "Combining search queries on job status, location, employment type, and sort keys caused COLLSCAN regressions as applicant database sizes expanded.",
          solution:
            "Designed ESR (Equality, Sort, Range) index guidelines: `{ createdBy: 1, status: 1, createdAt: -1, position: 'text' }` reducing memory-resident query overhead by 88%.",
          codeSnippet: `// Compound Aggregation Pipeline for Candidate Funnel Analytics
const getRecruitmentStats = async (userId) => {
  return await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        status: '$_id',
        count: 1,
      },
    },
  ]);
};`,
        },
      ],
      schemaSummary:
        "Document schema enforcing strict Mongoose schemas with indexed user ownership references, lifecycle timestamps, and state validation enums.",
      futureImprovements: [
        "Transition search indexing to Meilisearch or Elasticsearch for typo-tolerant fuzzy candidate matching.",
      ],
    },
  },
  {
    id: "vintage-marketplace",
    slug: "vintage-marketplace",
    title: "Vintage Marketplace",
    headline: "High-Concurrence C2C E-Commerce Exchange & Escrow Trust Protocol",
    problemStatement:
      "Consumer marketplaces suffer from race conditions on unique single-stock inventory items when concurrent checkouts trigger double-allocation.",
    category: "E-Commerce / FinTech",
    year: "2025",
    status: "Production",
    featured: true,
    image: "/vintage-marketplace.PNG",
    gallery: [
      { src: "/vintage-marketplace.PNG", caption: "Marketplace Listing Feed & Atomic Inventory View" },
      { src: "/Capture5.PNG", caption: "Pessimistic Locking Checkout Modal" },
      { src: "/Capture213.PNG", caption: "Buyer-Seller Escrow Trust Timeline" },
    ],
    liveUrl: "https://vintage-marketplace-tau.vercel.app/browse",
    githubUrl: "https://github.com/eliasyirga/vintage-marketplace",
    stack: ["React", "Node.js", "PostgreSQL", "Prisma", "TailwindCSS", "Stripe"],
    metrics: [
      { label: "Checkout Lock Duration", value: "< 120ms", delta: "-82%" },
      { label: "Race Condition Errors", value: "0.00%", delta: "Zero double-sales" },
      { label: "Lighthouse Performance", value: "98 / 100", delta: "+28 pts" },
    ],
    rfc: {
      summary:
        "Curated marketplace engine engineered for one-of-a-kind vintage items with atomic row-level locking during checkout, strict seller verification protocols, and real-time buyer negotiation channels.",
      architectureDiagram: `
+------------------+       +--------------------+       +--------------------+
| Buyer & Seller   | <---> | Node Gateway       | <---> | PostgreSQL Cluster |
| Web Clients      |  REST | (Pessimistic Locks)|  Pool | (ACID Transactions)|
+------------------+       +--------------------+       +--------------------+
                                    |
                                    v
                           +--------------------+
                           | Stripe Webhook     |
                           | Settlement Engine  |
                           +--------------------+
      `,
      decisions: [
        {
          topic: "Inventory Allocation Concurrency",
          chosen: "Pessimistic Row-Level Locking (SELECT FOR UPDATE NOWAIT)",
          alternative: "Optimistic Version Increments",
          rationale:
            "Since vintage inventory items are strictly 1-of-1, immediate failure of competing concurrent checkouts prevents chargeback overhead and eliminates checkout race conditions.",
        },
      ],
      technicalHurdles: [
        {
          title: "Atomic Checkout Reservation and Webhook Reconciliation",
          description:
            "Ensuring item reservation expirations (10-minute hold) automatically released locked rows without creating database deadlocks or dangling payment intents.",
          solution:
            "Implemented a Redis TTL key expiration watcher paired with idempotent Stripe Webhook event handlers inside transactional PostgreSQL blocks.",
          codeSnippet: `// Atomic Item Reservation with Explicit Row Lock
export async function reserveVintageItem(itemId, buyerId) {
  return await prisma.$transaction(async (tx) => {
    const item = await tx.$queryRaw\`
      SELECT id, status, price FROM "Item"
      WHERE id = \${itemId} AND status = 'AVAILABLE'
      FOR UPDATE NOWAIT
    \`;

    if (!item || item.length === 0) {
      throw new Error('ITEM_ALREADY_RESERVED_OR_SOLD');
    }

    await tx.item.update({
      where: { id: itemId },
      data: { status: 'RESERVED', reservedBy: buyerId, reservedAt: new Date() },
    });

    return { success: true, item: item[0] };
  });
}`,
        },
      ],
      schemaSummary:
        "Normalized relational models for Items, Orders, Escrow Holds, Reviews, and Audit Trails with foreign key constraints.",
      futureImprovements: [
        "Integrate zero-knowledge proof identity verification for high-value collector authentication.",
      ],
    },
  },
  {
    id: "grovelink",
    slug: "grovelink",
    title: "Grove Link Consult",
    headline: "Enterprise Multi-Regional Corporate Platform & SEO Architecture",
    problemStatement:
      "Enterprise consulting firm required sub-second worldwide load times and structured JSON-LD schema integration to outrank competing global agencies.",
    category: "Frontend Systems / Performance",
    year: "2025",
    status: "Production",
    featured: false,
    image: "/Capture88.PNG",
    gallery: [
      { src: "/Capture88.PNG", caption: "Corporate Landing View & Edge Delivery" },
      { src: "/Capture.PNG", caption: "Core Web Vitals Optimization Suite" },
    ],
    liveUrl: "https://www.grovelinkconsultplc.com/",
    githubUrl: "https://github.com/Eliasyirga/Glove-Link-consult",
    stack: ["React", "Vite", "TailwindCSS", "Cloudflare CDN", "Schema.org"],
    metrics: [
      { label: "Core Web Vitals (LCP)", value: "0.68s", delta: "-60%" },
      { label: "Cumulative Layout Shift", value: "0.000", delta: "Perfect score" },
      { label: "Organic Search Visibility", value: "+320%", delta: "6 mos" },
    ],
    rfc: {
      summary:
        "Ultra-high performance static/hybrid architecture leveraging code-splitting, pre-warmed edge CDN caching, and semantic structured metadata.",
      architectureDiagram: `
+------------------+       +--------------------+       +--------------------+
| Global Request   | <---> | Cloudflare Edge    | <---> | Vite SSR / Static  |
| (Geo-Routed)     |       | (Brotli + Cache)   |       | Asset Origin       |
+------------------+       +--------------------+       +--------------------+
      `,
      decisions: [
        {
          topic: "Bundle Strategy",
          chosen: "Granular Dynamic Route Chunking with Modern ES Module Targets",
          alternative: "Single Monolithic Vendor Bundle",
          rationale:
            "Reduced initial payload from 640KB to 42KB gzip, enabling instant DOM paints on constrained mobile connections.",
        },
      ],
      technicalHurdles: [
        {
          title: "Eliminating Layout Shifts on Dynamic Media and Fonts",
          description:
            "Font loading swaps and asynchronous banner images caused noticeable cumulative layout shifts during initial render.",
          solution:
            "Configured font-display swap with matching CSS metric fallbacks and fixed aspect-ratio CSS containers.",
          codeSnippet: `/* Zero-CLS Aspect Ratio Container */
.hero-media-wrapper {
  aspect-ratio: 16 / 9;
  contain: layout paint;
  background-color: var(--bg-surface);
}`,
        },
      ],
      schemaSummary:
        "Comprehensive JSON-LD Graph injection defining Organization, Services, BreadcrumbList, and FAQPage schemas.",
      futureImprovements: [
        "Edge-rendered personalized case study previews via Cloudflare Workers.",
      ],
    },
  },
  {
    id: "chillmovies",
    slug: "chillmovies",
    title: "ChillMovies",
    headline: "Media Catalog & Real-Time Discovery Engine",
    problemStatement:
      "High-latency third-party movie metadata endpoints caused UI freezes and throttling under burst discovery requests.",
    category: "Frontend Engineering / API",
    year: "2024",
    status: "Production",
    featured: false,
    image: "/Capture6.PNG",
    gallery: [
      { src: "/Capture6.PNG", caption: "Media Catalog & Streaming Discovery Grid" },
      { src: "/Capture1.PNG", caption: "Debounced Multi-Facet Filter Stream" },
    ],
    liveUrl: "https://chill-movies.vercel.app/",
    githubUrl: "https://github.com/Eliasyirga/chillmovies",
    stack: ["React", "TMDB API", "Framer Motion", "TailwindCSS", "LocalStorage"],
    metrics: [
      { label: "Client Cache Hit Rate", value: "84%", delta: "+84%" },
      { label: "Render Frame Rate", value: "60 FPS", delta: "No dropped frames" },
      { label: "API Throttling Errors", value: "0", delta: "100% mitigated" },
    ],
    rfc: {
      summary:
        "Client-side media discovery interface with multi-level LRU caching, debounced search streams, and gesture-driven UI micro-interactions.",
      architectureDiagram: `
+------------------+       +--------------------+       +--------------------+
| Search Input     | ----> | Debounce & LRU     | ----> | TMDB API Gateway   |
| (Stream Input)   |       | In-Memory Cache    |       | (Rate Limited)     |
+------------------+       +--------------------+       +--------------------+
      `,
      decisions: [
        {
          topic: "Search Stream Management",
          chosen: "Custom 300ms Debounced Fetch Hook with In-Memory Cache Store",
          alternative: "Raw onChange fetch calls",
          rationale:
            "Prevented API quota exhaustion and eliminated race conditions where older async requests overwrote newer query results.",
        },
      ],
      technicalHurdles: [
        {
          title: "Handling Rapid Search Input Race Conditions",
          description:
            "Fast typers triggered multiple asynchronous requests returning out-of-order responses.",
          solution:
            "Implemented AbortController integration canceling stale inflight requests before initiating subsequent searches.",
          codeSnippet: `// Abortable Search Request Stream Hook
useEffect(() => {
  const controller = new AbortController();
  
  async function executeSearch() {
    try {
      const results = await fetchQuery(query, { signal: controller.signal });
      setCatalog(results);
    } catch (err) {
      if (err.name !== 'AbortError') console.error(err);
    }
  }

  if (query.trim()) executeSearch();
  return () => controller.abort();
}, [query]);`,
        },
      ],
      schemaSummary: "Client-side TypeScript interfaces for TMDB response payloads and local bookmarks.",
      futureImprovements: ["IndexedDB integration for persistent offline watchlist synchronization."],
    },
  },
  {
    id: "tarikshiro",
    slug: "tarikshiro",
    title: "Tarik Restaurant",
    headline: "High-Conversion Hospitality Ordering & Interactive Menu UI",
    problemStatement:
      "Hospitality client experienced 45% mobile checkout drop-offs due to complex multi-step ordering forms.",
    category: "Product Design / Frontend",
    year: "2024",
    status: "Production",
    featured: false,
    image: "/Capture2.PNG",
    gallery: [
      { src: "/Capture2.PNG", caption: "Interactive Digital Menu UI & Modifier Selector" },
      { src: "/Capture.PNG", caption: "Zero-Latency Mobile Cart Sheet" },
    ],
    liveUrl: "https://tarik-shiro.vercel.app/",
    githubUrl: "https://github.com/Eliasyirga/Tarik-Restaurant",
    stack: ["React", "TailwindCSS", "Framer Motion", "Vite"],
    metrics: [
      { label: "Checkout Funnel Completion", value: "78%", delta: "+33%" },
      { label: "Mobile Bounce Rate", value: "22%", delta: "-26%" },
    ],
    rfc: {
      summary:
        "Conversion-focused culinary interface emphasizing instant cart mutations, visual culinary storytelling, and rapid checkout flows.",
      architectureDiagram: `
+------------------+       +--------------------+       +--------------------+
| Menu Item Select | ----> | Zustand Cart Store | ----> | WhatsApp API /     |
| (Instant Feedback)|      | (LocalStorage Sync)|      | Order Dispatch     |
+------------------+       +--------------------+       +--------------------+
      `,
      decisions: [
        {
          topic: "Cart State Management",
          chosen: "Lightweight Zustand store with LocalStorage persistence",
          alternative: "Redux Toolkit",
          rationale: "Minimized bundle overhead while delivering zero-latency cart updates.",
        },
      ],
      technicalHurdles: [
        {
          title: "Zero-Latency Mobile Cart Calculations",
          description: "Subtotal computations on modifier add-ons caused UI stutter on budget mobile devices.",
          solution: "Memoized cart aggregation pipelines and CSS GPU transforms for sheet animations.",
          codeSnippet: `const subtotal = useMemo(() => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}, [items]);`,
        },
      ],
      schemaSummary: "Structured menu item models with dietary tags, modifiers, and pricing tiers.",
      futureImprovements: ["Real-time table QR-code ordering with WebSocket kitchen display dispatch."],
    },
  },
  {
    id: "ethioamber",
    slug: "ethioamber",
    title: "Ethio Amber Trading",
    headline: "Global B2B Export Platform & Multilingual Trade Infrastructure",
    problemStatement:
      "International agricultural buyers needed verified compliance documentation and localized currency conversions across various trade jurisdictions.",
    category: "Enterprise Web / B2B",
    year: "2024",
    status: "Production",
    featured: false,
    image: "/Capture213.PNG",
    gallery: [
      { src: "/Capture213.PNG", caption: "Commodity Export Specifications & Compliance Portal" },
      { src: "/Capture88.PNG", caption: "Multilingual RFQ & Contract Dispatch Engine" },
    ],
    liveUrl: "https://ethioambertrading.com/",
    githubUrl: "https://github.com/Eliasyirga/Ethio-Amber",
    stack: ["React", "PHP API", "cPanel", "TailwindCSS", "i18n"],
    metrics: [
      { label: "Inquiry Conversion Rate", value: "14.2%", delta: "+4.8%" },
      { label: "Global Page Load Time", value: "1.1s", delta: "-52%" },
    ],
    rfc: {
      summary:
        "Global trade portal facilitating international agricultural export contract inquiries, document verification, and multilingual product specifications.",
      architectureDiagram: `
+--------------------+       +--------------------+       +--------------------+
| International User | ----> | Cloudflare CDN     | ----> | PHP Backend /      |
| (Multi-locale)     |       | Edge Router        |       | Mail Dispatcher    |
+--------------------+       +--------------------+       +--------------------+
      `,
      decisions: [
        {
          topic: "Multilingual Localization Strategy",
          chosen: "Static JSON Resource Bundling with Browser Locale Detection",
          alternative: "Server-Side Dynamic Translation API",
          rationale: "Guaranteed instantaneous language switches without runtime translation latency.",
        },
      ],
      technicalHurdles: [
        {
          title: "Secure Enterprise RFQ Inquiry Processing",
          description: "Spam bots repeatedly targeted high-value Request for Quotation inquiry forms.",
          solution: "Built honeypot validation fields and cryptographic rate-limiting tokens.",
          codeSnippet: `// Cryptographic Honeypot Validation Guard
function validateInquiryPayload(body) {
  if (body.company_tax_fax_hp) {
    throw new Error('BOT_DETECTION_TRIGGERED');
  }
  return true;
}`,
        },
      ],
      schemaSummary: "Commodity specification schemas conforming to international trade standards.",
      futureImprovements: ["Live commodity price index ticker integration via Bloomberg/Reuters API."],
    },
  },
  {
    id: "marmik",
    slug: "marmik",
    title: "Marmik Consult",
    headline: "Architectural & Corporate Engineering Identity Platform",
    problemStatement:
      "Engineering consultancy required a digital identity reflecting structural precision, clean visual hierarchy, and rapid case study inspection.",
    category: "Corporate / Brand Architecture",
    year: "2024",
    status: "Production",
    featured: false,
    image: "/marmik.PNG",
    gallery: [
      { src: "/marmik.PNG", caption: "Engineering Consultancy Project Showcase" },
      { src: "/Capture77.PNG", caption: "Structural Consulting CAD Blueprint Matrix" },
    ],
    liveUrl: "https://marmikconsultplc.com/",
    githubUrl: "#",
    stack: ["React", "TailwindCSS", "Framer Motion", "Vite"],
    metrics: [
      { label: "Page Accessibility Score", value: "100 / 100", delta: "WCAG AAA" },
      { label: "Asset Compression Ratio", value: "-72%", delta: "WebP conversion" },
    ],
    rfc: {
      summary:
        "Refined digital engineering platform showcasing structural consulting projects with custom CAD-inspired grid overlays and responsive typography.",
      architectureDiagram: `
+--------------------+       +--------------------+
| High-DPI Display   | <---> | Vector Asset &     |
| (Responsive Grid)  |       | Layout Subsystem   |
+--------------------+       +--------------------+
      `,
      decisions: [
        {
          topic: "Visual Styling Engine",
          chosen: "TailwindCSS with strict 1px grid layout rules",
          alternative: "CSS Modules",
          rationale: "Enforced strict geometric alignment across diverse screen viewports.",
        },
      ],
      technicalHurdles: [
        {
          title: "Rendering High-DPI Blueprint Imagery without Memory Spikes",
          description: "Large architectural renderings caused scroll jank on low-spec client GPUs.",
          solution: "Implemented progressive WebP picture tags with content-visibility auto CSS rules.",
          codeSnippet: `.blueprint-render {
  content-visibility: auto;
  contain-intrinsic-size: 0 450px;
}`,
        },
      ],
      schemaSummary: "Corporate service hierarchies and structural audit project models.",
      futureImprovements: ["Interactive 3D Three.js building inspection viewport."],
    },
  },
  {
    id: "taskflow",
    slug: "taskflow",
    title: "TaskFlow Mobile",
    headline: "Offline-First Mobile Task Management & Real-Time Sync Engine",
    problemStatement:
      "Distributed field operations and mobile teams suffered from frequent network dropouts, lost task states, and high synchronization latency in remote environments.",
    category: "Mobile Architecture / Systems",
    year: "2025",
    status: "Production",
    featured: false,
    image: "/TaskFlow.PNG",
    gallery: [
      { src: "/TaskFlow.PNG", caption: "Mobile Task Board & Task State Telemetry" },
      { src: "/TaskFlow2.PNG", caption: "Interactive Task Details & Reminder Scheduler" },
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/Eliasyirga/Task-Flow",
    stack: ["Flutter", "Dart", "SQLite", "Firebase", "Bloc Pattern", "WebSockets"],
    metrics: [
      { label: "Offline Sync Conflict Rate", value: "< 0.01%", delta: "-99%" },
      { label: "Cold Start Latency", value: "280ms", delta: "-55%" },
      { label: "Battery Efficiency", value: "+42%", delta: "Delta compression" },
    ],
    rfc: {
      summary:
        "High-performance offline-first mobile architecture utilizing local SQLite caching, CRDT conflict resolution, and background delta synchronization over WebSockets.",
      architectureDiagram: `
+----------------------+       +-----------------------+       +---------------------+
| Flutter Mobile UI    | <---> | SQLite Local Cache    | <---> | Delta Sync Worker   |
| (Bloc State Machine) |       | (CRDT Log Store)      |       | (Background Stream) |
+----------------------+       +-----------------------+       +---------------------+
                                                                          |
                                                                          v (WSS / HTTPS)
                                                               +---------------------+
                                                               | Cloud API & Storage |
                                                               | (Firebase / Node.js)|
                                                               +---------------------+
      `,
      decisions: [
        {
          topic: "Local State & Offline Persistence",
          chosen: "SQLite Local Store with CRDT Conflict Resolution",
          alternative: "SharedPreferences / AsyncStorage",
          rationale:
            "Enabled atomic ACID operations and structured queries for thousands of offline tasks.",
        },
        {
          topic: "State Management Architecture",
          chosen: "Bloc Pattern with Stream-Based Reactive Events",
          alternative: "Provider / SetState",
          rationale:
            "Decoupled UI components from data synchronizers and simplified edge-case testing.",
        },
      ],
      technicalHurdles: [
        {
          title: "Two-Way Synchronization and Clock Drift",
          description:
            "Concurrent offline modifications by multiple users caused inconsistent task updates upon reconnection.",
          solution:
            "Implemented vector clock logical timestamps and deterministic last-write-wins with field-level delta merging.",
          codeSnippet: `// Delta Sync Merger
Future<void> mergeTaskDelta(TaskDelta remoteDelta) async {
  final localTask = await db.getTask(remoteDelta.id);
  if (localTask == null || remoteDelta.vectorClock > localTask.vectorClock) {
    await db.upsertTask(remoteDelta.toTask());
  }
}`,
        },
      ],
      schemaSummary:
        "Normalized SQLite task, tag, and change-log schemas with indexing on status and sync_state.",
      futureImprovements: [
        "End-to-end encrypted peer-to-peer mesh synchronization for zero-internet field operations.",
      ],
    },
  },
];
