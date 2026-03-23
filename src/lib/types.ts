export interface OpportunityData {
  title: string;
  link: string;
  description: string;
  category: string;
  deadline: string;
  status: string;
}

export interface ExtractionResult {
  link: string;
  description: string;
  deadline: string;
}

export type WizardStep = 1 | 2 | 3 | 4;
