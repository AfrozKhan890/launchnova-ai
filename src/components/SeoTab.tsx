import React, { useState } from "react";
import { Search, Globe, Copy, Check, AlertCircle, CheckCircle2, Code } from "lucide-react";
import { SeoPageMetadata } from "../types";

interface SeoTabProps {
  businessName: string;
  editedSeo: SeoPageMetadata[];
  setEditedSeo: React.Dispatch<React.SetStateAction<SeoPageMetadata[]>>;
  copiedField: string | null;
  onCopyField: (text: string, fieldName: string) => void;
}

export const SeoTab: React.FC<SeoTabProps> = ({
  businessName,
  editedSeo,
  setEditedSeo,
  copiedField,
  onCopyField
}) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);

  const currentPage = editedSeo[selectedPageIndex] || {
    page_name: "Homepage",
    meta_title: "Title Placeholder",
    meta_description: "Description Placeholder"
  };

  const domain = businessName.toLowerCase().replace(/[^a-z0-9]/g, "") || "yourbrand";

  const titleLen = currentPage.meta_title.length;
  const descLen = currentPage.meta_description.length;

  const isTitleOptimal = titleLen >= 45 && titleLen <= 65;
  const isDescOptimal = descLen >= 140 && descLen <= 165;

  const generateMetaHtml = () => {
    return editedSeo
      .map(
        (page) => `<!-- ${page.page_name} SEO -->
<title>${page.meta_title}</title>
<meta name="description" content="${page.meta_description}" />
<meta property="og:title" content="${page.meta_title}" />
<meta property="og:description" content="${page.meta_description}" />
<link rel="canonical" href="https://${domain}.launchnova.site/${page.page_name.toLowerCase().replace(/[^a-z0-9]/g, "")}" />`
      )
      .join("\n\n");
  };

  return (
    <div className="flex-1 bg-slate-950 p-4 sm:p-6 text-slate-100 overflow-y-auto max-h-[calc(100vh-61px)] space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-extrabold text-white">
              Google SERP & SEO Metadata Manager
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate exact Google Search snippets for each page. Tailor meta titles and descriptions for high click-through rates.
          </p>
        </div>

        <button
          onClick={() => onCopyField(generateMetaHtml(), "all_seo_html")}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-2 transition shadow-md active:scale-95 cursor-pointer shrink-0"
        >
          {copiedField === "all_seo_html" ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>HTML Meta Tags Copied!</span>
            </>
          ) : (
            <>
              <Code className="w-4 h-4" />
              <span>Copy HTML Meta Tags</span>
            </>
          )}
        </button>
      </div>

      {/* Page Selector Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {editedSeo.map((page, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedPageIndex(idx)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition border shrink-0 cursor-pointer flex items-center space-x-1.5 ${
              selectedPageIndex === idx
                ? "bg-indigo-600 text-white border-indigo-500 shadow-md"
                : "bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700"
            }`}
          >
            <Globe className="w-3.5 h-3.5 opacity-70" />
            <span>{page.page_name}</span>
          </button>
        ))}
      </div>

      {/* Google SERP Live Simulator Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Google Search Result Snippet Preview
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Desktop View</span>
        </div>

        {/* Google SERP Card Mockup */}
        <div className="bg-white rounded-xl p-5 shadow-lg border border-slate-200 text-left font-sans space-y-1.5">
          <div className="flex items-center space-x-2 text-[12px] text-[#202124]">
            <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-700">
              {businessName.charAt(0)}
            </div>
            <span className="font-normal text-slate-700">{businessName}</span>
            <span className="text-slate-400">›</span>
            <span className="text-slate-600 text-[11px]">
              https://{domain}.launchnova.site › {currentPage.page_name.toLowerCase().replace(/[^a-z0-9]/g, "")}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-normal text-[#1a0dab] hover:underline cursor-pointer leading-snug font-medium">
            {currentPage.meta_title || "Your Page Title Will Appear Here"}
          </h3>

          <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed max-w-2xl font-normal">
            {currentPage.meta_description || "Your meta description will appear here on Google search results pages."}
          </p>
        </div>
      </div>

      {/* Metadata Editor */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
          Edit {currentPage.page_name} Meta Information
        </h3>

        {/* Meta Title */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300">Meta Title</label>
            <div className="flex items-center space-x-2 text-[11px]">
              <span className={`font-mono font-bold ${isTitleOptimal ? "text-emerald-400" : "text-amber-400"}`}>
                {titleLen}/60 chars
              </span>
              {isTitleOptimal ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Perfect Length
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Target 50-60 chars
                </span>
              )}
            </div>
          </div>

          <input
            type="text"
            value={currentPage.meta_title}
            onChange={(e) => {
              const updated = [...editedSeo];
              updated[selectedPageIndex].meta_title = e.target.value;
              setEditedSeo(updated);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 font-medium focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300">Meta Description</label>
            <div className="flex items-center space-x-2 text-[11px]">
              <span className={`font-mono font-bold ${isDescOptimal ? "text-emerald-400" : "text-amber-400"}`}>
                {descLen}/160 chars
              </span>
              {isDescOptimal ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Perfect Length
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Target 150-160 chars
                </span>
              )}
            </div>
          </div>

          <textarea
            rows={3}
            value={currentPage.meta_description}
            onChange={(e) => {
              const updated = [...editedSeo];
              updated[selectedPageIndex].meta_description = e.target.value;
              setEditedSeo(updated);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 font-medium focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
};
