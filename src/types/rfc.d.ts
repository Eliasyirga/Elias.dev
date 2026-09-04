/**
 * Type definitions for RFC Engineering Dossier architecture
 */

export interface MetricItem {
  label: string;
  value: string;
  delta?: string;
  benchmarkTarget?: string;
}

export interface TradeoffDecision {
  topic: string;
  chosen: string;
  alternative: string;
  rationale: string;
}

export interface TechnicalHurdle {
  title: string;
  description: string;
  solution: string;
  codeSnippet?: string;
  language?: string;
}

export interface GalleryImage {
  src: string;
  caption: string;
}

export interface ProjectRFC {
  rfcId: string;
  slug: string;
  title: string;
  headline: string;
  status: "PRODUCTION" | "ACTIVE" | "STABLE" | "DEPRECATED";
  version: string;
  lead: string;
  date: string;
  domain: string;
  summary: string;
  problemStatement: string;
  businessImpact: string;
  stack: string[];
  metrics: MetricItem[];
  architectureDiagram: string;
  tradeoffs: TradeoffDecision[];
  challenges: TechnicalHurdle[];
  schemaSpecification: string;
  failureModes: string[];
  futureRoadmap: string[];
  image: string;
  gallery: GalleryImage[];
  liveUrl?: string;
  githubUrl?: string;
}
