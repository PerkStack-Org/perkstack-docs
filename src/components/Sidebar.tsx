"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation, type NavItem } from "@/lib/navigation";
import {
  ChevronDown,
  X,
  Star,
  BookmarkPlus,
  Copy,
  ExternalLink,
  Link as LinkIcon,
} from "lucide-react";
import { showContextMenu, type ContextMenuItem } from "./ContextMenu";
import { toggleFavorite, isFavorite, toggleReadLater, isReadLater } from "@/lib/favorites";
import { useToast } from "./Toast";

function NavGroup({ group, onNavigate }: { group: NavItem; onNavigate?: () => void }) {
  const pathname = usePathname();
  const isActive = group.children?.some((c) => c.href === pathname);
  const [open, setOpen] = useState(isActive ?? true);

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-3 py-1.5 text-[13px] font-semibold tracking-tight text-lp-text hover:text-ps-accent transition-colors rounded-lg"
      >
        <span>{group.title}</span>
        <ChevronDown
          size={14}
          className={`text-lp-text-muted transition-transform duration-200 ${open ? "rotate-0" : "-rotate-90"}`}
        />
      </button>
      {open && (
        <div className="ml-1 mt-0.5 space-y-0.5 border-l border-lp-border-muted pl-2">
          {group.children?.map((item) => (
            <NavLink key={item.href} item={item} group={group.title} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

const statusColors = {
  new: "status-badge-new",
  beta: "status-badge-beta",
  deprecated: "status-badge-deprecated",
};

const statusLabels = {
  new: "NEW",
  beta: "BETA",
  deprecated: "DEP",
};

function NavLink({
  item,
  group,
  onNavigate,
}: {
  item: NavItem;
  group: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const toast = useToast();

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (!item.href) return;
      e.preventDefault();

      const fav = isFavorite(item.href);
      const rl = isReadLater(item.href);
      const page = { href: item.href, title: item.title, section: group };

      const items: ContextMenuItem[] = [
        {
          id: "fav",
          label: fav ? "Remove from favorites" : "Add to favorites",
          icon: <Star size={13} className={fav ? "text-warning fill-warning" : ""} />,
          onSelect: () => {
            const added = toggleFavorite(page);
            toast.show(added ? "Added to favorites" : "Removed from favorites", item.title);
          },
        },
        {
          id: "read-later",
          label: rl ? "Remove from read later" : "Read later",
          icon: <BookmarkPlus size={13} className={rl ? "text-ps-accent" : ""} />,
          onSelect: () => {
            const added = toggleReadLater(page);
            toast.show(added ? "Added to read later" : "Removed from read later", item.title);
          },
        },
        {
          id: "copy-link",
          label: "Copy link",
          icon: <LinkIcon size={13} />,
          divider: true,
          onSelect: () => {
            navigator.clipboard.writeText(`${window.location.origin}${item.href}`);
            toast.show("Copied!", "Link copied to clipboard");
          },
        },
        {
          id: "copy-md",
          label: "Copy as Markdown",
          icon: <Copy size={13} />,
          onSelect: () => {
            const md = `[${item.title}](${window.location.origin}${item.href})`;
            navigator.clipboard.writeText(md);
            toast.show("Copied!", md);
          },
        },
        {
          id: "new-tab",
          label: "Open in new tab",
          icon: <ExternalLink size={13} />,
          divider: true,
          onSelect: () => {
            window.open(item.href!, "_blank");
          },
        },
      ];

      showContextMenu(e.clientX, e.clientY, items);
    },
    [item, group, toast],
  );

  return (
    <Link
      href={item.href ?? "#"}
      onClick={onNavigate}
      onContextMenu={handleContextMenu}
      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] transition-all duration-150 ${
        isActive
          ? "bg-sidebar-active text-ps-accent font-medium border-l-2 border-sidebar-active-border -ml-[9px] pl-[17px]"
          : "text-lp-text-secondary hover:text-lp-text hover:bg-sidebar-hover"
      }`}
    >
      <span className="flex-1 truncate">{item.title}</span>
      {item.status && (
        <span className={`status-badge ${statusColors[item.status]} flex-shrink-0`}>
          {statusLabels[item.status]}
        </span>
      )}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="fixed top-14 left-0 bottom-0 w-64 overflow-y-auto border-r border-lp-border-muted bg-sidebar-bg z-30 hidden lg:block transition-colors duration-300">
      <nav className="p-4 pb-20 space-y-1">
        {navigation.map((group) => (
          <NavGroup key={group.title} group={group} />
        ))}
      </nav>
    </aside>
  );
}

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />
      <aside className="fixed top-0 left-0 bottom-0 w-72 overflow-y-auto bg-sidebar-bg z-50 lg:hidden shadow-xl transition-colors duration-300">
        <div className="flex items-center justify-between p-4 border-b border-lp-border-muted">
          <span className="text-sm font-semibold text-lp-text">Navigation</span>
          <button
            onClick={onClose}
            className="text-lp-text-muted hover:text-lp-text transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="p-4 pb-20 space-y-1">
          {navigation.map((group) => (
            <NavGroup key={group.title} group={group} onNavigate={onClose} />
          ))}
        </nav>
      </aside>
    </>
  );
}
