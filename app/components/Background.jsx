"use client";
import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Number of stars
    const numStars = 120;
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.3, // very slow drift
      dy: (Math.random() - 0.5) * 0.3,
    }));

    function draw() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "white";

      for (let star of stars) {
        star.x += star.dx;
        star.y += star.dy;

        // Wrap around edges
        if (star.x < 0) star.x = w;
        if (star.x > w) star.x = 0;
        if (star.y < 0) star.y = h;
        if (star.y > h) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }

    draw();

    // Handle resizing
    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full bg-black"
    />
  );
}




