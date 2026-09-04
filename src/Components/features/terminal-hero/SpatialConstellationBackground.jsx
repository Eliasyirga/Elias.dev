import React, { useEffect, useRef } from "react";

export const SpatialConstellationBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse tracking
    let mouse = { x: width * 0.5, y: height * 0.5, targetX: width * 0.5, targetY: height * 0.5 };
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 3D Nodes Network
    const nodeCount = 45;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: (Math.random() - 0.5) * width * 1.2,
      y: (Math.random() - 0.5) * height * 1.2,
      z: Math.random() * 600 - 200,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      vz: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2.5 + 1.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    let time = 0;
    const fov = 400;

    const render = () => {
      time += 0.025;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;

      // Project and draw nodes
      const projected = nodes.map((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;

        if (n.x < -width * 0.7) n.x = width * 0.7;
        if (n.x > width * 0.7) n.x = -width * 0.7;
        if (n.y < -height * 0.7) n.y = height * 0.7;
        if (n.y > height * 0.7) n.y = -height * 0.7;
        if (n.z < -150) n.z = 450;
        if (n.z > 450) n.z = -150;

        // Subtle mouse parallax
        const px = n.x + (mouse.x - cx) * 0.08 * (n.z / 300);
        const py = n.y + (mouse.y - cy) * 0.08 * (n.z / 300);

        const scale = fov / (fov + n.z + 100);
        return {
          x: cx + px * scale,
          y: cy + py * scale,
          scale,
          z: n.z,
          size: n.size * scale,
          pulse: n.pulse + time,
        };
      });

      // Draw Interconnecting Hologram Vector Lines
      ctx.lineWidth = 0.9;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.35 * Math.min(p1.scale, p2.scale);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      projected.forEach((p) => {
        const glow = Math.sin(p.pulse) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.8 + glow * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${0.4 * glow})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      });

      // Ambient HUD Radar Ring
      ctx.beginPath();
      ctx.arc(cx, cy, 260 + Math.sin(time) * 8, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 240, 255, 0.04)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-80"
    />
  );
};

export default SpatialConstellationBackground;
