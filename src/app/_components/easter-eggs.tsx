'use client';

import { useEffect, useState } from 'react';

export function EasterEggs() {
  const [konamiActive, setKonamiActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [secretMessage, setSecretMessage] = useState('');
  const [lastKeys, setLastKeys] = useState<string[]>([]);
  const [isEffectActive, setIsEffectActive] = useState(false);

  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    const handleKeyDown = (e: KeyboardEvent) => {
      const newKeys = [...lastKeys, e.key];
      if (newKeys.length > konamiCode.length) {
        newKeys.shift();
      }
      setLastKeys(newKeys);

      if (newKeys.join(',') === konamiCode.join(',')) {
        setKonamiActive(true);
        document.body.classList.add('konami-active');
        setSecretMessage('🎮 Konami Code Activated!');
        setTimeout(() => {
          document.body.classList.remove('konami-active');
          setKonamiActive(false);
          setSecretMessage('');
        }, 5000);
      }
    };

    // Easter egg for clicking the logo multiple times
    const logo = document.querySelector('h1');
    if (logo) {
      logo.addEventListener('click', () => {
        setClickCount(prev => {
          const newCount = prev + 1;
          if (newCount === 5) {
            logo.classList.add('secret-spin');
            setSecretMessage('🌀 You found a spinning secret!');
            setTimeout(() => {
              logo.classList.remove('secret-spin');
              setSecretMessage('');
            }, 3000);
          }
          return newCount;
        });
      });
    }

    // Enhanced Easter egg for rapid mouse movement
    let mouseMovements = 0;
    let mouseTimer: NodeJS.Timeout;

    const createTrailEffect = (event: MouseEvent) => {
      const trailElement = document.createElement('div');
      trailElement.style.position = 'absolute';
      trailElement.style.width = '15px';
      trailElement.style.height = '15px';
      trailElement.style.backgroundColor = 'rgba(255, 100, 100, 0.8)';
      trailElement.style.borderRadius = '50%';
      trailElement.style.pointerEvents = 'none';
      trailElement.style.transition = 'transform 0.3s ease-out, opacity 0.6s ease-out';
      trailElement.style.left = `${event.clientX - 7.5}px`; // Offset for center alignment
      trailElement.style.top = `${event.clientY - 7.5}px`;
      document.body.appendChild(trailElement);

      // Animate the trail fading and shrinking
      setTimeout(() => {
        trailElement.style.transform = 'scale(0)';
        trailElement.style.opacity = '0';
        setTimeout(() => {
          trailElement.remove();
        }, 300);
      }, 100); // Start fading after 100ms to make the trail visible

      // Add multiple trails with a slight delay for a flowing effect
      if (mouseMovements > 50) {
        setSecretMessage('🎨 You are now making art with your cursor!');
        setTimeout(() => setSecretMessage(''), 1500); // Hide message after 1.5 seconds
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseMovements++;
      clearTimeout(mouseTimer);

      mouseTimer = setTimeout(() => {
        if (mouseMovements > 50) {
          createTrailEffect(event);
        }
        mouseMovements = 0;
      }, 500);
    };

    // Hidden message in console
    console.log(
      '%c🎵 Welcome to the hidden console message! 🎨',
      'color: #4F46E5; font-size: 20px; font-weight: bold;'
    );

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseTimer);
    };
  }, [lastKeys, isEffectActive]);

  return secretMessage ? (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full z-50 animate-fade-in">
      {secretMessage}
    </div>
  ) : null;
}
