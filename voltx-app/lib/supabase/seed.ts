import type {
  Product,
  ProblemCluster,
  ProductProblemFit,
  Guide,
  Review,
  BestCategory,
  Comparison,
  Campaign,
} from "./types";

/* ═══════════════════════════════════════
   SEED DATA — Used when Supabase is not connected.
   Replace with real Supabase queries in production.
   ═══════════════════════════════════════ */

export const seedProducts: Product[] = [
  {
    id: "p1",
    slug: "1password-business",
    name: "1Password Business",
    vendor: "1Password",
    category: "Password Management",
    subcategory: "Team Password Vault",
    description:
      "Enterprise-grade password management for teams. Shared vaults, admin controls, and breach monitoring built for small businesses scaling security.",
    target_segment: ["small-business", "startup", "remote-team"],
    platforms: ["Windows", "macOS", "iOS", "Android", "Linux", "Web"],
    pricing_model: "per-user",
    price_from: 7.99,
    recurring: true,
    commission_type: "percentage",
    commission_value: 25,
    affiliate_status: "approved",
    affiliate_network: "Impact",
    affiliate_url: "https://1password.com/business?ref=voltx",
    direct_url: "https://1password.com/business",
    cookie_days: 30,
    last_verified_at: "2026-08-15T00:00:00Z",
    editorial_score: 9.2,
    fit_score: 9.5,
    internal_notes: "Strong partner program. 25% recurring commission via Impact.",
    created_at: "2026-01-10T00:00:00Z",
    updated_at: "2026-08-15T00:00:00Z",
  },
  {
    id: "p2",
    slug: "nordpass-business",
    name: "NordPass Business",
    vendor: "Nord Security",
    category: "Password Management",
    subcategory: "Team Password Vault",
    description:
      "Password management by the NordVPN team. Zero-knowledge architecture, data breach scanner, and affordable team pricing.",
    target_segment: ["small-business", "freelancer"],
    platforms: ["Windows", "macOS", "iOS", "Android", "Linux", "Web"],
    pricing_model: "per-user",
    price_from: 3.99,
    recurring: true,
    commission_type: "flat",
    commission_value: 40,
    affiliate_status: "approved",
    affiliate_network: "CJ Affiliate",
    affiliate_url: "https://nordpass.com/business?ref=voltx",
    direct_url: "https://nordpass.com/business",
    cookie_days: 30,
    last_verified_at: "2026-08-10T00:00:00Z",
    editorial_score: 8.1,
    fit_score: 8.4,
    internal_notes: "Flat $40 per sale via CJ. Lower editorial score due to fewer admin features.",
    created_at: "2026-02-05T00:00:00Z",
    updated_at: "2026-08-10T00:00:00Z",
  },
  {
    id: "p3",
    slug: "bitwarden-teams",
    name: "Bitwarden Teams",
    vendor: "Bitwarden",
    category: "Password Management",
    subcategory: "Team Password Vault",
    description:
      "Open-source password manager with end-to-end encryption. Self-hosting option, unlimited devices, and the most affordable team plan in its class.",
    target_segment: ["small-business", "startup", "developer-team"],
    platforms: ["Windows", "macOS", "iOS", "Android", "Linux", "Web"],
    pricing_model: "per-user",
    price_from: 4.0,
    recurring: true,
    commission_type: null,
    commission_value: null,
    affiliate_status: "direct-only",
    affiliate_network: null,
    affiliate_url: null,
    direct_url: "https://bitwarden.com/pricing/business/",
    cookie_days: null,
    last_verified_at: "2026-08-20T00:00:00Z",
    editorial_score: 8.8,
    fit_score: 9.0,
    internal_notes: "No affiliate program. Recommend anyway — great product for price-sensitive teams.",
    created_at: "2026-01-15T00:00:00Z",
    updated_at: "2026-08-20T00:00:00Z",
  },
  {
    id: "p4",
    slug: "surfshark-vpn",
    name: "Surfshark for Teams",
    vendor: "Surfshark",
    category: "VPN & Network Security",
    subcategory: "Business VPN",
    description:
      "Fast VPN with unlimited devices, CleanWeb ad/tracker blocker, and dedicated IP options for small business teams working remotely.",
    target_segment: ["small-business", "remote-team", "freelancer"],
    platforms: ["Windows", "macOS", "iOS", "Android", "Linux"],
    pricing_model: "flat",
    price_from: 2.49,
    recurring: true,
    commission_type: "percentage",
    commission_value: 40,
    affiliate_status: "approved",
    affiliate_network: "ShareASale",
    affiliate_url: "https://surfshark.com/teams?ref=voltx",
    direct_url: "https://surfshark.com/teams",
    cookie_days: 30,
    last_verified_at: "2026-08-18T00:00:00Z",
    editorial_score: 8.3,
    fit_score: 8.0,
    internal_notes: "40% recurring via ShareASale. Good for remote teams.",
    created_at: "2026-03-01T00:00:00Z",
    updated_at: "2026-08-18T00:00:00Z",
  },
  {
    id: "p5",
    slug: "malwarebytes-endpoint",
    name: "Malwarebytes Endpoint Protection",
    vendor: "Malwarebytes",
    category: "Endpoint Security",
    subcategory: "Antivirus & Anti-Malware",
    description:
      "Lightweight endpoint protection that stops ransomware, malware, and zero-day threats. Simple deployment for teams without a dedicated IT person.",
    target_segment: ["small-business", "startup"],
    platforms: ["Windows", "macOS"],
    pricing_model: "per-device",
    price_from: 6.0,
    recurring: true,
    commission_type: "percentage",
    commission_value: 20,
    affiliate_status: "application-pending",
    affiliate_network: "Commission Junction",
    affiliate_url: null,
    direct_url: "https://www.malwarebytes.com/business/endpoint-protection",
    cookie_days: null,
    last_verified_at: "2026-07-25T00:00:00Z",
    editorial_score: 8.5,
    fit_score: 8.7,
    internal_notes: "Application pending at CJ. Using direct URL for now.",
    created_at: "2026-02-20T00:00:00Z",
    updated_at: "2026-07-25T00:00:00Z",
  },
];

