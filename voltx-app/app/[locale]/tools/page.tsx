"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ProductCard from "@/components/shared/ProductCard";
import { getProducts } from "@/lib/supabase/seed";

export default function ToolsPage() {
  const t = useTranslations("tools");
  const tc = useTranslations("common");
  const locale = useLocale();
  const allProducts = getProducts(locale);

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"editorial" | "fit" | "price">("editorial");

  const categories = useMemo(
    () => Array.from(new Set(allProducts.map((p) => p.category))),
    [allProducts]
  );
  const platforms = useMemo(
    () => Array.from(new Set(allProducts.flatMap((p) => p.platforms))),
    [allProducts]
  );

  const filtered = useMemo(() => {
    let result = [...allProducts];

    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }
    if (platformFilter !== "all") {
      result = result.filter((p) => p.platforms.includes(platformFilter));
    }

    result.sort((a, b) => {
      if (sortBy === "editorial") return b.editorial_score - a.editorial_score;
      if (sortBy === "fit") return b.fit_score - a.fit_score;
      return (a.price_from || 0) - (b.price_from || 0);
    });

    return result;
  }, [allProducts, categoryFilter, platformFilter, sortBy]);

  return (
    <section className="py-16">
      <Container>
        <ScrollReveal>
          <h1 className="text-text-primary">{t("title")}</h1>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={100}>
          <div className="mt-10 flex flex-wrap gap-4 p-4 bg-surface rounded-xl border border-border">
            {/* Category */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-text-muted">{tc("category")}</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-card-bg text-sm text-text-primary focus:border-primary focus:outline-none min-h-[44px]"
              >
                <option value="all">{t("allCategories")}</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Platform */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-text-muted">{tc("platform")}</label>
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-card-bg text-sm text-text-primary focus:border-primary focus:outline-none min-h-[44px]"
              >
                <option value="all">{t("allPlatforms")}</option>
                {platforms.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-text-muted">{tc("sortBy")}</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "editorial" | "fit" | "price")}
                className="px-3 py-2 rounded-lg border border-border bg-card-bg text-sm text-text-primary focus:border-primary focus:outline-none min-h-[44px]"
              >
                <option value="editorial">{tc("editorialScore")}</option>
                <option value="fit">{tc("fitScore")}</option>
                <option value="pricing">{tc("pricing")}</option>
              </select>
            </div>
          </div>
        </ScrollReveal>

        {/* Results */}
        <div className="mt-8">
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 80}>
                  <ProductCard
                    product={product}
                    pageSlug="tools"
                    placement="directory"
                  />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-muted">{tc("noResults")}</p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
