import { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "info" | "direct";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-surface text-text-secondary border border-border",
  success: "bg-primary-tint text-primary-dark",
  warning: "bg-amber-50 text-amber-800",
  info: "bg-slate-100 text-slate-700",
  direct: "bg-slate-50 text-slate-600 border border-slate-200",
};

export default function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-0.5
        text-xs font-medium rounded-full
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
