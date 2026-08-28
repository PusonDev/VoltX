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
    title: "Privacy Policy",
    description: "VoltX Privacy Policy — how we collect, use, and protect your data.",
    alternates: {
      canonical: `${siteUrl}/${locale}/privacy`,
      languages: { en: `${siteUrl}/en/privacy`, ar: `${siteUrl}/ar/privacy` },
    },
  };
}

export default function PrivacyPage() {
  return (
    <section className="py-16">
      <Container size="narrow">
        <h1 className="text-text-primary">Privacy Policy</h1>
        <p className="mt-2 text-sm text-text-muted">Last updated: August 2026</p>

        <div className="mt-10 prose prose-slate max-w-none space-y-6">
          <h2 className="text-xl font-bold text-text-primary">Information We Collect</h2>
          <p className="text-text-secondary leading-relaxed">
            When you use our diagnostic tool or sign up for recommendations, we collect your email address and the answers you provide in the diagnostic questionnaire. We also collect anonymous usage data through cookies and analytics.
          </p>

          <h2 className="text-xl font-bold text-text-primary">How We Use Your Information</h2>
          <p className="text-text-secondary leading-relaxed">
            We use your email to deliver your personalized security recommendations. If you explicitly opt in to marketing communications (checkbox is unchecked by default), we may send periodic cybersecurity tips and product updates. We never sell your data to third parties.
          </p>

          <h2 className="text-xl font-bold text-text-primary">Cookies</h2>
          <p className="text-text-secondary leading-relaxed">
            We use a secure, httpOnly cookie to remember returning visitors so you don&apos;t have to re-enter your email on gated pages. We also use analytics cookies to understand site usage patterns.
          </p>

          <h2 className="text-xl font-bold text-text-primary">Affiliate Links</h2>
          <p className="text-text-secondary leading-relaxed">
            Some links on our site are affiliate links. When you click on an affiliate link and make a purchase, we may receive a commission. This never affects our editorial rankings or recommendations. Products are always ranked by fit score and editorial evaluation, never by commission amount.
          </p>

          <h2 className="text-xl font-bold text-text-primary">Your Rights</h2>
          <p className="text-text-secondary leading-relaxed">
            You can request deletion of your data at any time by contacting us. You can unsubscribe from marketing emails using the link in any email we send. You can clear your browser cookies to remove your session.
          </p>

          <h2 className="text-xl font-bold text-text-primary">Contact</h2>
          <p className="text-text-secondary leading-relaxed">
            For privacy-related inquiries, please contact us at privacy@voltx.com.
          </p>
        </div>
      </Container>
    </section>
  );
}
