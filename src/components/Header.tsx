import React from "react";
import { Sparkles, Download, Code, Layers, RefreshCw, Zap, AlertTriangle } from "lucide-react";
import { BUSINESS_PRESETS, BusinessPreset } from "../presets";
import { ActiveTab } from "../types";

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedPresetId: string;
  onSelectPreset: (preset: BusinessPreset) => void;
  onOpenExport: () => void;
  isGenerating: boolean;
  isFallbackUsed?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedPresetId,
  onSelectPreset,
  onOpenExport,
  isGenerating,
  isFallbackUsed = false,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo & Brand Info */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  LaunchNova AI
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5" /> PRO Studio
                </span>
                {isFallbackUsed && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 animate-pulse">
                    <AlertTriangle className="w-2.5 h-2.5" /> Sample Content
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Conversion Copy, Brand Palette, SERP SEO & Client Proposal Generator
              </p>
            </div>
          </div>

          {/* Export Action Button on Mobile */}
          <button
            onClick={onOpenExport}
            className="md:hidden flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md active:scale-95 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>

        {/* Preset Quick Selectors */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mr-1 shrink-0 hidden lg:inline">
            Presets:
          </span>
          {BUSINESS_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              disabled={isGenerating}
              className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition shrink-0 cursor-pointer flex items-center space-x-1.5 ${
                selectedPresetId === preset.id
                  ? "bg-indigo-600/20 text-indigo-300 border-indigo-500/50 shadow-inner"
                  : "bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60"
              }`}
            >
              <span>{preset.name}</span>
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center space-x-3 shrink-0">
          <button
            onClick={onOpenExport}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Brand Deck</span>
          </button>
        </div>
      </div>
    </header>
  );
};
