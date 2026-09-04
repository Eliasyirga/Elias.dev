export const rfc003 = {
  rfcId: "RFC-003",
  slug: "vintage-marketplace",
  title: "Vintage Marketplace Escrow & Trading Protocol",
  headline: "C2C commerce platform with idempotent state machines and two-phase escrow release.",
  status: "PRODUCTION",
  version: "v1.8.4",
  lead: "Elias Yirga (Full-Stack Engineer)",
  date: "2025-Q2",
  domain: "E-Commerce & Transactional Integrity",
  summary:
    "A consumer-to-consumer marketplace supporting finite state machine escrow transactions, high-concurrency inventory locks, and automated dispute resolution workflows.",
  problemStatement:
    "High-value vintage item auctions frequently encountered concurrent checkout collisions where multiple buyers confirmed payment for one-of-a-kind inventory items simultaneously.",
  businessImpact:
    "Zero double-allocation anomalies across 40,000+ completed transactions. Reduced payment settlement dispute resolution cycles by 80%.",
  stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe API", "Tailwind CSS"],
  metrics: [
    { label: "Checkout Collision Rate", value: "0.00%", delta: "strict ACID", benchmarkTarget: "0.00%" },
    { label: "Escrow Settlement Latency", value: "< 250 ms", delta: "webhook worker", benchmarkTarget: "< 500 ms" },
    { label: "p99 Order Latency", value: "48 ms", delta: "Postgres index", benchmarkTarget: "< 100 ms" },
  ],
  architectureDiagram: `
+------------------+         REST / HTTPS          +----------------------------+
| Buyer / Seller   | ============================> | API Gateway Transaction Hub|
| React Client     |                               +----------------------------+
+------------------+                                             |
                                                                 v
                                                   +----------------------------+
                                                   | State Machine Order Engine |
                                                   | (INIT -> HELD -> RELEASED) |
                                                   +----------------------------+
                                                                 |
                                +--------------------------------+--------------------------------+
                                |                                                                 |
                                v                                                                 v
                  +----------------------------+                                    +----------------------------+
                  | PostgreSQL 16 (Row Locks)  |                                    | Stripe Payment Webhooks    |
                  | - Inventory Reservation    |                                    | - Idempotent Event Queue   |
                  +----------------------------+                                    +----------------------------+
`,
  tradeoffs: [
    {
      topic: "Inventory Lock Strategy",
      chosen: "PostgreSQL Database-Level Row Locking with 10-Minute Expiring Leases",
      alternative: "Client-Side Polling Lock",
      rationale:
        "Ensures absolute transactional consistency even if users disconnect during the checkout payment step.",
    },
  ],
  challenges: [
    {
      title: "Idempotent Webhook Processing for Escrow Settlement",
      description:
        "Network retries from payment processors could trigger duplicate fulfillment transactions or premature escrow payout releases.",
      solution:
        "Enforced an atomic event ledger table with unique event_id keys and serializable transaction isolation.",
      codeSnippet: `// Idempotent Payment Webhook Handler with Transaction Isolation
export async function processStripeWebhook(event) {
  const client = await db.getClient();
  try {
    await client.query('BEGIN ISOLATION LEVEL SERIALIZABLE');

    // Check if event was already processed
    const existing = await client.query(
      'SELECT id FROM processed_events WHERE event_id = $1 FOR UPDATE',
      [event.id]
    );
    if (existing.rows.length > 0) {
      await client.query('ROLLBACK');
      return { status: 'ALREADY_PROCESSED' };
    }

    if (event.type === 'payment_intent.succeeded') {
      const { orderId } = event.data.object.metadata;
      await client.query(
        "UPDATE orders SET status = 'ESCROW_HELD', updated_at = NOW() WHERE id = $1 AND status = 'PENDING'",
        [orderId]
      );
      await client.query(
        'INSERT INTO processed_events (event_id, event_type, processed_at) VALUES ($1, $2, NOW())',
        [event.id, event.type]
      );
    }

    await client.query('COMMIT');
    return { status: 'SUCCESS' };
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
    "PostgreSQL normalized schema with ENUM order_status ('PENDING', 'ESCROW_HELD', 'SHIPPED', 'COMPLETED', 'DISPUTED') and foreign key constraints.",
  failureModes: [
    "Buyer payment failure: Automated cron daemon unlocks inventory after 10 minutes and notifies queued waitlist bidders.",
  ],
  futureRoadmap: [
    "Multi-currency dynamic FX conversion via European Central Bank real-time telemetry.",
  ],
  image: "/vintage-marketplace.PNG",
  gallery: [
    { src: "/vintage-marketplace.PNG", caption: "Escrow State Dashboard & Item Catalog" },
    { src: "/Capture6.PNG", caption: "Live Auction & Bidding Transaction Console" },
  ],
  liveUrl: "https://vintage-demo.eliasdev.com",
  githubUrl: "https://github.com/eliasyirga/vintage-marketplace",
};
