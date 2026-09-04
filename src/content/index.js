import { rfc001 } from "./projects/rfc-001-bahirlink";
import { rfc002 } from "./projects/rfc-002-jobify";
import { rfc003 } from "./projects/rfc-003-vintage-marketplace";
import { rfc004, rfc005, rfc006, rfc007, rfc008 } from "./projects/rfc-004-grovelink";

export const projectsList = [
  rfc001,
  rfc002,
  rfc003,
  rfc004,
  rfc005,
  rfc006,
  rfc007,
  rfc008,
];

export const getProjectBySlug = (slug) => {
  return projectsList.find((p) => p.slug === slug || p.rfcId.toLowerCase() === slug.toLowerCase());
};

export const getProjectByRfcId = (rfcId) => {
  return projectsList.find((p) => p.rfcId.toLowerCase() === rfcId.toLowerCase());
};
