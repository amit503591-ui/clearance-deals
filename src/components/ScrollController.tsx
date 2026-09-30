import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronUp, ChevronDown, ChevronsUp, ChevronsDown, MoveVertical } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ScrollControllerProps {
  scrollContainerRef: React.RefObject<HTMLElement | null>;
  className?: string;
  showSliderBar?: boolean;
}

export const ScrollController: React.FC<ScrollControllerProps> = ({
  scrollContainerRef,
  className = '',
  showSliderBar = true,
}) => {
  const { accent, isDark } = useTheme();
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isScrollable, setIsScrollable] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const tooltipTimeoutRef = useRef<number | null>(null);

  const triggerHaptic = useCallback((ms = 10) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(ms);
      } catch {}
    }
  }, []);

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll > 20) {
      setIsScrollable(true);
      const progress = Math.min(1, Math.max(0, el.scrollTop / maxScroll));
      setScrollProgress(progress);
    } else {
      setIsScrollable(false);
      setScrollProgress(0);
    }
  }, [scrollContainerRef]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    updateScrollState();

    const handleScroll = () => {
      updateScrollState();
      setShowTooltip(true);
      if (tooltipTimeoutRef.current) window.clearTimeout(tooltipTimeoutRef.current);
      tooltipTimeoutRef.current = window.setTimeout(() => {
        setShowTooltip(false);
      }, 1500);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollState);

    // Mutation observer to detect when deals list loads or expands
    const observer = new MutationObserver(updateScrollState);
    observer.observe(el, { childList: true, subtree: true });

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollState);
      observer.disconnect();
      if (tooltipTimeoutRef.current) window.clearTimeout(tooltipTimeoutRef.current);
    };
  }, [scrollContainerRef, updateScrollState]);

  // Scroll actions
  const scrollByDelta = (direction: 'up' | 'down') => {
    triggerHaptic(12);
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollAmount = Math.max(280, el.clientHeight * 0.75);
    const target = direction === 'up' ? el.scrollTop - scrollAmount : el.scrollTop + scrollAmount;

    el.scrollTo({
      top: Math.max(0, target),
      behavior: 'smooth',
    });
  };

  const scrollToEdge = (edge: 'top' | 'bottom') => {
    triggerHaptic(20);
    const el = scrollContainerRef.current;
    if (!el) return;

    el.scrollTo({
      top: edge === 'top' ? 0 : el.scrollHeight,
      behavior: 'smooth',
    });
  };

  // Slider dragging logic
  const handleSliderInteraction = useCallback((clientY: number) => {
    const el = scrollContainerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const rect = track.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const ratio = Math.max(0, Math.min(1, relativeY / rect.height));

    const maxScroll = el.scrollHeight - el.clientHeight;
    el.scrollTop = ratio * maxScroll;
    setScrollProgress(ratio);
  }, [scrollContainerRef]);

  const onTrackTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    triggerHaptic(15);
    handleSliderInteraction(e.touches[0].clientY);
  };

  const onTrackTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleSliderInteraction(e.touches[0].clientY);
  };

  const onTrackTouchEnd = () => {
    setIsDragging(false);
  };

  const onTrackMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSliderInteraction(e.clientY);

    const onMouseMove = (moveEvent: MouseEvent) => {
      handleSliderInteraction(moveEvent.clientY);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  if (!isScrollable) return null;

  const percentText = `${Math.round(scrollProgress * 100)}%`;

  return (
    <>
      {/* 1. Vertical Interactive Scroll Slider Track (Right Edge) */}
      {showSliderBar && (
        <div
          className="absolute right-1 top-16 bottom-24 w-7 flex items-center justify-center z-40 select-none touch-none group"
          onTouchStart={onTrackTouchStart}
          onTouchMove={onTrackTouchMove}
          onTouchEnd={onTrackTouchEnd}
          onMouseDown={onTrackMouseDown}
          title="Drag or tap to scroll"
        >
          {/* Track Bar Background */}
          <div
            ref={trackRef}
            className={`w-2.5 h-full rounded-full relative cursor-pointer transition-all duration-200 border ${
              isDark
                ? 'bg-neutral-900/80 border-neutral-700/60 shadow-inner'
                : 'bg-slate-200/90 border-slate-300 shadow-inner'
            }`}
          >
            {/* Draggable Thumb */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-4 h-9 rounded-full shadow-lg transition-transform flex items-center justify-center cursor-grab active:cursor-grabbing active:scale-110"
              style={{
                top: `calc(${scrollProgress * 100}% - ${scrollProgress * 36}px)`,
                backgroundColor: accent.hex,
                boxShadow: `0 0 12px ${accent.glowRgba}`,
              }}
            >
              <MoveVertical className="w-2.5 h-2.5 text-white opacity-90" />
            </div>
          </div>

          {/* Floating Percent Tooltip during drag/scroll */}
          {(isDragging || showTooltip) && (
            <div
              className={`absolute right-9 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold text-white shadow-xl pointer-events-none transition-opacity duration-150 flex items-center gap-1 ${
                isDragging ? 'opacity-100 scale-105' : 'opacity-90'
              }`}
              style={{
                top: `calc(${scrollProgress * 100}% - ${scrollProgress * 36}px)`,
                backgroundColor: accent.hex,
              }}
            >
              <span>{scrollProgress < 0.05 ? 'Top' : scrollProgress > 0.95 ? 'Bottom' : percentText}</span>
            </div>
          )}
        </div>
      )}

      {/* 2. Floating Arrow Navigation Pod (Bottom-Right, above bottom nav) */}
      <div
        className={`absolute bottom-20 lg:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-center gap-1 p-1 rounded-2xl shadow-2xl backdrop-blur-xl border transition-all duration-300 animate-fadeIn ${
          isDark
            ? 'bg-neutral-950/90 border-neutral-800 shadow-black/80'
            : 'bg-white/95 border-slate-200 shadow-slate-400/30'
        } ${className}`}
      >
        {/* Scroll Up Button */}
        <button
          onClick={() => scrollByDelta('up')}
          onDoubleClick={() => scrollToEdge('top')}
          className={`p-2 rounded-xl transition active:scale-90 flex items-center justify-center ${
            scrollProgress <= 0.01
              ? 'opacity-30 cursor-not-allowed text-slate-500'
              : isDark
              ? 'hover:bg-neutral-800 text-slate-200 hover:text-white'
              : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
          }`}
          title="Scroll Up (Double click for Top)"
          aria-label="Scroll Up"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Center Indicator / Quick Top-Bottom Toggle */}
        <button
          onClick={() => (scrollProgress > 0.5 ? scrollToEdge('top') : scrollToEdge('bottom'))}
          className="px-1.5 py-0.5 rounded-md text-[9px] font-bold font-mono text-white transition active:scale-95 shadow-xs"
          style={{ backgroundColor: accent.hex }}
          title={scrollProgress > 0.5 ? 'Jump to Top' : 'Jump to Bottom'}
        >
          {percentText}
        </button>

        {/* Scroll Down Button */}
        <button
          onClick={() => scrollByDelta('down')}
          onDoubleClick={() => scrollToEdge('bottom')}
          className={`p-2 rounded-xl transition active:scale-90 flex items-center justify-center ${
            scrollProgress >= 0.99
              ? 'opacity-30 cursor-not-allowed text-slate-500'
              : isDark
              ? 'hover:bg-neutral-800 text-slate-200 hover:text-white'
              : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
          }`}
          title="Scroll Down (Double click for Bottom)"
          aria-label="Scroll Down"
        >
          <ChevronDown className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </>
  );
};
