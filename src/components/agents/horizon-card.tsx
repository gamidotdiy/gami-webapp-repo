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
        "rounded-[20px] bg-white p-6 shadow-[0px_18px_40px_rgba(112,144,176,0.18)]",
        className,
      )}
    >
      {(title || subtitle || action) && (
        <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            {subtitle && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A3AED0]">
                {subtitle}
              </p>
            )}
            {title && (
              <h3 className="mt-1 text-lg font-semibold text-[#2B3674]">{title}</h3>
            )}
          </div>
          {action}
        </header>
      )}
      {children}
    </div>
  );
}
