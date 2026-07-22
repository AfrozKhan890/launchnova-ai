import React from "react";
import { X, Download, Code, FileText, Check, Globe } from "lucide-react";
import {
  CopywritingOutput,
  PaletteOutput,
  SeoPageMetadata,
  WebsiteProposal
} from "../types";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
  editedCopy: CopywritingOutput;
  editedPalette: PaletteOutput;
  editedSeo: SeoPageMetadata[];
  proposal: WebsiteProposal;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  businessName,
  editedCopy,
  editedPalette,
  editedSeo,
  proposal
}) => {
  if (!isOpen) return null;

  const domain = businessName.toLowerCase().replace(/[^a-z0-9]/g, "_") || "brand";

  const handleExportHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${editedSeo[0]?.meta_title || businessName}</title>
  <meta name="description" content="${editedSeo[0]?.meta_description || ""}">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --primary: ${editedPalette.primary.hex};
      --accent: ${editedPalette.accent.hex};
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 font-sans antialiased">
  <!-- Navigation -->
  <nav class="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
    <div class="text-xl font-black" style="color: ${editedPalette.primary.hex}">${businessName}</div>
    <button class="px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg" style="background-color: ${editedPalette.accent.hex}">
      ${editedCopy.cta_button}
    </button>
  </nav>

  <!-- Hero Section -->
  <section class="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
    <div class="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider" style="color: ${editedPalette.accent.hex}; background-color: ${editedPalette.accent.hex}15">
      ${editedCopy.tagline || businessName}
    </div>
    <h1 class="text-4xl sm:text-6xl font-black tracking-tight leading-tight" style="color: ${editedPalette.primary.hex}">
      ${editedCopy.headline}
    </h1>
    <p class="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
      ${editedCopy.subheadline}
    </p>
    <div class="pt-4">
      <button class="px-8 py-4 rounded-xl font-black text-base text-white shadow-xl hover:opacity-90 transition" style="background-color: ${editedPalette.accent.hex}">
        ${editedCopy.cta_button}
      </button>
    </div>
  </section>

  <!-- About Section -->
  <section class="max-w-4xl mx-auto px-6 py-16 border-t border-slate-200">
    <h2 class="text-2xl font-black mb-4" style="color: ${editedPalette.primary.hex}">About Us</h2>
    <p class="text-slate-700 leading-relaxed text-base">${editedCopy.about}</p>
  </section>

  <!-- Services Section -->
  <section class="max-w-6xl mx-auto px-6 py-16 border-t border-slate-200">
    <h2 class="text-2xl font-black mb-8 text-center" style="color: ${editedPalette.primary.hex}">Services & Deliverables</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${editedSeo
        .map(
          (page) => `
        <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <h3 class="font-bold text-lg" style="color: ${editedPalette.primary.hex}">${page.page_name}</h3>
          <p class="text-xs text-slate-600 leading-relaxed">${page.meta_description}</p>
        </div>`
        )
        .join("")}
    </div>
  </section>

  <footer class="text-center py-8 text-xs text-slate-500 border-t border-slate-200">
    © ${new Date().getFullYear()} ${businessName}. All rights reserved. Generated with LaunchNova AI.
  </footer>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${domain}_website.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-extrabold text-white">
              Export Brand Deck
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Export Options */}
        <div className="space-y-3">
          <button
            onClick={handleExportHtml}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500 flex items-center justify-between text-left transition group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Standalone HTML Website</h3>
                <p className="text-[11px] text-slate-400">Complete responsive HTML landing page template</p>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition" />
          </button>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
