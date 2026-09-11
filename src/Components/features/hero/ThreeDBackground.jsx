import React, { useEffect, useRef } from "react";

export const ThreeDBackground = () => {
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

    // Mouse tracking with velocity
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0, vx: 0, vy: 0, isHovered: false };
    let lastMouse = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / width) * 2 - 1;
      mouse.targetY = -(e.clientY / height) * 2 + 1;
      mouse.vx = e.clientX - lastMouse.x;
      mouse.vy = e.clientY - lastMouse.y;
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
      mouse.isHovered = true;
    };

    // 5. Dynamic Shockwaves
    const shockwaves = [];

    const handleClick = (e) => {
      // Spawn energetic shockwave burst at click
      shockwaves.push({
        x: (e.clientX - width * 0.7) * 1.5,
        y: (e.clientY - height * 0.48) * 1.5,
        radius: 10,
        maxRadius: 350,
        alpha: 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // 3D Projection
    const fov = 420;
    const project = (x, y, z, cx, cy) => {
      const scale = fov / (fov + z);
      return {
        x: cx + x * scale,
        y: cy + y * scale,
        scale,
      };
    };

    // 1. 3D Core Polyhedron Cluster
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
      [0, 0, phi * 1.2], [0, 0, -phi * 1.2], [phi * 1.2, 0, 0], [-phi * 1.2, 0, 0]
    ];
    const coreScale = 155;
    const coreNodes = rawVertices.map(([x, y, z]) => ({
      x: x * coreScale,
      y: y * coreScale,
      z: z * coreScale,
    }));

    // 2. High-Density Fast 3D Grid Terrain
    const gridCols = 28;
    const gridRows = 20;
    const gridSpacing = 58;

    // 3. High-Energy Kinetic Particle Field
    const particleCount = 110;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 1800,
      y: (Math.random() - 0.5) * 1100,
      z: Math.random() * 900 - 150,
      vx: (Math.random() - 0.5) * 1.8,
      vy: (Math.random() - 0.5) * 1.8,
      vz: Math.random() * 2.5 + 1.2, // Streaming forward into camera
      size: Math.random() * 2.2 + 1,
      energy: Math.random(),
    }));

    // 4. Laser Beams shooting up from terrain
    const beamCount = 12;
    const laserBeams = Array.from({ length: beamCount }, () => ({
      c: Math.floor((Math.random() - 0.5) * (gridCols - 4)),
      r: Math.floor(Math.random() * (gridRows - 2)),
      height: Math.random() * 180 + 120,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.04 + 0.02,
    }));

    let rotationX = 0;
    let rotationY = 0;
    let rotationZ = 0;
    let time = 0;

    const render = () => {
      time += 0.035; // Faster energetic clock

      // Smooth mouse damping
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.7; // Desktop anchor to the right
      const centerY = height * 0.46;

      // Energetic Multi-Axis Rotation
      rotationX += 0.012 + mouse.y * 0.008;
      rotationY += 0.016 + mouse.x * 0.008;
      rotationZ += 0.006;

      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosZ = Math.cos(rotationZ);
      const sinZ = Math.sin(rotationZ);

      // ==========================================
      // LAYER 1: Energetic 3D Terrain Wave Plane
      // ==========================================
      const gridOffsetZ = 240;
      const gridCenterY = height * 0.72 + mouse.y * 45;
      const gridCenterX = width * 0.5 + mouse.x * 70;

      for (let c = -gridCols / 2; c <= gridCols / 2; c++) {
        ctx.beginPath();
        let first = true;
        for (let r = 0; r < gridRows; r++) {
          const gx = c * gridSpacing;
          const gz = r * gridSpacing + gridOffsetZ;
          // Compound high-frequency wave math
          const gy =
            Math.sin(time * 1.6 + c * 0.35 + r * 0.45) * 28 +
            Math.cos(time * 2.2 + r * 0.5 - c * 0.2) * 18 +
            Math.sin(time * 3.5 + (c * c + r * r) * 0.015) * 12;

          const p = project(gx, gy, gz, gridCenterX, gridCenterY);

          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        const alpha = Math.max(0.06, 0.28 - Math.abs(c) / (gridCols * 1.8));
        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.7})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let r = 0; r < gridRows; r++) {
        ctx.beginPath();
        let first = true;
        for (let c = -gridCols / 2; c <= gridCols / 2; c++) {
          const gx = c * gridSpacing;
          const gz = r * gridSpacing + gridOffsetZ;
          const gy =
            Math.sin(time * 1.6 + c * 0.35 + r * 0.45) * 28 +
            Math.cos(time * 2.2 + r * 0.5 - c * 0.2) * 18 +
            Math.sin(time * 3.5 + (c * c + r * r) * 0.015) * 12;

          const p = project(gx, gy, gz, gridCenterX, gridCenterY);

          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        const depthAlpha = (1 - r / gridRows) * 0.28;
        ctx.strokeStyle = `rgba(6, 182, 212, ${depthAlpha})`;
        ctx.stroke();
      }

      // ==========================================
      // LAYER 2: Vertical Laser Data Beams
      // ==========================================
      laserBeams.forEach((beam) => {
        beam.alpha += Math.sin(time * 4 + beam.c) * 0.03;
        const gx = beam.c * gridSpacing;
        const gz = beam.r * gridSpacing + gridOffsetZ;
        const gyBase = Math.sin(time * 1.6 + beam.c * 0.35 + beam.r * 0.45) * 28;
        const gyTop = gyBase - beam.height;

        const p1 = project(gx, gyBase, gz, gridCenterX, gridCenterY);
        const p2 = project(gx, gyTop, gz, gridCenterX, gridCenterY);

        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 240, 255, 0.45)";
        ctx.lineWidth = 1.8 * p1.scale;
        ctx.stroke();

        // Glowing node dot at top of beam
        ctx.beginPath();
        ctx.arc(p2.x, p2.y, 2.5 * p2.scale, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      });

      // ==========================================
      // LAYER 3: Streaming Kinetic 3D Data Packets
      // ==========================================
      particles.forEach((p) => {
        p.z -= p.vz; // Move towards camera
        p.x += p.vx + Math.sin(time + p.energy) * 0.4;
        p.y += p.vy + Math.cos(time + p.energy) * 0.4;

        if (p.z < -100) p.z = 800;
        if (p.x < -900) p.x = 900;
        if (p.x > 900) p.x = -900;
        if (p.y < -550) p.y = 550;
        if (p.y > 550) p.y = -550;

        const proj = project(p.x, p.y, p.z, width * 0.5 + mouse.x * 50, height * 0.5 + mouse.y * 50);

        if (proj.scale > 0) {
          const alpha = (1 - p.z / 800) * 0.85;

          // Trailing packet vector
          ctx.beginPath();
          ctx.moveTo(proj.x, proj.y);
          ctx.lineTo(proj.x - p.vx * 4 * proj.scale, proj.y - (p.vy - 3) * proj.scale);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.4})`;
          ctx.lineWidth = p.size * proj.scale * 0.7;
          ctx.stroke();

          // Core packet head
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, p.size * proj.scale * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = p.energy > 0.5 ? "#00f0ff" : "#ffffff";
          ctx.shadowColor = "#00f0ff";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // ==========================================
      // LAYER 4: Energetic 3D Gyroscopic Rings
      // ==========================================
      const draw3DRing = (radius, tiltX, tiltY, color, widthLine, pulseSpeed) => {
        ctx.beginPath();
        const segments = 48;
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          let rx = Math.cos(theta) * radius;
          let ry = Math.sin(theta) * radius;
          let rz = 0;

          // Rotate around ring axes
          let x1 = rx * Math.cos(tiltY) - rz * Math.sin(tiltY);
          let z1 = rx * Math.sin(tiltY) + rz * Math.cos(tiltY);
          let y2 = ry * Math.cos(tiltX) - z1 * Math.sin(tiltX);
          let z2 = ry * Math.sin(tiltX) + z1 * Math.cos(tiltX);

          // Rotate with core
          let x3 = x1 * cosY - z2 * sinY;
          let z3 = x1 * sinY + z2 * cosY;
          let y4 = y2 * cosX - z3 * sinX;
          let z4 = y2 * sinX + z3 * cosX;

          const p = project(x3, y4, z4 + 220, centerX + mouse.x * 55, centerY + mouse.y * 45);

          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = widthLine;
        ctx.stroke();
      };

      // 3 Concentric Gyro Rings revolving with pulse
      draw3DRing(195 + Math.sin(time * 3) * 6, time * 1.5, time * 0.8, "rgba(0, 240, 255, 0.4)", 1.2, 3);
      draw3DRing(230 + Math.cos(time * 2.5) * 8, -time * 1.2, time * 1.4, "rgba(6, 182, 212, 0.25)", 1, 2.5);
      draw3DRing(265, time * 0.6, -time * 1.8, "rgba(0, 240, 255, 0.15)", 0.8, 1);

      // ==========================================
      // LAYER 5: 3D Core Polyhedron Cluster
      // ==========================================
      const transformedNodes = coreNodes.map((node) => {
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.x * sinY + node.z * cosY;

        let y2 = node.y * cosX - z1 * sinX;
        let z2 = node.y * sinX + z1 * cosX;

        // Bobbing & Pulsating scale
        const pulse = 1 + Math.sin(time * 4) * 0.06;
        x1 *= pulse;
        y2 = (y2 + Math.sin(time * 2) * 16) * pulse;
        z2 *= pulse;

        const projected = project(x1, y2, z2 + 220, centerX + mouse.x * 55, centerY + mouse.y * 45);

        return {
          x: projected.x,
          y: projected.y,
          z: z2,
          scale: projected.scale,
        };
      });

      // Connecting energetic laser lines
      for (let i = 0; i < transformedNodes.length; i++) {
        for (let j = i + 1; j < transformedNodes.length; j++) {
          const n1 = transformedNodes[i];
          const n2 = transformedNodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);

          if (dist < 210) {
            const edgeAlpha = (1 - dist / 210) * 0.6;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${edgeAlpha})`;
            ctx.lineWidth = 1.3;
            ctx.stroke();
          }
        }
      }

      // Core Glowing Vertices
      transformedNodes.forEach((n) => {
        const radius = 4 * n.scale;

        // Outer electric bloom
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 240, 255, 0.22)";
        ctx.fill();

        // Inner piercing white/cyan core
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // ==========================================
      // LAYER 6: Shockwaves / Energy Pulses
      // ==========================================
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const wave = shockwaves[s];
        wave.radius += 9;
        wave.alpha = Math.max(0, 1 - wave.radius / wave.maxRadius);

        if (wave.alpha <= 0) {
          shockwaves.splice(s, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(centerX + wave.x, centerY + wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${wave.alpha * 0.7})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full opacity-95 cursor-crosshair"
      style={{ filter: "drop-shadow(0 0 16px rgba(0, 240, 255, 0.25))" }}
    />
  );
};

export default ThreeDBackground;
