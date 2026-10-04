import React, { useEffect, useRef } from 'react';

export const AIFarmBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Force video playback on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => {
        console.warn('Video autoplay prevented by browser policy:', err);
      });
    }
  }, []);

  // 60 FPS HTML5 Canvas Animation for AI Smart Agriculture (Waves, Particles, Scanlines)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // AI Farm Nodes (soil moisture, solar, water)
    const nodeCount = 35;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 3 + 2,
      pulse: Math.random() * Math.PI * 2,
      type: Math.random() > 0.5 ? 'water' : 'solar'
    }));

    // Swaying Crop Blades Wave
    let waveOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      waveOffset += 0.02;

      // 1. Draw Swaying Farmland Waves at the bottom
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 20) {
        const y = height - 120 + Math.sin(x * 0.008 + waveOffset) * 20 + Math.cos(x * 0.015 + waveOffset * 0.5) * 10;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const waveGradient = ctx.createLinearGradient(0, height - 150, 0, height);
      waveGradient.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
      waveGradient.addColorStop(1, 'rgba(5, 150, 105, 0.25)');
      ctx.fillStyle = waveGradient;
      ctx.fill();

      // Second layer wave
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 15) {
        const y = height - 80 + Math.sin(x * 0.012 - waveOffset * 1.2) * 15;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = 'rgba(52, 211, 153, 0.15)';
      ctx.fill();

      // 2. Draw AI Scanning Grid Lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.06)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 3. Update & Draw AI Smart Farm Nodes with Neural Connections
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const currentRadius = node.radius + Math.sin(node.pulse) * 1.5;

        // Draw connections to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(1, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = node.type === 'water' ? 'rgba(14, 165, 233, 0.5)' : 'rgba(16, 185, 129, 0.6)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Real Agriculture Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105"
      >
        <source src="/videos/farmland.webm" type="video/webm" />
        <source src="https://upload.wikimedia.org/wikipedia/commons/a/af/ASMR_field_of_wheat_-_nature.webm" type="video/webm" />
      </video>

      {/* AI Smart Agriculture Canvas Overlay (Guarantees dynamic motion always) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

      {/* Soft Light Theme Gradient for Readable Text */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFFFC]/80 via-[#FAFFFC]/65 to-[#FAFFFC] backdrop-blur-[0.5px] z-20" />
    </div>
  );
};
