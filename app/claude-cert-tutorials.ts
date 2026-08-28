import { architectureTutorials } from "./claude-cert-tutorials-architecture";
import { governanceTutorials } from "./claude-cert-tutorials-governance";
import { integrationTutorials } from "./claude-cert-tutorials-integration";

export const detailedClaudeTutorials: Record<string, string> = {
  ...architectureTutorials,
  ...integrationTutorials,
  ...governanceTutorials,
};
