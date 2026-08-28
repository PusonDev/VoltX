import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ProductCard from "@/components/shared/ProductCard";
import { getComparisons, getComparisonBySlug, getProductBySlug, seedProducts } from "@/lib/supabase/seed";
import { breadcrumbSchema } from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ locale: string; pair: string }>;
}

export function generateStaticParams() {
  const comparisons = getComparisons();
  return comparisons.map((c) => ({ pair: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, pair } = await params;
  const comparison = getComparisonBySlug(pair);
  if (!comparison) return {};

  const p1 = seedProducts.find((p) => p.id === comparison.product1_id);
  const p2 = seedProducts.find((p) => p.id === comparison.product2_id);
  const title = `${p1?.name || "Product"} vs ${p2?.name || "Product"} — Full Comparison`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voltx.com";

  return {
    title,
    description: comparison.comparison_content.substring(0, 160),
    alternates: {
      canonical: `${siteUrl}/${locale}/compare/${pair}`,
      languages: {
        en: `${siteUrl}/en/compare/${pair}`,
        ar: `${siteUrl}/ar/compare/${pair}`,
      },
    },
  };
}

export default function ComparePage({ params }: { params: { locale: string; pair: string } }) {
  const locale = params.locale;
  const comparison = getComparisonBySlug(params.pair);
  if (!comparison) notFound();

  const product1 = seedProducts.find((p) => p.id === comparison.product1_id);
  const product2 = seedProducts.find((p) => p.id === comparison.product2_id);
  if (!product1 || !product2) notFound();

  const winner = comparison.winner_id ? seedProducts.find((p) => p.id === comparison.winner_id) : null;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voltx.com";

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: `${siteUrl}/${locale}` },
    { name: "Comparisons", url: `${siteUrl}/${locale}/hub` },
    { name: `${product1.name} vs ${product2.name}`, url: `${siteUrl}/${locale}/compare/${comparison.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="py-16">
        <Container>
          <ScrollReveal>
            <nav className="text-sm text-text-muted mb-8">
              <a href={`/${locale}`} className="hover:text-primary transition-colors">Home</a>
              <span className="mx-2">/</span>
              <a href={`/${locale}/hub`} className="hover:text-primary transition-colors">Hub</a>
              <span className="mx-2">/</span>
              <span className="text-text-secondary">Compare</span>
            </nav>
          </ScrollReveal>

          <ScrollReveal>
            <h1 className="text-text-primary">
              {product1.name} <span className="text-text-muted font-normal">vs</span> {product2.name}
            </h1>
            {winner && (
              <div className="mt-4">
                <Badge variant="success">Our Pick: {winner.name}</Badge>
              </div>
            )}
          </ScrollReveal>

          {/* Head-to-head summary */}
          <ScrollReveal delay={100}>
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              <ProductCard product={product1} pageSlug={comparison.slug} placement="compare-left" />
              <ProductCard product={product2} pageSlug={comparison.slug} placement="compare-right" />
            </div>
          </ScrollReveal>

          {/* Comparison content */}
          <ScrollReveal delay={200}>
            <div className="mt-12 prose prose-slate max-w-none">
              {comparison.comparison_content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("## ")) {
                  return <h2 key={i} className="text-xl font-bold text-text-primary mt-10 mb-4">{paragraph.replace("## ", "")}</h2>;
                }
                return <p key={i} className="text-text-secondary leading-relaxed mb-4">{paragraph}</p>;
              })}
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
