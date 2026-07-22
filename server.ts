import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Retry helper for handling temporary Gemini API rate limits (429 / RESOURCE_EXHAUSTED)
async function callGeminiWithRetry<T>(fn: () => Promise<T>, maxRetries = 2): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      const isRateLimited =
        err?.status === "RESOURCE_EXHAUSTED" ||
        err?.status === 429 ||
        (err?.message && (err.message.includes("429") || err.message.includes("quota") || err.message.includes("RESOURCE_EXHAUSTED")));

      if (isRateLimited && attempt < maxRetries) {
        const delayMs = (attempt + 1) * 2000;
        console.warn(`Gemini 429 Rate Limit encountered. Retrying attempt ${attempt + 1}/${maxRetries} after ${delayMs}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }
      throw err;
    }
  }
  throw new Error("Maximum retries reached for Gemini API.");
}

// Fallback generator in case quota is completely exhausted
function generateFallbackBundle(body: any) {
  const {
    businessName = "Your Business",
    industry = "Professional Services",
    targetAudience = "Valued Customers",
    mainBenefit = "Exceptional Quality & Results",
    painPoints = "Outdated systems and slow delivery",
    pagesNeeded = "Homepage, Services, About, Contact",
    brandPersonality = "Modern and Professional",
    keywords = "professional, quality, service",
    primaryCta = "Get Started Today"
  } = body;

  const pagesList = pagesNeeded
    .split(",")
    .map((p: string) => p.trim())
    .filter(Boolean);

  if (pagesList.length === 0) pagesList.push("Homepage", "Services", "About Us", "Contact");

  return {
    copywriting: {
      tagline: `${brandPersonality.split(" ")[0] || "Signature"} ${industry} Excellence`,
      headline: `Transforming ${targetAudience} With ${mainBenefit}`,
      subheadline: `Say goodbye to ${painPoints}. We deliver tailor-made solutions built for measurable growth and lasting impact.`,
      about: `At ${businessName}, we specialize in helping ${targetAudience} overcome ${painPoints}. Our dedicated team leverages deep industry expertise to provide ${mainBenefit} with uncompromised craftsmanship.`,
      services: `We provide comprehensive services covering ${pagesNeeded}. Each solution is custom-engineered to elevate your brand presence and maximize conversions.`,
      features: [
        {
          title: "Tailored Strategy",
          description: `Customized roadmap specifically aligned with ${targetAudience} goals.`
        },
        {
          title: "Premium Delivery",
          description: `High-impact execution focused directly on delivering ${mainBenefit}.`
        },
        {
          title: "End-to-End Support",
          description: "Dedicated account management ensuring seamless launch and ongoing success."
        }
      ],
      faq: [
        {
          question: `How does ${businessName} get started on a project?`,
          answer: "We begin with a thorough discovery session to understand your exact goals and requirements."
        },
        {
          question: "What is the typical turnaround time?",
          answer: "Most standard projects are completed within 2 to 3 weeks from project kickoff."
        },
        {
          question: "Do you offer revisions?",
          answer: "Yes, all our service packages include revision rounds to guarantee complete satisfaction."
        }
      ],
      guarantee: `Backing every engagement with ${businessName}'s 100% quality and satisfaction guarantee.`,
      cta_button: primaryCta
    },
    palette: {
      primary: {
        hex: "#0F172A",
        reason: "Deep slate communicates unwavering trust, authority, and professional stability."
      },
      secondary: [
        {
          hex: "#475569",
          reason: "Slate gray balances complex technical info with clean visual hierarchy."
        },
        {
          hex: "#F8FAFC",
          reason: "Crisp off-white tint provides generous spatial breathing room."
        }
      ],
      accent: {
        hex: "#4F46E5",
        reason: "Vibrant indigo creates high contrast visual focus for key interactive buttons."
      }
    },
    seo: {
      pages: pagesList.map((p: string) => ({
        page_name: p,
        meta_title: `${p} | ${businessName} - ${mainBenefit.slice(0, 30)}`,
        meta_description: `Discover ${p.toLowerCase()} at ${businessName}. We help ${targetAudience} achieve ${mainBenefit.slice(0, 40)}. ${primaryCta}!`
      }))
    },
    proposal: {
      project_overview: `${businessName} will deliver a high-converting digital presence and brand strategy designed to solve ${painPoints} and deliver ${mainBenefit}.`,
      requirements: [
        `Eliminate pain points related to ${painPoints}.`,
        `Establish clear, persuasive messaging tailored to ${targetAudience}.`,
        `Build a responsive multi-page digital platform for ${pagesNeeded}.`
      ],
      deliverables: [
        "Brand Strategy & Conversion Copy Deck",
        "Responsive Digital Interface Suite",
        "SEO Metadata & Search Snippet Optimization",
        "Client Proposal & Implementation Roadmap"
      ],
      timeline: {
        week1: "Discovery, Audience Analysis & Copywriting Sprint",
        week2: "Visual Design, Palette Selection & Interface Engineering",
        week3: "SEO Configuration, Testing & Final Handoff"
      },
      pricing: {
        starter: "Starter Package ($150 USD): Core single-page landing setup with essential brand copy.",
        standard: "Standard Package ($350 USD): Full multi-page experience with custom SEO and style guidelines.",
        premium: "Premium Package ($600+ USD): Enterprise scale setup with advanced integrations and priority support.",
        note: "Pricing can be adjusted to local currency on request."
      },
      next_steps: "Select your preferred tier to schedule your Week 1 kickoff session."
    }
  };
}

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Single Unified Bundle Endpoint (Generates Copy, Palette, SEO & Proposal in 1 Call)
app.post("/api/generate-bundle", async (req, res) => {
  try {
    const {
      businessName,
      industry,
      targetAudience,
      mainBenefit,
      painPoints,
      pagesNeeded,
      brandPersonality,
      keywords,
      primaryCta
    } = req.body;

    if (!businessName || !industry) {
      return res.status(400).json({ error: "Business name and industry are required." });
    }

    const systemInstruction = `You are a world-class conversion copywriter, SEO specialist, and brand strategist for LaunchNova AI.
Your job is to generate a COMPLETE brand bundle containing Copywriting, Color Palette, SEO Metadata, and Client Proposal in ONE cohesive JSON response.

Strict rules:
1. Copywriting: No generic buzzwords (avoid "best", "innovative", "leading", "world-class").
2. Headline: 6-12 words, benefit-driven.
3. Subheadline: 1-2 punchy sentences.
4. About: 3-4 clear sentences.
5. Features: Exactly 3 items with title & description.
6. FAQ: Exactly 3 items with question & answer.
7. Palette: 1 primary hex code, 1-2 secondary hex codes, 1 accent hex code (high contrast) with 1-sentence psychology reason each.
8. SEO: Generate 1 entry for each page listed in pagesNeeded. Meta titles 50-60 chars ending in "| BusinessName", Meta descriptions 150-160 chars with CTA.
9. Proposal: Project overview, 3 requirements, 3 deliverables, 3-week timeline, 3 pricing tiers ($150, $350, $600+), next steps.

Return strictly JSON matching the response schema.`;

    const prompt = `Generate a full brand bundle for:
Business Name: ${businessName}
Industry: ${industry}
Target Audience: ${targetAudience || "General clients"}
Main Benefit: ${mainBenefit || "Top quality service"}
Pain Points: ${painPoints || "Lack of results"}
Pages Needed: ${pagesNeeded || "Homepage, Services, About, Contact"}
Brand Personality: ${brandPersonality || "Modern, professional"}
Keywords: ${keywords || "quality service"}
Primary CTA: ${primaryCta || "Get Started"}`;

    try {
      const response = await callGeminiWithRetry(() =>
        ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                copywriting: {
                  type: Type.OBJECT,
                  properties: {
                    tagline: { type: Type.STRING },
                    headline: { type: Type.STRING },
                    subheadline: { type: Type.STRING },
                    about: { type: Type.STRING },
                    services: { type: Type.STRING },
                    features: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          title: { type: Type.STRING },
                          description: { type: Type.STRING }
                        },
                        required: ["title", "description"]
                      }
                    },
                    faq: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          question: { type: Type.STRING },
                          answer: { type: Type.STRING }
                        },
                        required: ["question", "answer"]
                      }
                    },
                    guarantee: { type: Type.STRING },
                    cta_button: { type: Type.STRING }
                  },
                  required: ["tagline", "headline", "subheadline", "about", "services", "features", "faq", "guarantee", "cta_button"]
                },
                palette: {
                  type: Type.OBJECT,
                  properties: {
                    primary: {
                      type: Type.OBJECT,
                      properties: {
                        hex: { type: Type.STRING },
                        reason: { type: Type.STRING }
                      },
                      required: ["hex", "reason"]
                    },
                    secondary: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          hex: { type: Type.STRING },
                          reason: { type: Type.STRING }
                        },
                        required: ["hex", "reason"]
                      }
                    },
                    accent: {
                      type: Type.OBJECT,
                      properties: {
                        hex: { type: Type.STRING },
                        reason: { type: Type.STRING }
                      },
                      required: ["hex", "reason"]
                    }
                  },
                  required: ["primary", "secondary", "accent"]
                },
                seo: {
                  type: Type.OBJECT,
                  properties: {
                    pages: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          page_name: { type: Type.STRING },
                          meta_title: { type: Type.STRING },
                          meta_description: { type: Type.STRING }
                        },
                        required: ["page_name", "meta_title", "meta_description"]
                      }
                    }
                  },
                  required: ["pages"]
                },
                proposal: {
                  type: Type.OBJECT,
                  properties: {
                    project_overview: { type: Type.STRING },
                    requirements: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    deliverables: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    timeline: {
                      type: Type.OBJECT,
                      properties: {
                        week1: { type: Type.STRING },
                        week2: { type: Type.STRING },
                        week3: { type: Type.STRING }
                      },
                      required: ["week1", "week2", "week3"]
                    },
                    pricing: {
                      type: Type.OBJECT,
                      properties: {
                        starter: { type: Type.STRING },
                        standard: { type: Type.STRING },
                        premium: { type: Type.STRING },
                        note: { type: Type.STRING }
                      },
                      required: ["starter", "standard", "premium", "note"]
                    },
                    next_steps: { type: Type.STRING }
                  },
                  required: ["project_overview", "requirements", "deliverables", "timeline", "pricing", "next_steps"]
                }
              },
              required: ["copywriting", "palette", "seo", "proposal"]
            }
          }
        })
      );

      const text = response.text;
      if (!text) throw new Error("No text output from Gemini API.");
      const data = JSON.parse(text.trim());
      res.json({ ...data, isFallback: false });
    } catch (aiErr: any) {
      console.warn("Gemini API call failed, serving smart fallback bundle:", aiErr?.message);
      const fallback = generateFallbackBundle(req.body);
      res.json({ ...fallback, isFallback: true });
    }
  } catch (error: any) {
    console.error("Error generating bundle:", error);
    res.status(500).json({ error: error.message || "Failed to generate brand bundle." });
  }
});

