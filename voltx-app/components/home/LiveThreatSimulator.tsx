"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface Scenario {
  id: string;
  icon: string;
  label_en: string;
  label_ar: string;
  risk_level: "CRITICAL" | "HIGH" | "MEDIUM";
  risk_score: number;
  est_loss_en: string;
  est_loss_ar: string;
  danger_title_en: string;
  danger_title_ar: string;
  danger_desc_en: string;
  danger_desc_ar: string;
  solution_name: string;
  solution_tag_en: string;
  solution_tag_ar: string;
  solution_action_en: string;
  solution_action_ar: string;
  problem_slug: string;
}

const scenarios: Scenario[] = [
  {
    id: "passwords",
    icon: "🔑",
    label_en: "We share team passwords via Slack, WhatsApp or spreadsheets",
    label_ar: "نشارك كلمات مرور الفريق عبر سلاك أو واتساب أو الجداول",
    risk_level: "CRITICAL",
    risk_score: 94,
    est_loss_en: "$84,000 avg breach cost",
    est_loss_ar: "متوسط تكلفة الاختراق 84,000 دولار",
    danger_title_en: "Credential Stuffing & Lateral Takeover Risk",
    danger_title_ar: "خطر حشو بيانات الاعتماد واختراق الحسابات",
    danger_desc_en: "One compromised password at any third-party app gives attackers instant root access to your company email, accounting, and client databases.",
    danger_desc_ar: "كلمة مرور واحدة مخترقة في أي تطبيق خارجي تمنح المهاجمين وصولاً فوريًا إلى بريد شركتك وحساباتك وقواعد بيانات العملاء.",
    solution_name: "1Password / NordPass Business",
    solution_tag_en: "Zero-Knowledge Team Vault",
    solution_tag_ar: "خزنة فريق بالمعرفة الصفرية",
    solution_action_en: "Deploy in 5 Mins",
    solution_action_ar: "نشر خلال 5 دقائق",
    problem_slug: "employees-reusing-passwords",
  },
  {
    id: "remote-wifi",
    icon: "🌐",
    label_en: "Remote staff connect from home, co-working or cafe Wi-Fi",
    label_ar: "فريق العمل يتصل من المنزل أو المقاهي والشبكات العامة",
    risk_level: "HIGH",
    risk_score: 87,
    est_loss_en: "$45,000 data exposure risk",
    est_loss_ar: "خطر كشف بيانات بقيمة 45,000 دولار",
    danger_title_en: "Unencrypted Public Network Interception",
    danger_title_ar: "اعتراض حركة المرور على الشبكات العامة",
    danger_desc_en: "Unencrypted traffic allows anyone on the same public Wi-Fi to sniff session cookies, unmasked passwords, and proprietary company files in real time.",
    danger_desc_ar: "تسمح حركة المرور غير المشفرة لأي شخص على نفس الشبكة بالتنصت على ملفات تعريف الارتباط وكلمات المرور وملفات العمل الحساسة.",
    solution_name: "Business VPN Tunnel",
    solution_tag_en: "AES-256 Encrypted Network",
    solution_tag_ar: "شبكة مشفرة بمعيار AES-256",
    solution_action_en: "Secure Remote Traffic",
    solution_action_ar: "تأمين حركة المرور عن بُعد",
    problem_slug: "remote-team-no-vpn",
  },
  {
    id: "ransomware",
    icon: "🛡️",
    label_en: "No dedicated endpoint protection beyond basic Windows Defender",
    label_ar: "لا توجد حماية أجهزة طرفية مخصصة سوى الحماية الأساسية",
    risk_level: "CRITICAL",
    risk_score: 98,
    est_loss_en: "$120,000+ ransom & downtime",
    est_loss_ar: "أكثر من 120,000 دولار تكلفة الفدية والتوقف",
    danger_title_en: "Zero-Day Ransomware Hostage Threat",
    danger_title_ar: "خطر احتجاز ملفات العمل ببرامج الفدية",
    danger_desc_en: "Ransomware encrypts all company workstations and cloud backups within 15 minutes. 60% of small businesses shut down permanently after an attack.",
    danger_desc_ar: "تقوم برامج الفدية بتشفير جميع أجهزة العمل والنسخ الاحتياطية خلال 15 دقيقة. 60% من الشركات الصغيرة تغلق نهائيًا بعد الهجوم.",
    solution_name: "Malwarebytes Endpoint",
    solution_tag_en: "Instant Rollback & Prevention",
    solution_tag_ar: "استعادة فورية ومنع الهجمات",
    solution_action_en: "Prevent Ransomware",
    solution_action_ar: "منع برامج الفدية",
    problem_slug: "ransomware-fear-no-plan",
  },
];

