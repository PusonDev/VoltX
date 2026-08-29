import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { getProblems } from "@/lib/supabase/seed";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "problems" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voltx.com";

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `${siteUrl}/${locale}/problems`,
      languages: { en: `${siteUrl}/en/problems`, ar: `${siteUrl}/ar/problems` },
    },
  };
}

export default function ProblemsPage() {
  const t = useTranslations("problems");
  const locale = useLocale();
  const problems = getProblems(locale);

  return (
    <section className="py-16">
      <Container>
        <ScrollReveal>
          <h1 className="text-text-primary">{t("title")}</h1>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6">
          {problems.map((problem, i) => (
            <ScrollReveal key={problem.id} delay={i * 100}>
              <Link href={`/${locale}/problems/${problem.slug}`} className="block">
                <Card className="group cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-grow">
                      <h2 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                        {problem.title}
                      </h2>
                      <p className="mt-2 text-text-secondary leading-relaxed">
                        {problem.short_description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 md:flex-shrink-0">
                      <Badge variant="success">
                        {t("urgency")}: {problem.urgency_score}/10
                      </Badge>
                      <Badge variant="warning">
                        {t("buyerIntent")}: {problem.buyer_intent_score}/10
                      </Badge>
                    </div>
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