// Individual Copywriting Generation Endpoint
app.post("/api/generate", async (req, res) => {
  try {
    const { businessName, industry, targetAudience, mainBenefit, painPoints, pagesNeeded } = req.body;

    if (!businessName || !industry) {
      return res.status(400).json({ error: "Business Name and Industry are required." });
    }

    const systemInstruction = `You are a world-class conversion copywriter for LaunchNova AI. Craft persuasive, high-converting website content. No generic buzzwords. Return JSON matching schema.`;
    const prompt = `Generate website copywriting for:
Business Name: ${businessName}
Industry: ${industry}
Target Audience: ${targetAudience}
Main Benefit: ${mainBenefit}
Pain Points: ${painPoints}
Pages Needed: ${pagesNeeded}`;

    try {
      const response = await callGeminiWithRetry(() =>
        ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                tagline: { type: Type.STRING },
                headline: { type: Type.STRING },
                subheadline: { type: Type.STRING },
                about: { type: Type.STRING },
                services: { type: Type.STRING },
                features: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      description: { type: Type.STRING }
                    },
                    required: ["title", "description"]
                  }
                },
                faq: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      answer: { type: Type.STRING }
                    },
                    required: ["question", "answer"]
                  }
                },
                guarantee: { type: Type.STRING },
                cta_button: { type: Type.STRING }
              },
              required: ["tagline", "headline", "subheadline", "about", "services", "features", "faq", "guarantee", "cta_button"]
            }
          }
        })
      );
      const text = response.text;
      if (!text) throw new Error("No response from AI model.");
      res.json(JSON.parse(text.trim()));
    } catch (aiErr: any) {
      console.warn("Individual copywriting call failed, returning fallback:", aiErr?.message);
      const bundle = generateFallbackBundle(req.body);
      res.json(bundle.copywriting);
    }
  } catch (error: any) {
    console.error("Error generating copywriting:", error);
    res.status(500).json({ error: error.message || "Failed to generate website copywriting." });
  }
});

