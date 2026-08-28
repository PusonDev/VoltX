import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voltx.com";

  return {
    title: "Terms of Service",
    description: "VoltX Terms of Service — terms and conditions for using our platform.",
    alternates: {
      canonical: `${siteUrl}/${locale}/terms`,
      languages: { en: `${siteUrl}/en/terms`, ar: `${siteUrl}/ar/terms` },
    },
  };
}

export default function TermsPage() {
  return (
    <section className="py-16">
      <Container size="narrow">
        <h1 className="text-text-primary">Terms of Service</h1>
        <p className="mt-2 text-sm text-text-muted">Last updated: August 2026</p>

        <div className="mt-10 prose prose-slate max-w-none space-y-6">
          <h2 className="text-xl font-bold text-text-primary">Acceptance of Terms</h2>
          <p className="text-text-secondary leading-relaxed">
            By accessing and using VoltX, you agree to these terms of service. If you do not agree, please do not use the site.
          </p>

          <h2 className="text-xl font-bold text-text-primary">Our Service</h2>
          <p className="text-text-secondary leading-relaxed">
            VoltX provides cybersecurity product recommendations and educational content for small businesses. Our recommendations are based on editorial evaluation and are intended as guidance, not professional security consulting.
          </p>

          <h2 className="text-xl font-bold text-text-primary">Affiliate Disclosure</h2>
          <p className="text-text-secondary leading-relaxed">
            VoltX earns revenue through affiliate commissions when you purchase products through our links. We clearly label affiliate links. Commission never influences our editorial rankings — products are ranked solely by fit score and editorial evaluation.
          </p>

          <h2 className="text-xl font-bold text-text-primary">Limitation of Liability</h2>
          <p className="text-text-secondary leading-relaxed">
            VoltX provides recommendations in good faith but does not guarantee the security of any product or combination of products. We are not liable for any damages resulting from your use of recommended products.
          </p>

          <h2 className="text-xl font-bold text-text-primary">Changes to Terms</h2>
          <p className="text-text-secondary leading-relaxed">
            We may update these terms from time to time. Continued use of the site constitutes acceptance of updated terms.
          </p>
        </div>
      </Container>
    </section>
  );
}
