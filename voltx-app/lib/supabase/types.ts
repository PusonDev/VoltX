/* ─── VoltX Design Tokens — Supabase DB Types ─── */

export type AffiliateStatus =
  | "approved"
  | "application-pending"
  | "network-program"
  | "direct-only"
  | "unverified";

export interface Product {
  id: string;
  slug: string;
  name: string;
  vendor: string;
  category: string;
  subcategory: string | null;
  description: string;
  target_segment: string[];
  platforms: string[];
  pricing_model: string;
  price_from: number | null;
  recurring: boolean;
  commission_type: string | null;
  commission_value: number | null;
  affiliate_status: AffiliateStatus;
  affiliate_network: string | null;
  affiliate_url: string | null;
  direct_url: string;
  cookie_days: number | null;
  last_verified_at: string | null;
  editorial_score: number;
  fit_score: number;
  internal_notes: string | null; // NEVER render on public pages
  created_at: string;
  updated_at: string;
}

export interface ProblemCluster {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  long_description?: string;
  urgency_score: number;
  buyer_intent_score: number;
  evergreen_score: number;
  competition_score: number;
}

export interface ProductProblemFit {
  product_id: string;
  problem_id: string;
  fit_score: number;
  explanation: string;
}

export interface Lead {
  id: string;
  email: string;
  source: string;
  diagnostic_result: Record<string, unknown> | null;
  marketing_consent: boolean;
  consent_timestamp: string | null;
  locale: string;
  cookie_token: string;
  created_at: string;
}

export interface LeadTopicTouch {
  id: string;
  lead_id: string;
  topic_slug: string;
  page_type: string;
  source: string;
  created_at: string;
}

export interface AffiliateClick {
  id: string;
  product_id: string;
  session_id: string;
  locale: string;
  page_slug: string;
  placement: string;
  created_at: string;
}

export interface ContentTranslation {
  id: string;
  content_type: string;
  content_id: string;
  locale: string;
  translated_fields: Record<string, string>;
  needs_review: boolean;
  published: boolean;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  slug: string;
  product_id: string;
  title: string;
  excerpt: string;
  content: string;
  pros: string[];
  cons: string[];
  verdict: string;
  created_at: string;
  updated_at: string;
}

export interface BestCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  product_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface Comparison {
  id: string;
  slug: string; // e.g. "1password-vs-nordpass"
  product1_id: string;
  product2_id: string;
  comparison_content: string;
  winner_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  headline: string;
  body_content: string;
  cta_text: string;
  source: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}
