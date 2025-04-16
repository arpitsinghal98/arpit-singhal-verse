
import { useEffect, useState, useRef, MutableRefObject } from "react";

interface ScrollAppearanceOptions {
  threshold?: number;
  delay?: number;
  once?: boolean;
}

export function useScrollAppearance<T extends HTMLElement>(
  options: ScrollAppearanceOptions = {}
): [MutableRefObject<T | null>, boolean] {
  const { threshold = 0.1, delay = 0, once = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T | null>(null);
  const wasVisible = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Check if already visible and once is true
        if (wasVisible.current && once) return;

        // If entry is intersecting, make element visible (with optional delay)
        if (entry.isIntersecting) {
          if (delay) {
            setTimeout(() => {
              setIsVisible(true);
              wasVisible.current = true;
            }, delay);
          } else {
            setIsVisible(true);
            wasVisible.current = true;
          }
        } else if (!once) {
          // If not intersecting and not once, hide element
          setIsVisible(false);
          wasVisible.current = false;
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, delay, once]);

  return [elementRef, isVisible];
}

// Easy to use component for creating scroll-triggered animations
export function useScrollAnimation() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const appearElements = document.querySelectorAll(".appear");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, observerOptions);

    appearElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      appearElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);
}
