"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ children, language = "plaintext", title }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children, language]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(children.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = children.trim();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [children]);

  return (
    <div className="code-block-wrapper group relative mb-5">
      {title && (
        <div className="code-block-title flex items-center px-4 py-1.5 text-[12px] font-medium text-lp-text-muted bg-lp-bg-alt border border-b-0 border-code-border rounded-t-[10px]">
          {title}
        </div>
      )}
      <div className="relative">
        <pre className={`!mt-0 ${title ? "!rounded-t-none" : ""}`}>
          <code ref={codeRef} className={`language-${language}`}>
            {children.trim()}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2.5 right-2.5 flex items-center justify-center w-7 h-7 rounded-md bg-lp-bg-alt/80 border border-code-border text-lp-text-muted hover:text-lp-text hover:bg-lp-bg-alt opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
        </button>
      </div>
    </div>
  );
}
