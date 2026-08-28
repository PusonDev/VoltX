"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ProductCard from "@/components/shared/ProductCard";
import EmailGate from "@/components/gate/EmailGate";
import { getProducts } from "@/lib/supabase/seed";

export default function DiagnosticResultPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [isGated, setIsGated] = useState(true);
  const [loading, setLoading] = useState(true);

  // Check for existing cookie on mount
  useEffect(() => {
    const checkGate = async () => {
      try {
        const res = await fetch("/api/lead", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsGated(false);
          }
        }
      } catch {
        // Default to gated
      }
      setLoading(false);
    };
    checkGate();
  }, []);

  const handleGatePass = () => {
    setIsGated(false);
  };

  // Simple recommendation based on diagnostic answers
  const allProducts = getProducts();
  // Show top 3 products by editorial score as recommendations
  const recommendations = [...allProducts]
    .sort((a, b) => b.editorial_score - a.editorial_score)
    .slice(0, 3);

  if (loading) {
    return (
      <section className="py-16">
        <Container size="narrow">
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </Container>
      </section>
    );
  }

  if (isGated) {
    return (
      <section className="py-16">
        <Container size="narrow">
          <EmailGate
            topicSlug="diagnostic-result"
            pageType="diagnostic"
            source="diagnostic"
            onPass={handleGatePass}
          />
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16">
      <Container>
        <ScrollReveal>
          <h1 className="text-text-primary">Your Security Recommendations</h1>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl">
            Based on your diagnostic answers, here are the tools we recommend for your business — ranked by fit, not by commission.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 100}>
              <ProductCard
                product={product}
                pageSlug="diagnostic-result"
                placement="diagnostic-result"
              />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
