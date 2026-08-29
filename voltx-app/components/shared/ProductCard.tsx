"use client";

import { useTranslations, useLocale } from "next-intl";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { resolveMerchantUrl } from "@/lib/affiliate";
import type { Product } from "@/lib/supabase/types";

interface ProductCardProps {
  product: Product;
  fitScore?: number;
  fitExplanation?: string;
  pageSlug?: string;
  placement?: string;
}

export default function ProductCard({
  product,
  fitScore,
  fitExplanation,
  pageSlug = "",
  placement = "card",
}: ProductCardProps) {
  const t = useTranslations("common");
  const locale = useLocale();
  const merchantUrl = resolveMerchantUrl(product);

  const handleClick = async () => {
    // Log click via API
    try {
      await fetch(`/api/click/${product.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          page_slug: pageSlug,
          placement,
        }),
      });
    } catch {
      // Non-blocking — don't prevent navigation on click-log failure
    }
  };

  return (
    <Card className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-headline text-lg font-bold text-text-primary">
            {product.name}
          </h3>
          <p className="text-sm text-text-muted mt-0.5">{product.vendor}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          {fitScore && (
            <Badge variant="success">
              {t("fitScore")}: {fitScore.toFixed(1)}
            </Badge>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-grow">
        {product.description}
      </p>

      {/* Fit explanation if provided */}
      {fitExplanation && (
        <div className="bg-primary-tint rounded-lg p-3 mb-4">
          <p className="text-sm text-primary-dark">{fitExplanation}</p>
        </div>
      )}

      {/* Meta row */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <Badge variant="info">{product.category}</Badge>
        {product.platforms.slice(0, 3).map((p) => (
          <Badge key={p}>{p}</Badge>
        ))}
        {product.platforms.length > 3 && (
          <Badge>+{product.platforms.length - 3}</Badge>
        )}
      </div>

      {/* Pricing */}
      <div className="flex items-center justify-between mb-4">
        <div>
          {product.price_from ? (
            <p className="text-sm text-text-primary">
              <span className="font-semibold text-lg">
                ${product.price_from.toFixed(2)}
              </span>
              {product.recurring && (
                <span className="text-text-muted">{t("perMonth")}</span>
              )}
            </p>
          ) : (
            <p className="text-sm font-medium text-primary">{t("free")}</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-text-muted">{t("editorialScore")}:</span>
          <span className="text-sm font-bold text-text-primary">
            {product.editorial_score.toFixed(1)}/10
          </span>
        </div>
      </div>

      {/* CTA */}
      <a
        href={merchantUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="
          w-full inline-flex items-center justify-center
          px-5 py-2.5 text-sm font-semibold rounded-lg
          bg-primary text-white
          hover:bg-primary-hover active:bg-primary-dark
          shadow-sm hover:shadow-md
          transition-all duration-200
          min-h-[44px]
        "
      >
        {t("viewProduct")}
        <svg
          className="ms-2 w-4 h-4 flip-rtl"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </a>

      {/* Last verified */}
      {product.last_verified_at && (
        <p className="text-xs text-text-muted text-center mt-2">
          {t("lastVerified")}:{" "}
          {new Date(product.last_verified_at).toLocaleDateString(locale, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      )}
    </Card>
  );
}
