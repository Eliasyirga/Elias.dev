import React, { useState, useEffect, useRef } from "react";

const roles = ["Full Stack Developer", "Python Developer"];

const Hero = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const canvasRef = useRef(null);

  // Typing animation
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer;

    if (!isDeleting && text.length < currentRole.length) {
      timer = setTimeout(() => {
        setText(currentRole.substring(0, text.length + 1));
      }, typingSpeed);
    } else if (isDeleting && text.length > 0) {
      timer = setTimeout(() => {
        setText(currentRole.substring(0, text.length - 1));
      }, typingSpeed / 2);
    } else if (!isDeleting && text.length === currentRole.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex, typingSpeed]);

  // Connected particles
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = [];
    const numParticles = 80;
    const maxDistance = 130;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.radius = 2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#3b82f6";
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59,130,246,${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-white text-center px-4 sm:px-6 pt-20 font-sans overflow-hidden"
      style={{
        backgroundImage: "url('/back2.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-3xl animate-fadeIn px-2 sm:px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow-xl">
          Hi, I'm{" "}
          <span className="text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.9)]">
            Elias Yirga
          </span>
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl text-blue-400 mb-4 font-semibold">
          I am a{" "}
          <span className="border-r-4 border-blue-400 pr-2 font-mono animate-type-cursor">
            {text}
          </span>
        </p>

        <p className="text-gray-300 mb-8 sm:mb-10 max-w-lg mx-auto tracking-wide text-base sm:text-lg leading-relaxed drop-shadow-md">
          Building powerful, scalable web applications using the MERN stack —
          MongoDB, Express, React, and Node.js.
        </p>

        <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
          <a
            href="#projects"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 rounded-xl font-semibold hover:bg-blue-700 shadow-lg transition transform hover:-translate-y-1 hover:scale-105 text-sm sm:text-base"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-600 rounded-xl text-blue-400 font-semibold hover:bg-blue-600 hover:text-white shadow-lg transition transform hover:-translate-y-1 hover:scale-105 text-sm sm:text-base"
          >
            Hire Me
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }

        @keyframes blinkCursor {
          0%, 100% { border-color: transparent; }
          50% { border-color: #3b82f6; }
        }
        .animate-type-cursor {
          border-right: 4px solid #3b82f6;
          animation: blinkCursor 1s step-start infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
