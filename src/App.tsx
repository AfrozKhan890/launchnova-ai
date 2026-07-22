import React, { useState, useCallback } from "react";
import {
  Monitor,
  FileText,
  Palette,
  Search,
  Code,
  Sparkles,
  Download,
  Check,
  AlertCircle,
  AlertTriangle
} from "lucide-react";
import { BUSINESS_PRESETS, BusinessPreset } from "./presets";
import {
  CopywritingOutput,
  PaletteOutput,
  SeoPageMetadata,
  WebsiteProposal,
  ActiveTab,
  PreviewViewport,
  PreviewPage
} from "./types";
import { Header } from "./components/Header";
import { FormSidebar } from "./components/FormSidebar";
import { PreviewFrame } from "./components/PreviewFrame";
import { CopyDeckTab } from "./components/CopyDeckTab";
import { PaletteTab } from "./components/PaletteTab";
import { SeoTab } from "./components/SeoTab";
import { ProposalTab } from "./components/ProposalTab";
import { JsonExportTab } from "./components/JsonExportTab";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { ExportModal } from "./components/ExportModal";

export default function App() {
  // 1. INPUT STATES
  const [selectedPresetId, setSelectedPresetId] = useState("agency");
  const [businessName, setBusinessName] = useState("PixelCraft Studios");
  const [industry, setIndustry] = useState("Creative Agency (Freelance Brand Designer)");
  const [targetAudience, setTargetAudience] = useState("Ambitious startup founders launching new products needing to build instant authority");
  const [mainBenefit, setMainBenefit] = useState("Cohesive, signature minimalist branding systems designed to turn viewers into loyal advocates");
  const [painPoints, setPainPoints] = useState("Generic template logos, expensive slow-moving agency retainers, lack of visual consistency");
  const [pagesNeeded, setPagesNeeded] = useState("Homepage, Visual Identity Design, Collaborative Brand Strategy, Portfolio Showcase");
  const [brandPersonality, setBrandPersonality] = useState("Sleek, minimalist, highly professional, modern and authoritative");
  const [keywords, setKeywords] = useState("brand designer, minimalist brand identity, startup design agency, premium logo design, visual branding");
  const [primaryCta, setPrimaryCta] = useState("Design Your Signature Brand");

  // 2. UI NAVIGATION STATES
  const [activeTab, setActiveTab] = useState<ActiveTab>("preview");
  const [previewViewport, setPreviewViewport] = useState<PreviewViewport>("desktop");
  const [activePreviewPage, setActivePreviewPage] = useState<PreviewPage>("home");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // 3. GENERATION ASYNC STATES
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [generationError, setGenerationError] = useState("");
  const [isFallbackUsed, setIsFallbackUsed] = useState(false);

  // 4. GENERATED OUTPUT STATES
  const [editedCopy, setEditedCopy] = useState<CopywritingOutput>({
    tagline: "Signature Brand Identity Studio",
    headline: "We shape signatures that command immediate authority.",
    subheadline: "By pairing meticulous typography with custom visual identity, we build brand systems that turn curious prospects into lifelong advocates.",
    about: "Most startup founders struggle to stand out in crowded digital markets with cheap template logos. At PixelCraft Studios, we believe your visual presence should establish instant credibility. We deliver premium, bespoke brand identities tailored specifically to captivate high-value enterprise clients.",
    services: "Brand Identity Design: Crafting tailored typography, logo assets, and bespoke visual guidelines.\nCollaborative Brand Strategy: Deep research workshops to identify and dominate your market niche.\nPortfolio & Web Design: Engineering pixel-perfect landing pages optimized to showcase your signature craft.",
    features: [
      {
        title: "Signature Typography",
        description: "Bespoke mathematical font pairings establishing visual contrast and instant trust."
      },
      {
        title: "Strategic Brand Systems",
        description: "Complete asset suites engineered specifically for high-growth tech startups."
      },
      {
        title: "Conversion Web Design",
        description: "Pixel-perfect, lightning-fast landing pages optimized for client acquisition."
      }
    ],
    faq: [
      {
        question: "How long does a brand identity project take?",
        answer: "Our typical brand identity sprint takes 2 to 3 weeks from discovery to final asset delivery."
      },
      {
        question: "What deliverables are included in the brand package?",
        answer: "You receive vector logos, brand guidelines, color palettes, typography specs, and responsive web components."
      },
      {
        question: "Can I request revisions during the design process?",
        answer: "Yes! Standard and Premium packages include collaborative revision rounds to ensure 100% satisfaction."
      }
    ],
    guarantee: "Backing every design with our 100% brand clarity and workmanship guarantee.",
    cta_button: "Design Your Signature Brand"
  });

  const [editedPalette, setEditedPalette] = useState<PaletteOutput>({
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

  const [editedSeo, setEditedSeo] = useState<SeoPageMetadata[]>([
    {
      page_name: "Homepage",
      meta_title: "Minimalist Brand Identity Studio | PixelCraft Studios",
      meta_description: "Build instant authority with cohesive visual brand systems. Design your signature brand to turn curious prospects into loyal advocates. Consult us today!"
    },
    {
      page_name: "Visual Identity Design",
      meta_title: "Custom Logo & Typography Design | PixelCraft Studios",
      meta_description: "Craft bespoke visual brand identities with tailored typography, logo marks, and comprehensive design systems for high-growth startups."
    },
    {
      page_name: "Collaborative Brand Strategy",
      meta_title: "Strategic Market Positioning Workshops | PixelCraft Studios",
      meta_description: "Discover your true brand voice and dominate your industry niche through deep research and strategic visual positioning workshops."
    },
    {
      page_name: "Portfolio Showcase",
      meta_title: "Selected Design Case Studies | PixelCraft Studios",
      meta_description: "Explore our signature brand identity case studies and see how we help ambitious startup founders command market authority."
    }
  ]);

  const [proposal, setProposal] = useState<WebsiteProposal>({
    project_overview: "PixelCraft Studios will engineer a cohesive, signature minimalist brand identity and conversion-focused web presence designed to elevate brand authority and attract high-value clients.",
    requirements: [
      "Eliminate generic template visual aesthetics and low-value brand perception.",
      "Establish a memorable, mathematically balanced typography and color system.",
      "Launch a pixel-perfect, responsive digital presence optimized for conversion."
    ],
    deliverables: [
      "Primary, secondary, and mark logo assets (SVG, PNG, EPS)",
      "Comprehensive Brand Style Guide & Typography Spec",
      "Responsive 4-Page Landing Suite with Conversion Copywriting",
      "SEO Metadata Optimization & SERP Snippet Setup"
    ],
    timeline: {
      week1: "Brand Discovery & Strategic Positioning Workshops",
      week2: "Visual Identity Design & High-Converting Copywriting",
      week3: "Web Development, SEO Configuration & Final Handoff"
    },
    pricing: {
      starter: "Starter Package ($150 USD): Single-page landing page with core logo mark and essential style guide.",
      standard: "Standard Package ($350 USD): Up to 5 custom pages, full SEO optimization, complete brand guidelines, and 1 revision round.",
      premium: "Premium Package ($600+ USD): Up to 10 custom pages, advanced integrations, complete asset suite, and unlimited revisions.",
      note: "Pricing can be adjusted to local currency (PKR/EUR/GBP) on request."
    },
    next_steps: "To initiate the project, select your desired pricing tier and confirm the initial deposit. Our team will schedule the Week 1 discovery workshop within 24 hours."
  });

  // PRESET LOADER HANDLER
  const handleSelectPreset = (preset: BusinessPreset) => {
    setSelectedPresetId(preset.id);
    setBusinessName(preset.businessName);
    setIndustry(preset.industry);
    setTargetAudience(preset.targetAudience);
    setMainBenefit(preset.mainBenefit);
    setPainPoints(preset.painPoints);
    setPagesNeeded(preset.pagesNeeded);
    setBrandPersonality(preset.brandPersonality);
    setKeywords(preset.keywords);
    setPrimaryCta(preset.primaryCta);
  };

  // COPY FIELD TO CLIPBOARD
  const handleCopyField = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // AI GENERATION PIPELINE
  const handleGenerateAll = useCallback(async () => {
    setIsGenerating(true);
    setGenerationError("");
    setGenerationStep("Initiating LaunchNova AI Engine...");

    const body = {
      businessName,
      industry,
      targetAudience,
      mainBenefit,
      painPoints,
      pagesNeeded,
      brandPersonality,
      keywords,
      primaryCta
    };

    try {
      // Single unified endpoint to avoid concurrency and rate limit (429) issues
      setGenerationStep("Generating Copywriting, Color Palette, SEO & Client Proposal...");

      const bundleRes = await fetch("/api/generate-bundle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!bundleRes.ok) {
        const err = await bundleRes.json().catch(() => ({ error: "Generation request failed" }));
        throw new Error(err.error || "Bundle generation failed.");
      }

      const bundleData = await bundleRes.json();

      setIsFallbackUsed(!!bundleData.isFallback);

      if (bundleData.copywriting) setEditedCopy(bundleData.copywriting);
      if (bundleData.palette) setEditedPalette(bundleData.palette);
      if (bundleData.seo && Array.isArray(bundleData.seo.pages)) {
        setEditedSeo(bundleData.seo.pages);
      }
      if (bundleData.proposal) setProposal(bundleData.proposal);

      setActiveTab("preview");
    } catch (err: any) {
      console.error("LaunchNova AI Generation Error:", err);
      setGenerationError(err.message || "Generation encountered an issue. Please try again.");
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  }, [
    businessName,
    industry,
    targetAudience,
    mainBenefit,
    painPoints,
    pagesNeeded,
    brandPersonality,
    keywords,
    primaryCta
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedPresetId={selectedPresetId}
        onSelectPreset={handleSelectPreset}
        onOpenExport={() => setIsExportOpen(true)}
        isGenerating={isGenerating}
        isFallbackUsed={isFallbackUsed}
      />

      {/* Main Studio Body Split Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Form Control Sidebar */}
        <FormSidebar
          businessName={businessName}
          setBusinessName={setBusinessName}
          industry={industry}
          setIndustry={setIndustry}
          targetAudience={targetAudience}
          setTargetAudience={setTargetAudience}
          mainBenefit={mainBenefit}
          setMainBenefit={setMainBenefit}
          painPoints={painPoints}
          setPainPoints={setPainPoints}
          pagesNeeded={pagesNeeded}
          setPagesNeeded={setPagesNeeded}
          brandPersonality={brandPersonality}
          setBrandPersonality={setBrandPersonality}
          keywords={keywords}
          setKeywords={setKeywords}
          primaryCta={primaryCta}
          setPrimaryCta={setPrimaryCta}
          isGenerating={isGenerating}
          onGenerateAll={handleGenerateAll}
        />

        {/* Right Main Stage Studio Workspace */}
        <main className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          {/* Main Navigation Tabs */}
          <nav className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 flex items-center space-x-1.5 overflow-x-auto scrollbar-none shrink-0">
            {[
              { id: "preview", label: "Interactive Website Preview", icon: Monitor },
              { id: "copydeck", label: "Copy Deck Inspector", icon: FileText },
              { id: "palette", label: "Color Palette Studio", icon: Palette },
              { id: "seo", label: "Google SERP & SEO", icon: Search },
              { id: "proposal", label: "Client Proposal", icon: Sparkles },
              { id: "json", label: "JSON Spec API", icon: Code }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-2 transition shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* AI Quota Fallback Notice Banner */}
          {isFallbackUsed && (
            <div
              id="ai-fallback-notice-banner"
              className="bg-amber-500/15 border-b border-amber-500/30 text-amber-200 px-4 py-2.5 text-xs font-semibold flex items-center justify-between shrink-0 backdrop-blur-sm animate-fadeIn"
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>⚠️ Showing sample content — AI quota reached, try again shortly</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[11px] text-amber-300/80 hidden sm:inline">
                  Fallback template loaded automatically
                </span>
                <button
                  id="dismiss-fallback-notice-btn"
                  onClick={() => setIsFallbackUsed(false)}
                  className="text-[11px] text-amber-400 hover:text-amber-100 font-bold underline cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Error Alert Banner */}
          {generationError && (
            <div className="bg-rose-950/80 border-b border-rose-800 text-rose-200 px-4 py-3 text-xs flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{generationError}</span>
              </div>
              <button
                onClick={() => setGenerationError("")}
                className="text-xs font-bold underline hover:text-white cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Active View Content Stage */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {isGenerating ? (
              <LoadingSkeleton currentStep={generationStep} />
            ) : (
              <>
                {activeTab === "preview" && (
                  <PreviewFrame
                    businessName={businessName}
                    editedCopy={editedCopy}
                    editedPalette={editedPalette}
                    editedSeo={editedSeo}
                    viewport={previewViewport}
                    setViewport={setPreviewViewport}
                    activePreviewPage={activePreviewPage}
                    setActivePreviewPage={setActivePreviewPage}
                  />
                )}

                {activeTab === "copydeck" && (
                  <CopyDeckTab
                    editedCopy={editedCopy}
                    setEditedCopy={setEditedCopy}
                    copiedField={copiedField}
                    onCopyField={handleCopyField}
                  />
                )}

                {activeTab === "palette" && (
                  <PaletteTab
                    editedPalette={editedPalette}
                    setEditedPalette={setEditedPalette}
                    copiedField={copiedField}
                    onCopyField={handleCopyField}
                  />
                )}

                {activeTab === "seo" && (
                  <SeoTab
                    businessName={businessName}
                    editedSeo={editedSeo}
                    setEditedSeo={setEditedSeo}
                    copiedField={copiedField}
                    onCopyField={handleCopyField}
                  />
                )}

                {activeTab === "proposal" && (
                  <ProposalTab
                    businessName={businessName}
                    proposal={proposal}
                    copiedField={copiedField}
                    onCopyField={handleCopyField}
                  />
                )}

                {activeTab === "json" && (
                  <JsonExportTab
                    businessName={businessName}
                    industry={industry}
                    editedCopy={editedCopy}
                    editedPalette={editedPalette}
                    editedSeo={editedSeo}
                    proposal={proposal}
                    copiedField={copiedField}
                    onCopyField={handleCopyField}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        businessName={businessName}
        editedCopy={editedCopy}
        editedPalette={editedPalette}
        editedSeo={editedSeo}
        proposal={proposal}
      />
    </div>
  );
}
