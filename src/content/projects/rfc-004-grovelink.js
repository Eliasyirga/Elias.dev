export const rfc004 = {
  rfcId: "RFC-004",
  slug: "grovelink",
  title: "GroveLink Multi-Regional Enterprise Infrastructure",
  headline: "Scalable B2B corporate communications platform with edge caching and multi-language i18n.",
  status: "STABLE",
  version: "v2.0.1",
  lead: "Elias Yirga (Frontend Systems Lead)",
  date: "2025-Q1",
  domain: "Enterprise SaaS & Edge Performance",
  summary:
    "An enterprise platform for global logistics, supporting automated localized routing, sub-second TTFB, and zero-downtime Blue/Green deployments.",
  problemStatement:
    "Corporate multi-regional branches suffered from 2.4s initial TTFB and layout reflows when loading assets across cross-continental networks.",
  businessImpact:
    "Reduced Time to First Byte (TTFB) to 180ms worldwide via Cloudflare edge routing and static HTML chunk streaming.",
  stack: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudflare", "Node.js"],
  metrics: [
    { label: "Global Edge TTFB", value: "180 ms", delta: "-92% latency", benchmarkTarget: "< 250 ms" },
    { label: "Lighthouse Performance", value: "98/100", delta: "Core Web Vitals", benchmarkTarget: "> 95" },
    { label: "Payload Bundle Size", value: "48.2 KB", delta: "tree-shaken", benchmarkTarget: "< 60 KB" },
  ],
  architectureDiagram: `
+------------------+         Anycast DNS           +----------------------------+
| Global Client    | ============================> | Cloudflare Edge Network    |
| (Multi-Region)   |                               | (Static Caching + Brotli)  |
+------------------+                               +----------------------------+
                                                                 |
                                                                 v
                                                   +----------------------------+
                                                   | Next.js SSR Cluster Engine |
                                                   | (Dynamic Regional Routing) |
                                                   +----------------------------+
`,
  tradeoffs: [
    {
      topic: "Rendering Strategy",
      chosen: "Incremental Static Regeneration (ISR) with Edge Stale-While-Revalidate",
      alternative: "Full Client-Side SPA Rendering",
      rationale:
        "Guaranteed instantaneous initial visual paint with SEO crawlers while keeping dynamic catalog updates fresh within 60-second invalidation windows.",
    },
  ],
  challenges: [
    {
      title: "Optimized Dynamic Internationalization (i18n) Bundle Splitting",
      description:
        "Loading monolithic translation dictionaries bloated the initial JavaScript bundle size by 140KB.",
      solution:
        "Implemented route-level dynamic translation chunking loaded asynchronously via React Suspense.",
      codeSnippet: `// Dynamic Route-Level Locale Chunk Loader
export async function loadLocaleDictionary(locale, namespace) {
  try {
    const dict = await import(\`@/locales/\${locale}/\${namespace}.json\`);
    return dict.default;
  } catch (error) {
    console.warn(\`Failed to load \${locale}/\${namespace}, falling back to 'en'\`);
    const fallback = await import(\`@/locales/en/\${namespace}.json\`);
    return fallback.default;
  }
}`,
      language: "javascript",
    },
  ],
  schemaSpecification:
    "Headless CMS JSON schema validating content hierarchies with TypeScript strict typing.",
  failureModes: [
    "Origin server downtime: Cloudflare Edge serves cached static stale pages with continuous background health-check retries.",
  ],
  futureRoadmap: ["Edge serverless worker execution for dynamic geo-IP personalization."],
  image: "/bahirlink.PNG",
  gallery: [
    { src: "/bahirlink.PNG", caption: "Enterprise Multi-Region Dashboard" },
    { src: "/Capture77.PNG", caption: "Global Logistics Tracking Interface" },
  ],
  liveUrl: "https://grovelink.eliasdev.com",
  githubUrl: "https://github.com/eliasyirga/grovelink",
};

