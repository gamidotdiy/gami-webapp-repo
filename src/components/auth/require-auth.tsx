"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuth } from "./auth-provider";

type RequireAuthProps = {
  children: ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      const redirectParam = pathname ? `?redirect=${encodeURIComponent(pathname)}` : "";
      router.replace(`/login${redirectParam}`);
    }
  }, [loading, pathname, router, user]);

  if (loading || (!user && typeof window !== "undefined")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F7FE] p-6">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-[#4318FF]" />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A3AED0]">
            Verifying supervisor access
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    // SSR fallback when the redirect hasn't happened client-side yet
    return null;
  }

  return <>{children}</>;
}
