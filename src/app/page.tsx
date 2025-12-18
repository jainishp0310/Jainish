'use client';

import { useState, useEffect, useCallback } from 'react';

export default function Home() {
  const [heartName, setHeartName] = useState('Hetanshi');

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const heart = document.createElement('div');
      heart.style.left = `${e.clientX}px`;
      heart.style.top = `${e.clientY}px`;

      const randomScale = Math.random() * 0.4 + 0.8; // 0.8 to 1.2
      const randomRotation = Math.random() * 40 - 20; // -20 to 20 deg
      heart.style.transform = `translate(-50%, -50%) scale(${randomScale}) rotate(${randomRotation}deg)`;

      heart.className = 'pointer-events-none absolute animate-fade-out-heart';

      heart.innerHTML = `
      <div class="relative flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-20 h-20 text-primary drop-shadow-lg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <span class="absolute font-headline font-semibold text-primary-foreground select-none text-xs" style="text-shadow: 0 1px 3px hsl(var(--primary) / 0.5)">
          ${heartName}
        </span>
      </div>
    `;

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1500); // Corresponds to animation duration in tailwind.config.ts
    },
    [heartName]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-animated-gradient font-body">
      <div className="absolute bottom-4 right-4 text-2xl font-bold text-white mix-blend-soft-light">
        Jai♥Het
      </div>
    </main>
  );
}
