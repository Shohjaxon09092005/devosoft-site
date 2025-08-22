import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale-in';
  delay?: number;
  duration?: number;
}

export function AnimatedSection({
  children,
  className,
  animation = 'fade-in',
  delay = 0,
  duration = 700,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const animationClasses = {
    'fade-in': 'opacity-0 translate-y-8',
    'slide-up': 'opacity-0 translate-y-16',
    'slide-left': 'opacity-0 translate-x-16',
    'slide-right': 'opacity-0 -translate-x-16',
    'scale-in': 'opacity-0 scale-95',
  };

  const visibleClasses = {
    'fade-in': 'opacity-100 translate-y-0',
    'slide-up': 'opacity-100 translate-y-0',
    'slide-left': 'opacity-100 translate-x-0',
    'slide-right': 'opacity-100 translate-x-0',
    'scale-in': 'opacity-100 scale-100',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out',
        `duration-${duration}`,
        isVisible ? visibleClasses[animation] : animationClasses[animation],
        className
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}