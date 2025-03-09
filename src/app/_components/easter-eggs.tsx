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

    const createArtEffect = () => {
      if (isEffectActive) return; // Prevent the effect from being created if already active
      setIsEffectActive(true);

      // Create a subtle effect near the cursor
      const effect = document.createElement('div');
      effect.style.position = 'absolute';
      effect.style.width = '20px';
      effect.style.height = '20px';
      effect.style.backgroundColor = 'rgba(255, 100, 100, 0.8)';
      effect.style.borderRadius = '50%';
      effect.style.pointerEvents = 'none';
      effect.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
      document.body.appendChild(effect);

      const moveEffect = (event: MouseEvent) => {
        effect.style.left = `${event.clientX - 10}px`; // Offset to center the effect
        effect.style.top = `${event.clientY - 10}px`;
      };

      const removeEffect = () => {
        effect.style.transform = 'scale(0)';
        effect.style.opacity = '0';
        setTimeout(() => {
          effect.remove();
          setIsEffectActive(false);
        }, 300);
      };

      window.addEventListener('mousemove', moveEffect);
      setTimeout(removeEffect, 500); // Remove effect after 500ms
    };

    const handleMouseMove = () => {
      mouseMovements++;
      clearTimeout(mouseTimer);

      mouseTimer = setTimeout(() => {
        if (mouseMovements > 50) {
          createArtEffect();
          setSecretMessage('🎨 You are now making art with your cursor!');
          setTimeout(() => setSecretMessage(''), 1500); // Hide message after 1.5 seconds
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
