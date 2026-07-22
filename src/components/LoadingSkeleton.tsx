import React from "react";
import { Sparkles, Brain, Palette, Search, FileText, CheckCircle2 } from "lucide-react";

interface LoadingSkeletonProps {
  currentStep: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ currentStep }) => {
  const steps = [
    { key: "copy", label: "Analyzing brand positioning & PAS copy deck...", icon: Brain },
    { key: "palette", label: "Synthesizing color psychology palette...", icon: Palette },
    { key: "seo", label: "Generating Google SERP SEO metadata...", icon: Search },
    { key: "proposal", label: "Drafting 3-tier client proposal...", icon: FileText }
  ];

  return (
    <div className="flex-1 bg-slate-950 p-6 flex flex-col items-center justify-center min-h-[500px]">
      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl backdrop-blur-xl">
        {/* Animated Glow Pulsing Icon */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 animate-ping opacity-25" />
          <div className="relative w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner">
            <Sparkles className="w-9 h-9 text-indigo-400 animate-spin" style={{ animationDuration: "3s" }} />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h3 className="text-lg font-black text-white tracking-tight">
            LaunchNova AI Studio Engine
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Generating full marketing assets in parallel...
          </p>
        </div>

        {/* Progress List */}
        <div className="space-y-3 text-left pt-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-xl flex items-center space-x-3 text-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-slate-300 font-medium flex-1">
                  {step.label}
                </span>
                <div className="w-3.5 h-3.5 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin shrink-0" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
