export const rfc001 = {
  rfcId: "RFC-001",
  slug: "bahirlink",
  title: "BahirLink Emergency Dispatch & Spatial Routing System",
  headline: "Distributed emergency coordination engine with PostGIS sub-100ms dispatching.",
  status: "PRODUCTION",
  version: "v2.4.0",
  lead: "Elias Yirga (Lead Computer Engineer)",
  date: "2025-Q4",
  domain: "Distributed Systems & Spatial Indexing",
  summary:
    "A distributed emergency management infrastructure handling concurrent incident reporting, automated vehicle location (AVL), and PostGIS spatial nearest-neighbor dispatch algorithms.",
  problemStatement:
    "Legacy dispatch mechanisms in regional sectors operated via synchronous voice relays with ~18-minute coordination overhead. The engineering objective was to build an automated, sub-minute telemetry pipeline capable of routing nearest emergency units under unreliable cellular connectivity.",
  businessImpact:
    "Decreased average emergency dispatch latency from 18 minutes to 4.2 minutes across 5 participating regional stations. Handled 10,000+ spatial telemetry pings per second with zero data loss during simulated stress testing.",
  stack: ["Node.js", "PostgreSQL", "PostGIS", "Redis Pub/Sub", "React", "Docker", "Leaflet"],
  metrics: [
    { label: "Dispatch Response SLA", value: "4.2 min", delta: "-76% latency", benchmarkTarget: "< 5.0 min" },
    { label: "Spatial Query Latency", value: "18.4 ms", delta: "p95 index", benchmarkTarget: "< 30.0 ms" },
    { label: "Concurrent Peak Telemetry", value: "10k req/s", delta: "0% drop", benchmarkTarget: "10k req/s" },
    { label: "System Availability", value: "99.98%", delta: "uptime SLA", benchmarkTarget: "99.95%" },
  ],
  architectureDiagram: `
+------------------+      HTTPS / WSS       +-----------------------------+
| First Responders | <====================> | Cloudflare Edge / Anycast   |
| & Mobile Clients |                        +-----------------------------+
+------------------+                                      |
                                                          v
                                            +-----------------------------+
                                            | Node.js API Gateway Cluster |
                                            | (JWT Auth + Rate Limiting)  |
                                            +-----------------------------+
                                                          |
                      +-----------------------------------+-----------------------------------+
                      |                                                                       |
                      v                                                                       v
        +----------------------------+                                          +----------------------------+
        | Redis Cluster (Pub/Sub)    |                                          | PostgreSQL 16 + PostGIS    |
        | - Realtime Unit Tracking   |                                          | - R-Tree Spatial Indexing  |
        | - Ephemeral Geohash Cache  |                                          | - ACID Incident Ledger     |
        +----------------------------+                                          +----------------------------+
`,
  tradeoffs: [
    {
      topic: "Spatial Database Engine",
      chosen: "PostgreSQL with PostGIS (R-Tree Indexing)",
      alternative: "MongoDB Geospatial 2dsphere",
      rationale:
        "PostGIS delivers strictly serialized ACID transactions and spatial algorithms (ST_DWithin, ST_DistanceSphere) optimized with GiST indexing, preventing race conditions during concurrent emergency unit allocations.",
    },
    {
      topic: "Live Telemetry Protocol",
      chosen: "WebSockets with Redis Pub/Sub Backplane",
      alternative: "HTTP Long-Polling / Server-Sent Events (SSE)",
      rationale:
        "Bidirectional WebSocket streams maintained a predictable 12ms network round-trip for AVL GPS pings compared to 350ms HTTP connection teardown overhead.",
    },
  ],
  challenges: [
    {
      title: "Concurrent Unit Allocation Race Condition Resolution",
      description:
        "When multiple dispatchers attempted to assign the same closest ambulance to simultaneous nearby incidents, standard read-then-write transactions resulted in double-booking anomalies.",
      solution:
        "Implemented pessimistic database locking with SELECT ... FOR UPDATE SKIP LOCKED combined with an atomic Redis lease lock (SET NX PX) expiring in 15 seconds.",
      codeSnippet: `// Atomic Unit Assignment Transaction with PostGIS
async function allocateNearestUnit(incidentId, location, radiusMeters = 5000) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Pessimistic lock selecting single closest available unit
    const query = \`
      SELECT id, current_location
      FROM emergency_units
      WHERE status = 'IDLE'
        AND ST_DWithin(
          geom,
          ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
          $3
        )
      ORDER BY geom <-> ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
      LIMIT 1
      FOR UPDATE SKIP LOCKED;
    \`;
    const res = await client.query(query, [location.lng, location.lat, radiusMeters]);
    
    if (res.rows.length === 0) {
      await client.query('ROLLBACK');
      return { status: 'NO_UNITS_IN_RANGE' };
    }

    const unit = res.rows[0];
    await client.query(
      "UPDATE emergency_units SET status = 'DISPATCHED', assigned_incident_id = $1 WHERE id = $2",
      [incidentId, unit.id]
    );
    await client.query('COMMIT');
    
    // Broadcast dispatch to cluster
    await redisClient.publish('dispatch:events', JSON.stringify({ incidentId, unitId: unit.id }));
    return { status: 'ALLOCATED', unitId: unit.id };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}`,
      language: "javascript",
    },
  ],
  schemaSpecification:
    "Relational schema enforcing foreign key referential integrity with PostGIS GEOMETRY(Point, 4326) columns and spatial GiST indices across coordinates.",
  failureModes: [
    "Cellular disconnect during GPS transmit: Handled via IndexedDB offline FIFO buffer on mobile clients that auto-flushes on reconnect.",
    "Database replica partition: Read operations fall back to localized read-replicas while writes queue in Redis stream buffer.",
  ],
  futureRoadmap: [
    "Machine-learned traffic predictive routing integration via OpenStreetMap OSRM.",
    "Hardware LoRaWAN direct radio relay fallback for zero-cellular rural dispatch zones.",
  ],
  image: "/bahirlink.PNG",
  gallery: [
    { src: "/bahirlink.PNG", caption: "Dispatch Command Center & Spatial R-Tree Visualizer" },
    { src: "/Capture77.PNG", caption: "Emergency Route Tracking & Unit Telemetry Map" },
  ],
  liveUrl: "https://bahirdarlinkweb.vercel.app/",
  githubUrl: "https://github.com/Eliasyirga/BahirLink-Backend",
  githubRepos: [
    { name: "Backend API", url: "https://github.com/Eliasyirga/BahirLink-Backend" },
    { name: "Mobile App", url: "https://github.com/Eliasyirga/BahirLink-App" },
    { name: "Web Client", url: "https://github.com/biniambeza/bahirdarLink_web" },
  ],
};
