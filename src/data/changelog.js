/**
 * Git-style Monospaced System Changelog & Revision Log
 */

export const changelog = [
  {
    version: "v3.2.0",
    date: "2026-09-02",
    commit: "9f8a42c",
    type: "architecture",
    title: "Enterprise Architecture & Design System Refresh",
    description:
      "Reorganized codebase into feature-driven atomic architecture. Implemented Linear-inspired zinc palette, JetBrains Mono technical metadata, dynamic RFC project pages, and global Cmd+K command palette.",
    changes: [
      "feat: global Cmd+K keyboard navigation modal",
      "feat: dynamic /projects/:slug RFC architecture case study views",
      "refactor: migrated flat components to domain-driven structure",
      "perf: configured path aliases and removed non-standard stroke CSS",
    ],
  },
  {
    version: "v3.1.0",
    date: "2026-06-18",
    commit: "e4d281a",
    type: "feature",
    title: "BahirLink Emergency Coordination Platform Release",
    description:
      "Deployed distributed emergency dispatch portal with PostGIS spatial clustering and sub-500ms WebSocket sync.",
    changes: [
      "feat: PostGIS spatial boundary validation algorithms",
      "feat: WebSocket vehicle coordinate streaming engine",
      "fix: vector-clock idempotency resolution on mobile reconnection",
    ],
  },
  {
    version: "v3.0.0",
    date: "2026-01-10",
    commit: "b8c310f",
    type: "release",
    title: "Vintage Marketplace & Escrow Trust Engine",
    description:
      "Launched 1-of-1 vintage goods platform featuring row-level pessimistic locks and automated Stripe webhook verification.",
    changes: [
      "feat: SELECT FOR UPDATE NOWAIT concurrency checkout lock",
      "feat: Redis key expiration watcher for temporary cart holds",
      "perf: reduced database query latency by 72% via compound indexes",
    ],
  },
  {
    version: "v2.4.0",
    date: "2025-08-22",
    commit: "37a1f59",
    type: "performance",
    title: "Jobify Recruitment Aggregation Engine Optimization",
    description:
      "Engineered compound ESR indexes and aggregation pipelines for candidate recruitment funnel analysis.",
    changes: [
      "perf: optimized MongoDB compound indexes for multi-facet candidate queries",
      "sec: rotated HttpOnly SameSite Strict JWT dual-token authorization",
    ],
  },
];
