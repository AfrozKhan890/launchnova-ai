# LaunchNova AI — Project Plan

## App Name
LaunchNova AI

## Problem it Solves
Freelancers and small web agencies spend hours manually writing website content,
choosing brand colors, drafting SEO metadata, and preparing proposals for every
new client. LaunchNova AI automates this — a business owner or freelancer enters
basic business details and gets AI-generated website content, a branding color
palette, SEO metadata, and a ready-to-send proposal/quotation in minutes.

**Target users:** Freelance web developers/designers and small agencies who need
to quickly generate client-ready website content and proposals.

---

## Core Features (v1)

1. **Business Details Input Form**
   Collects: business name, industry/category, target audience, core purpose/main
   benefit, customer pain points, primary CTA, brand personality, required pages,
   special features needed, primary keywords.

2. **AI Website Content Generator**
   Generates homepage headline + subheadline, about section, and services
   description based on business details.

3. **AI Color Palette Suggestion**
   Suggests 1 primary + 1–2 secondary + 1 accent color based on industry and
   brand personality, with short reasoning for each choice.

4. **AI SEO Title & Meta Description Generator**
   Generates a unique meta title (50–60 chars) and meta description (150–160
   chars) per page, with primary keyword placement and a CTA.

5. **AI Proposal/Quotation Generator**
   Generates a full client-ready proposal (project overview, understanding of
   requirements, proposed solution/deliverables, timeline, tiered pricing in
   USD, next steps/CTA) based on the collected business details.

---

## Not in v1 (Future Roadmap)
- Sitemap generation
- AI chatbot for client requirement gathering
- PDF export of proposal (nice-to-have if time permits)
- Multi-currency support (PKR conversion note only for now)

---

## Tech Stack

| Component      | Tool                          |
|-----------------|-------------------------------|
| Research        | NotebookLM                    |
| Prompt design + App build | Google AI Studio (Gemini)     |
| AI Model        | Gemini API (`gemini-3.6-flash`) |
| Version control | GitHub (public repo)          |
| Deployment      | Google Cloud Run (via AI Studio) |
| Planning/iteration support | Claude (Anthropic)   |

---

## Research Notes (from NotebookLM)

### 1. Homepage Content / Copywriting
- Lead with a clear value proposition — visitor should understand the business
  purpose within seconds.
- Focus on benefits/outcomes, not generic claims (avoid "best", "innovative",
  "quality").
- Use simple, customer-facing language — avoid jargon.
- Pair headline (emotional hook) with subheadline (practical detail).
- Keep headlines concise: 6–12 words.
- Address the visitor's pain point directly ("Struggling with X? We fix that").
- Use action-oriented verbs: Get, Grow, Launch, Save.
- Include a clear CTA: "Request a Free Quote", "Book a Consultation", "Get
  Started".

### 2. Color Psychology / Branding
- Palette rule: 1 primary color + 1–2 secondary colors + 1 accent color.
- **Blue** → trust, professionalism → tech, finance, healthcare, corporate.
- **Green** → growth, health, money → wellness, organic/food, finance.
- **Red** → energy, urgency → restaurants, sales, entertainment.
- **Yellow/Orange** → friendliness, affordability → retail, kids brands.
- **Black/Grey** → luxury, sophistication → fashion, premium tech.
- **Purple** → creativity, luxury, wisdom → beauty, education, creative agencies.
- Keep branding visually consistent across all pages.
- Ensure good color contrast for accessibility.

### 3. SEO Best Practices
- Meta title: 50–60 characters; primary keyword near the start; business name
  at the end (e.g. "Web Design Services | LaunchNova AI").
- Meta description: 150–160 characters; benefit-focused; includes a clear CTA
  ("Book Now", "Learn More", "Get a Free Quote").
- Every page must have a unique title and description (no duplicates).
- Avoid keyword stuffing — descriptions should read naturally.

### 4. Proposal / Quotation Structure
1. Client Information (name, business, date)
2. Project Overview (goals, outcome-focused)
3. Understanding of Client Requirements
4. Proposed Solution & Deliverables (pages, branding, SEO setup)
5. Timeline (week-by-week breakdown)
6. Pricing — tiered packages in USD:
   - **Starter (~$150):** single page, basic SEO, contact form, responsive
   - **Standard (~$350):** up to 5 pages, full SEO, 1 revision round
   - **Premium ($600+):** up to 10 pages, advanced SEO, booking system, 3
     revisions, 1 month post-launch support
   - Note: *"Pricing shown in USD; can be adjusted to local currency upon
     request."*
7. Next Steps / CTA ("Reply to confirm and we start within 24 hours")

---

## Input Form Fields (from NotebookLM research)

1. Business Name
2. Industry / Category
3. Target Audience
4. Core Purpose / Main Benefit
5. Customer Pain Points
6. Primary CTA (e.g. Book Consultation, Request Quote)
7. Brand Personality (luxurious, trustworthy, energetic, friendly)
8. Required Pages (Home, About, Services, Contact, FAQ)
9. Special Features Needed (contact form, booking system)
10. Primary Keywords (for SEO)

These fields map directly to the Business Details Input Form (Feature 1) and
feed into all four AI generation features.

---

## Project Roadmap / Steps

1. ✅ Idea & Scope Lock
2. ✅ NotebookLM Research
3. ✅ AI Studio — System Prompts Design, Build & Iteration
4. ✅ UI Polish (within AI Studio)
5. ✅ GitHub — Repo Setup & Push
6. ✅ Deployment (Google Cloud Run, via AI Studio)
7. ✅ Testing (End-to-End, incl. quota/fallback handling)
8. ✅ Screenshots + README Writing
9. ✅ Final Submission Check