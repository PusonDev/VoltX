import { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "info" | "direct";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-surface text-text-secondary border border-border",
  success: "bg-primary-tint text-primary-dark font-medium",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  info: "bg-primary-tint/60 text-primary-dark border border-primary/20",
  direct: "bg-surface text-text-muted border border-border",
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
        text-xs font-medium rounded-full transition-colors
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