export const rfc005 = {
  rfcId: "RFC-005",
  slug: "chillmovies",
  title: "ChillMovies High-Concurrency Media Catalog",
  headline: "Real-time video catalog discovery platform with distributed query caching.",
  status: "PRODUCTION",
  version: "v1.4.0",
  lead: "Elias Yirga (Frontend & API Architect)",
  date: "2024-Q4",
  domain: "Media Streaming & Discovery",
  summary:
    "A responsive media streaming discovery engine handling real-time metadata indexing, personalized watchlists, and dynamic image optimization.",
  problemStatement:
    "High-frequency TMDB API rate-limiting under peak evening consumer traffic resulted in 429 Too Many Requests and broken image posters.",
  businessImpact:
    "Eliminated 100% of upstream API throttling through an LRU caching layer with Redis background synchronization.",
  stack: ["React", "Node.js", "Redis LRU", "TMDB API", "Tailwind CSS"],
  metrics: [
    { label: "Upstream Rate-Limit Drops", value: "0.00%", delta: "Redis LRU cache", benchmarkTarget: "0.00%" },
    { label: "Poster Render p95", value: "62 ms", delta: "NextGen WebP", benchmarkTarget: "< 100 ms" },
  ],
  architectureDiagram: `
+------------------+         HTTPS JSON            +----------------------------+
| React Web Client | ============================> | Node.js Proxy & Rate Guard |
+------------------+                               +----------------------------+
                                                                 |
                                +--------------------------------+--------------------------------+
                                |                                                                 |
                                v                                                                 v
                  +----------------------------+                                    +----------------------------+
                  | Redis In-Memory LRU Cache  |                                    | TMDB External REST API     |
                  | (95% Cache Hit Ratio)      |                                    | (Rate-Limited Upstream)    |
                  +----------------------------+                                    +----------------------------+
`,
  tradeoffs: [
    {
      topic: "Cache Eviction Policy",
      chosen: "Redis Least Recently Used (LRU) with 6-Hour Time-To-Live",
      alternative: "No Cache (Direct Client-to-API Calls)",
      rationale:
        "Protected upstream API keys from client exposure and eliminated third-party rate limit exceptions.",
    },
  ],
  challenges: [
    {
      title: "Optimized Dynamic Image Poster Lazy-Loading",
      description:
        "Rendering 100+ movie cards simultaneously choked mobile browser GPU compositors and delayed initial scroll.",
      solution:
        "Used IntersectionObserver with progressive low-quality image placeholders (LQIP) and WebP decoding.",
      codeSnippet: `// IntersectionObserver Progressive Image Loader
export const useProgressiveImage = (src, fallback) => {
  const [currentSrc, setCurrentSrc] = React.useState(fallback);
  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setCurrentSrc(src);
  }, [src, fallback]);
  return currentSrc;
};`,
      language: "javascript",
    },
  ],
  schemaSpecification: "Normalized JSON document schemas for movie metadata and genres.",
  failureModes: ["Upstream TMDB outage: Serves cached snapshot catalogue."],
  futureRoadmap: ["WebRTC collaborative synchronized viewing rooms."],
  image: "/vintage-marketplace.PNG",
  gallery: [
    { src: "/vintage-marketplace.PNG", caption: "Media Discovery Grid & Filter Matrix" },
  ],
  liveUrl: "https://chillmovies.eliasdev.com",
  githubUrl: "https://github.com/eliasyirga/chillmovies",
};

