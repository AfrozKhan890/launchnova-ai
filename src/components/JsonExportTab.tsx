import React from "react";
import { Code, Copy, Check, Download } from "lucide-react";
import {
  CopywritingOutput,
  PaletteOutput,
  SeoPageMetadata,
  WebsiteProposal
} from "../types";

interface JsonExportTabProps {
  businessName: string;
  industry: string;
  editedCopy: CopywritingOutput;
  editedPalette: PaletteOutput;
  editedSeo: SeoPageMetadata[];
  proposal: WebsiteProposal;
  copiedField: string | null;
  onCopyField: (text: string, fieldName: string) => void;
}

export const JsonExportTab: React.FC<JsonExportTabProps> = ({
  businessName,
  industry,
  editedCopy,
  editedPalette,
  editedSeo,
  proposal,
  copiedField,
  onCopyField
}) => {
  const fullBundle = {
    brand_metadata: {
      business_name: businessName,
      industry: industry,
      generated_at: new Date().toISOString(),
      generator: "LaunchNova AI Pro Studio"
    },
    copywriting: editedCopy,
    palette: editedPalette,
    seo: editedSeo,
    proposal: proposal
  };

  const jsonString = JSON.stringify(fullBundle, null, 2);

  const handleDownloadJson = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${businessName.toLowerCase().replace(/[^a-z0-9]/g, "_")}_brand_bundle.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 bg-slate-950 p-4 sm:p-6 text-slate-100 overflow-y-auto max-h-[calc(100vh-61px)] space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-extrabold text-white">
              Raw JSON Spec & API Export
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete structured JSON output of copy deck, color palette, SEO metadata, and client proposal.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onCopyField(jsonString, "json_bundle")}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center space-x-2 transition border border-slate-700 active:scale-95 cursor-pointer"
          >
            {copiedField === "json_bundle" ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>JSON Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy JSON</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadJson}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-2 transition shadow-md active:scale-95 cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download .json File</span>
          </button>
        </div>
      </div>

      {/* Code Viewer Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-bold text-slate-300">brand-deck-bundle.json</span>
          </div>
          <span>{jsonString.length.toLocaleString()} bytes</span>
        </div>

        <pre className="p-5 text-xs font-mono text-emerald-400/90 leading-relaxed overflow-x-auto max-h-[500px] select-all scrollbar-thin scrollbar-thumb-slate-800">
          <code>{jsonString}</code>
        </pre>
      </div>
    </div>
  );
};
