"use client";

import type { ReactNode } from "react";
import HorizonLayout from "@/components/agents/horizon-layout";
import { RequireAuth } from "@/components/auth/require-auth";

export default function AgentsLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <HorizonLayout>{children}</HorizonLayout>
    </RequireAuth>
  );
}
