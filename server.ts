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

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Copywriting Generation Endpoint
app.post("/api/generate", async (req, res) => {
  try {
    const { businessName, industry, targetAudience, mainBenefit, painPoints, pagesNeeded } = req.body;

    if (!businessName || !industry || !targetAudience || !mainBenefit || !painPoints || !pagesNeeded) {
      return res.status(400).json({ error: "All fields are required to generate website copywriting." });
    }

    const systemInstruction = `You are an expert website copywriter for LaunchNova AI. Your job is to generate highly persuasive, optimized website copywriting content for small businesses and freelancers.
You must adhere STRICTLY to the following rules for each section:
1. Homepage headline: 6-12 words, benefit-focused, NO generic buzzwords (avoid "best", "innovative", "quality", "leading", "world-class", "premier").
2. Subheadline: Exactly one sentence explaining how the business delivers that benefit.
3. About section: Exactly 3-4 sentences, written in simple, clear language for the target audience, addressing their core pain point directly.
4. Services description: One short, engaging, benefits-focused paragraph per service/page listed. Explain how it solves their problem rather than just listing features.
5. Primary CTA button text: Short and action-oriented, exactly 2-4 words (e.g. "Get Started Now", "Book Free Consultation", "Claim Your Spot").

You must return your response in the exact JSON format requested:
{
  "headline": "Homepage headline content",
  "subheadline": "Homepage subheadline content",
  "about": "About section content",
  "services": "Services description content",
  "cta_button": "CTA button text"
}`;

    const prompt = `Generate professional website copywriting content for the following business:

Business Name: ${businessName}
Industry: ${industry}
Target Audience: ${targetAudience}
Main Benefit/Purpose: ${mainBenefit}
Pain Points: ${painPoints}
Pages/Services Needed: ${pagesNeeded}

Ensure that the 'services' paragraph covers the requested pages or services listed above in a unified or itemized way, formatted beautifully for a Services layout. Keep it benefit-focused.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: {
              type: Type.STRING,
              description: "Homepage headline, 6-12 words, benefit-focused, no generic buzzwords."
            },
            subheadline: {
              type: Type.STRING,
              description: "Subheadline, one sentence explaining how the business delivers that benefit."
            },
            about: {
              type: Type.STRING,
              description: "About section, 3-4 sentences, simple language, addressing core pain point."
            },
            services: {
              type: Type.STRING,
              description: "Services/Pages description, one short paragraph or benefit-focused write-up."
            },
            cta_button: {
              type: Type.STRING,
              description: "Primary CTA button text, action-oriented, 2-4 words."
            }
          },
          required: ["headline", "subheadline", "about", "services", "cta_button"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI model.");
    }

    const data = JSON.parse(text.trim());
    res.json(data);
  } catch (error: any) {
    console.error("Error generating copywriting:", error);
    res.status(500).json({ error: error.message || "Failed to generate website copywriting." });
  }
});

// Color Palette Suggestion Endpoint
app.post("/api/generate-palette", async (req, res) => {
  try {
    const { industry, brandPersonality } = req.body;

    if (!industry || !brandPersonality) {
      return res.status(400).json({ error: "Industry and Brand Personality are required to suggest a palette." });
    }

    const systemInstruction = `You are an expert branding consultant for LaunchNova AI. Given a business's industry and brand personality, suggest a highly professional color palette.
You must adhere STRICTLY to the following rules:
1. Suggest exactly 1 primary color, 1-2 secondary colors, and 1 accent color.
2. Use real, high-quality, professional hex codes (with the "#" prefix).
3. Give exactly a one-sentence reasoning for each color based on color psychology and how it matches the business's industry/personality.
4. Ensure the accent color has excellent visual contrast to work beautifully for buttons/CTAs.

You must return your response in this exact JSON format:
{
  "primary": {"hex": "primary hex code", "reason": "one-sentence reasoning"},
  "secondary": [
    {"hex": "first secondary hex code", "reason": "one-sentence reasoning"},
    {"hex": "optional second secondary hex code", "reason": "one-sentence reasoning"}
  ],
  "accent": {"hex": "accent hex code", "reason": "one-sentence reasoning"}
}`;

    const prompt = `Suggest a professional color palette for:
Industry: ${industry}
Brand Personality: ${brandPersonality}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
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
                hex: { type: Type.STRING, description: "Primary color hex code starting with #" },
                reason: { type: Type.STRING, description: "Exactly one-sentence reasoning based on color psychology." }
              },
              required: ["hex", "reason"]
            },
            secondary: {
              type: Type.ARRAY,
              description: "Exactly 1 or 2 secondary colors.",
              items: {
                type: Type.OBJECT,
                properties: {
                  hex: { type: Type.STRING, description: "Secondary color hex code starting with #" },
                  reason: { type: Type.STRING, description: "Exactly one-sentence reasoning for this secondary color." }
                },
                required: ["hex", "reason"]
              }
            },
            accent: {
              type: Type.OBJECT,
              properties: {
                hex: { type: Type.STRING, description: "Accent color hex code starting with #. Ensure it has high contrast." },
                reason: { type: Type.STRING, description: "Exactly one-sentence reasoning for the accent color." }
              },
              required: ["hex", "reason"]
                }
              },
          required: ["primary", "secondary", "accent"]
            }
          }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI model.");
    }

    const data = JSON.parse(text.trim());
    res.json(data);
  } catch (error: any) {
    console.error("Error generating color palette:", error);
    res.status(500).json({ error: error.message || "Failed to suggest color palette." });
  }
});

