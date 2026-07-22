import React, { useState } from "react";
import { Copy, Check, Edit3, Sparkles, CheckCircle2, ShieldAlert, FileText, Type } from "lucide-react";
import { CopywritingOutput } from "../types";

interface CopyDeckTabProps {
  editedCopy: CopywritingOutput;
  setEditedCopy: React.Dispatch<React.SetStateAction<CopywritingOutput>>;
  copiedField: string | null;
  onCopyField: (text: string, fieldName: string) => void;
}

export const CopyDeckTab: React.FC<CopyDeckTabProps> = ({
  editedCopy,
  setEditedCopy,
  copiedField,
  onCopyField
}) => {
  const [activeSection, setActiveSection] = useState<string>("all");

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  const checkBuzzwords = (text: string) => {
    const buzzwords = ["best", "innovative", "leading", "world-class", "premier", "cutting-edge", "game-changer"];
    const found = buzzwords.filter((bw) => text.toLowerCase().includes(bw));
    return found;
  };

  const buzzwordsFoundInHeadline = checkBuzzwords(editedCopy.headline || "");

  const handleCopyAll = () => {
    const fullDeck = `# LaunchNova AI - Conversion Copy Deck

## Tagline
${editedCopy.tagline || ""}

## Homepage Headline
${editedCopy.headline}

## Subheadline
${editedCopy.subheadline}

## Primary Call To Action (CTA)
${editedCopy.cta_button}

## About Us
${editedCopy.about}

## Services Overview
${editedCopy.services}

## Guarantee / Trust Badge
${editedCopy.guarantee || "N/A"}
`;
    onCopyField(fullDeck, "full_deck");
  };

  return (
    <div className="flex-1 bg-slate-950 p-4 sm:p-6 text-slate-100 overflow-y-auto max-h-[calc(100vh-61px)] space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-extrabold text-white">
              Conversion Copywriting Inspector
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Edit copywriting content directly. Changes reflect in real-time on the website preview.
          </p>
        </div>

        <button
          onClick={handleCopyAll}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-2 transition shadow-md active:scale-95 cursor-pointer shrink-0"
        >
          {copiedField === "full_deck" ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Full Copy Deck Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Entire Deck (Markdown)</span>
            </>
          )}
        </button>
      </div>

      {/* Copy Editor Cards */}
      <div className="space-y-5">
        {/* Tagline */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Brand Tagline
              </h3>
            </div>
            <button
              onClick={() => onCopyField(editedCopy.tagline || "", "tagline")}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
            >
              {copiedField === "tagline" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === "tagline" ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <input
            type="text"
            value={editedCopy.tagline || ""}
            onChange={(e) => setEditedCopy({ ...editedCopy, tagline: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 font-semibold focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Headline */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Type className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Homepage Primary Headline
              </h3>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                {wordCount(editedCopy.headline)} words
              </span>
              <button
                onClick={() => onCopyField(editedCopy.headline, "headline")}
                className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
              >
                {copiedField === "headline" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === "headline" ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <textarea
            rows={2}
            value={editedCopy.headline}
            onChange={(e) => setEditedCopy({ ...editedCopy, headline: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-base text-slate-100 font-extrabold focus:outline-none focus:border-indigo-500 resize-none"
          />

          {/* Quality Audit Badge */}
          <div className="flex items-center space-x-2 text-[11px]">
            {buzzwordsFoundInHeadline.length === 0 ? (
              <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Zero generic buzzwords detected (PAS compliant)
              </span>
            ) : (
              <span className="text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> Contains buzzword: {buzzwordsFoundInHeadline.join(", ")}
              </span>
            )}
          </div>
        </div>

        {/* Subheadline */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Subheadline & Value Proposition
            </h3>
            <button
              onClick={() => onCopyField(editedCopy.subheadline, "subheadline")}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
            >
              {copiedField === "subheadline" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === "subheadline" ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <textarea
            rows={2}
            value={editedCopy.subheadline}
            onChange={(e) => setEditedCopy({ ...editedCopy, subheadline: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 font-medium focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        {/* Primary CTA */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Primary Call To Action (CTA Text)
            </h3>
            <button
              onClick={() => onCopyField(editedCopy.cta_button, "cta_button")}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
            >
              {copiedField === "cta_button" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === "cta_button" ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <input
            type="text"
            value={editedCopy.cta_button}
            onChange={(e) => setEditedCopy({ ...editedCopy, cta_button: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 font-extrabold focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* About Section */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              About Us Copy
            </h3>
            <button
              onClick={() => onCopyField(editedCopy.about, "about")}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
            >
              {copiedField === "about" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === "about" ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={editedCopy.about}
            onChange={(e) => setEditedCopy({ ...editedCopy, about: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        {/* Services */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Services & Solution Writeup
            </h3>
            <button
              onClick={() => onCopyField(editedCopy.services, "services")}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
            >
              {copiedField === "services" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === "services" ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={editedCopy.services}
            onChange={(e) => setEditedCopy({ ...editedCopy, services: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
};