// Color Palette Suggestion Endpoint
app.post("/api/generate-palette", async (req, res) => {
  try {
    const { industry, brandPersonality } = req.body;

    const systemInstruction = `Suggest a professional color palette. Return JSON matching schema.`;
    const prompt = `Suggest a color palette for Industry: ${industry}, Brand Personality: ${brandPersonality}`;

    try {
      const response = await callGeminiWithRetry(() =>
        ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                primary: {
                  type: Type.OBJECT,
                  properties: {
                    hex: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  },
                  required: ["hex", "reason"]
                },
                secondary: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      hex: { type: Type.STRING },
                      reason: { type: Type.STRING }
                    },
                    required: ["hex", "reason"]
                  }
                },
                accent: {
                  type: Type.OBJECT,
                  properties: {
                    hex: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  },
                  required: ["hex", "reason"]
                }
              },
              required: ["primary", "secondary", "accent"]
            }
          }
        })
      );
      const text = response.text;
      if (!text) throw new Error("No response from AI model.");
      res.json(JSON.parse(text.trim()));
    } catch (aiErr: any) {
      console.warn("Palette generation failed, returning fallback:", aiErr?.message);
      const bundle = generateFallbackBundle(req.body);
      res.json(bundle.palette);
    }
  } catch (error: any) {
    console.error("Error generating color palette:", error);
    res.status(500).json({ error: error.message || "Failed to suggest color palette." });
  }
});