export const seedProblems: ProblemCluster[] = [
  {
    id: "prob1",
    slug: "employees-reusing-passwords",
    title: "Employees Reusing Passwords Across Services",
    short_description:
      "Your team uses the same password everywhere. One breach at any service exposes all your accounts.",
    long_description:
      "Password reuse is the single most common security vulnerability in small businesses. When employees use the same credentials across multiple services, a data breach at any one of those services can compromise your entire business infrastructure. Credential stuffing attacks — where hackers use leaked username/password pairs to try logging into other services — succeed at alarming rates precisely because of password reuse.",
    urgency_score: 9,
    buyer_intent_score: 8,
    evergreen_score: 10,
    competition_score: 7,
  },
  {
    id: "prob2",
    slug: "remote-team-no-vpn",
    title: "Remote Team Working Without VPN Protection",
    short_description:
      "Your remote workers connect from cafés and home networks without encrypted tunnels. Client data travels unprotected.",
    long_description:
      "Remote and hybrid work has made network security significantly harder. When employees connect to your business systems from coffee shops, co-working spaces, or home networks, their traffic can be intercepted. Without a business VPN, sensitive client data, internal communications, and login credentials are all exposed to potential man-in-the-middle attacks.",
    urgency_score: 7,
    buyer_intent_score: 7,
    evergreen_score: 9,
    competition_score: 6,
  },
  {
    id: "prob3",
    slug: "ransomware-fear-no-plan",
    title: "Worried About Ransomware But Have No Prevention Plan",
    short_description:
      "You've heard the horror stories. Your business has no endpoint protection, no backup strategy, and no incident response plan.",
    long_description:
      "Ransomware attacks on small businesses have increased dramatically. The average ransom payment now exceeds $100,000, and many small businesses that suffer an attack never recover. Yet most small businesses have no endpoint protection beyond basic Windows Defender, no automated backup strategy, and no incident response plan. This cluster addresses the full anti-ransomware stack from prevention to recovery.",
    urgency_score: 10,
    buyer_intent_score: 9,
    evergreen_score: 9,
    competition_score: 5,
  },
  {
    id: "prob4",
    slug: "no-idea-where-to-start",
    title: "Complete Beginner — No Idea Where to Start With Security",
    short_description:
      "You know security matters but the options are overwhelming. You need a clear, prioritized starting point.",
    long_description:
      "Many small business owners know they should be doing something about cybersecurity but feel paralyzed by the sheer number of options and technical jargon. This is actually the most common starting point for VoltX users. Instead of overwhelming you with a dozen tools, we identify the 2-3 most impactful steps you can take today based on your specific business profile, industry, and risk factors.",
    urgency_score: 6,
    buyer_intent_score: 10,
    evergreen_score: 10,
    competition_score: 4,
  },
];

