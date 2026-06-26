import Breadcrumbs from "@/components/Breadcrumbs";
import { MobileTableOfContents, DesktopTableOfContents } from "@/components/TableOfContents";
import PrevNextNav from "@/components/PrevNextNav";
import FeedbackWidget from "@/components/FeedbackWidget";
import ScrollReveal from "@/components/ScrollReveal";
import HeadingAnchors from "@/components/HeadingAnchors";
import ArticleSchema from "@/components/ArticleSchema";
import ReadingTime from "@/components/ReadingTime";
import SearchHighlight from "@/components/SearchHighlight";
import PageTransition from "@/components/PageTransition";
import { ContinueReadingBanner } from "@/components/ContinueReading";
import CodeBlockCopy from "@/components/CodeBlockCopy";
import PageNotes from "@/components/PageNotes";
import { Suspense } from "react";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[88rem] mx-auto px-6 py-10 xl:flex xl:gap-10">
      <article className="flex-1 min-w-0 max-w-4xl mx-auto xl:mx-0">
        <ArticleSchema />
        <ContinueReadingBanner />
        <Breadcrumbs />
        <div className="mb-4">
          <ReadingTime />
        </div>
        <MobileTableOfContents />
        <PageTransition>{children}</PageTransition>
        <HeadingAnchors />
        <Suspense fallback={null}>
          <SearchHighlight />
        </Suspense>
        <CodeBlockCopy />
        <ScrollReveal />
        <PrevNextNav />
        <PageNotes />
        <FeedbackWidget />
      </article>
      <aside className="hidden xl:block w-56 flex-shrink-0">
        <div className="sticky top-[4.5rem] pt-2">
          <DesktopTableOfContents />
        </div>
      </aside>
    </div>
  );
}
