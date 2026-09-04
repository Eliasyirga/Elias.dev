import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Crosshair, Zap, Activity, CheckCircle2 } from "lucide-react";

export const SpatialSimulator = () => {
  const [targetPoint, setTargetPoint] = useState({ x: 180, y: 120 });
  const [units, setUnits] = useState([
    { id: "AMB-01", x: 60, y: 60, status: "IDLE", type: "Ambulance" },
    { id: "AMB-02", x: 260, y: 80, status: "IDLE", type: "Ambulance" },
    { id: "FIRE-01", x: 120, y: 200, status: "IDLE", type: "Fire Engine" },
    { id: "POLICE-04", x: 290, y: 190, status: "IDLE", type: "Police Cruiser" },
  ]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [telemetryLog, setTelemetryLog] = useState("Click on the grid to simulate an incident coordinate and trigger PostGIS R-Tree nearest-neighbor calculation.");
  const [queryLatency, setQueryLatency] = useState(null);

  const handleGridClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setTargetPoint({ x, y });

    // Calculate nearest unit via euclidean PostGIS simulated distance
    const start = performance.now();
    let closest = null;
    let minDistance = Infinity;

    units.forEach((u) => {
      const dist = Math.hypot(u.x - x, u.y - y);
      if (dist < minDistance) {
        minDistance = dist;
        closest = { ...u, distanceMeters: Math.round(dist * 18.5) };
      }
    });

    const elapsed = (performance.now() - start + 0.12).toFixed(2);
    setQueryLatency(elapsed);
    setSelectedUnit(closest);
    setTelemetryLog(
      `[POSTGIS] ST_DWithin matched. Nearest unit: ${closest.id} (${closest.distanceMeters}m away). Query executed in ${elapsed}ms using spatial GiST index.`
    );
  };

  const handleReset = () => {
    setSelectedUnit(null);
    setQueryLatency(null);
    setTargetPoint({ x: 180, y: 120 });
    setTelemetryLog("Simulation reset. Click anywhere on the coordinate matrix to test.");
  };

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-5 space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans text-sm">
            Interactive Playground: PostGIS Spatial R-Tree Indexing Simulator
          </span>
        </div>

        <div className="flex items-center gap-2">
          {queryLatency && (
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
              EXEC: {queryLatency}ms (p95)
            </span>
          )}
          <button
            onClick={handleReset}
            className="p-1 rounded border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            title="Reset Simulator"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Spatial Coordinate Canvas Grid */}
        <div
          onClick={handleGridClick}
          className="md:col-span-8 relative h-64 sm:h-72 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-950 overflow-hidden cursor-crosshair select-none"
        >
          {/* Coordinate Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />

          {/* Incident Marker */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
            style={{ left: `${targetPoint.x}px`, top: `${targetPoint.y}px` }}
          >
            <span className="w-6 h-6 rounded-full border-2 border-red-500 animate-ping absolute" />
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="absolute left-4 -top-2 bg-red-950/90 border border-red-500 text-red-300 text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap font-bold">
              INCIDENT ({targetPoint.x}, {targetPoint.y})
            </span>
          </div>

          {/* Emergency Units on Grid */}
          {units.map((unit) => {
            const isAllocated = selectedUnit?.id === unit.id;
            return (
              <div
                key={unit.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
                style={{ left: `${unit.x}px`, top: `${unit.y}px` }}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[9px] font-bold ${
                    isAllocated
                      ? "bg-emerald-400 text-zinc-950 ring-4 ring-emerald-500/30"
                      : "bg-sky-500 text-zinc-950"
                  }`}
                />
                <span
                  className={`absolute left-3 -top-2 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap font-bold ${
                    isAllocated
                      ? "bg-emerald-950 border border-emerald-400 text-emerald-300"
                      : "bg-zinc-900 border border-zinc-700 text-zinc-300"
                  }`}
                >
                  {unit.id} {isAllocated && "✓ DISPATCHED"}
                </span>
              </div>
            );
          })}

          {/* Vector connection line from Incident to Allocated Unit */}
          {selectedUnit && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1={targetPoint.x}
                y1={targetPoint.y}
                x2={selectedUnit.x}
                y2={selectedUnit.y}
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
          )}

          <div className="absolute bottom-2 left-2 text-[10px] text-zinc-500 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800">
            [CLICK ANYWHERE TO RE-ROUTE]
          </div>
        </div>

        {/* Live Calculation Output & Query Plan */}
        <div className="md:col-span-4 space-y-3 font-mono text-xs">
          <div className="p-3 rounded bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <div className="text-[10px] text-zinc-500 uppercase font-bold">SQL Query Executed:</div>
            <code className="text-[11px] text-sky-700 dark:text-sky-300 block leading-relaxed overflow-x-auto">
              SELECT id, geom &lt;-&gt; point LIMIT 1;
            </code>
          </div>

          <div className="p-3 rounded bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <div className="text-[10px] text-zinc-500 uppercase font-bold">Telemetry Dispatch Log:</div>
            <div className="text-[11px] text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {telemetryLog}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpatialSimulator;
