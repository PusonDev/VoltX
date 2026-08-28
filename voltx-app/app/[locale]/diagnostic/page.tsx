"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ScrollReveal from "@/components/shared/ScrollReveal";

const industries = [
  "Technology", "Healthcare", "Finance", "Retail", "Education",
  "Legal", "Construction", "Real Estate", "Marketing", "Other",
];

const teamSizes = ["1-5", "6-15", "16-50", "51-200", "200+"];

const currentTools = [
  "None / just antivirus",
  "Password manager",
  "VPN",
  "Firewall",
  "Backup solution",
  "Email security",
  "Endpoint protection",
];

const devices = ["Windows PC", "Mac", "iOS", "Android", "Linux", "Chromebook"];

const concerns = [
  "Password breaches & credential theft",
  "Ransomware attacks",
  "Phishing & email scams",
  "Remote work security",
  "Data backup & recovery",
  "Compliance requirements",
  "Employee security training",
  "Network intrusion",
];

export default function DiagnosticPage() {
  const t = useTranslations("diagnostic");
  const locale = useLocale();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    industry: "",
    teamSize: "",
    currentTools: [] as string[],
    devices: [] as string[],
    concerns: [] as string[],
    hadIncident: "",
  });

  const totalSteps = 3;

  const toggleArray = (key: "currentTools" | "devices" | "concerns", value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const handleSubmit = async () => {
    try {
      await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
    } catch {
      // Non-blocking
    }
    // Store answers in sessionStorage for the result page
    sessionStorage.setItem("voltx_diagnostic", JSON.stringify(answers));
    router.push(`/${locale}/diagnostic/result`);
  };

  return (
    <section className="py-16">
      <Container size="narrow">
        <ScrollReveal>
          <h1 className="text-text-primary">{t("title")}</h1>
          <p className="mt-4 text-lg text-text-secondary">
            {t("subtitle")}
          </p>
        </ScrollReveal>

        {/* Progress bar */}
        <div className="mt-10 mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-text-secondary">
              {t("stepOf", { current: (step + 1).toString(), total: totalSteps.toString() })}
            </p>
          </div>
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Business Info */}
        {step === 0 && (
          <Card hover={false}>
            <h2 className="text-xl font-bold text-text-primary mb-6">{t("step1Title")}</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">{t("step1Q1")}</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {industries.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setAnswers((prev) => ({ ...prev, industry: ind }))}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all min-h-[44px]
                        ${answers.industry === ind
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-text-secondary border-border hover:border-primary/30"
                        }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">{t("step1Q2")}</label>
                <div className="flex flex-wrap gap-2">
                  {teamSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setAnswers((prev) => ({ ...prev, teamSize: size }))}
                      className={`px-5 py-2.5 rounded-lg text-sm font-medium border transition-all min-h-[44px]
                        ${answers.teamSize === size
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-text-secondary border-border hover:border-primary/30"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Current Security */}
        {step === 1 && (
          <Card hover={false}>
            <h2 className="text-xl font-bold text-text-primary mb-6">{t("step2Title")}</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">{t("step2Q1")}</label>
                <div className="grid grid-cols-2 gap-2">
                  {currentTools.map((tool) => (
                    <button
                      key={tool}
                      onClick={() => toggleArray("currentTools", tool)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all text-start min-h-[44px]
                        ${answers.currentTools.includes(tool)
                          ? "bg-primary-tint text-primary-dark border-primary/30"
                          : "bg-white text-text-secondary border-border hover:border-primary/30"
                        }`}
                    >
                      {answers.currentTools.includes(tool) ? "✓ " : ""}{tool}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">{t("step2Q2")}</label>
                <div className="flex flex-wrap gap-2">
                  {devices.map((device) => (
                    <button
                      key={device}
                      onClick={() => toggleArray("devices", device)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all min-h-[44px]
                        ${answers.devices.includes(device)
                          ? "bg-primary-tint text-primary-dark border-primary/30"
                          : "bg-white text-text-secondary border-border hover:border-primary/30"
                        }`}
                    >
                      {answers.devices.includes(device) ? "✓ " : ""}{device}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Concerns */}
        {step === 2 && (
          <Card hover={false}>
            <h2 className="text-xl font-bold text-text-primary mb-6">{t("step3Title")}</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">{t("step3Q1")}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {concerns.map((concern) => (
                    <button
                      key={concern}
                      onClick={() => toggleArray("concerns", concern)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all text-start min-h-[44px]
                        ${answers.concerns.includes(concern)
                          ? "bg-primary-tint text-primary-dark border-primary/30"
                          : "bg-white text-text-secondary border-border hover:border-primary/30"
                        }`}
                    >
                      {answers.concerns.includes(concern) ? "✓ " : ""}{concern}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">{t("step3Q2")}</label>
                <div className="flex gap-3">
                  {["Yes", "No", "Not sure"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAnswers((prev) => ({ ...prev, hadIncident: opt }))}
                      className={`px-5 py-2.5 rounded-lg text-sm font-medium border transition-all min-h-[44px]
                        ${answers.hadIncident === opt
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-text-secondary border-border hover:border-primary/30"
                        }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            {t("previous")}
          </Button>

          {step < totalSteps - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)}>
              {t("next")}
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              {t("submit")}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