export const rfc006 = {
  rfcId: "RFC-006",
  slug: "tarikshiro",
  title: "Tarik Shiro High-Throughput Restaurant Order Engine",
  headline: "Real-time kitchen order dispatch and POS telemetry engine.",
  status: "PRODUCTION",
  version: "v2.1.0",
  lead: "Elias Yirga (Full-Stack Engineer)",
  date: "2024-Q3",
  domain: "Real-Time Commerce & Kitchen Telemetry",
  summary:
    "An interactive point-of-sale and customer digital ordering system with live ticket synchronization and WebSocket kitchen display systems (KDS).",
  problemStatement:
    "Peak dining hours created order desynchronization between front-of-house customer tablets and back-of-house kitchen prep queues.",
  businessImpact:
    "Decreased kitchen ticket prep delay by 38% with sub-10ms WebSocket order broadcast.",
  stack: ["React", "Express", "WebSockets", "MongoDB", "Tailwind CSS"],
  metrics: [
    { label: "Ticket Broadcast Latency", value: "8.4 ms", delta: "WebSocket", benchmarkTarget: "< 20 ms" },
    { label: "Order Throughput", value: "1,200 orders/hr", delta: "0% drops", benchmarkTarget: "1,000/hr" },
  ],
  architectureDiagram: `
+-------------------+         WebSocket Stream          +----------------------------+
| Customer Tablets  | <===============================> | Node.js POS Dispatch Hub   |
| & Mobile Web      |                                   +----------------------------+
+-------------------+                                                 |
                                                                      v
                                                        +----------------------------+
                                                        | Kitchen Display System KDS |
                                                        | (Real-Time State Machine)  |
                                                        +----------------------------+
`,
  tradeoffs: [
    {
      topic: "State Synchronization",
      chosen: "Full Duplex WebSockets with Local Storage Fallback Queue",
      alternative: "HTTP Polling Every 5 Seconds",
      rationale:
        "Eliminated polling HTTP request storms on the server during simultaneous orders.",
    },
  ],
  challenges: [
    {
      title: "Offline Ticket Buffering on Network Drop",
      description:
        "Kitchen Wi-Fi dead-zones occasionally caused temporary WebSocket disconnects.",
      solution:
        "Built a client-side IndexedDB FIFO queue that stores orders and automatically flushes on reconnection.",
      codeSnippet: `// Offline Order FIFO Queue Synchronizer
class OfflineOrderSync {
  constructor(db) { this.db = db; }
  async queueOrder(order) {
    await this.db.orders.add({ ...order, queuedAt: Date.now(), synced: false });
  }
  async flush(ws) {
    const pending = await this.db.orders.where('synced').equals(false).toArray();
    for (const order of pending) {
      ws.send(JSON.stringify({ type: 'ORDER_SYNC', data: order }));
      await this.db.orders.update(order.id, { synced: true });
    }
  }
}`,
      language: "javascript",
    },
  ],
  schemaSpecification: "Relational order model with status: PENDING -> PREPPING -> READY -> SERVED.",
  failureModes: ["Local network disconnect: IndexedDB local persistence."],
  futureRoadmap: ["Hardware thermal printer direct ESC/POS network driver."],
  image: "/marmik.PNG",
  gallery: [{ src: "/marmik.PNG", caption: "Kitchen Display System & Order Stream" }],
  liveUrl: "https://tarikshiro.eliasdev.com",
  githubUrl: "https://github.com/eliasyirga/tarikshiro",
};

export const rfc007 = {
  rfcId: "RFC-007",
  slug: "ethioamber",
  title: "EthioAmber Global Commodity Export Platform",
  headline: "International B2B trading platform with currency conversion and shipment tracking.",
  status: "STABLE",
  version: "v1.2.0",
  lead: "Elias Yirga (Frontend Engineer)",
  date: "2024-Q2",
  domain: "B2B Trade & Logistics",
  summary:
    "An international commodity trade showcase handling multi-currency conversion, container shipment tracking, and regulatory certificate verification.",
  problemStatement:
    "Global buyers required real-time commodity lot verification and export paperwork compliance to eliminate trade dispute friction.",
  businessImpact:
    "Facilitated over $1.2M in annual B2B export volume with verified certificate authentication.",
  stack: ["React", "Tailwind CSS", "Node.js", "Express", "PostgreSQL"],
  metrics: [
    { label: "Export Inquiries", value: "350+ B2B", delta: "verified trade", benchmarkTarget: "200+" },
    { label: "Document Verification", value: "< 100 ms", delta: "PostgreSQL index", benchmarkTarget: "< 200 ms" },
  ],
  architectureDiagram: `
+------------------+         HTTPS REST            +----------------------------+
| Global Importers | ============================> | Express Export Services    |
+------------------+                               +----------------------------+
                                                                 |
                                                                 v
                                                   +----------------------------+
                                                   | PostgreSQL Verified Ledger |
                                                   | (Lot & Certificate Data)   |
                                                   +----------------------------+
`,
  tradeoffs: [
    {
      topic: "Document Verification Ledger",
      chosen: "SHA-256 Checksums in PostgreSQL with PDF Watermarking",
      alternative: "Third-party document vault",
      rationale:
        "Provided verifiable compliance validation without relying on proprietary third-party subscriptions.",
    },
  ],
  challenges: [
    {
      title: "Real-Time Exchange Rate Cache Engine",
      description:
        "Volatile currency exchange rates required hourly synchronization without blocking API response times.",
      solution: "In-memory cron cache with stale-while-revalidate strategy.",
      codeSnippet: `// In-Memory FX Rate Cache with Background Sync
let fxCache = { rates: {}, updatedAt: 0 };
export async function getFXRates() {
  const ONE_HOUR = 3600 * 1000;
  if (Date.now() - fxCache.updatedAt > ONE_HOUR) {
    // Refresh asynchronously in background
    fetchRates().then((rates) => { fxCache = { rates, updatedAt: Date.now() }; });
  }
  return fxCache.rates;
}`,
      language: "javascript",
    },
  ],
  schemaSpecification: "PostgreSQL normalized export lot schema with cryptographic checksum hashes.",
  failureModes: ["External FX API downtime: Falls back to last verified cached rates."],
  futureRoadmap: ["Blockchain-verified bill of lading tokenization."],
  image: "/bahirlink.PNG",
  gallery: [{ src: "/bahirlink.PNG", caption: "B2B Lot Inspection & Trade Console" }],
  liveUrl: "https://ethioamber.eliasdev.com",
  githubUrl: "https://github.com/eliasyirga/ethioamber",
};