export const seedProductProblemFits: ProductProblemFit[] = [
  { product_id: "p1", problem_id: "prob1", fit_score: 9.5, explanation: "1Password's shared vaults and breach monitoring directly solve password reuse by giving teams a secure, shared credential system." },
  { product_id: "p2", problem_id: "prob1", fit_score: 8.2, explanation: "NordPass offers solid team password management at a lower price point. Good for smaller teams with budget constraints." },
  { product_id: "p3", problem_id: "prob1", fit_score: 9.0, explanation: "Bitwarden is the best value option for password management. Open-source, auditable, and the most affordable team plan." },
  { product_id: "p4", problem_id: "prob2", fit_score: 8.5, explanation: "Surfshark's unlimited device policy and dedicated IP options make it ideal for remote teams of any size." },
  { product_id: "p5", problem_id: "prob3", fit_score: 8.7, explanation: "Malwarebytes stops ransomware at the endpoint level. Simple to deploy for teams without a dedicated IT person." },
  { product_id: "p1", problem_id: "prob4", fit_score: 9.0, explanation: "Password management is the #1 first step we recommend for security beginners. 1Password makes it easy." },
  { product_id: "p3", problem_id: "prob4", fit_score: 8.8, explanation: "For budget-conscious beginners, Bitwarden offers the best starting point at the lowest cost." },
];

export const seedGuides: Guide[] = [
  {
    id: "g1",
    slug: "password-manager-setup-guide",
    title: "How to Set Up a Password Manager for Your Small Business (2026 Guide)",
    excerpt: "Step-by-step guide to rolling out a password manager across your team — from choosing the right tool to getting 100% adoption.",
    content: "This comprehensive guide walks you through evaluating, choosing, and deploying a password manager for your small business team. We cover the migration process from browser-saved passwords, how to set up shared vaults for team credentials, and strategies for getting reluctant employees to actually use it.\n\n## Why Password Managers Matter\n\nThe average employee reuses passwords across 14 different services. When any one of those services suffers a data breach, every account sharing that password is compromised. A password manager eliminates this risk by generating unique, complex passwords for every service and storing them in an encrypted vault.\n\n## Choosing the Right Tool\n\nWe recommend starting with one of three options based on your situation:\n\n1. **1Password Business** — Best overall for teams that want a polished experience with strong admin controls\n2. **Bitwarden Teams** — Best value and only option with self-hosting capability\n3. **NordPass Business** — Most affordable per-user pricing for very small teams\n\n## Deployment Steps\n\n1. Start with a pilot group of 3-5 employees\n2. Import existing passwords from browser storage\n3. Set up shared vaults for team credentials\n4. Enable two-factor authentication on the vault itself\n5. Schedule a 15-minute walkthrough for the full team\n6. Set a deadline for browser password manager migration",
    category: "Getting Started",
    created_at: "2026-03-15T00:00:00Z",
    updated_at: "2026-08-01T00:00:00Z",
  },
  {
    id: "g2",
    slug: "small-business-cybersecurity-checklist",
    title: "The Essential Cybersecurity Checklist for Small Businesses (2026)",
    excerpt: "A prioritized, actionable security checklist. Stop worrying about everything — focus on these high-impact steps first.",
    content: "Cybersecurity doesn't have to be overwhelming. This checklist prioritizes the steps that give you the most protection for the least effort and cost.\n\n## Priority 1: Critical (Do This Week)\n\n- [ ] Deploy a password manager and enforce unique passwords\n- [ ] Enable two-factor authentication on all critical accounts\n- [ ] Verify your backup system is running and test a restore\n\n## Priority 2: Important (Do This Month)\n\n- [ ] Install endpoint protection on all business devices\n- [ ] Set up a business VPN for remote workers\n- [ ] Review who has admin access to what — remove unnecessary permissions\n\n## Priority 3: Advanced (Do This Quarter)\n\n- [ ] Implement email security (DMARC, SPF, DKIM)\n- [ ] Create a basic incident response plan\n- [ ] Schedule quarterly security reviews",
    category: "Getting Started",
    created_at: "2026-04-01T00:00:00Z",
    updated_at: "2026-08-05T00:00:00Z",
  },
];

