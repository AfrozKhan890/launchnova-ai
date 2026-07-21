import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  Layout, 
  FileText, 
  Code, 
  Edit3, 
  AlertCircle, 
  Rocket, 
  Building, 
  CheckCircle2, 
  Croissant,
  Palette,
  Wrench,
  Cpu,
  Activity,
  Globe,
  Monitor,
  Smartphone,
  Info,
  Layers,
  Settings,
  Flame,
  Maximize2,
  Minimize2,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Search,
  CheckSquare,
  HelpCircle,
  Eye,
  Sliders,
  X,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BUSINESS_PRESETS, BusinessPreset } from "./presets";

interface CopywritingOutput {
  headline: string;
  subheadline: string;
  about: string;
  services: string;
  cta_button: string;
}

interface ColorSuggestion {
  hex: string;
  reason: string;
}

interface PaletteOutput {
  primary: ColorSuggestion;
  secondary: ColorSuggestion[];
  accent: ColorSuggestion;
}

interface SeoPageMetadata {
  page_name: string;
  meta_title: string;
  meta_description: string;
}

interface ProposalPricing {
  starter: string;
  standard: string;
  premium: string;
  note: string;
}

interface WebsiteProposal {
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

export default function App() {
  // 1. INPUT STATES
  const [businessName, setBusinessName] = useState("PixelCraft Studios");
  const [industry, setIndustry] = useState("Creative Agency (Freelance Brand Designer)");
  const [targetAudience, setTargetAudience] = useState("Ambitious startup founders launching new products needing to build instant authority");
  const [mainBenefit, setMainBenefit] = useState("Cohesive, signature minimalist branding systems designed to turn viewers into loyal advocates");
  const [painPoints, setPainPoints] = useState("Generic template logos, expensive slow-moving agency retainers, lack of visual consistency");
  const [pagesNeeded, setPagesNeeded] = useState("Homepage, Visual Identity Design, Collaborative Brand Strategy, Portfolio Showcase");
  const [brandPersonality, setBrandPersonality] = useState("Sleek, minimalist, highly professional, modern and authoritative");
  const [keywords, setKeywords] = useState("brand designer, minimalist brand identity, startup design agency, premium logo design, visual branding");
  const [primaryCta, setPrimaryCta] = useState("Design Your Signature Brand");

  // 2. UI NAVIGATION & WORKSPACE SETTINGS
  const [activeTab, setActiveTab] = useState<"preview" | "copydeck" | "palette" | "seo" | "json" | "proposal">("preview");
  const [previewViewport, setPreviewViewport] = useState<"desktop" | "mobile">("desktop");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [generationError, setGenerationError] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // 3. GENERATED OUTPUT STATES
  const [generatedCopy, setGeneratedCopy] = useState<CopywritingOutput>({
    headline: "We shape signatures that command immediate authority.",
    subheadline: "By pairing meticulous typography with custom visual identity, we build brand systems that turn curious prospects into lifelong advocates.",
    about: "Most startup founders struggle to stand out in crowded digital markets with cheap template logos. At PixelCraft Studios, we believe your visual presence should establish instant credibility. We deliver premium, bespoke brand identities tailored specifically to captivate high-value enterprise clients.",
    services: "Brand Identity Design: Crafting tailored typography, logo assets, and bespoke visual guidelines.\nCollaborative Brand Strategy: Deep research workshops to identify and dominate your market niche.\nPortfolio & Web Design: Engineering pixel-perfect landing pages optimized to showcase your signature craft.",
    cta_button: "Design Your Signature Brand"
  });

  const [generatedPalette, setGeneratedPalette] = useState<PaletteOutput>({
    primary: {
      hex: "#0F172A",
      reason: "Deep Slate suggests supreme authority, modern minimalism, and high-end aesthetic rigor perfect for creative directors."
    },
    secondary: [
      {
        hex: "#475569",
        reason: "Cool Slate Grey represents balanced professionalism, structural stability, and cohesive brand documentation."
      },
      {
        hex: "#F8FAFC",
        reason: "Off-White slate tint establishes vast breathing room, crisp layout grids, and visual clarity across all devices."
      }
    ],
    accent: {
      hex: "#6366F1",
      reason: "Vibrant Indigo Blue invokes imagination, progressive creative strategy, and triggers highly responsive user interaction."
    }
  });

  const [generatedSeo, setGeneratedSeo] = useState<SeoPageMetadata[]>([
    {
      page_name: "Homepage",
      meta_title: "Premium Minimalist Brand Identity Design | PixelCraft Studios",
      meta_description: "Build instant authority with cohesive visual brand systems. Design your signature brand to turn curious prospects into loyal advocates. Consult us today!"
    },
    {
      page_name: "Visual Identity Design",
      meta_title: "Custom Brand Logo Assets & Typography | PixelCraft Studios",
      meta_description: "Establish supreme corporate credibility with bespoke typographic guides and logos. Design your signature brand to dominate your digital niche. Start now!"
    },
    {
      page_name: "Collaborative Brand Strategy",
      meta_title: "Targeted Audience Positioning Workshops | PixelCraft Studios",
      meta_description: "Identify and dominate your industry niche with collaborative branding workshops. Design your signature brand with deep research insights. Book today!"
    },
    {
      page_name: "Portfolio Showcase",
      meta_title: "Bespoke Creative Design Gallery | PixelCraft Studios",
      meta_description: "Explore premium, high-converting digital designs created for ambitious startup founders. Design your signature brand with expert visuals. View work!"
    }
  ]);

  const [generatedProposal, setGeneratedProposal] = useState<WebsiteProposal>({
    project_overview: "The primary objective is to build a high-converting, premium website for PixelCraft Studios that showcases creative design assets and establishes a clear inbound lead generation system. This solution will elevate your digital presence and streamline client onboarding.",
    requirements: [
      "A high-contrast and persuasive primary call-to-action to maximize conversion rates.",
      "A structured, showcase-driven layout detailing specific designer expertise and client results.",
      "Fully optimized localized metadata mapping search intent for premium brand design keywords."
    ],
    deliverables: [
      "Homepage: High-impact display layout highlighting unique benefit statements, client testimonials, and interactive case study entry points.",
      "Visual Identity Design Page: Comprehensive showcase of custom typography, signature logo assets, and custom guideline documentation.",
      "Collaborative Brand Strategy Page: Interactive deep dive into design discovery workshops and competitive analysis blueprints.",
      "Portfolio Showcase Page: Modular grid design optimizing visual presentation of real-world brand assets across devices."
    ],
    timeline: {
      week1: "Research, user flow mappings, responsive layout wireframes, and mood board curation.",
      week2: "Front-end system engineering, custom CSS transitions, modular component builds, and database setup.",
      week3: "Interactive online contact validations, optimized SEO keywords placement, cross-browser audits, and production deployment."
    },
    pricing: {
      starter: "Starter Package ($150 USD): High-end single-page online portfolio layout with core responsive panels and unified contact module.",
      standard: "Standard Package ($350 USD): Up to 5 premium layout pages, fully integrated SEO structure, and one dedicated revision round.",
      premium: "Premium Package ($600+ USD): Up to 10 highly tailored modular layout pages, advanced transition animations, custom interactive forms, and unlimited revisions.",
      note: "Pricing can be adjusted to local currency (PKR) on request."
    },
    next_steps: "To kickstart the project, please review these sections and select your preferred package. Once confirmed, we will schedule a 30-minute discovery workshop to map out Visual Identity specs and align on Design Sprint milestones."
  });

  // Editable copies
  const [editedCopy, setEditedCopy] = useState<CopywritingOutput>({ ...generatedCopy });
  const [editedPalette, setEditedPalette] = useState<PaletteOutput>({ ...generatedPalette });
  const [editedSeo, setEditedSeo] = useState<SeoPageMetadata[]>([...generatedSeo]);
  const [editedProposal, setEditedProposal] = useState<WebsiteProposal>({ ...generatedProposal });

  // Sync edits when state is regenerated
  useEffect(() => {
    setEditedCopy({ ...generatedCopy });
  }, [generatedCopy]);

  useEffect(() => {
    setEditedPalette({ ...generatedPalette });
  }, [generatedPalette]);

  useEffect(() => {
    setEditedSeo([...generatedSeo]);
  }, [generatedSeo]);

  useEffect(() => {
    setEditedProposal({ ...generatedProposal });
  }, [generatedProposal]);

  // Load Preset
  const handleLoadPreset = (preset: BusinessPreset) => {
    setBusinessName(preset.businessName);
    setIndustry(preset.industry);
    setTargetAudience(preset.targetAudience);
    setMainBenefit(preset.mainBenefit);
    setPainPoints(preset.painPoints);
    setPagesNeeded(preset.pagesNeeded);
    setBrandPersonality(preset.brandPersonality);
    setKeywords(preset.keywords);
    setPrimaryCta(preset.primaryCta);
    setGenerationError("");
  };

  // Generate All (Comprehensive Brand Suite API call orchestration)
  const handleGenerateBrandSuite = async () => {
    setIsGenerating(true);
    setGenerationError("");
    
    try {
      // Step 1: Copywriting
      setGenerationStep("Composing premium copywriting lines...");
      const copyResponse = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          industry,
          targetAudience,
          mainBenefit,
          painPoints,
          pagesNeeded
        })
      });

      if (!copyResponse.ok) {
        const errData = await copyResponse.json();
        throw new Error(errData.error || "Failed to generate website copy.");
      }
      const copyData = await copyResponse.json();

      // Step 2: Palette Suggestion
      setGenerationStep("Evaluating branding color psychology...");
      const paletteResponse = await fetch("/api/generate-palette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry,
          brandPersonality
        })
      });

      if (!paletteResponse.ok) {
        const errData = await paletteResponse.json();
        throw new Error(errData.error || "Failed to suggest color palette.");
      }
      const paletteData = await paletteResponse.json();

      // Step 3: SEO Optimization
      setGenerationStep("Calculating search intent queries...");
      const seoResponse = await fetch("/api/generate-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          industry,
          keywords,
          pagesNeeded,
          primaryCta
        })
      });

      if (!seoResponse.ok) {
        const errData = await seoResponse.json();
        throw new Error(errData.error || "Failed to generate SEO metadata.");
      }
      const seoData = await seoResponse.json();

      // Step 4: Proposal Generation
      setGenerationStep("Drafting custom client proposal...");
      const proposalResponse = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          industry,
          targetAudience,
          mainBenefit,
          painPoints,
          pagesNeeded,
          primaryCta
        })
      });

      if (!proposalResponse.ok) {
        const errData = await proposalResponse.json();
        throw new Error(errData.error || "Failed to generate website proposal.");
      }
      const proposalData = await proposalResponse.json();

      // Set states
      setGeneratedCopy(copyData);
      setGeneratedPalette(paletteData);
      setGeneratedSeo(seoData.pages || []);
      setGeneratedProposal(proposalData);
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || "An unexpected error occurred during brand suite generation.");
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  // Generate SEO only
  const handleGenerateSeoOnly = async () => {
    setIsGenerating(true);
    setGenerationError("");
    setGenerationStep("Formulating page meta-titles & descriptions...");
    try {
      const response = await fetch("/api/generate-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          industry,
          keywords,
          pagesNeeded,
          primaryCta
        })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to generate SEO metadata.");
      }
      const data = await response.json();
      setGeneratedSeo(data.pages || []);
    } catch (err: any) {
      setGenerationError(err.message || "Error generating SEO tags.");
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  // Generate Copywriting only
  const handleGenerateCopywritingOnly = async () => {
    setIsGenerating(true);
    setGenerationError("");
    setGenerationStep("Drafting benefit-led layout copies...");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          industry,
          targetAudience,
          mainBenefit,
          painPoints,
          pagesNeeded
        })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to generate copywriting.");
      }
      const data = await response.json();
      setGeneratedCopy(data);
    } catch (err: any) {
      setGenerationError(err.message || "Error generating copywriting.");
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  // Generate Palette only
  const handleGeneratePaletteOnly = async () => {
    setIsGenerating(true);
    setGenerationError("");
    setGenerationStep("Assessing psychology values...");
    try {
      const response = await fetch("/api/generate-palette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry,
          brandPersonality
        })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to suggest color palette.");
      }
      const data = await response.json();
      setGeneratedPalette(data);
    } catch (err: any) {
      setGenerationError(err.message || "Error generating palette.");
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  // Generate Proposal only
  const handleGenerateProposalOnly = async () => {
    setIsGenerating(true);
    setGenerationError("");
    setGenerationStep("Drafting custom client proposal...");
    try {
      const response = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          industry,
          targetAudience,
          mainBenefit,
          painPoints,
          pagesNeeded,
          primaryCta
        })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to generate website proposal.");
      }
      const data = await response.json();
      setGeneratedProposal(data);
    } catch (err: any) {
      setGenerationError(err.message || "Error generating website proposal.");
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  // Copy helper
  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Export combined JSON
  const copyCombinedJSON = () => {
    const combined = {
      business: {
        name: businessName,
        industry,
        brandPersonality,
        targetAudience,
        keywords,
        primaryCta,
        pagesRequested: pagesNeeded
      },
      copywriting: editedCopy,
      color_palette: editedPalette,
      seo_metadata: editedSeo,
      proposal: editedProposal
    };
    copyToClipboard(JSON.stringify(combined, null, 2), "all_json");
  };

  const copyWholeProposalAsText = () => {
    const text = `WEBSITE PROPOSAL FOR ${businessName.toUpperCase()}

1. PROJECT OVERVIEW
${editedProposal.project_overview}

2. UNDERSTANDING OF REQUIREMENTS
${editedProposal.requirements.map(r => `• ${r}`).join("\n")}

3. PROPOSED SOLUTION & DELIVERABLES
${editedProposal.deliverables.map(d => `• ${d}`).join("\n")}

4. TIMELINE
- Week 1 Research & Design: ${editedProposal.timeline.week1}
- Week 2 Development & Customization: ${editedProposal.timeline.week2}
- Week 3 Testing & Launch Deployment: ${editedProposal.timeline.week3}

5. INVESTMENT & PRICING
- ${editedProposal.pricing.starter}
- ${editedProposal.pricing.standard}
- ${editedProposal.pricing.premium}
Note: ${editedProposal.pricing.note}

6. NEXT STEPS
${editedProposal.next_steps}
`;
    copyToClipboard(text, "prop_full_text");
  };

  // Heuristics Checkers
  const checkHeadlineWords = (text: string) => {
    const count = text.trim().split(/\s+/).filter(Boolean).length;
    return { count, valid: count >= 6 && count <= 12 };
  };

  const checkHeadlineBuzzwords = (text: string) => {
    const buzzwords = ["best", "innovative", "quality", "leading", "premier", "world-class", "excellent", "top-tier", "amazing", "ultimate"];
    const found = buzzwords.filter(word => new RegExp(`\\b${word}\\b`, "i").test(text));
    return { found, valid: found.length === 0 };
  };

  const checkSubheadlineSentence = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return { count: 0, valid: false };
    const sentences = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 3);
    return { count: sentences.length, valid: sentences.length === 1 };
  };

  const checkAboutSentences = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return { count: 0, valid: false };
    const sentences = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 3);
    return { count: sentences.length, valid: sentences.length >= 3 && sentences.length <= 4 };
  };

  const checkCtaWords = (text: string) => {
    const count = text.trim().split(/\s+/).filter(Boolean).length;
    return { count, valid: count >= 2 && count <= 4 };
  };

  // SEO Heuristics Checkers
  const checkSeoTitle = (title: string) => {
    const len = title.length;
    const hasDivider = title.includes("|");
    const endsWithName = title.toLowerCase().endsWith(businessName.toLowerCase().trim());
    const valid = len >= 50 && len <= 60 && hasDivider && endsWithName;
    return { length: len, hasDivider, endsWithName, valid };
  };

  const checkSeoDesc = (desc: string) => {
    const len = desc.length;
    const hasCta = desc.toLowerCase().includes(primaryCta.toLowerCase().split(/\s+/)[0]) || desc.length > 50; // flexible check
    const valid = len >= 150 && len <= 160;
    return { length: len, hasCta, valid };
  };

  const hWords = checkHeadlineWords(editedCopy.headline);
  const hBuzz = checkHeadlineBuzzwords(editedCopy.headline);
  const sSentence = checkSubheadlineSentence(editedCopy.subheadline);
  const aSentence = checkAboutSentences(editedCopy.about);
  const cWords = checkCtaWords(editedCopy.cta_button);

  // Parse services list
  const getParsedServicesList = (servicesText: string) => {
    const parts = servicesText.split(/\n+/).filter(p => p.trim().length > 5);
    if (parts.length > 1) {
      return parts.map((part, index) => {
        const labelSplit = part.split(/[:\-]/);
        if (labelSplit.length > 1) {
          return {
            title: labelSplit[0].replace(/^\d+[\.\s]*/, "").trim(),
            description: labelSplit.slice(1).join(":").trim()
          };
        }
        return {
          title: `Service ${index + 1}`,
          description: part.trim()
        };
      });
    }
    
    const sentences = servicesText.split(/(?<=[.!?])\s+/);
    if (sentences.length > 1) {
      return sentences.map((sentence, index) => ({
        title: `Deliverable ${index + 1}`,
        description: sentence
      }));
    }

    return [
      {
        title: "Key Core Solution",
        description: servicesText
      }
    ];
  };

  const parsedServices = getParsedServicesList(editedCopy.services);

  // Preset Icon
  const getPresetIcon = (iconName: string) => {
    switch (iconName) {
      case "Croissant": return <Croissant className="w-4 h-4 text-amber-600" />;
      case "Palette": return <Palette className="w-4 h-4 text-indigo-600" />;
      case "Wrench": return <Wrench className="w-4 h-4 text-blue-600" />;
      case "Cpu": return <Cpu className="w-4 h-4 text-teal-600" />;
      case "Activity": return <Activity className="w-4 h-4 text-rose-600" />;
      default: return <Building className="w-4 h-4" />;
    }
  };

  // Interactive local editor edits
  const handleSeoTitleEdit = (index: number, text: string) => {
    setEditedSeo(prev => {
      const copy = [...prev];
      if (copy[index]) {
        copy[index] = { ...copy[index], meta_title: text };
      }
      return copy;
    });
  };

  const handleSeoDescEdit = (index: number, text: string) => {
    setEditedSeo(prev => {
      const copy = [...prev];
      if (copy[index]) {
        copy[index] = { ...copy[index], meta_description: text };
      }
      return copy;
    });
  };

  const handleSeoPageNameEdit = (index: number, text: string) => {
    setEditedSeo(prev => {
      const copy = [...prev];
      if (copy[index]) {
        copy[index] = { ...copy[index], page_name: text };
      }
      return copy;
    });
  };

  const addSeoPage = () => {
    setEditedSeo(prev => [
      ...prev,
      {
        page_name: "New Custom Page",
        meta_title: `Primary Keyword Here - Page Benefit | ${businessName}`,
        meta_description: `Focus on user benefit with a custom call to action to learn more. Start optimizing your search results today!`
      }
    ]);
  };

  const removeSeoPage = (index: number) => {
    setEditedSeo(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleColorChange = (type: "primary" | "secondary-0" | "secondary-1" | "accent", hexValue: string) => {
    setEditedPalette(prev => {
      const copy = { ...prev };
      if (type === "primary") copy.primary.hex = hexValue;
      else if (type === "accent") copy.accent.hex = hexValue;
      else if (type === "secondary-0") copy.secondary[0].hex = hexValue;
      else if (type === "secondary-1") {
        if (copy.secondary[1]) copy.secondary[1].hex = hexValue;
        else copy.secondary.push({ hex: hexValue, reason: "Alternative accent balance." });
      }
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      
      {/* 1. Header Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-semibold text-lg tracking-tight text-slate-900">LaunchNova AI</h1>
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-100 uppercase tracking-wide">
                Unified SEO & Brand Suite
              </span>
            </div>
            <p className="text-xs text-slate-500">Copywriting, Professional Color Psychology, and SEO Compliance Engine</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-xs font-mono text-slate-400 bg-slate-50 px-3 py-1 rounded-md border border-slate-200 hidden sm:inline-block">
            SEO V3.5 // Operational
          </span>
          <a 
            href="#checklist-card" 
            className="text-xs text-slate-500 hover:text-indigo-600 transition flex items-center space-x-1"
          >
            <Info className="w-4 h-4" />
            <span className="hidden md:inline font-semibold">Rules Compliance Desk</span>
          </a>
        </div>
      </header>

      {/* 2. Workspace Body Container */}
      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-73px)] overflow-hidden">
        
        {/* LEFT COLUMN: Input form and parameters */}
        <aside className="w-full lg:w-[440px] bg-white border-r border-slate-200 flex flex-col h-full overflow-y-auto shrink-0 shadow-xs">
          
          {/* Sandbox Templates Selector */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span>Autofill Business Profiles</span>
              </span>
              <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-semibold">
                Instant Fill
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {BUSINESS_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleLoadPreset(preset)}
                  className="bg-white hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200 rounded-lg px-2 py-1 text-xs font-medium text-slate-700 hover:text-indigo-900 transition flex items-center space-x-1.5 shadow-2xs"
                >
                  {getPresetIcon(preset.icon)}
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form parameters */}
          <div className="p-5 space-y-4 flex-1">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                <Settings className="w-3.5 h-3.5" />
                <span>Branding Inputs</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Parameters</span>
            </div>

            {/* Row: Business Name & Industry */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase">Business Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Acme Inc"
                  className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase">Primary CTA</label>
                <input
                  type="text"
                  value={primaryCta}
                  onChange={(e) => setPrimaryCta(e.target.value)}
                  placeholder="e.g. Book Consultation"
                  className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition"
                />
              </div>
            </div>

            {/* Industry */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-500 uppercase">Industry Category</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Sourdough Bakery"
                className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition"
              />
            </div>

            {/* Primary SEO Keywords */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Primary Keywords</span>
                <span className="text-[9px] text-slate-400 font-mono">Comma separated</span>
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. gourmet sourdough, organic bakery, bread box subscription"
                className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition"
              />
            </div>

            {/* Brand Personality */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Brand Personality</span>
                <span className="text-[9px] text-indigo-600 font-semibold">Powers color matches</span>
              </label>
              <input
                type="text"
                value={brandPersonality}
                onChange={(e) => setBrandPersonality(e.target.value)}
                placeholder="e.g. Warm, rustic, comforting, authentic"
                className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition"
              />
            </div>

            {/* Target Audience */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-500 uppercase">Target Audience Profile</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Ideal customer description"
                className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition"
              />
            </div>

            {/* Main Benefit */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-500 uppercase">Main Benefit Statement</label>
              <textarea
                value={mainBenefit}
                onChange={(e) => setMainBenefit(e.target.value)}
                rows={2}
                placeholder="The core value differentiator"
                className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition resize-none"
              />
            </div>

            {/* Pain Points */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-500 uppercase">Customer Pain Points</label>
              <textarea
                value={painPoints}
                onChange={(e) => setPainPoints(e.target.value)}
                rows={2}
                placeholder="Problems your service solves"
                className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition resize-none"
              />
            </div>

            {/* Pages Needed */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-500 uppercase">Pages Needed</label>
              <input
                type="text"
                value={pagesNeeded}
                onChange={(e) => setPagesNeeded(e.target.value)}
                placeholder="e.g. Homepage, Our Bread Menu, Subscription"
                className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition"
              />
            </div>

            {/* Error notifications */}
            {generationError && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start space-x-2 text-rose-700 text-xs mt-2">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-rose-500" />
                <p className="font-medium leading-normal">{generationError}</p>
              </div>
            )}

            {/* Generate Trigger buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleGenerateBrandSuite}
                disabled={isGenerating}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition cursor-pointer shadow-md shadow-indigo-100 ${
                  isGenerating 
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" 
                    : "bg-indigo-600 hover:bg-indigo-700 text-white active:scale-98"
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                    <span>Orchestrating Brand Suite...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-200 animate-pulse" />
                    <span>Generate Brand & SEO Suite (AI)</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={handleGenerateCopywritingOnly}
                  disabled={isGenerating}
                  className="py-1.5 px-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[10px] rounded-lg transition flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <FileText className="w-3 h-3 text-indigo-500" />
                  <span>Copy only</span>
                </button>
                <button
                  onClick={handleGeneratePaletteOnly}
                  disabled={isGenerating}
                  className="py-1.5 px-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[10px] rounded-lg transition flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Palette className="w-3 h-3 text-indigo-500" />
                  <span>Color only</span>
                </button>
                <button
                  onClick={handleGenerateSeoOnly}
                  disabled={isGenerating}
                  className="py-1.5 px-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[10px] rounded-lg transition flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Search className="w-3 h-3 text-indigo-500" />
                  <span>SEO only</span>
                </button>
                <button
                  onClick={handleGenerateProposalOnly}
                  disabled={isGenerating}
                  className="py-1.5 px-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[10px] rounded-lg transition flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Rocket className="w-3 h-3 text-indigo-500" />
                  <span>Proposal only</span>
                </button>
              </div>
            </div>
          </div>

          {/* Persistent Heuristics Checker Module */}
          <div id="checklist-card" className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-2 mt-auto text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Compliance Checklist</span>
            
            <div className="space-y-1.5 text-slate-600">
              <div className="flex items-center justify-between">
                <span>Homepage Headline:</span>
                <span className={`font-semibold ${hWords.valid ? "text-emerald-600" : "text-amber-600"}`}>
                  {hWords.count} words {hWords.valid ? "✓" : "(Needs 6-12)"}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Headline Buzzwords:</span>
                <span className={`font-semibold ${hBuzz.valid ? "text-emerald-600" : "text-rose-600"}`}>
                  {hBuzz.valid ? "Clean ✓" : `Flagged: ${hBuzz.found[0]}`}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Subheadline structure:</span>
                <span className={`font-semibold ${sSentence.valid ? "text-emerald-600" : "text-amber-600"}`}>
                  {sSentence.count} sentence {sSentence.valid ? "✓" : "(Needs 1)"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>About length:</span>
                <span className={`font-semibold ${aSentence.valid ? "text-emerald-600" : "text-amber-600"}`}>
                  {aSentence.count} sentences {aSentence.valid ? "✓" : "(Needs 3-4)"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>CTA words:</span>
                <span className={`font-semibold ${cWords.valid ? "text-emerald-600" : "text-amber-600"}`}>
                  {cWords.count} words {cWords.valid ? "✓" : "(Needs 2-4)"}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: Output Preview & Sandbox workspace */}
        <main className="flex-1 bg-slate-100 flex flex-col h-full overflow-hidden relative">
          
          {/* Header tabs */}
          <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between shrink-0 gap-3">
            <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "preview" 
                    ? "bg-white text-slate-900 shadow-xs" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Layout className="w-3.5 h-3.5" />
                <span>🖥️ Real-Time Site</span>
              </button>
              
              <button
                onClick={() => setActiveTab("copydeck")}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "copydeck" 
                    ? "bg-white text-slate-900 shadow-xs" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>📋 Copywriting</span>
              </button>

              <button
                onClick={() => setActiveTab("palette")}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "palette" 
                    ? "bg-white text-slate-900 shadow-xs" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>🎨 Color Board</span>
              </button>

              <button
                onClick={() => setActiveTab("seo")}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "seo" 
                    ? "bg-white text-slate-900 shadow-xs" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>🔍 SEO Manager</span>
              </button>

              <button
                onClick={() => setActiveTab("proposal")}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "proposal" 
                    ? "bg-white text-slate-900 shadow-xs" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Rocket className="w-3.5 h-3.5 text-indigo-500" />
                <span>💼 Client Proposal</span>
              </button>

              <button
                onClick={() => setActiveTab("json")}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "json" 
                    ? "bg-white text-slate-900 shadow-xs" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>💻 JSON Schema</span>
              </button>
            </div>

            {/* Preview controls */}
            <div className="flex items-center space-x-3">
              {activeTab === "preview" && (
                <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setPreviewViewport("desktop")}
                    className={`p-1 rounded text-xs transition ${
                      previewViewport === "desktop" ? "bg-white text-slate-800 shadow-xs" : "text-slate-400 hover:text-slate-600"
                    }`}
                    title="Desktop Preview"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewViewport("mobile")}
                    className={`p-1 rounded text-xs transition ${
                      previewViewport === "mobile" ? "bg-white text-slate-800 shadow-xs" : "text-slate-400 hover:text-slate-600"
                    }`}
                    title="Mobile Portrait"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              )}

              <button
                onClick={copyCombinedJSON}
                className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer"
              >
                {copiedField === "all_json" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied Schema!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All JSON</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tab Workspaces */}
          <div className="flex-1 p-6 overflow-y-auto min-h-0 flex flex-col items-center">
            
            {/* Loading Cover Overlay */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-6"
                >
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 text-center flex flex-col items-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 relative">
                      <RefreshCw className="w-8 h-8 animate-spin text-indigo-600" />
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-slate-800 text-base">LaunchNova Writing Suite</h4>
                      <p className="text-xs text-indigo-600 font-semibold mt-1 uppercase tracking-wider">{generationStep}</p>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <motion.div 
                        className="bg-indigo-600 h-full rounded-full"
                        animate={{ width: ["5%", "45%", "85%", "98%"] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400">Harmonizing copywriting constraints with professional color psychology hex mapping and SEO meta tags.</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TAB 1: Real-time Website Preview incorporating Suggested Palette */}
            {activeTab === "preview" && (
              <div 
                className={`w-full transition-all duration-300 ${
                  previewViewport === "mobile" ? "max-w-xs md:max-w-sm animate-fade-in" : "max-w-5xl"
                } bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col`}
              >
                {/* Mock Browser Header */}
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 select-none">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  
                  <div className="bg-white rounded-lg px-4 py-1 text-[11px] text-slate-400 font-mono flex items-center space-x-1.5 w-6/12 sm:w-7/12 truncate border border-slate-200 shadow-3xs">
                    <Globe className="w-3.5 h-3.5 text-slate-300" />
                    <span className="text-slate-600">https://www.</span>
                    <span className="text-indigo-600 font-semibold">
                      {businessName.toLowerCase().trim().replace(/[^a-z0-9]/g, "") || "yourbusiness"}
                    </span>
                    <span className="text-slate-600">.com</span>
                  </div>

                  <span className="bg-emerald-50 text-emerald-700 text-[9px] px-1.5 py-0.5 rounded border border-emerald-200 font-bold uppercase">
                    Suggested Theme Live
                  </span>
                </div>

                {/* Simulated Website Frame content */}
                <div 
                  className="flex-1 transition-all duration-300 p-0 text-slate-900"
                  style={{ 
                    backgroundColor: editedPalette.secondary[1]?.hex || "#F8FAFC",
                    color: editedPalette.primary.hex 
                  }}
                >
                  <div className="flex flex-col min-h-[500px]">
                    
                    {/* Navigation Bar */}
                    <nav className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: `${editedPalette.primary.hex}22`, backgroundColor: "#ffffffcc" }}>
                      <span className="text-sm font-bold tracking-tight" style={{ color: editedPalette.primary.hex }}>
                        {businessName || "Your Brand"}
                      </span>
                      <div className="hidden sm:flex items-center space-x-6 text-xs font-semibold">
                        <span>Home</span>
                        <span>About</span>
                        <span>Our Services</span>
                        <span>Contact</span>
                      </div>
                      <button 
                        className="text-xs font-bold px-3 py-1.5 rounded-lg transition active:scale-95" 
                        style={{ backgroundColor: editedPalette.accent.hex, color: "#ffffff" }}
                      >
                        {editedCopy.cta_button || "Get in Touch"}
                      </button>
                    </nav>

                    {/* Hero Section */}
                    <header className="px-6 py-12 md:py-20 text-center max-w-3xl mx-auto flex flex-col items-center space-y-6">
                      
                      <div className="inline-flex items-center space-x-1 text-[10px] px-2.5 py-1 rounded-full font-mono border animate-pulse" style={{ borderColor: `${editedPalette.accent.hex}44`, backgroundColor: `${editedPalette.secondary[1]?.hex}ee` }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: editedPalette.accent.hex }} />
                        <span>Suggested Colors Active</span>
                      </div>

                      <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: editedPalette.primary.hex }}>
                        {editedCopy.headline || "Transform Your Daily Brand Workflow Instantly"}
                      </h2>
                      
                      <p className="text-sm sm:text-base md:text-lg max-w-xl opacity-90 leading-relaxed">
                        {editedCopy.subheadline || "We craft high-fidelity designs and brand elements tailored to launch digital products smoothly."}
                      </p>

                      <div className="pt-4">
                        <button 
                          className="text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition shadow-lg hover:brightness-105 active:scale-95" 
                          style={{ backgroundColor: editedPalette.accent.hex, color: "#ffffff", boxShadow: `0 10px 15px -3px ${editedPalette.accent.hex}33` }}
                        >
                          {editedCopy.cta_button || "Reserve Consultation"}
                        </button>
                      </div>
                    </header>

                    {/* About Section */}
                    <section className="px-6 py-12 md:py-16 border-y" style={{ borderColor: `${editedPalette.primary.hex}11`, backgroundColor: `${editedPalette.primary.hex}08` }}>
                      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        <div className="w-full md:w-5/12 space-y-3">
                          <span className="uppercase font-bold tracking-widest text-xs" style={{ color: editedPalette.accent.hex }}>About Our Mission</span>
                          <h3 className="text-xl sm:text-2xl font-bold" style={{ color: editedPalette.primary.hex }}>
                            Designed for real impact
                          </h3>
                          <div className="w-12 h-1 rounded-full shrink-0" style={{ backgroundColor: editedPalette.accent.hex }} />
                        </div>
                        
                        <div className="w-full md:w-7/12">
                          <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                            {editedCopy.about || "Most brands fail because they use templates that do not address customer problems."}
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Services Section */}
                    <section className="px-6 py-12 md:py-16 max-w-5xl mx-auto w-full space-y-8">
                      <div className="text-center space-y-2">
                        <span className="uppercase tracking-widest text-xs font-bold" style={{ color: editedPalette.accent.hex }}>Solutions Suite</span>
                        <h3 className="text-xl sm:text-2xl font-bold" style={{ color: editedPalette.primary.hex }}>
                          Tailored Service Deliverables
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {parsedServices.map((service, idx) => (
                          <div 
                            key={idx} 
                            className="p-6 rounded-2xl border flex flex-col space-y-4 transition" 
                            style={{ 
                              backgroundColor: "#ffffff", 
                              borderColor: `${editedPalette.primary.hex}15`,
                              boxShadow: `0 4px 6px -1px rgba(0,0,0,0.02)`
                            }}
                          >
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${editedPalette.accent.hex}15` }}>
                              <Sparkles className="w-5 h-5" style={{ color: editedPalette.accent.hex }} />
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-sm sm:text-base font-bold" style={{ color: editedPalette.primary.hex }}>
                                {service.title}
                              </h4>
                              <p className="text-xs leading-relaxed opacity-80" style={{ color: editedPalette.primary.hex }}>
                                {service.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Minimal Footer */}
                    <footer className="mt-auto px-6 py-8 text-center text-xs border-t" style={{ borderColor: `${editedPalette.primary.hex}15`, backgroundColor: `${editedPalette.primary.hex}05` }}>
                      <p>© 2026 {businessName || "Your Brand"}. Custom branding generated using LaunchNova AI.</p>
                    </footer>

                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: Copywriting Deck */}
            {activeTab === "copydeck" && (
              <div className="w-full max-w-3xl space-y-6">
                
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex items-start space-x-3.5 shadow-2xs">
                  <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">LaunchNova Compliance Deck</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Review, polish, and copy your generated copies below. You can edit the text blocks directly to adjust layout parameters.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  
                  {/* Headline Block */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center">1</span>
                        <h4 className="text-sm font-semibold text-slate-800">Homepage Headline</h4>
                      </div>
                      
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        hWords.valid && hBuzz.valid
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {hWords.count} words {hWords.valid ? "(Perfect Length)" : "(Requires 6-12 words)"}
                      </span>
                    </div>

                    <textarea
                      value={editedCopy.headline}
                      onChange={(e) => setEditedCopy(prev => ({ ...prev, headline: e.target.value }))}
                      rows={2}
                      className="w-full border border-slate-200 rounded-xl p-4 text-sm font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 transition resize-none"
                    />

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Guidelines: 6-12 words, benefit-focused, no generic buzzwords.</span>
                      <button
                        onClick={() => copyToClipboard(editedCopy.headline, "headline")}
                        className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                      >
                        {copiedField === "headline" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Headline</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Subheadline Block */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center">2</span>
                        <h4 className="text-sm font-semibold text-slate-800">Homepage Subheadline</h4>
                      </div>

                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        sSentence.valid 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {sSentence.count} sentence {sSentence.valid ? "(Perfect)" : "(Must be exactly 1 sentence)"}
                      </span>
                    </div>

                    <textarea
                      value={editedCopy.subheadline}
                      onChange={(e) => setEditedCopy(prev => ({ ...prev, subheadline: e.target.value }))}
                      rows={2}
                      className="w-full border border-slate-200 rounded-xl p-4 text-sm text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 transition resize-none"
                    />

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Guidelines: One sentence explaining how the business delivers the benefit.</span>
                      <button
                        onClick={() => copyToClipboard(editedCopy.subheadline, "subheadline")}
                        className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                      >
                        {copiedField === "subheadline" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Subheadline</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* About Section Block */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center">3</span>
                        <h4 className="text-sm font-semibold text-slate-800">About Paragraph</h4>
                      </div>

                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        aSentence.valid 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {aSentence.count} sentences {aSentence.valid ? "(Perfect)" : "(Must be 3-4 sentences)"}
                      </span>
                    </div>

                    <textarea
                      value={editedCopy.about}
                      onChange={(e) => setEditedCopy(prev => ({ ...prev, about: e.target.value }))}
                      rows={4}
                      className="w-full border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 transition"
                    />

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Guidelines: 3-4 sentences detailing business value vs target audience struggles.</span>
                      <button
                        onClick={() => copyToClipboard(editedCopy.about, "about")}
                        className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                      >
                        {copiedField === "about" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy About Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Services Block */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center">4</span>
                        <h4 className="text-sm font-semibold text-slate-800">Key Services / Deliverables List</h4>
                      </div>
                    </div>

                    <textarea
                      value={editedCopy.services}
                      onChange={(e) => setEditedCopy(prev => ({ ...prev, services: e.target.value }))}
                      rows={5}
                      className="w-full border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 transition"
                    />

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Format: Line-by-line service title followed by description.</span>
                      <button
                        onClick={() => copyToClipboard(editedCopy.services, "services")}
                        className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                      >
                        {copiedField === "services" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Services List</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* CTA button text */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center">5</span>
                        <h4 className="text-sm font-semibold text-slate-800">CTA Button Text</h4>
                      </div>

                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        cWords.valid 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {cWords.count} words {cWords.valid ? "(Perfect)" : "(Must be 2-4 words)"}
                      </span>
                    </div>

                    <input
                      type="text"
                      value={editedCopy.cta_button}
                      onChange={(e) => setEditedCopy(prev => ({ ...prev, cta_button: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 transition"
                    />

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Guidelines: Actionable, exactly 2 to 4 words.</span>
                      <button
                        onClick={() => copyToClipboard(editedCopy.cta_button, "cta_button")}
                        className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                      >
                        {copiedField === "cta_button" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy CTA Button Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 3: Palette psychology board */}
            {activeTab === "palette" && (
              <div className="w-full max-w-4xl space-y-6">
                
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 font-bold font-mono text-8xl select-none pointer-events-none">
                    HEX
                  </div>
                  <div className="relative space-y-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">Color Psychology Engine</span>
                    <h3 className="text-xl font-bold tracking-tight">Vibe, Harmony & Contrast Map</h3>
                    <p className="text-xs text-slate-400 max-w-2xl">
                      Each suggested hex code is generated by assessing the psychological attributes of your brand personality:{" "}
                      <span className="text-indigo-300 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded-md">
                        {brandPersonality || "None specified"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Color Palettes Grid */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                    <h4 className="text-sm font-semibold text-slate-800 flex items-center space-x-2">
                      <Sliders className="w-4 h-4 text-indigo-600" />
                      <span>Custom Color Adjusters</span>
                    </h4>

                    {/* Primary Color Adjust */}
                    <div className="space-y-2 border-b border-slate-100 pb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-600">Primary Color (Brand Tone)</span>
                        <span className="font-mono text-indigo-600 font-semibold">{editedPalette.primary.hex}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={editedPalette.primary.hex}
                          onChange={(e) => handleColorChange("primary", e.target.value)}
                          className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                        />
                        <input
                          type="text"
                          value={editedPalette.primary.hex}
                          onChange={(e) => handleColorChange("primary", e.target.value)}
                          className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono"
                        />
                      </div>
                    </div>

                    {/* Secondary Colors */}
                    <div className="space-y-3 border-b border-slate-100 pb-4">
                      <span className="block text-xs font-bold text-slate-600">Secondary / Background Colors</span>
                      
                      {editedPalette.secondary.map((sec, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={sec.hex}
                            onChange={(e) => handleColorChange(idx === 0 ? "secondary-0" : "secondary-1", e.target.value)}
                            className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                          />
                          <input
                            type="text"
                            value={sec.hex}
                            onChange={(e) => handleColorChange(idx === 0 ? "secondary-0" : "secondary-1", e.target.value)}
                            className="flex-1 border border-slate-200 rounded-lg px-3 py-1 text-xs font-mono"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Accent Color Adjust (CTA Contrast) */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-rose-600">Accent Color (High-Contrast CTA)</span>
                        <span className="font-mono text-rose-600 font-semibold">{editedPalette.accent.hex}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={editedPalette.accent.hex}
                          onChange={(e) => handleColorChange("accent", e.target.value)}
                          className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                        />
                        <input
                          type="text"
                          value={editedPalette.accent.hex}
                          onChange={(e) => handleColorChange("accent", e.target.value)}
                          className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">Ensure this color stands out brightly on both dark and light backdrops.</p>
                    </div>

                  </div>

                  {/* Brand Psychology Reasons */}
                  <div className="space-y-4">
                    
                    {/* Primary reason */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl shrink-0 shadow-inner border border-slate-200/60" style={{ backgroundColor: editedPalette.primary.hex }} />
                      <div className="space-y-1">
                        <h5 className="text-xs font-bold text-slate-400 uppercase">Primary Psychology</h5>
                        <p className="text-xs text-slate-700 leading-relaxed italic">
                          "{editedPalette.primary.reason}"
                        </p>
                      </div>
                    </div>

                    {/* Secondary reasons */}
                    {editedPalette.secondary.map((sec, idx) => (
                      <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-xl shrink-0 shadow-inner border border-slate-200/60" style={{ backgroundColor: sec.hex }} />
                        <div className="space-y-1">
                          <h5 className="text-xs font-bold text-slate-400 uppercase">Secondary #{idx + 1} Psychology</h5>
                          <p className="text-xs text-slate-700 leading-relaxed italic">
                            "{sec.reason}"
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Accent reasons */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl shrink-0 shadow-inner border border-slate-200/60" style={{ backgroundColor: editedPalette.accent.hex }} />
                      <div className="space-y-1">
                        <h5 className="text-xs font-bold text-rose-500 uppercase">Accent Psychology</h5>
                        <p className="text-xs text-slate-700 leading-relaxed italic">
                          "{editedPalette.accent.reason}"
                        </p>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* TAB 4: SEO specialist metadata board */}
            {activeTab === "seo" && (
              <div className="w-full max-w-4xl space-y-6">
                
                <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-6 opacity-10 text-9xl font-extrabold select-none pointer-events-none">
                    SEO
                  </div>
                  <div className="relative space-y-2 max-w-3xl">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest block">Search Engine Specialist</span>
                    <h3 className="text-xl font-bold tracking-tight">Compliance SEO Metadata Manager</h3>
                    <p className="text-xs text-indigo-200 leading-relaxed">
                      Automatically generate optimized Meta Titles and Descriptions conforming to Google search metrics. 
                      Each generated tag integrates high-value keywords naturally while respecting strict length criteria.
                    </p>
                  </div>
                </div>

                {/* Main SEO list */}
                <div className="space-y-6">
                  {editedSeo.map((seo, index) => {
                    const titleCheck = checkSeoTitle(seo.meta_title);
                    const descCheck = checkSeoDesc(seo.meta_description);

                    return (
                      <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 relative">
                        
                        {/* Header controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                              Page {index + 1}
                            </span>
                            <input
                              type="text"
                              value={seo.page_name}
                              onChange={(e) => handleSeoPageNameEdit(index, e.target.value)}
                              className="font-bold text-sm text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-hidden transition px-1"
                            />
                          </div>

                          <button
                            onClick={() => removeSeoPage(index)}
                            className="text-xs text-rose-500 hover:text-rose-700 transition flex items-center space-x-1 self-end sm:self-auto cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Remove page</span>
                          </button>
                        </div>

                        {/* Title input */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-medium">
                            <label className="text-slate-600 font-bold uppercase tracking-wider text-[10px]">Meta Title</label>
                            <div className="flex items-center space-x-2">
                              <span className={`px-1.5 py-0.5 rounded-sm font-semibold text-[10px] ${
                                titleCheck.valid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                              }`}>
                                {titleCheck.length} characters (Target: 50-60)
                              </span>
                              <span className={`px-1.5 py-0.5 rounded-sm font-semibold text-[10px] ${
                                titleCheck.hasDivider ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                              }`}>
                                {titleCheck.hasDivider ? "✓ Has '|'" : "✗ Missing '|' divider"}
                              </span>
                            </div>
                          </div>
                          
                          <input
                            type="text"
                            value={seo.meta_title}
                            onChange={(e) => handleSeoTitleEdit(index, e.target.value)}
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-700 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                          />
                        </div>

                        {/* Description input */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-medium">
                            <label className="text-slate-600 font-bold uppercase tracking-wider text-[10px]">Meta Description</label>
                            <div className="flex items-center space-x-2">
                              <span className={`px-1.5 py-0.5 rounded-sm font-semibold text-[10px] ${
                                descCheck.valid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                              }`}>
                                {descCheck.length} characters (Target: 150-160)
                              </span>
                            </div>
                          </div>

                          <textarea
                            value={seo.meta_description}
                            onChange={(e) => handleSeoDescEdit(index, e.target.value)}
                            rows={2}
                            className="w-full border border-slate-200 rounded-lg p-3 text-xs font-mono text-slate-600 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 resize-none"
                          />
                        </div>

                        {/* Search Result Snippet Simulation preview */}
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-150 space-y-1">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 block">Google Search Result Snippet Preview</span>
                          <div className="text-xs font-mono text-slate-400 truncate">
                            https://www.{businessName.toLowerCase().trim().replace(/[^a-z0-9]/g, "")}.com/{seo.page_name.toLowerCase().trim().replace(/\s+/g, "-")}
                          </div>
                          <div className="text-sm text-[#1a0dab] font-medium hover:underline cursor-pointer leading-tight truncate">
                            {seo.meta_title || "Please enter metadata title"}
                          </div>
                          <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                            {seo.meta_description || "Please enter metadata description snippet to view visual simulation."}
                          </p>
                        </div>

                        {/* Copy specific metadata row */}
                        <div className="flex items-center justify-end space-x-3 pt-1">
                          <button
                            onClick={() => copyToClipboard(`Title: ${seo.meta_title}\nDescription: ${seo.meta_description}`, `seo_${index}`)}
                            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1 cursor-pointer"
                          >
                            {copiedField === `seo_${index}` ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Copied Tags!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Snippet</span>
                              </>
                            )}
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Add new SEO Page row */}
                <div className="flex items-center justify-center pt-2">
                  <button
                    onClick={addSeoPage}
                    className="border border-dashed border-slate-300 hover:border-indigo-500 bg-white hover:bg-indigo-50/20 text-slate-700 hover:text-indigo-600 font-bold text-xs px-6 py-3 rounded-xl transition flex items-center space-x-2 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another Web Page SEO Entry</span>
                  </button>
                </div>

              </div>
            )}

            {/* TAB 4.5: Client Proposal Board */}
            {activeTab === "proposal" && (
              <div className="w-full max-w-4xl space-y-6">
                
                <div className="bg-indigo-950 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden border border-indigo-900">
                  <div className="absolute -right-4 -bottom-6 opacity-10 text-9xl font-extrabold select-none pointer-events-none">
                    PROPOSAL
                  </div>
                  <div className="relative space-y-2 max-w-3xl">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest block">Client Proposal Workspace</span>
                    <h3 className="text-xl font-bold tracking-tight">Structured Website Proposal</h3>
                    <p className="text-xs text-indigo-200 leading-relaxed">
                      Review, customize, and copy a client-ready website proposal. It maps requirements to design/development sprints, sets the standard three-tiered USD pricing, and structures onboarding triggers.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={copyWholeProposalAsText}
                    className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg px-4 py-2 text-xs font-semibold transition cursor-pointer"
                  >
                    {copiedField === "prop_full_text" ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied Whole Proposal!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Proposal (Formatted Text)</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-6">
                  {/* 1. Project Overview */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center">1</span>
                        <h4 className="text-sm font-bold text-slate-800">Project Overview</h4>
                      </div>
                      <button
                        onClick={() => copyToClipboard(editedProposal.project_overview, "prop_overview")}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1 cursor-pointer"
                      >
                        {copiedField === "prop_overview" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedField === "prop_overview" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>

                    <textarea
                      value={editedProposal.project_overview}
                      onChange={(e) => setEditedProposal(prev => ({ ...prev, project_overview: e.target.value }))}
                      rows={3}
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 transition"
                      placeholder="Enter outcome-focused project overview..."
                    />
                  </div>

                  {/* 2. Requirements */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center">2</span>
                        <h4 className="text-sm font-bold text-slate-800">Understanding of Requirements</h4>
                      </div>
                      <button
                        onClick={() => copyToClipboard(editedProposal.requirements.join("\n"), "prop_requirements")}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1 cursor-pointer"
                      >
                        {copiedField === "prop_requirements" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedField === "prop_requirements" ? "Copied" : "Copy List"}</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {editedProposal.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <span className="text-indigo-500 font-bold mt-1 text-xs">•</span>
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => {
                              const updated = [...editedProposal.requirements];
                              updated[idx] = e.target.value;
                              setEditedProposal(prev => ({ ...prev, requirements: updated }));
                            }}
                            className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                          />
                          <button
                            onClick={() => {
                              const updated = editedProposal.requirements.filter((_, i) => i !== idx);
                              setEditedProposal(prev => ({ ...prev, requirements: updated }));
                            }}
                            className="text-slate-400 hover:text-rose-500 p-1.5 transition cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => {
                          setEditedProposal(prev => ({
                            ...prev,
                            requirements: [...prev.requirements, "New client requirement statement..."]
                          }));
                        }}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1 pt-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Requirement Item</span>
                      </button>
                    </div>
                  </div>

                  {/* 3. Deliverables */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center">3</span>
                        <h4 className="text-sm font-bold text-slate-800">Proposed Solution & Deliverables</h4>
                      </div>
                      <button
                        onClick={() => copyToClipboard(editedProposal.deliverables.join("\n"), "prop_deliverables")}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1 cursor-pointer"
                      >
                        {copiedField === "prop_deliverables" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedField === "prop_deliverables" ? "Copied" : "Copy List"}</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {editedProposal.deliverables.map((del, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                          <input
                            type="text"
                            value={del}
                            onChange={(e) => {
                              const updated = [...editedProposal.deliverables];
                              updated[idx] = e.target.value;
                              setEditedProposal(prev => ({ ...prev, deliverables: updated }));
                            }}
                            className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                          />
                          <button
                            onClick={() => {
                              const updated = editedProposal.deliverables.filter((_, i) => i !== idx);
                              setEditedProposal(prev => ({ ...prev, deliverables: updated }));
                            }}
                            className="text-slate-400 hover:text-rose-500 p-1.5 transition cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => {
                          setEditedProposal(prev => ({
                            ...prev,
                            deliverables: [...prev.deliverables, "New custom page or key deliverable..."]
                          }));
                        }}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1 pt-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Deliverable Item</span>
                      </button>
                    </div>
                  </div>

                  {/* 4. Timeline */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center">4</span>
                        <h4 className="text-sm font-bold text-slate-800">Timeline breakdown (3 Sprints)</h4>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`Week 1: ${editedProposal.timeline.week1}\nWeek 2: ${editedProposal.timeline.week2}\nWeek 3: ${editedProposal.timeline.week3}`, "prop_timeline")}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1 cursor-pointer"
                      >
                        {copiedField === "prop_timeline" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedField === "prop_timeline" ? "Copied" : "Copy Timeline"}</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Week 1: Research & Design</label>
                        <textarea
                          value={editedProposal.timeline.week1}
                          onChange={(e) => setEditedProposal(prev => ({
                            ...prev,
                            timeline: { ...prev.timeline, week1: e.target.value }
                          }))}
                          rows={2}
                          className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Week 2: Development & Customization</label>
                        <textarea
                          value={editedProposal.timeline.week2}
                          onChange={(e) => setEditedProposal(prev => ({
                            ...prev,
                            timeline: { ...prev.timeline, week2: e.target.value }
                          }))}
                          rows={2}
                          className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Week 3: Testing & Launch Deployment</label>
                        <textarea
                          value={editedProposal.timeline.week3}
                          onChange={(e) => setEditedProposal(prev => ({
                            ...prev,
                            timeline: { ...prev.timeline, week3: e.target.value }
                          }))}
                          rows={2}
                          className="w-full border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 5. Pricing (Starter, Standard, Premium) */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center">5</span>
                        <h4 className="text-sm font-bold text-slate-800">Proposal Investment Tiers</h4>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`Starter: ${editedProposal.pricing.starter}\nStandard: ${editedProposal.pricing.standard}\nPremium: ${editedProposal.pricing.premium}\nNote: ${editedProposal.pricing.note}`, "prop_pricing")}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1 cursor-pointer"
                      >
                        {copiedField === "prop_pricing" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedField === "prop_pricing" ? "Copied" : "Copy Pricing"}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Starter Package Box */}
                      <div className="border border-slate-150 rounded-xl p-4 space-y-2 bg-slate-50/50">
                        <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">Starter Package</span>
                        <textarea
                          value={editedProposal.pricing.starter}
                          onChange={(e) => setEditedProposal(prev => ({
                            ...prev,
                            pricing: { ...prev.pricing, starter: e.target.value }
                          }))}
                          rows={4}
                          className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-white"
                        />
                      </div>

                      {/* Standard Package Box */}
                      <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-indigo-50/20 ring-1 ring-indigo-500/10">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-wider">Standard Package</span>
                          <span className="bg-indigo-100 text-indigo-800 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Most Popular</span>
                        </div>
                        <textarea
                          value={editedProposal.pricing.standard}
                          onChange={(e) => setEditedProposal(prev => ({
                            ...prev,
                            pricing: { ...prev.pricing, standard: e.target.value }
                          }))}
                          rows={4}
                          className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-white"
                        />
                      </div>

                      {/* Premium Package Box */}
                      <div className="border border-slate-150 rounded-xl p-4 space-y-2 bg-slate-50/50">
                        <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">Premium Package</span>
                        <textarea
                          value={editedProposal.pricing.premium}
                          onChange={(e) => setEditedProposal(prev => ({
                            ...prev,
                            pricing: { ...prev.pricing, premium: e.target.value }
                          }))}
                          rows={4}
                          className="w-full border border-slate-200 rounded-lg p-2 text-xs text-slate-700 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Adjustment Note (Local Currency / Terms)</label>
                      <input
                        type="text"
                        value={editedProposal.pricing.note}
                        onChange={(e) => setEditedProposal(prev => ({
                          ...prev,
                          pricing: { ...prev.pricing, note: e.target.value }
                        }))}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* 6. Next Steps */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center">6</span>
                        <h4 className="text-sm font-bold text-slate-800">Next Steps & Project Onboarding</h4>
                      </div>
                      <button
                        onClick={() => copyToClipboard(editedProposal.next_steps, "prop_next_steps")}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1 cursor-pointer"
                      >
                        {copiedField === "prop_next_steps" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedField === "prop_next_steps" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>

                    <textarea
                      value={editedProposal.next_steps}
                      onChange={(e) => setEditedProposal(prev => ({ ...prev, next_steps: e.target.value }))}
                      rows={3}
                      className="w-full border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-500 transition"
                      placeholder="Enter details on client onboard triggers..."
                    />
                  </div>

                </div>

              </div>
            )}

            {/* TAB 5: JSON Schema Export */}
            {activeTab === "json" && (
              <div className="w-full max-w-3xl space-y-4">
                
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">LaunchNova Schema Deliverable</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Copy the fully cohesive JSON package directly below for external integrations.</p>
                    </div>

                    <button
                      onClick={copyCombinedJSON}
                      className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                    >
                      {copiedField === "all_json" ? "✓ Copied!" : "Copy Full Schema"}
                    </button>
                  </div>

                  <pre className="bg-slate-900 text-indigo-200 rounded-xl p-5 text-xs font-mono overflow-x-auto max-h-[480px]">
                    {JSON.stringify({
                      business: {
                        name: businessName,
                        industry,
                        brandPersonality,
                        targetAudience,
                        keywords,
                        primaryCta,
                        pagesRequested: pagesNeeded
                      },
                      copywriting: editedCopy,
                      color_palette: editedPalette,
                      seo_metadata: editedSeo,
                      proposal: editedProposal
                    }, null, 2)}
                  </pre>
                </div>

              </div>
            )}

          </div>

        </main>

      </div>

    </div>
  );
}
