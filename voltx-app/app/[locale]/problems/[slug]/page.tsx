import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { useLocale } from "next-intl";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ProductCard from "@/components/shared/ProductCard";
import { getProblems, getProblemBySlug, getProductsForProblem } from "@/lib/supabase/seed";
import { breadcrumbSchema } from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  // Pull slugs from Supabase at build time — never hardcoded
  const problems = getProblems();
  return problems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const problem = getProblemBySlug(slug);
  if (!problem) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voltx.com";

  return {
    title: problem.title,
    description: problem.short_description,
    alternates: {
      canonical: `${siteUrl}/${locale}/problems/${slug}`,
      languages: {
        en: `${siteUrl}/en/problems/${slug}`,
        ar: `${siteUrl}/ar/problems/${slug}`,
      },
    },
  };
}

export default function ProblemPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale;
  const problem = getProblemBySlug(params.slug);

  if (!problem) notFound();

  const fittedProducts = getProductsForProblem(problem.id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voltx.com";

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: `${siteUrl}/${locale}` },
    { name: "Security Challenges", url: `${siteUrl}/${locale}/problems` },
    { name: problem.title, url: `${siteUrl}/${locale}/problems/${problem.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="py-16">
        <Container size="narrow">
          <ScrollReveal>
            <nav className="text-sm text-text-muted mb-8">
              <a href={`/${locale}`} className="hover:text-primary transition-colors">Home</a>
              <span className="mx-2">/</span>
              <a href={`/${locale}/problems`} className="hover:text-primary transition-colors">Challenges</a>
              <span className="mx-2">/</span>
              <span className="text-text-secondary">{problem.title}</span>
            </nav>
          </ScrollReveal>

          <ScrollReveal>
            <h1 className="text-text-primary">{problem.title}</h1>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">
              {problem.short_description}
            </p>
          </ScrollReveal>

          {problem.long_description && (
            <ScrollReveal delay={100}>
              <div className="mt-8 prose prose-slate max-w-none">
                {problem.long_description.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-text-secondary leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          )}
        </Container>
      </section>

      {/* Recommended Products */}
      {fittedProducts.length > 0 && (
        <section className="py-16 bg-surface">
          <Container>
            <ScrollReveal>
              <h2 className="text-text-primary mb-2">Recommended Solutions</h2>
              <p className="text-text-secondary mb-8">
                Products ranked by fit score for this specific challenge — not by commission.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fittedProducts.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 100}>
                  <ProductCard
                    product={product}
                    fitScore={product.fit_score_for_problem}
                    fitExplanation={product.fit_explanation}
                    pageSlug={problem.slug}
                    placement="problem-page"
                  />
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
