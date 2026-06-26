import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ORGANIZATION, SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/seo";
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

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PerkStack Documentation",
    template: "%s - PerkStack Docs",
  },
  description:
    "Complete documentation for PerkStack, the loyalty and reviews platform for Shopify.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "PerkStack Documentation",
    description:
      "Complete documentation for PerkStack, the loyalty and reviews platform for Shopify.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "PerkStack Documentation",
    description:
      "Complete documentation for PerkStack, the loyalty and reviews platform for Shopify.",
    images: [OG_IMAGE],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("perkstack-docs-theme");var r=t==="dark"||t==="light"?t:t==="system"||!t?window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light":"light";document.documentElement.setAttribute("data-theme",r)}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              url: SITE_URL,
              publisher: {
                "@type": "Organization",
                name: ORGANIZATION.name,
                url: ORGANIZATION.url,
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: ORGANIZATION.name,
              url: ORGANIZATION.url,
              logo: ORGANIZATION.logo,
            }),
          }}
        />
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
