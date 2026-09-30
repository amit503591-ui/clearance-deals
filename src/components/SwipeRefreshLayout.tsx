import React, { useState, useRef, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ScrollController } from './ScrollController';

interface SwipeRefreshLayoutProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  isRefreshing?: boolean;
  pullThreshold?: number;
  className?: string;
  disabled?: boolean;
  showScrollControls?: boolean;
}

export const SwipeRefreshLayout: React.FC<SwipeRefreshLayoutProps> = ({
  children,
  onRefresh,
  isRefreshing: externalRefreshing = false,
  pullThreshold = 70,
  className = '',
  disabled = false,
  showScrollControls = true,
}) => {
  const { accent, isAMOLED } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pullDistance, setPullDistance] = useState<number>(0);
  const [internalRefreshing, setInternalRefreshing] = useState<boolean>(false);
  const startYRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  const isRefreshing = externalRefreshing || internalRefreshing;

  const triggerHaptic = useCallback((duration = 15) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(duration);
      } catch {}
    }
  }, []);

  const handleStart = (clientY: number) => {
    if (disabled || isRefreshing) return;

    // Check if user is at the top of scroll
    const container = containerRef.current;
    const isAtTop = !container || container.scrollTop <= 1;

    if (isAtTop) {
      startYRef.current = clientY;
      isDraggingRef.current = true;
    }
  };

  const handleMove = (clientY: number) => {
    if (!isDraggingRef.current || startYRef.current === null || isRefreshing) return;

    const diff = clientY - startYRef.current;

    // Only allow pulling down when at top
    if (diff > 0) {
      // Android pull damping curve: dy * 0.45, capped at max 120px
      const dampedDistance = Math.min(120, Math.pow(diff, 0.85) * 1.2);
      setPullDistance(dampedDistance);

      if (dampedDistance >= pullThreshold && pullDistance < pullThreshold) {
        triggerHaptic(20);
      }
    } else {
      // User is scrolling down into the content, disengage pull-to-refresh to let native touch scroll take over 100%
      isDraggingRef.current = false;
      setPullDistance(0);
    }
  };

  const handleEnd = async () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    startYRef.current = null;

    if (pullDistance >= pullThreshold && !isRefreshing) {
      setInternalRefreshing(true);
      triggerHaptic(25);
      try {
        await onRefresh();
      } catch (err) {
        console.error('Swipe refresh failed:', err);
      } finally {
        setTimeout(() => {
          setInternalRefreshing(false);
          setPullDistance(0);
        }, 400);
      }
    } else {
      setPullDistance(0);
    }
  };

  // Touch event handlers
  const onTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientY);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientY);
  const onTouchEnd = () => handleEnd();

  // Mouse event handlers for desktop testing
  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) handleStart(e.clientY);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) handleMove(e.clientY);
  };
  const onMouseUp = () => handleEnd();

  const progress = Math.min(1, pullDistance / pullThreshold);
  const rotationDegrees = Math.min(360, pullDistance * 4);

  return (
    <div className="relative flex-1 flex flex-col min-h-0 w-full h-full overflow-hidden">
      {/* Scrollable Container with active touch-pan-y for Android */}
      <div
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className={`relative overflow-y-auto overscroll-y-contain flex-1 h-full touch-pan-y android-scrollbar ${className}`}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Android Material Swipe Refresh Indicator */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-transform duration-150 ease-out"
          style={{
            top: isRefreshing
              ? '18px'
              : pullDistance > 0
              ? `${Math.max(-48, pullDistance - 48)}px`
              : '-56px',
            opacity: pullDistance > 10 || isRefreshing ? 1 : 0,
            transform: `translateX(-50%) scale(${isRefreshing ? 1 : Math.max(0.6, Math.min(1, progress))})`,
          }}
        >
          <div
            className={`w-10 h-10 rounded-full border shadow-2xl flex items-center justify-center transition-colors duration-200 ${
              isAMOLED
                ? 'bg-black border-neutral-700'
                : 'bg-slate-900 border-slate-700/80'
            }`}
            style={{
              boxShadow: isRefreshing ? `0 0 15px ${accent.glowRgba}` : undefined,
            }}
          >
            <RefreshCw
              className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : 'text-slate-200'}`}
              style={{
                color: isRefreshing ? accent.hex : undefined,
                transform: isRefreshing ? undefined : `rotate(${rotationDegrees}deg)`,
                transition: isRefreshing ? undefined : 'transform 0.05s ease-out',
              }}
            />
          </div>
        </div>

        {/* Top Pull Hint Bar */}
        {pullDistance > 15 && !isRefreshing && (
          <div
            className="w-full text-center py-1 text-[11px] font-semibold pointer-events-none transition-opacity duration-150"
            style={{ opacity: progress, color: accent.hex }}
          >
            {pullDistance >= pullThreshold
              ? 'Release to refresh clearancedeals.info'
              : 'Pull down to refresh'}
          </div>
        )}

        {/* Main Content (transform only applied while actively pulling to refresh) */}
        <div
          className="transition-transform duration-200 ease-out min-h-full"
          style={
            pullDistance > 0 || isRefreshing
              ? {
                  transform: isRefreshing
                    ? 'translateY(24px)'
                    : `translateY(${pullDistance * 0.35}px)`,
                }
              : undefined
          }
        >
          {children}
        </div>
      </div>

      {/* Up/Down Arrows & Interactive Scroll Slider */}
      {showScrollControls && (
        <ScrollController scrollContainerRef={containerRef} />
      )}
    </div>
  );
};
