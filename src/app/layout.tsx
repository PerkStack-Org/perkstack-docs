import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { SearchProvider } from "@/components/SearchProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { UIPreferencesProvider } from "@/components/UIPreferencesProvider";
import { ToastProvider } from "@/components/Toast";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import ScrollToTop from "@/components/ScrollToTop";
import TextSelectionActions from "@/components/TextSelectionActions";
import ImageLightbox from "@/components/ImageLightbox";
import { ContinueReadingTracker } from "@/components/ContinueReading";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";
import ContextMenuProvider from "@/components/ContextMenu";
import LinkPreview from "@/components/LinkPreview";
import GlossaryTooltips from "@/components/GlossaryTooltips";
import SwipeNavigation from "@/components/SwipeNavigation";

export const metadata: Metadata = {
  title: {
    default: "PerkStack Documentation",
    template: "%s - PerkStack Docs",
  },
  description:
    "Complete documentation for PerkStack, the loyalty and reviews platform for Shopify.",
  metadataBase: new URL("https://docs.perk-stack.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("perkstack-docs-theme");var r=t==="dark"||t==="light"?t:t==="system"||!t?window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light":"light";document.documentElement.setAttribute("data-theme",r)}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <UIPreferencesProvider>
            <ToastProvider>
              <SearchProvider>
                <Header />
                <Sidebar />
                <main className="pt-14 lg:pl-64 transition-[padding] duration-300">{children}</main>
                <KeyboardShortcuts />
                <ScrollToTop />
                <TextSelectionActions />
                <ImageLightbox />
                <ContinueReadingTracker />
                <LinkPreview />
                <GlossaryTooltips />
                <SwipeNavigation />
                <ServiceWorkerRegistrar />
                <ContextMenuProvider />
              </SearchProvider>
            </ToastProvider>
          </UIPreferencesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
