"use client";

import { useRef, useEffect, useState } from "react";

interface TouchGesture {
  swipeLeft?: () => void;
  swipeRight?: () => void;
  swipeUp?: () => void;
  swipeDown?: () => void;
  pinch?: (scale: number) => void;
  tap?: () => void;
}

export function useTouchGestures(elementRef: React.RefObject<HTMLDivElement | null>, gestures: TouchGesture) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number; time: number } | null>(null);
  const [pinchDistance, setPinchDistance] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        setTouchStart({
          x: touch.clientX,
          y: touch.clientY,
          time: Date.now(),
        });
      } else if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        setPinchDistance(distance);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        setTouchStart(null);
        setPinchDistance(0);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStart && e.touches.length === 1) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStart.x;
        const deltaY = touch.clientY - touchStart.y;
        const deltaTime = Date.now() - touchStart.time;

        // Minimum distance and time for swipe detection
        const minDistance = 50;
        const maxTime = 300;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (Math.abs(deltaX) > minDistance && deltaTime < maxTime) {
            if (deltaX > 0) {
              gestures.swipeRight?.();
            } else {
              gestures.swipeLeft?.();
            }
          }
        } else {
          if (Math.abs(deltaY) > minDistance && deltaTime < maxTime) {
            if (deltaY > 0) {
              gestures.swipeDown?.();
            } else {
              gestures.swipeUp?.();
            }
          }
        }
      } else if (e.touches.length === 2 && pinchDistance > 0) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        
        const scale = currentDistance / pinchDistance;
        if (Math.abs(scale - 1) > 0.1) {
          gestures.pinch?.(scale);
        }
      }
    };

    // Add tap detection
    let tapTimeout: NodeJS.Timeout;
    const handleTap = () => {
      clearTimeout(tapTimeout);
      tapTimeout = setTimeout(() => {
        gestures.tap?.();
      }, 200);
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchstart', handleTap);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchstart', handleTap);
      clearTimeout(tapTimeout);
    };
  }, [elementRef, gestures, pinchDistance]);

  return {
    isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  };
}