export const seedReviews: Review[] = [
  {
    id: "r1",
    slug: "1password-business-review",
    product_id: "p1",
    title: "1Password Business Review: Still the Best Team Password Manager in 2026?",
    excerpt: "We tested 1Password Business for 6 months with a real team. Here's our honest assessment of its strengths, weaknesses, and whether it justifies the price.",
    content: "After six months of daily use with a 12-person team, 1Password Business remains our top recommendation for small business password management — but it's not perfect.\n\n## What We Tested\n\nWe deployed 1Password Business across our test team, migrated from browser-saved passwords, set up shared vaults for team credentials, and tested admin features like activity logs and policy enforcement.\n\n## The Good\n\n1Password's interface is the most polished in the category. The browser extension works seamlessly, autofill rarely breaks, and the Watchtower feature (which monitors for breached passwords) caught three compromised credentials in our first week.\n\n## The Not-So-Good\n\nAt $7.99/user/month, it's the most expensive option in our test group. For teams under 5 people, the cost adds up quickly. The admin dashboard, while functional, lacks some of the granular controls that Bitwarden offers.\n\n## Verdict\n\nIf budget isn't your primary constraint, 1Password is the safest choice. Best-in-class UX means higher team adoption rates, which is ultimately what matters most for a password manager.",
    pros: [
      "Best-in-class user experience and interface design",
      "Watchtower breach monitoring catches compromised passwords",
      "Excellent browser extension with reliable autofill",
      "Strong admin controls and activity logging",
      "Cross-platform support including Linux",
    ],
    cons: [
      "Most expensive option in the category",
      "No self-hosting option",
      "Admin dashboard could be more granular",
      "No free tier for evaluation beyond 14-day trial",
    ],
    verdict: "Best overall team password manager for small businesses that can afford the premium. The superior UX directly translates to higher team adoption rates.",
    created_at: "2026-05-01T00:00:00Z",
    updated_at: "2026-08-15T00:00:00Z",
  },
];

export const seedBestCategories: BestCategory[] = [
  {
    id: "b1",
    slug: "password-manager-for-small-business",
    title: "Best Password Managers for Small Business (2026)",
    description: "We tested and compared every major password manager for small teams. Here are our top picks ranked by fit score, not commission.",
    product_ids: ["p1", "p3", "p2"],
    created_at: "2026-04-15T00:00:00Z",
    updated_at: "2026-08-15T00:00:00Z",
  },
];

