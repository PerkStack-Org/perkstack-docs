import type { ReactNode } from "react";
import { Children, isValidElement } from "react";
import { slugify } from "@/lib/docs-helpers";

/**
 * Recursively extract the plain-text content of arbitrary React children so a
 * stable slug can be derived at render time (server-side), giving exported
 * static HTML real heading `id`s for deep links and passage indexing.
 */
function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return Children.toArray(props.children).map(extractText).join("");
  }
  return "";
}

interface HeadingProps {
  children: ReactNode;
  id?: string;
}

/**
 * Drop-in replacements for hand-written <h2>/<h3> tags in doc pages. They
 * auto-slugify their text content into an `id` so the id exists in the
 * server-rendered/exported HTML (HeadingAnchors then only adds the visible
 * "#" link UI on the client, leaving the existing id untouched).
 */
export function H2({ children, id }: HeadingProps) {
  return <h2 id={id ?? slugify(extractText(children))}>{children}</h2>;
}

export function H3({ children, id }: HeadingProps) {
  return <h3 id={id ?? slugify(extractText(children))}>{children}</h3>;
}
