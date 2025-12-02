import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HorizonCardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function HorizonCard({
  title,
  subtitle,
  action,
  className,
  children,
}: HorizonCardProps) {
  return (
    <div
      className={cn(
        "neo-panel neo-pressable p-6",
        className,
      )}
    >
      {(title || subtitle || action) && (
        <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            {subtitle && (
              <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">
                {subtitle}
              </p>
            )}
            {title && (
              <h3 className="mt-1 text-lg font-semibold text-foreground">{title}</h3>
            )}
          </div>
          {action}
        </header>
      )}
      {children}
    </div>
  );
}