export const seedComparisons: Comparison[] = [
  {
    id: "c1",
    slug: "1password-vs-nordpass",
    product1_id: "p1",
    product2_id: "p2",
    comparison_content: "1Password and NordPass both solve the same core problem — team password management — but they approach it differently. 1Password focuses on premium UX and deep admin controls, while NordPass offers a more affordable entry point with the backing of Nord Security's infrastructure.\n\n## Price\n1Password: $7.99/user/month | NordPass: $3.99/user/month\n\nNordPass is nearly half the price, making it the clear winner for budget-conscious teams.\n\n## Features\n1Password leads in admin controls, shared vault organization, and breach monitoring (Watchtower). NordPass offers solid basics but fewer advanced team management features.\n\n## UX & Adoption\n1Password's interface is more polished and intuitive. In our testing, team adoption was 15% higher with 1Password compared to NordPass.\n\n## Security Architecture\nBoth use zero-knowledge encryption. 1Password adds a Secret Key on top of the master password for extra security. NordPass uses xChaCha20 encryption.\n\n## Our Pick\nFor teams that can afford it: **1Password**. For budget-first teams: **NordPass**.",
    winner_id: "p1",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-08-10T00:00:00Z",
  },
  {
    id: "c2",
    slug: "1password-vs-bitwarden",
    product1_id: "p1",
    product2_id: "p3",
    comparison_content: "The battle between 1Password and Bitwarden is the classic premium-vs-value comparison. Both are excellent — the right choice depends on your team's priorities.\n\n## Price\n1Password: $7.99/user/month | Bitwarden: $4.00/user/month\n\nBitwarden is significantly cheaper and even offers a self-hosted option for teams that want full data control.\n\n## Open Source\nBitwarden is fully open-source and regularly audited. 1Password is closed-source but has undergone independent security audits.\n\n## Features\n1Password has a more polished UX and better Watchtower integration. Bitwarden offers more flexibility, self-hosting, and API access for developer teams.\n\n## Our Pick\nFor developer teams or budget-first: **Bitwarden**. For teams wanting the smoothest experience: **1Password**.",
    winner_id: null,
    created_at: "2026-06-15T00:00:00Z",
    updated_at: "2026-08-12T00:00:00Z",
  },
];

export const seedCampaigns: Campaign[] = [
  {
    id: "camp1",
    slug: "password-security-awareness",
    title: "Is Your Team's Password Hygiene Putting You at Risk?",
    headline: "73% of Small Businesses Have Had Credentials Compromised",
    body_content: "A single reused password can expose your entire business. Our free diagnostic identifies your specific password security gaps and recommends the exact tools to fix them — in under 2 minutes.",
    cta_text: "Take the Free Password Diagnostic",
    source: "social",
    active: true,
    created_at: "2026-07-01T00:00:00Z",
    updated_at: "2026-08-01T00:00:00Z",
  },
];

/* ═══════════════════════════════════════
   HELPER — get data (Supabase or seed)
   ═══════════════════════════════════════ */

export function getProducts(): Product[] {
  // TODO: Replace with Supabase query when connected
  return seedProducts;
}

export function getProductBySlug(slug: string): Product | undefined {
  return seedProducts.find((p) => p.slug === slug);
}

export function getProblems(): ProblemCluster[] {
  return seedProblems;
}

export function getProblemBySlug(slug: string): ProblemCluster | undefined {
  return seedProblems.find((p) => p.slug === slug);
}

export function getProductsForProblem(problemId: string): (Product & { fit_score_for_problem: number; fit_explanation: string })[] {
  const fits = seedProductProblemFits
    .filter((f) => f.problem_id === problemId)
    .sort((a, b) => b.fit_score - a.fit_score);

  return fits
    .map((fit) => {
      const product = seedProducts.find((p) => p.id === fit.product_id);
      if (!product) return null;
      return {
        ...product,
        fit_score_for_problem: fit.fit_score,
        fit_explanation: fit.explanation,
      };
    })
    .filter(Boolean) as (Product & { fit_score_for_problem: number; fit_explanation: string })[];
}

export function getGuides(): Guide[] {
  return seedGuides;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return seedGuides.find((g) => g.slug === slug);
}

export function getReviews(): Review[] {
  return seedReviews;
}

export function getReviewBySlug(slug: string): Review | undefined {
  return seedReviews.find((r) => r.slug === slug);
}

export function getBestCategories(): BestCategory[] {
  return seedBestCategories;
}

export function getBestCategoryBySlug(slug: string): BestCategory | undefined {
  return seedBestCategories.find((b) => b.slug === slug);
}

export function getComparisons(): Comparison[] {
  return seedComparisons;
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return seedComparisons.find((c) => c.slug === slug);
}

export function getCampaigns(): Campaign[] {
  return seedCampaigns;
}

export function getCampaignBySlug(slug: string): Campaign | undefined {
  return seedCampaigns.find((c) => c.slug === slug);
}
