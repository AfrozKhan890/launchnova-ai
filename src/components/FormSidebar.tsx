import React from "react";
import { Sparkles, Sliders, RotateCcw, AlertCircle, Building, CheckCircle, HelpCircle } from "lucide-react";
import { BusinessPreset } from "../presets";

interface FormSidebarProps {
  businessName: string;
  setBusinessName: (val: string) => void;
  industry: string;
  setIndustry: (val: string) => void;
  targetAudience: string;
  setTargetAudience: (val: string) => void;
  mainBenefit: string;
  setMainBenefit: (val: string) => void;
  painPoints: string;
  setPainPoints: (val: string) => void;
  pagesNeeded: string;
  setPagesNeeded: (val: string) => void;
  brandPersonality: string;
  setBrandPersonality: (val: string) => void;
  keywords: string;
  setKeywords: (val: string) => void;
  primaryCta: string;
  setPrimaryCta: (val: string) => void;
  isGenerating: boolean;
  onGenerateAll: () => void;
  selectedPreset?: BusinessPreset;
}

export const FormSidebar: React.FC<FormSidebarProps> = ({
  businessName,
  setBusinessName,
  industry,
  setIndustry,
  targetAudience,
  setTargetAudience,
  mainBenefit,
  setMainBenefit,
  painPoints,
  setPainPoints,
  pagesNeeded,
  setPagesNeeded,
  brandPersonality,
  setBrandPersonality,
  keywords,
  setKeywords,
  primaryCta,
  setPrimaryCta,
  isGenerating,
  onGenerateAll,
}) => {
  const isFormValid =
    businessName.trim() &&
    industry.trim() &&
    targetAudience.trim() &&
    mainBenefit.trim() &&
    painPoints.trim() &&
    pagesNeeded.trim();

  return (
    <aside className="w-full lg:w-96 bg-slate-900/70 border-r border-slate-800 p-5 flex flex-col justify-between shrink-0 overflow-y-auto max-h-[calc(100vh-61px)]">
      <div className="space-y-5">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Brand Input Parameters
            </h2>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle className="w-2.5 h-2.5" /> Ready
          </span>
        </div>

        {/* Inputs Stack */}
        <div className="space-y-4 text-xs">
          {/* Business Name */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold flex items-center justify-between">
              <span>Business Name *</span>
              <span className="text-[10px] text-slate-400 font-normal">{businessName.length}/40</span>
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. PixelCraft Studios"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition font-medium"
            />
          </div>

          {/* Industry */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Industry & Niche *</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Creative Agency (Freelance Brand Designer)"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition font-medium"
            />
          </div>

          {/* Target Audience */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Target Audience *</label>
            <textarea
              rows={2}
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Ambitious startup founders launching new products..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition font-medium resize-none"
            />
          </div>

          {/* Main Benefit */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Main Benefit / Purpose *</label>
            <textarea
              rows={2}
              value={mainBenefit}
              onChange={(e) => setMainBenefit(e.target.value)}
              placeholder="e.g. Cohesive minimalist branding systems turning viewers into advocates..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition font-medium resize-none"
            />
          </div>

          {/* Pain Points */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Core Customer Pain Points *</label>
            <textarea
              rows={2}
              value={painPoints}
              onChange={(e) => setPainPoints(e.target.value)}
              placeholder="e.g. Generic template logos, slow expensive retainers..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition font-medium resize-none"
            />
          </div>

          {/* Pages Needed */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Pages / Deliverables Needed *</label>
            <input
              type="text"
              value={pagesNeeded}
              onChange={(e) => setPagesNeeded(e.target.value)}
              placeholder="e.g. Homepage, Menu, Subscription Box, Contact"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition font-medium"
            />
          </div>

          {/* Brand Personality */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Brand Personality</label>
            <input
              type="text"
              value={brandPersonality}
              onChange={(e) => setBrandPersonality(e.target.value)}
              placeholder="e.g. Sleek, minimalist, professional, modern"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition font-medium"
            />
          </div>

          {/* SEO Keywords */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Primary SEO Keywords</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g. brand designer, minimalist identity, logo design"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition font-medium"
            />
          </div>

          {/* Primary CTA */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Primary Call To Action</label>
            <input
              type="text"
              value={primaryCta}
              onChange={(e) => setPrimaryCta(e.target.value)}
              placeholder="e.g. Design Your Signature Brand"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition font-medium"
            />
          </div>
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="pt-5 border-t border-slate-800 mt-5 space-y-2">
        <button
          onClick={onGenerateAll}
          disabled={isGenerating || !isFormValid}
          className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-xs tracking-wide uppercase transition duration-200 flex items-center justify-center space-x-2 shadow-lg cursor-pointer ${
            isGenerating || !isFormValid
              ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-indigo-500/25 active:scale-98"
          }`}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Generating Brand Assets...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate All Assets with AI</span>
            </>
          )}
        </button>
        {!isFormValid && (
          <p className="text-[10px] text-amber-400/90 text-center flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            Please fill in required fields (*) to enable generation.
          </p>
        )}
      </div>
    </aside>
  );
};
