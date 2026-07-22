export interface FeatureItem {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CopywritingOutput {
  tagline?: string;
  headline: string;
  subheadline: string;
  about: string;
  services: string;
  features?: FeatureItem[];
  faq?: FaqItem[];
  guarantee?: string;
  cta_button: string;
}

export interface ColorSuggestion {
  hex: string;
  reason: string;
}

export interface PaletteOutput {
  primary: ColorSuggestion;
  secondary: ColorSuggestion[];
  accent: ColorSuggestion;
}

export interface SeoPageMetadata {
  page_name: string;
  meta_title: string;
  meta_description: string;
}

export interface ProposalPricing {
  starter: string;
  standard: string;
  premium: string;
  note: string;
}

export interface WebsiteProposal {
  project_overview: string;
  requirements: string[];
  deliverables: string[];
  timeline: {
    week1: string;
    week2: string;
    week3: string;
  };
  pricing: ProposalPricing;
  next_steps: string;
}

export interface BusinessPreset {
  id: string;
  name: string;
  businessName: string;
  industry: string;
  targetAudience: string;
  mainBenefit: string;
  painPoints: string;
  pagesNeeded: string;
  brandPersonality: string;
  keywords: string;
  primaryCta: string;
  icon: string;
}

export type ActiveTab = "preview" | "copydeck" | "palette" | "seo" | "proposal" | "json";
export type PreviewViewport = "desktop" | "mobile";
export type PreviewPage = "home" | "about" | "services" | "faq" | "contact";
