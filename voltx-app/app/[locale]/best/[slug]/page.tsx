import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ProductCard from "@/components/shared/ProductCard";
import { getBestCategories, getBestCategoryBySlug, seedProducts } from "@/lib/supabase/seed";
import { breadcrumbSchema } from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const categories = getBestCategories();
  return categories.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = getBestCategoryBySlug(slug);
  if (!category) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voltx.com";

  return {
    title: category.title,
    description: category.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/best/${slug}`,
      languages: {
        en: `${siteUrl}/en/best/${slug}`,
        ar: `${siteUrl}/ar/best/${slug}`,
      },
    },
  };
}

export default function BestPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale;
  const category = getBestCategoryBySlug(params.slug);
  if (!category) notFound();

  const products = category.product_ids
    .map((id) => seedProducts.find((p) => p.id === id))
    .filter(Boolean);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voltx.com";

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: `${siteUrl}/${locale}` },
    { name: "Best Picks", url: `${siteUrl}/${locale}/hub` },
    { name: category.title, url: `${siteUrl}/${locale}/best/${category.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <section className="py-16">
        <Container>
          <ScrollReveal>
            <h1 className="text-text-primary">{category.title}</h1>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl leading-relaxed">
              {category.description}
            </p>
            <p className="mt-2 text-xs text-text-muted">
              Last updated: {new Date(category.updated_at).toLocaleDateString("en", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </ScrollReveal>

          <div className="mt-12 space-y-6">
            {products.map((product, i) => (
              <ScrollReveal key={product!.id} delay={i * 100}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white font-bold text-lg">#{i + 1}</span>
                  </div>
                  <div className="flex-grow">
                    <ProductCard
                      product={product!}
                      pageSlug={category.slug}
                      placement="best-of"
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