// SEO Metadata Generation Endpoint
app.post("/api/generate-seo", async (req, res) => {
  try {
    const { businessName, industry, keywords, pagesNeeded, primaryCta } = req.body;

    if (!businessName || !industry || !keywords || !pagesNeeded || !primaryCta) {
      return res.status(400).json({ error: "All fields (Business Name, Industry, Keywords, Pages, CTA) are required to generate SEO metadata." });
    }

    const systemInstruction = `You are an expert SEO specialist for LaunchNova AI. Your task is to generate natural, highly optimized SEO metadata for each page requested.
You must adhere STRICTLY to the following compliance rules:
1. Meta title: Exactly 50-60 characters (inclusive of spaces and dividers). The primary keyword must be positioned near the start, and the business name must be at the end, separated by a vertical bar "|".
2. Meta description: Exactly 150-160 characters (inclusive of spaces). It must be benefit-focused and include a clear call-to-action (CTA).
3. Do not keyword-stuff; the titles and descriptions must read naturally and professionally.
4. Generate exactly one page entry with its corresponding metadata for each distinct page listed.

You must return your response in this exact JSON format:
{
  "pages": [
    {
      "page_name": "Page Name Here",
      "meta_title": "Primary Keyword Here - Benefit | Business Name",
      "meta_description": "A benefit-focused meta description here ending with a clear CTA call."
    }
  ]
}`;

    const prompt = `Generate SEO metadata for the following business website:
Business Name: ${businessName}
Industry: ${industry}
Primary Keywords: ${keywords}
Pages Needed: ${pagesNeeded}
Primary CTA: ${primaryCta}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pages: {
              type: Type.ARRAY,
              description: "List of pages with their generated metadata.",
              items: {
                type: Type.OBJECT,
                properties: {
                  page_name: { type: Type.STRING, description: "The name of the website page." },
                  meta_title: { type: Type.STRING, description: "Meta title (50-60 characters, keyword first, business name last separated by |)." },
                  meta_description: { type: Type.STRING, description: "Meta description (150-160 characters, benefit-focused, includes CTA)." }
                },
                required: ["page_name", "meta_title", "meta_description"]
              }
            }
          },
          required: ["pages"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI model.");
    }

    const data = JSON.parse(text.trim());
    res.json(data);
  } catch (error: any) {
    console.error("Error generating SEO metadata:", error);
    res.status(500).json({ error: error.message || "Failed to generate SEO metadata." });
  }
});

// Website Proposal Generation Endpoint
app.post("/api/generate-proposal", async (req, res) => {
  try {
    const { businessName, industry, targetAudience, mainBenefit, painPoints, pagesNeeded, primaryCta, specialFeatures } = req.body;

    if (!businessName || !industry || !painPoints || !pagesNeeded) {
      return res.status(400).json({ error: "Required fields (Business Name, Industry, Pain Points, Pages Needed) are missing." });
    }

    const systemInstruction = `You are a high-end freelance proposal writer for LaunchNova AI. Generate a professional, complete, and client-ready website proposal based on the provided business details.
You must write in a clear, simple, and professional tone with absolutely no placeholders, draft notes, or unfilled template variables.

Generate EXACTLY the following structure:
1. Project Overview: 2-3 sentences, outcome-focused.
2. Understanding of Requirements: Bullet list based on pain points and pages needed.
3. Proposed Solution & Deliverables: Bullet list of pages/features.
4. Timeline: 3-week breakdown (Week 1 Research/Design, Week 2 Development, Week 3 Testing/Deployment).
5. Pricing: Exactly three tiers in USD:
   - Starter: "Starter Package ($150 USD): [1-2 sentence description for a single-page site with basic features]"
   - Standard: "Standard Package ($350 USD): [1-2 sentence description for up to 5 pages with full SEO and 1 revision round]"
   - Premium: "Premium Package ($600+ USD): [1-2 sentence description for up to 10 pages, advanced features, unlimited revisions]"
   - Note: "Pricing can be adjusted to local currency (PKR) on request." (If the currency/country changes, adapt the note currency symbol if appropriate, otherwise default to PKR).
6. Next Steps: Action-oriented closing CTA.

You must return your response in this exact JSON format:
{
  "project_overview": "Project Overview string",
  "requirements": ["requirement 1", "requirement 2", "requirement 3"],
  "deliverables": ["deliverable 1", "deliverable 2", "deliverable 3"],
  "timeline": {
    "week1": "Week 1 details",
    "week2": "Week 2 details",
    "week3": "Week 3 details"
  },
  "pricing": {
    "starter": "Starter Package ($150 USD): ...",
    "standard": "Standard Package ($350 USD): ...",
    "premium": "Premium Package ($600+ USD): ...",
    "note": "Pricing can be adjusted to local currency (PKR) on request."
  },
  "next_steps": "Next Steps string"
}`;

    const prompt = `Generate a website proposal for:
Business Name: ${businessName}
Industry: ${industry}
Target Audience: ${targetAudience || "General customer base"}
Main Benefit: ${mainBenefit || "High quality service delivery"}
Pain Points: ${painPoints}
Pages Needed: ${pagesNeeded}
Special Features: ${specialFeatures || "None requested"}
Primary CTA: ${primaryCta || "Get Started"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
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
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI model.");
    }

    const data = JSON.parse(text.trim());
    res.json(data);
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
