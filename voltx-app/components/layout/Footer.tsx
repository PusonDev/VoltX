import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Container from "@/components/ui/Container";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border mt-24">
      <Container size="wide" className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 font-headline text-xl font-bold text-text-primary"
            >
              <span className="text-primary text-2xl" aria-hidden="true">⚡</span>
              Volt<span className="text-primary">X</span>
            </Link>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              {t("footer.resources")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}/hub`} className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {t("nav.hub")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/problems`} className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {t("nav.problems")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools`} className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {t("nav.tools")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/diagnostic`} className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {t("nav.diagnostic")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              {t("footer.company")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}/about`} className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              {t("footer.legal")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}/privacy`} className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {t("nav.privacy")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-sm text-text-secondary hover:text-primary transition-colors">
                  {t("nav.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            {t("common.copyright", { year: year.toString() })}
          </p>
          <p className="text-xs text-text-muted max-w-md text-center sm:text-end">
            {t("common.affiliateDisclosure")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