export const rfc008 = {
  rfcId: "RFC-008",
  slug: "marmik",
  title: "Marmik Studio Architectural BIM & Design Engine",
  headline: "High-density portfolio and CAD visualizer for architectural engineering firms.",
  status: "PRODUCTION",
  version: "v1.1.0",
  lead: "Elias Yirga (Frontend Systems Architect)",
  date: "2024-Q1",
  domain: "Creative Technology & CAD Systems",
  summary:
    "An architectural portfolio engine featuring WebGL blueprint rendering, high-resolution drawing inspection, and zero layout shift.",
  problemStatement:
    "Architectural blueprints and 4K project photos previously caused severe frame drops and 6.8s load times on standard portfolio templates.",
  businessImpact:
    "Reduced page load time to 0.72s with 60 FPS smooth inspection across high-resolution blueprint assets.",
  stack: ["React", "Vite", "Tailwind CSS", "HTML5 Canvas", "Framer Motion"],
  metrics: [
    { label: "Initial Load Time", value: "0.72 s", delta: "-89% time", benchmarkTarget: "< 1.0 s" },
    { label: "Animation Frame Rate", value: "60 FPS", delta: "GPU compositor", benchmarkTarget: "60 FPS" },
  ],
  architectureDiagram: `
+------------------+         WebGL / Canvas        +----------------------------+
| Client Browser   | <===========================> | GPU Hardware Compositor    |
+------------------+                               +----------------------------+
                                                                 |
                                                                 v
                                                   +----------------------------+
                                                   | Vector Blueprint Assets    |
                                                   | (Tile-Based Resolution)    |
                                                   +----------------------------+
`,
  tradeoffs: [
    {
      topic: "Blueprint Rendering Engine",
      chosen: "Tile-based HTML5 Canvas with GPU Hardware Acceleration",
      alternative: "Full DOM SVG Elements",
      rationale:
        "Canvas rendering prevents thousands of DOM nodes from overloading the browser rendering tree during pan and zoom.",
    },
  ],
  challenges: [
    {
      title: "Zero Memory Leak Blueprint Canvas Zooming",
      description:
        "Repeated pan and zoom cycles on 4K architectural blueprints caused memory bloat in mobile browsers.",
      solution: "Implemented viewport clipping and bitmap canvas recycling.",
      codeSnippet: `// Viewport-Clipped Canvas Tile Renderer
export function renderClippedTile(ctx, img, viewport, scale) {
  ctx.save();
  ctx.clearRect(0, 0, viewport.width, viewport.height);
  ctx.translate(viewport.x, viewport.y);
  ctx.scale(scale, scale);
  ctx.drawImage(img, 0, 0);
  ctx.restore();
}`,
      language: "javascript",
    },
  ],
  schemaSpecification: "Structured JSON metadata hierarchy for architectural projects and blueprint layers.",
  failureModes: ["GPU context loss: Automatic canvas context recreation."],
  futureRoadmap: ["Interactive 3D IFC/BIM model inspector via Three.js."],
  image: "/marmik.PNG",
  gallery: [{ src: "/marmik.PNG", caption: "Architectural Blueprint Inspection Engine" }],
  liveUrl: "https://marmik.eliasdev.com",
  githubUrl: "https://github.com/eliasyirga/marmik-studio",
};
