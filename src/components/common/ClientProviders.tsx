"use client";
import React from "react";
import { SWRConfig } from "swr";
import { fetcher } from "@/utils/fetcher";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ dedupingInterval: 30 * 60 * 1000, revalidateOnFocus: false, fetcher }}>
      {children}
    </SWRConfig>
  );
}
