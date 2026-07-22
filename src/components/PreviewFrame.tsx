import React, { useState } from "react";
import {
  Monitor,
  Smartphone,
  ExternalLink,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Send,
  Star,
  ArrowRight,
  Lock
} from "lucide-react";
import {
  CopywritingOutput,
  PaletteOutput,
  SeoPageMetadata,
  PreviewViewport,
  PreviewPage
} from "../types";

interface PreviewFrameProps {
  businessName: string;
  editedCopy: CopywritingOutput;
  editedPalette: PaletteOutput;
  editedSeo: SeoPageMetadata[];
  viewport: PreviewViewport;
  setViewport: (vp: PreviewViewport) => void;
  activePreviewPage: PreviewPage;
  setActivePreviewPage: (page: PreviewPage) => void;
}

export const PreviewFrame: React.FC<PreviewFrameProps> = ({
  businessName,
  editedCopy,
  editedPalette,
  editedSeo,
  viewport,
  setViewport,
  activePreviewPage,
  setActivePreviewPage
}) => {
  const [orderName, setOrderName] = useState("");
  const [orderEmail, setOrderEmail] = useState("");
  const [orderTier, setOrderTier] = useState("standard");
  const [orderNotes, setOrderNotes] = useState("");
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const domain = businessName.toLowerCase().replace(/[^a-z0-9]/g, "") || "yourbrand";

  // Fallback features if not returned by AI
  const defaultFeatures = [
    {
      title: "Signature Craftsmanship",
      description: "Meticulously built with premium materials and zero compromises on quality."
    },
    {
      title: "Transparent & Fast",
      description: "Direct turnarounds with clear communication at every milestone."
    },
    {
      title: "Guaranteed Satisfaction",
      description: "Backed by our 100% workmanship warranty and dedicated customer support."
    }
  ];

  const features = editedCopy.features && editedCopy.features.length > 0 ? editedCopy.features : defaultFeatures;

  // Fallback FAQs if not returned by AI
  const defaultFaqs = [
    {
      question: `How do I order or get started with ${businessName || "your business"}?`,
      answer: "Fill out our quick online order form or book a consultation call. We will review your details and confirm next steps within 24 hours."
    },
    {
      question: "What is your typical delivery or project turnaround time?",
      answer: "Standard orders take 3 to 7 business days depending on customization. Rush delivery is available upon request."
    },
    {
      question: "Do you offer custom pricing packages or revisions?",
      answer: "Yes! We offer Starter, Standard, and Premium packages with revision cycles to ensure 100% satisfaction."
    }
  ];

  const faqs = editedCopy.faq && editedCopy.faq.length > 0 ? editedCopy.faq : defaultFaqs;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950 p-3 sm:p-6">
      {/* Top Bar / Viewport Controls */}
      <div className="flex items-center justify-between mb-3 text-xs bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="h-3.5 w-px bg-slate-800 mx-2" />
          <div className="flex items-center space-x-1.5 text-slate-400 font-mono text-[11px] bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
            <Lock className="w-2.5 h-2.5 text-emerald-400" />
            <span>https://{domain}.launchnova.site</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex items-center space-x-1">
            <button
              onClick={() => setViewport("desktop")}
              className={`p-1.5 rounded-md transition cursor-pointer ${
                viewport === "desktop"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport("mobile")}
              className={`p-1.5 rounded-md transition cursor-pointer ${
                viewport === "mobile"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 overflow-y-auto flex justify-center items-start scrollbar-thin scrollbar-thumb-slate-800">
        <div
          className={`transition-all duration-300 bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden my-auto min-h-[620px] flex flex-col ${
            viewport === "mobile"
              ? "w-[375px] max-w-full my-4 border-4 border-slate-800 rounded-[32px] shadow-indigo-500/10"
              : "w-full max-w-5xl"
          }`}
          style={{
            color: editedPalette.primary.hex,
            backgroundColor: editedPalette.secondary[1]?.hex || "#ffffff"
          }}
        >
          {/* Simulated Browser Navbar */}
          <nav
            className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-b transition"
            style={{
              borderColor: `${editedPalette.primary.hex}18`,
              backgroundColor: `${editedPalette.secondary[1]?.hex || "#ffffff"}ee`
            }}
          >
            <button
              onClick={() => {
                setActivePreviewPage("home");
                setOrderSubmitted(false);
              }}
              className="text-sm font-black tracking-tight cursor-pointer hover:opacity-85 transition"
              style={{ color: editedPalette.primary.hex }}
            >
              {businessName || "Your Brand"}
            </button>

            {/* Page Router Links */}
            <div className="flex items-center space-x-3 sm:space-x-5 text-xs font-bold">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "services", label: "Services" },
                { id: "faq", label: "FAQ" },
                { id: "contact", label: "Order & Contact" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePreviewPage(link.id as PreviewPage);
                    setOrderSubmitted(false);
                  }}
                  className={`transition cursor-pointer pb-0.5 capitalize ${
                    activePreviewPage === link.id
                      ? "border-b-2"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  style={{
                    borderColor: editedPalette.accent.hex,
                    color: editedPalette.primary.hex
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setActivePreviewPage("contact");
                setOrderSubmitted(false);
              }}
              className="text-xs font-extrabold px-3.5 py-2 rounded-xl transition shadow-md active:scale-95 cursor-pointer shrink-0"
              style={{
                backgroundColor: editedPalette.accent.hex,
                color: "#ffffff"
              }}
            >
              {editedCopy.cta_button || "Get Started"}
            </button>
          </nav>

          {/* PAGE CONTENT ROUTER */}
          <main className="flex-1 flex flex-col justify-between">
            {/* 1. HOME PAGE */}
            {activePreviewPage === "home" && (
              <div className="flex-1 flex flex-col justify-between">
                {/* Hero */}
                <section className="px-6 py-12 md:py-16 text-center max-w-3xl mx-auto flex flex-col items-center space-y-6">
                  {editedCopy.tagline && (
                    <div
                      className="inline-flex items-center space-x-1.5 text-[11px] px-3 py-1 rounded-full font-semibold border"
                      style={{
                        borderColor: `${editedPalette.accent.hex}44`,
                        backgroundColor: `${editedPalette.accent.hex}10`,
                        color: editedPalette.accent.hex
                      }}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{editedCopy.tagline}</span>
                    </div>
                  )}

                  <h1
                    className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight"
                    style={{ color: editedPalette.primary.hex }}
                  >
                    {editedCopy.headline || "Transform Your Brand Today"}
                  </h1>

                  <p className="text-xs sm:text-sm md:text-base max-w-xl opacity-85 leading-relaxed font-medium">
                    {editedCopy.subheadline ||
                      "We craft high-converting solutions designed to turn your visitors into loyal customers."}
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                    <button
                      onClick={() => {
                        setActivePreviewPage("contact");
                        setOrderSubmitted(false);
                      }}
                      className="w-full sm:w-auto text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-xl transition shadow-lg hover:brightness-110 active:scale-95 cursor-pointer"
                      style={{
                        backgroundColor: editedPalette.accent.hex,
                        color: "#ffffff",
                        boxShadow: `0 10px 20px -5px ${editedPalette.accent.hex}44`
                      }}
                    >
                      {editedCopy.cta_button || "Get Started Now"}
                    </button>
                    <button
                      onClick={() => setActivePreviewPage("services")}
                      className="w-full sm:w-auto text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition border hover:bg-black/5 active:scale-95 cursor-pointer"
                      style={{
                        borderColor: `${editedPalette.primary.hex}33`,
                        color: editedPalette.primary.hex
                      }}
                    >
                      Explore Services
                    </button>
                  </div>
                </section>

                {/* Features Cards Grid */}
                <section
                  className="px-6 py-10 border-t"
                  style={{ borderColor: `${editedPalette.primary.hex}12` }}
                >
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="text-center space-y-1">
                      <span
                        className="text-[10px] font-extrabold uppercase tracking-widest"
                        style={{ color: editedPalette.accent.hex }}
                      >
                        Why Choose Us
                      </span>
                      <h2
                        className="text-lg font-bold"
                        style={{ color: editedPalette.primary.hex }}
                      >
                        Core Value Propositions
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl border bg-white/70 shadow-xs space-y-2 hover:-translate-y-0.5 transition duration-200"
                          style={{ borderColor: `${editedPalette.primary.hex}15` }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: `${editedPalette.accent.hex}15`,
                              color: editedPalette.accent.hex
                            }}
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <h3
                            className="text-xs font-bold"
                            style={{ color: editedPalette.primary.hex }}
                          >
                            {feat.title}
                          </h3>
                          <p className="text-[11px] opacity-80 leading-relaxed">
                            {feat.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* 2. ABOUT PAGE */}
            {activePreviewPage === "about" && (
              <section className="px-6 py-12 max-w-4xl mx-auto w-full space-y-8">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="w-full md:w-5/12 space-y-4">
                    <span
                      className="uppercase font-black tracking-widest text-[10px]"
                      style={{ color: editedPalette.accent.hex }}
                    >
                      Our Story & Mission
                    </span>
                    <h2
                      className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                      style={{ color: editedPalette.primary.hex }}
                    >
                      Built for Real Authority & Results
                    </h2>
                    <div
                      className="w-12 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: editedPalette.accent.hex }}
                    />
                    <p className="text-xs opacity-75 leading-relaxed">
                      We solve core client bottlenecks by creating custom, high-fidelity brand assets that stand out in competitive markets.
                    </p>
                  </div>

                  <div
                    className="w-full md:w-7/12 p-6 rounded-2xl border bg-white/80 shadow-sm"
                    style={{ borderColor: `${editedPalette.primary.hex}18` }}
                  >
                    <p
                      className="text-xs sm:text-sm leading-relaxed font-medium"
                      style={{ color: editedPalette.primary.hex }}
                    >
                      {editedCopy.about}
                    </p>

                    {editedCopy.guarantee && (
                      <div
                        className="mt-6 p-4 rounded-xl border border-dashed flex items-center space-x-3"
                        style={{
                          borderColor: `${editedPalette.accent.hex}44`,
                          backgroundColor: `${editedPalette.accent.hex}08`
                        }}
                      >
                        <ShieldCheck
                          className="w-5 h-5 shrink-0"
                          style={{ color: editedPalette.accent.hex }}
                        />
                        <span
                          className="text-xs font-semibold"
                          style={{ color: editedPalette.primary.hex }}
                        >
                          {editedCopy.guarantee}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* 3. SERVICES PAGE */}
            {activePreviewPage === "services" && (
              <section className="px-6 py-12 max-w-5xl mx-auto w-full space-y-8">
                <div className="text-center space-y-2">
                  <span
                    className="uppercase tracking-widest text-[10px] font-black"
                    style={{ color: editedPalette.accent.hex }}
                  >
                    Solutions Suite
                  </span>
                  <h2
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                    style={{ color: editedPalette.primary.hex }}
                  >
                    Tailored Pages & Deliverables
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {editedSeo.map((page, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border bg-white shadow-xs flex flex-col justify-between hover:-translate-y-0.5 transition duration-200"
                      style={{ borderColor: `${editedPalette.primary.hex}15` }}
                    >
                      <div className="space-y-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                          style={{
                            backgroundColor: `${editedPalette.accent.hex}15`,
                            color: editedPalette.accent.hex
                          }}
                        >
                          <Star className="w-4 h-4" />
                        </div>
                        <h3
                          className="text-sm font-extrabold"
                          style={{ color: editedPalette.primary.hex }}
                        >
                          {page.page_name}
                        </h3>
                        <p className="text-xs opacity-80 leading-relaxed text-slate-600">
                          {page.meta_description}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setOrderNotes(`Inquiry regarding ${page.page_name}`);
                          setActivePreviewPage("contact");
                          setOrderSubmitted(false);
                        }}
                        className="text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1 mt-4 hover:underline cursor-pointer"
                        style={{ color: editedPalette.accent.hex }}
                      >
                        <span>Select Deliverable</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. FAQ PAGE */}
            {activePreviewPage === "faq" && (
              <section className="px-6 py-12 max-w-3xl mx-auto w-full space-y-6">
                <div className="text-center space-y-2">
                  <span
                    className="uppercase tracking-widest text-[10px] font-black"
                    style={{ color: editedPalette.accent.hex }}
                  >
                    Clear Answers
                  </span>
                  <h2
                    className="text-2xl font-extrabold"
                    style={{ color: editedPalette.primary.hex }}
                  >
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="border rounded-xl bg-white overflow-hidden transition"
                      style={{ borderColor: `${editedPalette.primary.hex}18` }}
                    >
                      <button
                        onClick={() =>
                          setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                        }
                        className="w-full px-5 py-3.5 text-left font-bold text-xs flex items-center justify-between cursor-pointer"
                        style={{ color: editedPalette.primary.hex }}
                      >
                        <span>{faq.question}</span>
                        {openFaqIndex === idx ? (
                          <ChevronUp className="w-4 h-4 shrink-0 opacity-60" />
                        ) : (
                          <ChevronDown className="w-4 h-4 shrink-0 opacity-60" />
                        )}
                      </button>

                      {openFaqIndex === idx && (
                        <div
                          className="px-5 pb-4 text-xs opacity-85 leading-relaxed border-t border-dashed"
                          style={{
                            borderColor: `${editedPalette.primary.hex}12`,
                            color: editedPalette.primary.hex
                          }}
                        >
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. CONTACT / ORDER FORM PAGE */}
            {activePreviewPage === "contact" && (
              <section className="px-6 py-12 max-w-2xl mx-auto w-full">
                <div className="text-center space-y-2 mb-6">
                  <span
                    className="uppercase tracking-widest text-[10px] font-black"
                    style={{ color: editedPalette.accent.hex }}
                  >
                    Online Client Portal
                  </span>
                  <h2
                    className="text-2xl font-extrabold"
                    style={{ color: editedPalette.primary.hex }}
                  >
                    Place Custom Service Order
                  </h2>
                </div>

                <div
                  className="bg-white rounded-2xl border p-6 shadow-lg"
                  style={{ borderColor: `${editedPalette.primary.hex}18` }}
                >
                  {orderSubmitted ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                        <Check className="w-7 h-7" />
                      </div>
                      <h3
                        className="text-base font-extrabold"
                        style={{ color: editedPalette.primary.hex }}
                      >
                        Order Submitted Successfully!
                      </h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Your custom requirement details have been locked. Our team will reach out to <span className="font-bold text-slate-700">{orderEmail || "your email"}</span> within 24 hours.
                      </p>

                      <button
                        onClick={() => {
                          setOrderSubmitted(false);
                          setOrderName("");
                          setOrderEmail("");
                          setOrderNotes("");
                        }}
                        className="text-xs font-bold px-4 py-2 rounded-xl text-white cursor-pointer mt-3"
                        style={{ backgroundColor: editedPalette.primary.hex }}
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setOrderSubmitted(true);
                      }}
                      className="space-y-4 text-xs"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-bold text-slate-600 uppercase text-[10px]">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={orderName}
                            onChange={(e) => setOrderName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-slate-600 uppercase text-[10px]">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={orderEmail}
                            onChange={(e) => setOrderEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-600 uppercase text-[10px]">
                          Select Package Tier
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "starter", name: "Starter", price: "$150" },
                            { id: "standard", name: "Standard", price: "$350" },
                            { id: "premium", name: "Premium", price: "$600+" }
                          ].map((t) => (
                            <button
                              type="button"
                              key={t.id}
                              onClick={() => setOrderTier(t.id)}
                              className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                                orderTier === t.id
                                  ? "border-2"
                                  : "hover:bg-slate-50"
                              }`}
                              style={{
                                borderColor:
                                  orderTier === t.id
                                    ? editedPalette.accent.hex
                                    : `${editedPalette.primary.hex}22`,
                                color:
                                  orderTier === t.id
                                    ? editedPalette.accent.hex
                                    : editedPalette.primary.hex
                              }}
                            >
                              <span className="block font-bold">{t.name}</span>
                              <span className="text-[10px] opacity-70">
                                {t.price}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-600 uppercase text-[10px]">
                          Project Details / Notes
                        </label>
                        <textarea
                          rows={3}
                          value={orderNotes}
                          onChange={(e) => setOrderNotes(e.target.value)}
                          placeholder="Tell us about your specific goals..."
                          className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl font-extrabold uppercase tracking-wider text-xs text-white shadow-md active:scale-98 transition cursor-pointer"
                        style={{
                          backgroundColor: editedPalette.accent.hex
                        }}
                      >
                        Confirm & Submit Request
                      </button>
                    </form>
                  )}
                </div>
              </section>
            )}
          </main>

          {/* Footer */}
          <footer
            className="mt-auto px-6 py-5 text-center text-[11px] border-t"
            style={{
              borderColor: `${editedPalette.primary.hex}12`,
              backgroundColor: `${editedPalette.primary.hex}05`
            }}
          >
            <p className="opacity-75 font-medium">
              © {new Date().getFullYear()} {businessName || "Your Business"}. All rights reserved. Powered by LaunchNova AI.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};
