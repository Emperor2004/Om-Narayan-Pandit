"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 75,
  placeholder = "blur",
  blurDataURL = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA",
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Generate optimized srcset for responsive images
  const generateSrcSet = (baseSrc: string) => {
    const widths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
    return widths
      .map(w => `${baseSrc}?w=${w}&q=${quality} ${w}w`)
      .join(", ");
  };

  // Generate WebP and AVIF formats
  const generatePictureSources = () => {
    const formats = [
      { type: "image/avif", ext: "avif" },
      { type: "image/webp", ext: "webp" },
    ];

    return formats.map(format => (
      <source
        key={format.type}
        type={format.type}
        srcSet={generateSrcSet(src.replace(/\.[^/.]+$/, `.${format.ext}`))}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    ));
  };

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className}`}
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : 'auto' }}
    >
      {/* Blur placeholder */}
      {placeholder === "blur" && !isLoaded && (
        <div 
          className="absolute inset-0 blur-sm"
          style={{ 
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Empty placeholder */}
      {placeholder === "empty" && !isLoaded && (
        <div className="absolute inset-0 bg-[var(--card)] animate-pulse" />
      )}

      {/* Optimized picture element */}
      {isInView && !hasError && (
        <picture>
          {generatePictureSources()}
          <motion.img
            src={`${src}?w=${width || 1920}&q=${quality}`}
            alt={alt}
            className={`w-full h-full object-cover ${className}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onLoad={handleLoad}
            onError={handleError}
          />
        </picture>
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--card)] text-[var(--muted)]">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-accent/10 rounded-full flex items-center justify-center">
              <span className="text-xl">🖼️</span>
            </div>
            <span className="text-sm">Image not available</span>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isInView && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
