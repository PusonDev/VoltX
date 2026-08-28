import { useTranslations } from "next-intl";

export default function TranslationPending() {
  const t = useTranslations("common");

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <span className="text-accent text-xl mt-0.5" aria-hidden="true">⚠️</span>
        <div>
          <p className="font-semibold text-amber-800 text-sm">
            {t("translationPending")}
          </p>
          <p className="text-sm text-amber-700 mt-1">
            {t("translationPendingDesc")}
          </p>
        </div>
      </div>
    </div>
  );
}
