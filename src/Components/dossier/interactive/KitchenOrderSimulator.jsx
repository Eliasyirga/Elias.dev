import React, { useState } from "react";
import { Utensils, Play, Plus, CheckCircle2, Clock, RotateCcw } from "lucide-react";

export const KitchenOrderSimulator = () => {
  const [orders, setOrders] = useState([
    { id: "TK-101", item: "Special Shiro Tegamino", table: "Table 04", status: "PREPPING", time: "11:04 AM" },
    { id: "TK-102", item: "Tibs Firfir + Injera", table: "Table 08", status: "READY", time: "11:02 AM" },
  ]);

  const menuItems = ["Special Shiro Tegamino", "Bozena Shiro", "Gomen Besiga", "Beyaynetu Vegan Platter"];

  const handleCreateOrder = (itemName) => {
    const newId = `TK-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder = {
      id: newId,
      item: itemName,
      table: `Table 0${Math.floor(1 + Math.random() * 9)}`,
      status: "PREPPING",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleAdvanceStatus = (id) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        if (o.status === "PREPPING") return { ...o, status: "READY" };
        if (o.status === "READY") return { ...o, status: "SERVED" };
        return o;
      })
    );
  };

  const handleReset = () => {
    setOrders([
      { id: "TK-101", item: "Special Shiro Tegamino", table: "Table 04", status: "PREPPING", time: "11:04 AM" },
    ]);
  };

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-5 space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Utensils className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans text-sm">
            Interactive Playground: WebSocket Kitchen Display System (KDS)
          </span>
        </div>
        <button
          onClick={handleReset}
          className="p-1 rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 self-start sm:self-auto"
          title="Reset Orders"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* POS Action Buttons */}
      <div className="p-3 rounded bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
        <div className="text-zinc-500 uppercase text-[10px] font-bold">Simulate Customer Tablet Order (WebSocket Push):</div>
        <div className="flex flex-wrap gap-2">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => handleCreateOrder(item)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-sky-600 text-white font-bold hover:bg-sky-500 transition-colors text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ {item}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Kitchen Display Tickets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {orders.map((o) => (
          <div
            key={o.id}
            onClick={() => handleAdvanceStatus(o.id)}
            className={`cursor-pointer p-4 rounded-lg border space-y-2 transition-all duration-200 select-none ${
              o.status === "PREPPING"
                ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200"
                : o.status === "READY"
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between text-[11px] pb-1 border-b border-current opacity-70">
              <span className="font-bold">{o.id}</span>
              <span>{o.table}</span>
            </div>

            <div className="font-bold text-xs font-sans truncate">{o.item}</div>

            <div className="flex items-center justify-between text-[10px] pt-1 opacity-80">
              <span className="font-bold uppercase">{o.status} (Click to Advance)</span>
              <span>{o.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitchenOrderSimulator;
