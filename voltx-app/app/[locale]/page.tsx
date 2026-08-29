import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { getProblems } from "@/lib/supabase/seed";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voltx.com";

  return {
    title: `${t("siteName")} — ${t("tagline")}`,
    description: t("description"),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: { en: `${siteUrl}/en`, ar: `${siteUrl}/ar` },
    },
  };
}

export default function HomePage() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const locale = useLocale();
  const problems = getProblems(locale);

  return (
    <>
      {/* ═══════ HERO — Asymmetric Layout ═══════ */}
      <section className="relative overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36">
        {/* Subtle background pattern — NOT a gradient blob */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 end-0 w-96 h-96 bg-primary-tint rounded-full opacity-40 blur-3xl" />
          <div className="absolute bottom-10 start-10 w-48 h-48 bg-amber-50 rounded-full opacity-30 blur-2xl" />
        </div>

        <Container size="wide" className="relative">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Text — takes 7 columns, intentionally NOT centered */}
            <div className="md:col-span-7">
              <ScrollReveal>
                <h1 className="text-text-primary whitespace-pre-line">
                  {t("heroTitle")}
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <p className="mt-6 text-lg text-text-secondary max-w-xl leading-relaxed">
                  {t("heroSubtitle")}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button size="lg" href={`/${locale}/diagnostic`}>
                    {t("heroCta")}
                  </Button>
                  <Button variant="outline" size="lg" href={`/${locale}/tools`}>
                    {t("heroSecondary")}
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            {/* Visual — takes 5 columns, offset for asymmetry */}
            <div className="md:col-span-5 md:mt-12">
              <ScrollReveal delay={300}>
                <div className="relative">
                  <div className="bg-card-bg border border-border rounded-2xl p-6 shadow-xl shadow-primary/5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary-tint flex items-center justify-center">
                        <span className="text-primary text-lg">🛡️</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">
                          Security Diagnostic
                        </p>
                        <p className="text-xs text-text-muted">
                          2 min · personalized results
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {["Password Management", "Network Security", "Endpoint Protection"].map(
                        (item, i) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 p-2.5 rounded-lg bg-surface"
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                i === 0
                                  ? "bg-primary"
                                  : i === 1
                                  ? "bg-accent"
                                  : "bg-border"
                              }`}
                            />
                            <span className="text-sm text-text-primary">{item}</span>
                            <span className="ms-auto text-xs text-text-muted">
                              {i === 0 ? "High" : i === 1 ? "Medium" : "Check"}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  {/* Offset decorative card behind */}
                  <div className="absolute -bottom-3 -end-3 -z-10 w-full h-full bg-primary-tint rounded-2xl border border-primary/10" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════ PROBLEMS SECTION ═══════ */}
      <section className="py-20 bg-surface">
        <Container>
          <ScrollReveal>
            <div className="max-w-2xl">
              <h2 className="text-text-primary">{t("problemsTitle")}</h2>
              <p className="mt-4 text-text-secondary text-lg">
                {t("problemsSubtitle")}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid sm:grid-cols-2 gap-5">
            {problems.map((problem, i) => (
              <ScrollReveal key={problem.id} delay={i * 100}>
                <Link href={`/${locale}/problems/${problem.slug}`} className="block h-full">
                  <Card className="h-full group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary-tint flex-shrink-0 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <span className="text-primary group-hover:text-white text-lg">
                          {i === 0 ? "🔑" : i === 1 ? "🌐" : i === 2 ? "🔒" : "🧭"}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors">
                          {problem.title}
                        </h3>
                        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                          {problem.short_description}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-text-muted">
                          <span>Urgency: {problem.urgency_score}/10</span>
                          <span>Intent: {problem.buyer_intent_score}/10</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <div className="mt-8 text-center">
              <Button variant="outline" href={`/${locale}/problems`}>
                {tc("exploreProblems")}
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ═══════ HOW IT WORKS — Editorial list, NOT cards ═══════ */}
      <section className="py-24">
        <Container>
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <ScrollReveal>
                <h2 className="text-text-primary sticky top-24">
                  {t("howItWorksTitle")}
                </h2>
                <p className="mt-4 text-text-secondary">
                  {t("howItWorksSubtitle")}
                </p>
              </ScrollReveal>
            </div>

            <div className="md:col-span-8">
              {[
                {
                  num: "01",
                  title: t("step1Title"),
                  desc: t("step1Desc"),
                  icon: "📋",
                },
                {
                  num: "02",
                  title: t("step2Title"),
                  desc: t("step2Desc"),
                  icon: "🎯",
                },
                {
                  num: "03",
                  title: t("step3Title"),
                  desc: t("step3Desc"),
                  icon: "🚀",
                },
              ].map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 150}>
                  <div
                    className={`flex gap-6 py-8 ${
                      i < 2 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <span className="font-headline text-4xl font-bold text-primary/20">
                        {step.num}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                        <span>{step.icon}</span> {step.title}
                      </h3>
                      <p className="mt-2 text-text-secondary leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════ TRUST SECTION ═══════ */}
      <section className="py-20 bg-surface">
        <Container size="narrow">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-text-primary">{t("trustTitle")}</h2>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {[t("trust1"), t("trust2"), t("trust3"), t("trust4")].map(
              (item, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="flex items-start gap-4 p-4 bg-card-bg rounded-lg border border-border">
                    <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p className="text-text-primary font-medium">{item}</p>
                  </div>
                </ScrollReveal>
              )
            )}
          </div>
        </Container>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="py-24">
        <Container size="narrow">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-text-primary">{t("ctaTitle")}</h2>
              <p className="mt-4 text-lg text-text-secondary">
                {t("ctaSubtitle")}
              </p>
              <div className="mt-8">
                <Button size="lg" href={`/${locale}/diagnostic`}>
                  {t("ctaCta")}
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