// SEO Metadata Generation Endpoint
app.post("/api/generate-seo", async (req, res) => {
  try {
    const systemInstruction = `Generate natural, highly optimized SEO metadata for requested pages. Return JSON matching schema.`;
    const prompt = `Generate SEO metadata for Business: ${req.body.businessName}, Industry: ${req.body.industry}`;

    try {
      const response = await callGeminiWithRetry(() =>
        ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                pages: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      page_name: { type: Type.STRING },
                      meta_title: { type: Type.STRING },
                      meta_description: { type: Type.STRING }
                    },
                    required: ["page_name", "meta_title", "meta_description"]
                  }
                }
              },
              required: ["pages"]
            }
          }
        })
      );
      const text = response.text;
      if (!text) throw new Error("No response from AI model.");
      res.json(JSON.parse(text.trim()));
    } catch (aiErr: any) {
      console.warn("SEO generation failed, returning fallback:", aiErr?.message);
      const bundle = generateFallbackBundle(req.body);
      res.json(bundle.seo);
    }
  } catch (error: any) {
    console.error("Error generating SEO metadata:", error);
    res.status(500).json({ error: error.message || "Failed to generate SEO metadata." });
  }
});

// Website Proposal Generation Endpoint
app.post("/api/generate-proposal", async (req, res) => {
  try {
    const systemInstruction = `Generate a professional client website proposal. Return JSON matching schema.`;
    const prompt = `Generate proposal for Business: ${req.body.businessName}, Industry: ${req.body.industry}`;

    try {
      const response = await callGeminiWithRetry(() =>
        ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                project_overview: { type: Type.STRING },
                requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
                deliverables: { type: Type.ARRAY, items: { type: Type.STRING } },
                timeline: {
                  type: Type.OBJECT,
                  properties: {
                    week1: { type: Type.STRING },
                    week2: { type: Type.STRING },
                    week3: { type: Type.STRING }
                  },
                  required: ["week1", "week2", "week3"]
                },
                pricing: {
                  type: Type.OBJECT,
                  properties: {
                    starter: { type: Type.STRING },
                    standard: { type: Type.STRING },
                    premium: { type: Type.STRING },
                    note: { type: Type.STRING }
                  },
                  required: ["starter", "standard", "premium", "note"]
                },
                next_steps: { type: Type.STRING }
              },
              required: ["project_overview", "requirements", "deliverables", "timeline", "pricing", "next_steps"]
            }
          }
        })
      );
      const text = response.text;
      if (!text) throw new Error("No response from AI model.");
      res.json(JSON.parse(text.trim()));
    } catch (aiErr: any) {
      console.warn("Proposal generation failed, returning fallback:", aiErr?.message);
      const bundle = generateFallbackBundle(req.body);
      res.json(bundle.proposal);
    }
  } catch (error: any) {
    console.error("Error generating proposal:", error);
    res.status(500).json({ error: error.message || "Failed to generate website proposal." });
  }
});

// Vite server setup or production asset serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

