"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface EmailGateProps {
  topicSlug: string;
  pageType: string;
  source: string;
  onPass: () => void;
}

export default function EmailGate({
  topicSlug,
  pageType,
  source,
  onPass,
}: EmailGateProps) {
  const t = useTranslations("gate");
  const [email, setEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false); // Default UNCHECKED
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          marketing_consent: marketingConsent,
          topic_slug: topicSlug,
          page_type: pageType,
          source,
        }),
      });

      if (res.ok) {
        onPass();
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <Card hover={false} padding="lg">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-primary-tint flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🛡️</span>
          </div>
          <h2 className="text-xl font-bold text-text-primary">{t("title")}</h2>
          <p className="mt-2 text-sm text-text-secondary">{t("subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="gate-email"
            label={t("emailLabel")}
            type="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            required
          />

          {/* Marketing consent — defaults to UNCHECKED */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm text-text-secondary">
              {t("marketingConsent")}
            </span>
          </label>

          <Button type="submit" fullWidth size="lg" disabled={loading}>
            {loading ? "..." : t("submit")}
          </Button>

          <p className="text-xs text-text-muted text-center">
            {t("privacyNote")}
          </p>
        </form>
      </Card>
    </div>
  );
}
