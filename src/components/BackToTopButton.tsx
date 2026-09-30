import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface BackToTopButtonProps {
  scrollContainerRef: React.RefObject<HTMLElement | null>;
  threshold?: number;
  className?: string;
}

export const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  scrollContainerRef,
  threshold = 280,
  className = '',
}) => {
  const { accent } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainerRef, threshold]);

  const scrollToTop = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch {}
    }

    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`absolute bottom-20 lg:bottom-8 right-4 sm:right-6 z-40 p-2.5 sm:px-3.5 sm:py-2.5 rounded-full text-white shadow-2xl flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-105 active:scale-95 animate-fadeIn backdrop-blur-md cursor-pointer ${className}`}
      style={{
        backgroundColor: accent.hex,
        boxShadow: `0 6px 20px ${accent.glowRgba}`,
      }}
      title="Back to Top"
      aria-label="Scroll back to top"
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
      <span className="text-xs font-bold hidden sm:inline tracking-wide">Top</span>
    </button>
  );
};
