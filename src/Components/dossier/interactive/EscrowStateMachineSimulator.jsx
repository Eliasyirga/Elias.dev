import React, { useState } from "react";
import { GitBranch, Play, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, ArrowRight } from "lucide-react";

export const EscrowStateMachineSimulator = () => {
  const [state, setState] = useState("INIT"); // 'INIT' | 'ESCROW_HELD' | 'SHIPPED' | 'RELEASED' | 'DISPUTED'
  const [logs, setLogs] = useState([
    "[T0] Order #8491 created. Inventory reserved. State: INIT.",
  ]);

  const transitionTo = (nextState, logMsg) => {
    setState(nextState);
    setLogs((prev) => [
      `[T+${prev.length}s] ${logMsg} -> State: ${nextState}`,
      ...prev,
    ]);
  };

  const handleReset = () => {
    setState("INIT");
    setLogs(["[T0] Order #8491 reset. Inventory reserved. State: INIT."]);
  };

  const states = ["INIT", "ESCROW_HELD", "SHIPPED", "RELEASED"];

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-5 space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans text-sm">
            Interactive Playground: Escrow Finite State Machine Simulator
          </span>
        </div>

        <button
          onClick={handleReset}
          className="p-1 rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
          title="Reset State Machine"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* State Flow Visual Step Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {states.map((s, idx) => {
          const isCurrent = state === s;
          const isPassed = states.indexOf(state) > idx && state !== "DISPUTED";
          return (
            <div
              key={s}
              className={`p-3 rounded border text-center transition-all ${
                isCurrent
                  ? "bg-sky-50 dark:bg-sky-950/80 border-sky-500 text-sky-700 dark:text-sky-300 font-bold ring-2 ring-sky-500/20"
                  : isPassed
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/50 text-emerald-700 dark:text-emerald-300 font-medium"
                  : "bg-zinc-100 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-400"
              }`}
            >
              <div className="text-[10px] text-zinc-400 mb-0.5">STEP 0{idx + 1}</div>
              <div className="text-xs">{s}</div>
            </div>
          );
        })}
      </div>

      {/* State Action Triggers */}
      <div className="p-4 rounded bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase">
          Simulate Incoming Webhook / Buyer Event:
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {state === "INIT" && (
            <button
              onClick={() =>
                transitionTo(
                  "ESCROW_HELD",
                  "Stripe payment webhook received. Idempotent key verified. Escrow funds locked."
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-sky-600 text-white font-bold hover:bg-sky-500 transition-colors text-xs"
            >
              <span>1. Confirm Payment (Lock Escrow)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

          {state === "ESCROW_HELD" && (
            <>
              <button
                onClick={() =>
                  transitionTo(
                    "SHIPPED",
                    "Seller uploaded verified carrier tracking barcode. Transit lock initiated."
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-sky-600 text-white font-bold hover:bg-sky-500 transition-colors text-xs"
              >
                <span>2. Carrier Dispatched (Mark Shipped)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={() =>
                  transitionTo(
                    "DISPUTED",
                    "Dispute trigger initiated. Escrow freeze protocol active."
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-rose-400 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold hover:bg-rose-100 text-xs"
              >
                <span>Trigger Dispute</span>
              </button>
            </>
          )}

          {state === "SHIPPED" && (
            <button
              onClick={() =>
                transitionTo(
                  "RELEASED",
                  "Buyer confirmed delivery satisfaction. Two-phase commit escrow released to seller."
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors text-xs"
            >
              <span>3. Confirm Delivery (Release Payout)</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          )}

          {state === "RELEASED" && (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>ESCROW SETTLED SUCCESSFULLY (ACID TRANSACTION VERIFIED)</span>
            </div>
          )}

          {state === "DISPUTED" && (
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>ESCROW FROZEN (PENDING ARBITRATION AUDIT)</span>
            </div>
          )}
        </div>
      </div>

      {/* Real-time Audit Ledger Log */}
      <div className="p-3 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 text-[11px] font-mono space-y-1 max-h-32 overflow-y-auto">
        <div className="text-zinc-500 text-[10px] uppercase font-bold border-b border-zinc-800 pb-1">
          // IDEMPOTENT AUDIT TRAIL
        </div>
        {logs.map((log, idx) => (
          <div key={idx} className="leading-relaxed">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EscrowStateMachineSimulator;