export default function LiveThreatSimulator() {
  const t = useTranslations("common");
  const locale = useLocale();
  const isAr = locale === "ar";
  const [selectedId, setSelectedId] = useState<string>("passwords");

  const current = scenarios.find((s) => s.id === selectedId) || scenarios[0];

  return (
    <div className="w-full bg-card-bg border border-border/80 rounded-2xl p-6 md:p-8 shadow-2xl shadow-primary/5 glow-border relative overflow-hidden">
      {/* Header bar with Live Status Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-3.5 h-3.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-radar-dot" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute" />
          </div>
          <span className="font-headline font-bold text-sm tracking-wide text-text-primary uppercase flex items-center gap-2">
            <span>{isAr ? "محاكي المخاطر التفاعلي المباشر" : "Interactive Live Threat Simulator"}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-primary-tint text-primary font-bold">2026 AI Engine</span>
          </span>
        </div>

        <div className="text-xs text-text-muted">
          {isAr ? "اختر وضع فريقك لمشاهدة التقييم المباشر" : "Select your current team setup to analyze risk"}
        </div>
      </div>

      {/* Interactive Scenario Buttons */}
      <div className="grid sm:grid-cols-3 gap-3 my-6">
        {scenarios.map((s) => {
          const active = s.id === selectedId;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`
                flex items-start gap-3 p-4 rounded-xl text-start transition-all duration-200 border cursor-pointer
                ${
                  active
                    ? "bg-primary-tint/50 border-primary shadow-md shadow-primary/10 scale-[1.02]"
                    : "bg-surface/60 border-border hover:border-primary/40 hover:bg-surface"
                }
              `}
            >
              <span className="text-2xl flex-shrink-0">{s.icon}</span>
              <div>
                <p className="text-xs font-bold text-text-primary leading-snug">
                  {isAr ? s.label_ar : s.label_en}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      s.risk_level === "CRITICAL"
                        ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                        : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                    }`}
                  >
                    {s.risk_level} RISK
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Threat Analysis Card */}
      <div className="bg-surface rounded-xl p-5 md:p-6 border border-border/80 grid md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-3">
          <div className="flex items-center gap-3">
            <Badge variant="warning">
              {isAr ? current.est_loss_ar : current.est_loss_en}
            </Badge>
            <span className="text-xs font-mono font-bold text-rose-500">
              {isAr ? `درجة الخطر: ${current.risk_score}%` : `Vulnerability Index: ${current.risk_score}%`}
            </span>
          </div>

          <h3 className="font-headline text-lg font-bold text-text-primary">
            {isAr ? current.danger_title_ar : current.danger_title_en}
          </h3>

          <p className="text-sm text-text-secondary leading-relaxed">
            {isAr ? current.danger_desc_ar : current.danger_desc_en}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-text-muted">
            <span className="flex items-center gap-1">
              <span className="text-emerald-500">✔</span> {isAr ? "حل مجرب ومعتمد" : "Verified 2026 Solution"}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-emerald-500">✔</span> {isAr ? "بدون فريق تقني معقد" : "No Dedicated IT Required"}
            </span>
          </div>
        </div>

        {/* 1-Click Fitted Action Card */}
        <div className="md:col-span-4 bg-card-bg p-5 rounded-xl border border-primary/20 flex flex-col justify-between h-full shadow-lg shadow-primary/5">
          <div>
            <span className="text-[11px] font-bold text-primary tracking-wider uppercase">
              {isAr ? "الحل الموصى به مباشرة" : "Exact Fitted Solution"}
            </span>
            <h4 className="font-headline font-bold text-base text-text-primary mt-1">
              {current.solution_name}
            </h4>
            <p className="text-xs text-text-muted mt-0.5">
              {isAr ? current.solution_tag_ar : current.solution_tag_en}
            </p>
          </div>

          <div className="mt-5 space-y-2">
            <Link
              href={`/${locale}/problems/${current.problem_slug}`}
              className="
                w-full inline-flex items-center justify-center
                px-4 py-2.5 text-xs font-bold rounded-lg
                bg-primary text-white hover:bg-primary-hover active:bg-primary-dark
                transition-all shadow-md shadow-primary/20
                min-h-[40px]
              "
            >
              {isAr ? current.solution_action_ar : current.solution_action_en}
              <span className="ms-1.5 flip-rtl">→</span>
            </Link>

            <Link
              href={`/${locale}/diagnostic`}
              className="
                w-full inline-flex items-center justify-center
                px-3 py-2 text-[11px] font-semibold rounded-lg
                text-text-muted hover:text-text-primary hover:bg-surface
                transition-colors
              "
            >
              {isAr ? "أو ابدأ الفحص الشامل لشركتك" : "or Run Full 60s Diagnostic"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
