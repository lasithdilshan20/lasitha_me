import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/common/ThemeProvider";
import ThemeToggle from "@/components/common/ThemeToggle";
import { ReactNode } from "react";
import ClientProviders from "@/components/common/ClientProviders";

export const metadata: Metadata = {
  title: "Lasitha Wijenayake • SDET | Cypress Automation Expert",
  description: "Cyberpunk portfolio of Lasitha Wijenayake – Software Developer in Test specializing in Cypress automation.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Lasitha Wijenayake • SDET | Cypress Automation Expert",
    description: "Cyberpunk portfolio with real-time integrations.",
    url: "https://example.com",
    siteName: "Lasitha Portfolio",
    type: "website"
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen selection:bg-cyber-blue/40 transition-colors">
        <ThemeProvider>
          <header className="fixed top-0 left-0 right-0 z-40">
            <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
              <a href="#" className="font-semibold tracking-widest text-cyber-blue hover:text-cyber-green transition">
                LW<span className="text-cyber-purple">_SDET</span>
              </a>
              <ThemeToggle />
            </div>
          </header>
          <ClientProviders>
            <main className="pt-20">{children}</main>
          </ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
