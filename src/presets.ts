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

export const BUSINESS_PRESETS: BusinessPreset[] = [
  {
    id: "bakery",
    name: "🥐 Local Bakery",
    businessName: "The Daily Crumb",
    industry: "Food & Beverage (Local Bakery)",
    targetAudience: "Busy neighborhood professionals and organic food lovers seeking authentic baked goods",
    mainBenefit: "Naturally fermented sourdough and warm French pastries scratch-baked fresh every morning",
    painPoints: "Preservative-filled grocery store bread, lack of genuine high-quality local breakfast options",
    pagesNeeded: "Homepage, Our Bread Menu, Bread Box Weekly Subscription",
    brandPersonality: "Warm, authentic, comforting, and rustic with local craft appeal",
    keywords: "sourdough bread, local bakery, fresh pastries, artisan bakers, bakery delivery",
    primaryCta: "Order Warm Bread Now",
    icon: "Croissant"
  },
  {
    id: "agency",
    name: "✨ Brand Agency",
    businessName: "PixelCraft Studios",
    industry: "Creative Agency (Freelance Brand Designer)",
    targetAudience: "Ambitious startup founders launching new products needing to build instant authority",
    mainBenefit: "Cohesive, signature minimalist branding systems designed to turn viewers into loyal advocates",
    painPoints: "Generic template logos, expensive slow-moving agency retainers, lack of visual consistency",
    pagesNeeded: "Homepage, Visual Identity Design, Collaborative Brand Strategy, Portfolio Showcase",
    brandPersonality: "Sleek, minimalist, highly professional, modern and authoritative",
    keywords: "brand designer, minimalist brand identity, startup design agency, premium logo design, visual branding",
    primaryCta: "Design Your Signature Brand",
    icon: "Palette"
  },
  {
    id: "plumbing",
    name: "🔧 Home Services",
    businessName: "Apex Plumbing & Gas",
    industry: "Home Services (Local Plumber)",
    targetAudience: "Local homeowners seeking trusted plumbing maintenance without hidden fees or delays",
    mainBenefit: "Prompt master plumbing with transparent upfront quotes and a lifetime workmanship guarantee",
    painPoints: "Unreliable contractors who arrive late, surprise add-on charges, shoddy work that leaks again",
    pagesNeeded: "Homepage, 24/7 Emergency Repairs, Transparent Upfront Pricing Guarantee",
    brandPersonality: "Trustworthy, dependable, expert, and friendly with customer-first values",
    keywords: "emergency plumber, local plumbing repair, transparent plumbing rates, leaky pipe fix, master plumber",
    primaryCta: "Schedule Expert Repair",
    icon: "Wrench"
  },
  {
    id: "saas_consultant",
    name: "⚡ Legal Tech SaaS",
    businessName: "Zenith Law Workflows",
    industry: "B2B SaaS Consulting",
    targetAudience: "Boutique law firms wanting to automate billing and document management to capture billable hours",
    mainBenefit: "Streamlined legal workflow integrations that reclaim 15+ lost billable hours every single week",
    painPoints: "Slow manual copy-pasting, complex unoptimized software, team members resisting tech updates",
    pagesNeeded: "Homepage, Custom Software Setup, 1-on-1 Document Automation, Billing Integration",
    brandPersonality: "Cutting-edge, highly technical, reliable, secure and performance-focused",
    keywords: "legal workflow automation, law firm document setup, billable hours software, client billing setup",
    primaryCta: "Automate Your Workflows",
    icon: "Cpu"
  },
  {
    id: "trainer",
    name: "💪 Fitness Coach",
    businessName: "Pulse Performance",
    industry: "Personal Fitness & Coaching",
    targetAudience: "Busy executives struggling to maintain high physical energy and custom nutrition routines",
    mainBenefit: "Custom structured training and metabolism optimization tailored specifically for demanding corporate calendars",
    painPoints: "Cookie-cutter gym routines, zero accountability, lack of time to plan meals or workout",
    pagesNeeded: "Homepage, Executive Performance Coaching, High-Energy Nutrition Blueprint",
    brandPersonality: "Energetic, motivational, premium, strong and results-driven",
    keywords: "executive fitness coach, corporate weight loss, custom metabolism training, busy executive nutrition",
    primaryCta: "Optimize Your Metabolism",
    icon: "Activity"
  }
];
