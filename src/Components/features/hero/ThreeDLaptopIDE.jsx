import React, { useEffect, useRef, useState } from "react";
import { Terminal, Maximize2, Play, Code2, Sparkles } from "lucide-react";

export const ThreeDLaptopIDE = () => {
  const canvasRef = useRef(null);
  const [currentCodeSnippet, setCurrentCodeSnippet] = useState("");
  const [activeFile, setActiveFile] = useState("ClusterNode.ts");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 450;
    };
    window.addEventListener("resize", handleResize);

    // Mouse tracking for 3D tilt
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX / width) * 2 - 1;
      mouse.targetY = -(clientY / height) * 2 + 1;
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    });

    // 3D Perspective Projection Engine
    const fov = 380;
    const project = (x, y, z, cx, cy) => {
      const scale = fov / (fov + z);
      return {
        x: cx + x * scale,
        y: cy + y * scale,
        scale,
      };
    };

    // Live Code Typer Script
    const codeLines = [
      "// Distributed Cluster Node Dispatcher",
      "import { RedisCluster, PostGIS } from '@core';",
      "",
      "export class ClusterNode extends Worker {",
      "  private latencyTarget = 24; // ms p95",
      "",
      "  async handleDispatch(event: Incident) {",
      "    const route = await PostGIS.findNearest({",
      "      lat: event.latitude,",
      "      lng: event.longitude,",
      "      radiusKm: 15.0,",
      "    });",
      "",
      "    await this.pubsub.emit('unit:dispatched', {",
      "      incidentId: event.id,",
      "      unitId: route.optimalUnit,",
      "      p95Latency: this.latencyTarget,",
      "    });",
      "    return { status: 200, sync: true };",
      "  }",
      "}",
    ];

    let fullCodeString = codeLines.join("\n");
    let typeCharIndex = 0;
    let typingTimer = 0;

    let time = 0;
    let openAngle = 0; // Lid opening angle from 0 (closed) to 1.15 radians (~66 deg back)
    const targetOpenAngle = 1.18;

    const render = () => {
      time += 0.03;

      // Animate lid opening smoothly on load
      openAngle += (targetOpenAngle - openAngle) * 0.04;

      // Mouse tilt smoothing
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Code typing progression
      typingTimer++;
      if (typingTimer % 2 === 0 && typeCharIndex < fullCodeString.length) {
        typeCharIndex++;
      } else if (typeCharIndex >= fullCodeString.length) {
        if (typingTimer % 180 === 0) {
          typeCharIndex = 0; // Loop typing
        }
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52 + Math.sin(time * 1.5) * 6; // Gentle 3D floating

      // 3D Rotation Angles
      const rotY = -0.28 + mouse.x * 0.45; // Isometric yaw
      const rotX = 0.22 + mouse.y * 0.35;  // Pitch tilt

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // 3D Transform Point Helper
      const transformPoint = (px, py, pz) => {
        // Rotate Y
        let x1 = px * cosY - pz * sinY;
        let z1 = px * sinY + pz * cosY;

        // Rotate X
        let y2 = py * cosX - z1 * sinX;
        let z2 = py * sinX + z1 * cosX;

        return project(x1, y2, z2 + 350, cx, cy);
      };

      // Helper for polygon drawing
      const drawPoly = (points, fill, stroke, lineWidth = 1) => {
        if (points.length < 3) return;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        if (fill) {
          ctx.fillStyle = fill;
          ctx.fill();
        }
        if (stroke) {
          ctx.strokeStyle = stroke;
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
      };

      // ==========================================
      // 1. LAPTOP BASE / KEYBOARD DECK
      // ==========================================
      const bw = 175; // Half width
      const bd = 120; // Depth
      const bh = 10;  // Thickness

      // Base vertices (local space: center at hinge (0, 0, 0))
      // Base extends forward along +Z
      const b0 = transformPoint(-bw, bh, 0);
      const b1 = transformPoint(bw, bh, 0);
      const b2 = transformPoint(bw, bh, bd * 2);
      const b3 = transformPoint(-bw, bh, bd * 2);

      const b0_bot = transformPoint(-bw, bh + 12, 0);
      const b1_bot = transformPoint(bw, bh + 12, 0);
      const b2_bot = transformPoint(bw, bh + 12, bd * 2);
      const b3_bot = transformPoint(-bw, bh + 12, bd * 2);

      // Ambient Underglow Shadow / Halo
      ctx.beginPath();
      ctx.ellipse(cx, cy + 110, 160, 45, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 240, 255, 0.12)";
      ctx.fill();

      // Bottom Base Edge
      drawPoly([b3, b2, b2_bot, b3_bot], "#0c0d12", "#1f222e", 1);
      drawPoly([b2, b1, b1_bot, b2_bot], "#090a0f", "#1f222e", 1);

      // Base Top Surface (Keyboard Deck)
      drawPoly([b0, b1, b2, b3], "#13151c", "rgba(0, 240, 255, 0.4)", 1.2);

      // Keyboard Recess Area
      const kw = 150;
      const kd_start = 22;
      const kd_end = 155;
      const k0 = transformPoint(-kw, bh - 1, kd_start);
      const k1 = transformPoint(kw, bh - 1, kd_start);
      const k2 = transformPoint(kw, bh - 1, kd_end);
      const k3 = transformPoint(-kw, bh - 1, kd_end);
      drawPoly([k0, k1, k2, k3], "#0a0b10", "rgba(0, 240, 255, 0.2)", 1);

      // Key Rows Simulation (Chiclet keys with cyan underglow)
      const keyRows = 5;
      const keyCols = 13;
      for (let r = 0; r < keyRows; r++) {
        for (let c = 0; c < keyCols; c++) {
          const kx = -kw + 10 + c * (kw * 2 - 20) / (keyCols - 1);
          const kz = kd_start + 10 + r * (kd_end - kd_start - 20) / (keyRows - 1);
          const kp = transformPoint(kx, bh - 2, kz);

          ctx.fillStyle = (r + c + Math.floor(time * 6)) % 7 === 0 ? "#00f0ff" : "#1f222e";
          ctx.fillRect(kp.x - 3 * kp.scale, kp.y - 1.5 * kp.scale, 7 * kp.scale, 3.5 * kp.scale);
        }
      }

      // Trackpad
      const tp_w = 42;
      const tp0 = transformPoint(-tp_w, bh - 1, 168);
      const tp1 = transformPoint(tp_w, bh - 1, 168);
      const tp2 = transformPoint(tp_w, bh - 1, 222);
      const tp3 = transformPoint(-tp_w, bh - 1, 222);
      drawPoly([tp0, tp1, tp2, tp3], "#181b24", "rgba(0, 240, 255, 0.25)", 1);

      // ==========================================
      // 2. 3D SCREEN LID & BEZEL (Rotated on Hinge)
      // ==========================================
      const sw = 175; // Screen half width
      const sh = 210; // Screen height

      // Angle of screen relative to vertical
      const lidAngle = openAngle; 
      const cosLid = Math.cos(lidAngle);
      const sinLid = Math.sin(lidAngle);

      // Function to transform point on screen lid
      const transformScreenPoint = (sx, sy) => {
        // sx: -sw to sw, sy: 0 (hinge) to -sh (top)
        // Rotate on X axis at hinge (0, 0, 0)
        const localY = sy * cosLid;
        const localZ = -sy * sinLid; // tilts back

        return transformPoint(sx, localY + bh, localZ);
      };

      // Screen Lid Outer Frame
      const s0 = transformScreenPoint(-sw, 0);
      const s1 = transformScreenPoint(sw, 0);
      const s2 = transformScreenPoint(sw, -sh);
      const s3 = transformScreenPoint(-sw, -sh);

      // Screen Lid Back Shell
      drawPoly([s0, s1, s2, s3], "#0c0d12", "rgba(0, 240, 255, 0.5)", 1.5);

      // Inner Display Screen (Active Glass)
      const b_pad = 12;
      const d0 = transformScreenPoint(-sw + b_pad, -b_pad);
      const d1 = transformScreenPoint(sw - b_pad, -b_pad);
      const d2 = transformScreenPoint(sw - b_pad, -sh + b_pad);
      const d3 = transformScreenPoint(-sw + b_pad, -sh + b_pad);

      // Draw Screen Surface Gradient
      drawPoly([d0, d1, d2, d3], "#050608", "#00f0ff", 1);

      // Screen Ambient Glow
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 15;
      drawPoly([d0, d1, d2, d3], null, "rgba(0, 240, 255, 0.5)", 1.5);
      ctx.shadowBlur = 0;

      // ==========================================
      // 3. VIRTUAL IDE EDITOR (Rendered in 3D Screen Plane)
      // ==========================================
      // Top IDE Window Header Bar
      const h0 = transformScreenPoint(-sw + b_pad, -sh + b_pad);
      const h1 = transformScreenPoint(sw - b_pad, -sh + b_pad);
      const h2 = transformScreenPoint(sw - b_pad, -sh + b_pad + 24);
      const h3 = transformScreenPoint(-sw + b_pad, -sh + b_pad + 24);
      drawPoly([h0, h1, h2, h3], "#0d0f17", "rgba(255, 255, 255, 0.1)", 1);

      // Window Action Dots (Red, Yellow, Green)
      [-145, -135, -125].forEach((dotX, idx) => {
        const dotP = transformScreenPoint(dotX, -sh + b_pad + 12);
        ctx.beginPath();
        ctx.arc(dotP.x, dotP.y, 2.5 * dotP.scale, 0, Math.PI * 2);
        ctx.fillStyle = idx === 0 ? "#ef4444" : idx === 1 ? "#f59e0b" : "#10b981";
        ctx.fill();
      });

      // Active File Tab in IDE
      const tabP = transformScreenPoint(-90, -sh + b_pad + 12);
      ctx.font = `${Math.round(8 * tabP.scale)}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = "#00f0ff";
      ctx.fillText("ClusterNode.ts • [LIVE]", tabP.x, tabP.y + 3 * tabP.scale);

      // Render Code Lines onto Screen in 3D Perspective
      const visibleTypedText = fullCodeString.slice(0, typeCharIndex);
      const typedLines = visibleTypedText.split("\n");

      const startY = -sh + b_pad + 42;
      const lineHeight = 11.5;

      typedLines.slice(0, 13).forEach((line, lineIdx) => {
        const lineY = startY + lineIdx * lineHeight;
        const lineP = transformScreenPoint(-sw + b_pad + 14, lineY);

        ctx.font = `${Math.round(7.5 * lineP.scale)}px 'JetBrains Mono', monospace`;

        // Line number in muted gray
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        const lineNumStr = (lineIdx + 1 < 10 ? `0${lineIdx + 1}` : `${lineIdx + 1}`);
        ctx.fillText(lineNumStr, lineP.x, lineP.y);

        // Code syntax highlighting
        const codeX = lineP.x + 18 * lineP.scale;

        if (line.startsWith("//")) {
          ctx.fillStyle = "#6ee7b7"; // Emerald comment
        } else if (line.includes("export") || line.includes("class") || line.includes("import") || line.includes("return")) {
          ctx.fillStyle = "#f43f5e"; // Rose keyword
        } else if (line.includes("async") || line.includes("const") || line.includes("private")) {
          ctx.fillStyle = "#00f0ff"; // Cyan declaration
        } else if (line.includes(":") || line.includes("{") || line.includes("}")) {
          ctx.fillStyle = "#e2e8f0"; // Light gray
        } else {
          ctx.fillStyle = "#38bdf8"; // Sky blue
        }

        ctx.fillText(line, codeX, lineP.y);

        // Render Blinking Cursor at the end of the last typed line
        if (lineIdx === typedLines.length - 1) {
          const textWidth = ctx.measureText(line).width;
          if (Math.floor(time * 4) % 2 === 0) {
            ctx.fillStyle = "#00f0ff";
            ctx.fillRect(codeX + textWidth + 2, lineP.y - 7 * lineP.scale, 4 * lineP.scale, 8 * lineP.scale);
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[500px] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating Holographic Badge */}
      <div className="absolute top-3 right-3 font-mono text-[11px] px-2.5 py-1 rounded bg-zinc-950/80 border border-cyan-500/40 text-cyan-400 backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
        <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
        <span>3D IDE // LIVE TYPING</span>
      </div>
    </div>
  );
};

export default ThreeDLaptopIDE;
