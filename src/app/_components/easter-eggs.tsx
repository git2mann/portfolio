'use client';

import { useEffect, useState } from 'react';

export function EasterEggs() {
  const [konamiActive, setKonamiActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [secretMessage, setSecretMessage] = useState('');
  const [lastKeys, setLastKeys] = useState<string[]>([]);

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
              return 0;
            }, 3000);
          }
          return newCount;
        });
      });
    }

    // Easter egg for rapid mouse movement
    let mouseMovements = 0;
    let mouseTimer: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      mouseMovements++;
      clearTimeout(mouseTimer);
      
      mouseTimer = setTimeout(() => {
        if (mouseMovements > 50) {
          setSecretMessage('🎨 You're making art with your cursor!');
          setTimeout(() => setSecretMessage(''), 2000);
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
  }, [lastKeys]);

  return secretMessage ? (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full z-50 animate-fade-in">
      {secretMessage}
    </div>
  ) : null;
}
