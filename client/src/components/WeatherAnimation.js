import React, { useEffect, useRef } from 'react';
import './WeatherAnimation.css';

// WeatherAnimation overlays animated effects based on condition
function WeatherAnimation({ condition }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Rain animation
    if (condition === 'rain') {
      const drops = Array.from({ length: 60 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        l: 10 + Math.random() * 10,
        xs: -2 + Math.random() * 4,
        ys: 8 + Math.random() * 4
      }));
      function drawRain() {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = 'rgba(120,180,255,0.5)';
        ctx.lineWidth = 2;
        for (let d of drops) {
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x + d.xs, d.y + d.l);
          ctx.stroke();
          d.x += d.xs;
          d.y += d.ys;
          if (d.y > height) { d.y = -20; d.x = Math.random() * width; }
          if (d.x > width || d.x < 0) { d.x = Math.random() * width; }
        }
        animationId = requestAnimationFrame(drawRain);
      }
      drawRain();
      return () => cancelAnimationFrame(animationId);
    }

    // Snow animation
    if (condition === 'snow') {
      const flakes = Array.from({ length: 40 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 2 + Math.random() * 3,
        ys: 1 + Math.random() * 2
      }));
      function drawSnow() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        for (let f of flakes) {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, 2 * Math.PI);
          ctx.fill();
          f.y += f.ys;
          if (f.y > height) { f.y = -10; f.x = Math.random() * width; }
        }
        animationId = requestAnimationFrame(drawSnow);
      }
      drawSnow();
      return () => cancelAnimationFrame(animationId);
    }

    // Cloud animation
    if (condition === 'cloud') {
      const clouds = Array.from({ length: 4 }, (_, i) => ({
        x: (width / 5) * (i + 1),
        y: 80 + i * 30,
        dx: 0.2 + Math.random() * 0.3
      }));
      function drawClouds() {
        ctx.clearRect(0, 0, width, height);
        for (let c of clouds) {
          ctx.beginPath();
          ctx.arc(c.x, c.y, 40, Math.PI * 0.8, Math.PI * 2.2);
          ctx.fillStyle = 'rgba(220,230,245,0.7)';
          ctx.fill();
          c.x += c.dx;
          if (c.x > width + 40) c.x = -40;
        }
        animationId = requestAnimationFrame(drawClouds);
      }
      drawClouds();
      return () => cancelAnimationFrame(animationId);
    }

    // Clear/sunny animation
    if (condition === 'clear') {
      function drawSun() {
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(width / 2, 120, 60, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255,220,120,0.7)';
        ctx.shadowColor = 'rgba(255,220,120,0.7)';
        ctx.shadowBlur = 40;
        ctx.fill();
        ctx.restore();
        animationId = requestAnimationFrame(drawSun);
      }
      drawSun();
      return () => cancelAnimationFrame(animationId);
    }

    // No animation for other conditions
    ctx.clearRect(0, 0, width, height);
    return () => cancelAnimationFrame(animationId);
  }, [condition]);

  return <canvas ref={canvasRef} className="weather-animation-canvas" />;
}

export default WeatherAnimation;
