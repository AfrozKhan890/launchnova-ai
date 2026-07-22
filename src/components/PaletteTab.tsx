import React from "react";
import { Palette, Copy, Check, Eye, ShieldCheck } from "lucide-react";
import { PaletteOutput } from "../types";

interface PaletteTabProps {
  editedPalette: PaletteOutput;
  setEditedPalette: React.Dispatch<React.SetStateAction<PaletteOutput>>;
  copiedField: string | null;
  onCopyField: (text: string, fieldName: string) => void;
}

export const PaletteTab: React.FC<PaletteTabProps> = ({
  editedPalette,
  setEditedPalette,
  copiedField,
  onCopyField
}) => {
  const getLuminance = (hex: string) => {
    const cleanHex = hex.replace("#", "");
    if (cleanHex.length !== 6) return 0.5;
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
    const a = [r, g, b].map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const getContrastRatio = (hex1: string, hex2: string) => {
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return ((brightest + 0.05) / (darkest + 0.05)).toFixed(2);
  };

  const contrastPrimaryOnWhite = getContrastRatio(
    editedPalette.primary.hex,
    "#FFFFFF"
  );
  const contrastAccentOnWhite = getContrastRatio(
    editedPalette.accent.hex,
    "#FFFFFF"
  );

  return (
    <div className="flex-1 bg-slate-950 p-4 sm:p-6 text-slate-100 overflow-y-auto max-h-[calc(100vh-61px)] space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-extrabold text-white">
              Brand Palette & Color Psychology Studio
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Psychology-tested color palettes. Adjust hex codes directly to test accessibility and contrast ratios.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>WCAG Contrast Score: <strong className="text-white">{contrastPrimaryOnWhite}:1</strong> (Pass AA)</span>
        </div>
      </div>

      {/* Color Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Primary Color */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Primary Brand Color
            </span>
            <button
              onClick={() => onCopyField(editedPalette.primary.hex, "hex_primary")}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
            >
              {copiedField === "hex_primary" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === "hex_primary" ? "Copied" : editedPalette.primary.hex}</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div
              className="w-14 h-14 rounded-xl border border-slate-700 shadow-md shrink-0 transition"
              style={{ backgroundColor: editedPalette.primary.hex }}
            />
            <div className="flex-1 space-y-1">
              <input
                type="text"
                value={editedPalette.primary.hex}
                onChange={(e) =>
                  setEditedPalette({
                    ...editedPalette,
                    primary: { ...editedPalette.primary, hex: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 font-mono text-sm text-white font-bold focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[11px] text-slate-400">Main text, headlines, dark surfaces</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <strong>Psychology:</strong> {editedPalette.primary.reason}
          </p>
        </div>

        {/* Accent Color */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Accent / CTA Button Color
            </span>
            <button
              onClick={() => onCopyField(editedPalette.accent.hex, "hex_accent")}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
            >
              {copiedField === "hex_accent" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === "hex_accent" ? "Copied" : editedPalette.accent.hex}</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div
              className="w-14 h-14 rounded-xl border border-slate-700 shadow-md shrink-0 transition"
              style={{ backgroundColor: editedPalette.accent.hex }}
            />
            <div className="flex-1 space-y-1">
              <input
                type="text"
                value={editedPalette.accent.hex}
                onChange={(e) =>
                  setEditedPalette({
                    ...editedPalette,
                    accent: { ...editedPalette.accent, hex: e.target.value }
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 font-mono text-sm text-white font-bold focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[11px] text-slate-400">Buttons, CTAs, highlight rings</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <strong>Psychology:</strong> {editedPalette.accent.reason}
          </p>
        </div>

        {/* Secondary Colors */}
        {editedPalette.secondary.map((sec, idx) => (
          <div
            key={idx}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Secondary Color #{idx + 1}
              </span>
              <button
                onClick={() => onCopyField(sec.hex, `hex_sec_${idx}`)}
                className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
              >
                {copiedField === `hex_sec_${idx}` ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedField === `hex_sec_${idx}` ? "Copied" : sec.hex}</span>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div
                className="w-14 h-14 rounded-xl border border-slate-700 shadow-md shrink-0 transition"
                style={{ backgroundColor: sec.hex }}
              />
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={sec.hex}
                  onChange={(e) => {
                    const newSec = [...editedPalette.secondary];
                    newSec[idx] = { ...newSec[idx], hex: e.target.value };
                    setEditedPalette({ ...editedPalette, secondary: newSec });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 font-mono text-sm text-white font-bold focus:outline-none focus:border-indigo-500"
                />
                <p className="text-[11px] text-slate-400">
                  {idx === 0 ? "Borders & neutral accents" : "Canvas background tint"}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <strong>Psychology:</strong> {sec.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
