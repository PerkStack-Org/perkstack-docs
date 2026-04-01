"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { X } from "lucide-react";

interface ToastData {
  id: number;
  title: string;
  body?: string;
}

interface ToastContextValue {
  show: (title: string, body?: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ show: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const show = useCallback((title: string, body?: string) => {
    const id = ++nextId;
    setToasts((prev) => [...prev, { id, title, body }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70] flex flex-col gap-2 items-center pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border border-lp-border-muted bg-lp-surface/95 backdrop-blur-md shadow-lg text-sm max-w-sm toast-enter"
          >
            <div className="flex-1 min-w-0">
              <div className="font-medium text-lp-text">{toast.title}</div>
              {toast.body && (
                <div className="mt-0.5 text-[13px] text-lp-text-muted whitespace-pre-line">
                  {toast.body}
                </div>
              )}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-lp-text-muted hover:text-lp-text transition-colors flex-shrink-0 mt-0.5"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
