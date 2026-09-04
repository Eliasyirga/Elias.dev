import React from "react";
import { useRouteError, useNavigate, Link } from "react-router-dom";
import { AlertTriangle, RefreshCw, Home, Terminal } from "lucide-react";

export const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error("Route Error:", error);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6 font-mono text-xs">
      <div className="max-w-md w-full p-6 rounded-lg border border-zinc-800 bg-zinc-900/90 space-y-5 shadow-2xl">
        <div className="flex items-center gap-2 text-amber-400 font-bold border-b border-zinc-800 pb-3 text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>APPLICATION RECOVERY HANDLER</span>
        </div>

        <div className="space-y-2">
          <div className="text-[11px] text-zinc-500 uppercase font-bold">// ERROR DIAGNOSTIC</div>
          <div className="p-3 rounded bg-zinc-950 border border-zinc-800 text-rose-400 text-xs overflow-x-auto leading-relaxed">
            {error?.message || error?.statusText || "Dynamic module failed to load. The local dev server chunk cache was refreshed."}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-sky-600 text-white font-bold hover:bg-sky-500 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Workstation</span>
          </button>

          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded border border-zinc-700 bg-zinc-800 text-zinc-200 font-bold hover:bg-zinc-700 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Go to Root</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
