/* =====================================================================
 *  EDIT THIS FILE ONLY — everything on the page is driven from here.
 *  No need to touch index.html / app.js / style.css.
 * ===================================================================== */

const SITE = {
  brand: "AI Automation Tools",
  tagline: "The curated directory of AI tools that actually save SMBs time.",
  // Shown as stat chips in the hero — edit the numbers as you grow.
  stats: [
    { value: "~30k", label: "monthly readers" },
    { value: "Monthly", label: "fresh updates" },
    { value: "100%", label: "hand-curated" }
  ],
  // Where the "Get featured" buttons send tools — paste your Google Form link.
  intakeFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLScGU8hXZZ5UgUR2YYxsW3UhETK7fDvIow__wiUYH9xoe2Ja4A/viewform",
  // Your Beehiiv hosted subscribe page.
  newsletterUrl: "https://dilipskashyap.beehiiv.com/"
};

/* ---------------------------------------------------------------------
 *  TOOLS
 *  tier:   "featured"  -> highlighted card at the top (premium, paid)
 *          "listed"    -> standard paid card in the grid
 *          "free"      -> free editorial pick (fills the page, helps SEO)
 *  logo:   a URL to a square logo, OR leave "" to auto-make initials.
 *
 *  The entries below are SAMPLES — replace with real tools.
 * ------------------------------------------------------------------- */
const TOOLS = [
  {
    name: "Pollo AI",
    tagline: "All-in-one AI video generator — text-to-video, image-to-video, and AI avatars.",
    category: "Video",
    url: "https://pollo.ai",
    logo: "https://www.google.com/s2/favicons?domain=pollo.ai&sz=128",
    tier: "featured",
    founding: true
  },
  {
    name: "Nut Studio",
    tagline: "Deploy and run local AI agents on your desktop with one-click setup.",
    category: "AI Agents",
    url: "https://www.nutstudio.ai",
    logo: "https://www.google.com/s2/favicons?domain=nutstudio.ai&sz=128",
    tier: "featured",
    founding: true
  },
  {
    name: "InVideo",
    tagline: "Create publish-ready videos from a single text prompt.",
    category: "Video",
    url: "https://invideo.io",
    logo: "https://www.google.com/s2/favicons?domain=invideo.io&sz=128",
    tier: "featured",
    founding: true
  },
  {
    name: "Polym",
    tagline: "Audio learning app — retain knowledge with spaced repetition and audio flashcards.",
    category: "Learning",
    url: "https://polymapp.com/",
    logo: "https://www.google.com/s2/favicons?domain=polymapp.com&sz=128",
    tier: "featured",
    founding: true
  },
  {
    name: "Zapier",
    tagline: "Connect 7,000+ apps and automate workflows with AI — no code.",
    category: "Automation",
    url: "https://zapier.com",
    logo: "",
    tier: "free"
  },
  {
    name: "Make",
    tagline: "Visually build powerful, multi-step automations across your apps.",
    category: "Automation",
    url: "https://www.make.com",
    logo: "",
    tier: "free"
  },
  {
    name: "n8n",
    tagline: "Open-source workflow automation you can self-host and extend.",
    category: "Automation",
    url: "https://n8n.io",
    logo: "",
    tier: "free"
  },
  {
    name: "ChatGPT",
    tagline: "OpenAI's assistant for writing, analysis, and everyday tasks.",
    category: "AI Assistant",
    url: "https://chatgpt.com",
    logo: "",
    tier: "free"
  },
  {
    name: "Claude",
    tagline: "Anthropic's AI assistant for writing, coding, and analysis.",
    category: "AI Assistant",
    url: "https://claude.ai",
    logo: "",
    tier: "free"
  },
  {
    name: "Notion AI",
    tagline: "AI writing and instant Q&A built into your Notion workspace.",
    category: "Productivity",
    url: "https://www.notion.so/product/ai",
    logo: "",
    tier: "free"
  },
  {
    name: "Fireflies.ai",
    tagline: "Records, transcribes, and summarizes your meetings automatically.",
    category: "Meetings",
    url: "https://fireflies.ai",
    logo: "",
    tier: "free"
  },
  {
    name: "Gamma",
    tagline: "Generate polished decks, docs, and webpages from a prompt.",
    category: "Content",
    url: "https://gamma.app",
    logo: "",
    tier: "free"
  },
  {
    name: "Perplexity",
    tagline: "AI answer engine with cited, up-to-date sources for research.",
    category: "Research",
    url: "https://www.perplexity.ai",
    logo: "",
    tier: "free"
  },
  {
    name: "Synthesia",
    tagline: "Create studio-quality videos from text with AI avatars and voiceovers.",
    category: "Video",
    url: "https://www.synthesia.io",
    logo: "",
    tier: "free"
  },
  {
    name: "Durable",
    tagline: "Build a complete small-business website with AI in under a minute.",
    category: "Website Builder",
    url: "https://durable.co",
    logo: "",
    tier: "free"
  }
];

/* ---------------------------------------------------------------------
 *  PRICING TIERS shown in the "Get your tool featured" section.
 *  Edit freely. period = the text after the price.
 * ------------------------------------------------------------------- */
const PRICING = [
  {
    name: "Featured Partner",
    original: "$899",
    price: "$499",
    period: "/ year",
    highlight: true,
    note: "Founding rate — first 5 partners",
    perks: [
      "Top of page, highlighted card + badge",
      "Logo, full description & direct CTA link",
      "Featured in a monthly Medium article (~30k readers)",
      "Newsletter mention + permanent backlink"
    ]
  },
  {
    name: "Listed",
    price: "$349",
    period: "/ year",
    highlight: false,
    note: "Unlimited slots",
    perks: [
      "Standard card in the directory grid",
      "Description + direct link",
      "Permanent backlink (great for your SEO)",
      "Eligible for editorial article mentions"
    ]
  },
  {
    name: "Free Editorial",
    price: "$0",
    period: "",
    highlight: false,
    note: "By curation",
    perks: [
      "We add genuinely useful tools for free",
      "Subject to review — listed only if useful to our readers",
      "Standard directory listing",
      "Upgrade to Featured anytime"
    ]
  }
];
