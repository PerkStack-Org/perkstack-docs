"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { StickyNote, ChevronDown, Trash2 } from "lucide-react";

const STORAGE_KEY = "perkstack-docs-notes";

interface NoteEntry {
  text: string;
  updatedAt: number;
}

type NotesMap = Record<string, NoteEntry>;

function loadNotes(): NotesMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveNotes(notes: NotesMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {}
}

export default function PageNotes() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const notes = loadNotes();
    const entry = notes[pathname];
    setText(entry?.text ?? "");
    setSaved(false);
  }, [pathname]);

  const persistNote = useCallback(
    (value: string) => {
      const notes = loadNotes();
      if (value.trim()) {
        notes[pathname] = { text: value, updatedAt: Date.now() };
      } else {
        delete notes[pathname];
      }
      saveNotes(notes);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    },
    [pathname],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setText(value);
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => persistNote(value), 800);
    },
    [persistNote],
  );

  const handleClear = useCallback(() => {
    setText("");
    persistNote("");
    textareaRef.current?.focus();
  }, [persistNote]);

  const hasNote = text.trim().length > 0;
  const noteCount = Object.keys(loadNotes()).length;

  return (
    <div className="mt-6">
      <button
        onClick={() => {
          setOpen(!open);
          if (!open) setTimeout(() => textareaRef.current?.focus(), 100);
        }}
        className={`flex items-center gap-2 w-full px-3 py-2 text-[13px] rounded-lg border transition-all ${
          hasNote
            ? "border-ps-accent/20 bg-ps-accent/5 text-ps-accent"
            : "border-lp-border-muted bg-lp-bg-alt text-lp-text-secondary hover:text-lp-text hover:bg-sidebar-hover"
        }`}
      >
        <StickyNote size={14} />
        <span className="flex-1 text-left">
          {hasNote ? "Your notes" : "Add a note to this page"}
        </span>
        {noteCount > 0 && !hasNote && (
          <span className="text-[11px] text-lp-text-muted">
            {noteCount} page{noteCount !== 1 ? "s" : ""}
          </span>
        )}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-2 rounded-lg border border-lp-border-muted bg-lp-surface overflow-hidden animate-in">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleChange}
              placeholder="Jot down notes, reminders, or settings you want to remember for this page..."
              className="w-full min-h-[120px] p-3 text-[13px] leading-relaxed bg-transparent text-lp-text placeholder:text-lp-text-muted/60 resize-y outline-none"
            />
          </div>

          <div className="flex items-center justify-between px-3 py-2 border-t border-lp-border-muted bg-lp-bg-alt/50">
            <div className="flex items-center gap-2">
              {hasNote && (
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1 text-[11px] text-lp-text-muted hover:text-error transition-colors"
                >
                  <Trash2 size={11} />
                  Clear
                </button>
              )}
            </div>
            <div className="text-[11px] text-lp-text-muted">
              {saved ? (
                <span className="text-success">Saved</span>
              ) : hasNote ? (
                "Auto-saves as you type"
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
