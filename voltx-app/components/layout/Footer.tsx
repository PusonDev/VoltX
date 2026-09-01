import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
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
              className="flex items-center gap-2.5 font-headline text-xl font-bold text-text-primary group"
            >
              <Image
                src="/logo.png"
                alt="VoltX Logo"
                width={34}
                height={34}
                className="w-8.5 h-8.5 rounded-lg object-cover shadow-sm transition-transform duration-200 group-hover:scale-105"
              />
              <span>Volt<span className="text-primary">X</span></span>
            </Link>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              {t("footer.description")}
            </p>

            {/* Social Media Links */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61593761561529&sk=about"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/5 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.pinterest.com/styliststifan/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-[#E60023] hover:border-[#E60023]/40 hover:bg-[#E60023]/5 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
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
