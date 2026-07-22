import React, { useState } from "react";
import { FileText, Copy, Check, DollarSign, Calendar, CheckCircle2, Clock, Globe } from "lucide-react";
import { WebsiteProposal } from "../types";

interface ProposalTabProps {
  businessName: string;
  proposal: WebsiteProposal;
  copiedField: string | null;
  onCopyField: (text: string, fieldName: string) => void;
}

export const ProposalTab: React.FC<ProposalTabProps> = ({
  businessName,
  proposal,
  copiedField,
  onCopyField
}) => {
  const [currency, setCurrency] = useState<"USD" | "PKR" | "EUR" | "GBP">("USD");

  const currencyMap = {
    USD: { symbol: "$", rate: 1, label: "USD ($)" },
    PKR: { symbol: "₨", rate: 278, label: "PKR (₨)" },
    EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
    GBP: { symbol: "£", rate: 0.78, label: "GBP (£)" }
  };

  const curr = currencyMap[currency];

  const formatPrice = (usdAmount: number) => {
    const val = Math.round(usdAmount * curr.rate);
    return `${curr.symbol} ${val.toLocaleString()}`;
  };

  const handleCopyProposal = () => {
    const text = `# Website Proposal for ${businessName}

## 1. Project Overview
${proposal.project_overview}

## 2. Requirements & Pain Points
${proposal.requirements.map((r) => `- ${r}`).join("\n")}

## 3. Proposed Deliverables
${proposal.deliverables.map((d) => `- ${d}`).join("\n")}

## 4. Timeline Roadmap
- Week 1: ${proposal.timeline.week1}
- Week 2: ${proposal.timeline.week2}
- Week 3: ${proposal.timeline.week3}

## 5. Pricing Tiers (${currency})
- Starter Package: ${formatPrice(150)}
- Standard Package: ${formatPrice(350)}
- Premium Package: ${formatPrice(600)}+
* Note: ${proposal.pricing.note}

## 6. Next Steps
${proposal.next_steps}
`;
    onCopyField(text, "proposal_md");
  };

  return (
    <div className="flex-1 bg-slate-950 p-4 sm:p-6 text-slate-100 overflow-y-auto max-h-[calc(100vh-61px)] space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-extrabold text-white">
              Client-Ready Website Proposal
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete formal proposal document with scope, deliverables, timeline, and 3-tier pricing.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Currency Switcher */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            {(["USD", "PKR", "EUR", "GBP"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                  currency === c
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopyProposal}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-2 transition shadow-md active:scale-95 cursor-pointer shrink-0"
          >
            {copiedField === "proposal_md" ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Proposal Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Proposal (Markdown)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Document Sheet */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 text-left">
        {/* Document Header */}
        <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
              Formal Client Proposal
            </span>
            <h1 className="text-2xl font-black text-white mt-2">
              Website Strategy & Development Proposal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Prepared for: <strong className="text-slate-200">{businessName}</strong>
            </p>
          </div>
          <div className="text-right text-xs text-slate-400 font-mono">
            <p>Date: {new Date().toLocaleDateString()}</p>
            <p>Status: Ready for Review</p>
          </div>
        </div>

        {/* 1. Project Overview */}
        <div className="space-y-2">
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            1. Project Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {proposal.project_overview}
          </p>
        </div>

        {/* 2. Requirements & Pain Points */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            2. Core Requirements & Client Goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {proposal.requirements.map((req, idx) => (
              <div
                key={idx}
                className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 flex items-start space-x-2 text-xs text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Deliverables */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-500" />
            3. Scope of Deliverables
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {proposal.deliverables.map((del, idx) => (
              <div
                key={idx}
                className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 font-medium flex items-center space-x-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span>{del}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Timeline */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            4. 3-Week Implementation Timeline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">
                Week 1
              </span>
              <h3 className="text-xs font-bold text-white">Discovery & Design</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {proposal.timeline.week1}
              </p>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">
                Week 2
              </span>
              <h3 className="text-xs font-bold text-white">Development & Copy</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {proposal.timeline.week2}
              </p>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                Week 3
              </span>
              <h3 className="text-xs font-bold text-white">Testing & Launch</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {proposal.timeline.week3}
              </p>
            </div>
          </div>
        </div>

        {/* 5. Pricing Tiers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              5. Investment & Pricing Tiers
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Selected Currency: <strong className="text-indigo-400">{currency}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Starter */}
            <div className="bg-slate-950/90 p-5 rounded-2xl border border-slate-800 space-y-3 relative flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Starter Tier
                </span>
                <div className="text-2xl font-black text-white">
                  {formatPrice(150)}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {proposal.pricing.starter}
                </p>
              </div>
            </div>

            {/* Standard (Recommended) */}
            <div className="bg-gradient-to-b from-indigo-950/80 to-slate-950 p-5 rounded-2xl border-2 border-indigo-500 space-y-3 relative flex flex-col justify-between shadow-xl">
              <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[9px] font-extrabold uppercase tracking-wider">
                Most Popular
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                  Standard Tier
                </span>
                <div className="text-2xl font-black text-white">
                  {formatPrice(350)}
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {proposal.pricing.standard}
                </p>
              </div>
            </div>

            {/* Premium */}
            <div className="bg-slate-950/90 p-5 rounded-2xl border border-slate-800 space-y-3 relative flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                  Premium Tier
                </span>
                <div className="text-2xl font-black text-white">
                  {formatPrice(600)}+
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {proposal.pricing.premium}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Next Steps */}
        <div className="space-y-2 pt-4 border-t border-slate-800">
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
            6. Next Steps & Acceptance
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {proposal.next_steps}
          </p>
        </div>
      </div>
    </div>
  );
};
