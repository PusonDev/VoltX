-- VoltX — Initial Database Schema
-- Run this migration against your Supabase project

-- ═══════════════════════════════════════
-- EXTENSIONS
-- ═══════════════════════════════════════
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════
-- PRODUCTS
-- ═══════════════════════════════════════
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  vendor TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  description TEXT NOT NULL,
  target_segment TEXT[] DEFAULT '{}',
  platforms TEXT[] DEFAULT '{}',
  pricing_model TEXT NOT NULL,
  price_from NUMERIC,
  recurring BOOLEAN DEFAULT false,
  commission_type TEXT,
  commission_value NUMERIC,
  affiliate_status TEXT NOT NULL CHECK (
    affiliate_status IN ('approved', 'application-pending', 'network-program', 'direct-only', 'unverified')
  ),
  affiliate_network TEXT,
  affiliate_url TEXT,
  direct_url TEXT NOT NULL,
  cookie_days INTEGER,
  last_verified_at TIMESTAMPTZ,
  editorial_score NUMERIC NOT NULL DEFAULT 0,
  fit_score NUMERIC NOT NULL DEFAULT 0,
  internal_notes TEXT,  -- INTERNAL ONLY — never render on public pages
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_slug ON products(slug);

-- ═══════════════════════════════════════
-- PROBLEM CLUSTERS
-- ═══════════════════════════════════════
CREATE TABLE problem_clusters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT,
  urgency_score INTEGER NOT NULL DEFAULT 0,
  buyer_intent_score INTEGER NOT NULL DEFAULT 0,
  evergreen_score INTEGER NOT NULL DEFAULT 0,
  competition_score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- PRODUCT-PROBLEM FIT MAPPING
-- ═══════════════════════════════════════
CREATE TABLE product_problem_fit (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  problem_id UUID REFERENCES problem_clusters(id) ON DELETE CASCADE,
  fit_score NUMERIC NOT NULL DEFAULT 0,
  explanation TEXT NOT NULL,
  PRIMARY KEY (product_id, problem_id)
);

-- ═══════════════════════════════════════
-- LEADS
-- ═══════════════════════════════════════
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  source TEXT,
  diagnostic_result JSONB,
  marketing_consent BOOLEAN DEFAULT false,
  consent_timestamp TIMESTAMPTZ,
  locale TEXT DEFAULT 'en',
  cookie_token TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email)
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_cookie ON leads(cookie_token);

-- ═══════════════════════════════════════
-- LEAD TOPIC TOUCHES
-- ═══════════════════════════════════════
CREATE TABLE lead_topic_touches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  topic_slug TEXT NOT NULL,
  page_type TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_touches_lead ON lead_topic_touches(lead_id);

-- ═══════════════════════════════════════
-- AFFILIATE CLICKS
-- ═══════════════════════════════════════
CREATE TABLE affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  session_id TEXT,
  locale TEXT,
  page_slug TEXT,
  placement TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_clicks_product ON affiliate_clicks(product_id);

-- ═══════════════════════════════════════
-- CONTENT TRANSLATIONS
-- ═══════════════════════════════════════
CREATE TABLE content_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type TEXT NOT NULL,  -- 'product', 'problem', 'guide', 'review', etc.
  content_id UUID NOT NULL,
  locale TEXT NOT NULL,
  translated_fields JSONB NOT NULL DEFAULT '{}',
  needs_review BOOLEAN DEFAULT true,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(content_type, content_id, locale)
);

-- ═══════════════════════════════════════
-- GUIDES
-- ═══════════════════════════════════════
CREATE TABLE guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- REVIEWS
-- ═══════════════════════════════════════
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  verdict TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- BEST CATEGORIES
-- ═══════════════════════════════════════
CREATE TABLE best_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  product_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- COMPARISONS
-- ═══════════════════════════════════════
CREATE TABLE comparisons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  product1_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product2_id UUID REFERENCES products(id) ON DELETE SET NULL,
  comparison_content TEXT NOT NULL,
  winner_id UUID REFERENCES products(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- CAMPAIGNS
-- ═══════════════════════════════════════
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  headline TEXT NOT NULL,
  body_content TEXT NOT NULL,
  cta_text TEXT NOT NULL,
  source TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE problem_clusters ENABLE ROW LEVEL SECURITY;
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE best_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Public read for content tables
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read problems" ON problem_clusters FOR SELECT USING (true);
CREATE POLICY "Public read guides" ON guides FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read best" ON best_categories FOR SELECT USING (true);
CREATE POLICY "Public read comparisons" ON comparisons FOR SELECT USING (true);
CREATE POLICY "Public read campaigns" ON campaigns FOR SELECT USING (true);

-- Leads/clicks are server-side only (service role key)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_topic_touches ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_translations ENABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════
-- AUTO-TRANSLATION TRIGGER
-- When new English content is inserted, auto-create a
-- draft translation row for Arabic
-- ═══════════════════════════════════════
CREATE OR REPLACE FUNCTION auto_create_translation()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO content_translations (content_type, content_id, locale, translated_fields, needs_review, published)
  VALUES (TG_ARGV[0], NEW.id, 'ar', '{}', true, false)
  ON CONFLICT (content_type, content_id, locale) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_product_translation AFTER INSERT ON products
  FOR EACH ROW EXECUTE FUNCTION auto_create_translation('product');

CREATE TRIGGER trg_problem_translation AFTER INSERT ON problem_clusters
  FOR EACH ROW EXECUTE FUNCTION auto_create_translation('problem');

CREATE TRIGGER trg_guide_translation AFTER INSERT ON guides
  FOR EACH ROW EXECUTE FUNCTION auto_create_translation('guide');

CREATE TRIGGER trg_review_translation AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE FUNCTION auto_create_translation('review');

CREATE TRIGGER trg_campaign_translation AFTER INSERT ON campaigns
  FOR EACH ROW EXECUTE FUNCTION auto_create_translation('campaign');
