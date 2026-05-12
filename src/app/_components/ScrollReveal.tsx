"use client";

import { useEffect, useRef, useMemo, ReactNode, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  scrub?: number | boolean;
  stagger?: number;
  duration?: number;
  autoReveal?: boolean;
  triggered?: boolean;
}

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0,
  baseRotation = 0,
  blurStrength = 10,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom center',
  wordAnimationEnd = 'bottom center',
  scrub = 1.2,
  stagger = 0.02,
  duration = 0.6,
  autoReveal = true,
  triggered = false
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  const runAnimation = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const wordElements = el.querySelectorAll('.word');
    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, filter: enableBlur ? `blur(${blurStrength}px)` : 'none' },
      {
        opacity: 1,
        filter: 'blur(0px)',
        stagger: stagger,
        duration: duration,
        ease: "power2.out",
        overwrite: true,
        willChange: 'opacity, filter'
      }
    );
  }, [baseOpacity, enableBlur, blurStrength, stagger, duration]);

  useEffect(() => {
    if (triggered) {
      runAnimation();
    }
  }, [triggered, runAnimation]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || triggered) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    // The container rotation can still scrub if desired, but defaults to 0
    if (baseRotation !== 0) {
      gsap.fromTo(
        el,
        { transformOrigin: '50% 50%', rotate: baseRotation },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom',
            end: rotationEnd,
            scrub: scrub
          }
        }
      );
    }

    const wordElements = el.querySelectorAll('.word');

    if (autoReveal) {
      // Automatic reveal sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top 80%',
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(
        wordElements,
        { opacity: baseOpacity, filter: enableBlur ? `blur(${blurStrength}px)` : 'none' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          stagger: stagger,
          duration: duration,
          ease: "power2.out",
          willChange: 'opacity, filter'
        }
      );
    } else {
      // Legacy scrub logic
      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity, filter' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top 85%',
            end: wordAnimationEnd,
            scrub: scrub
          }
        }
      );

      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.1,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top 85%',
              end: wordAnimationEnd,
              scrub: scrub
            }
          }
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength, scrub, autoReveal, stagger, duration, triggered]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <div className={`scroll-reveal-text ${textClassName}`}>{splitText}</div>
    </div>
  );
};

export default ScrollReveal;
