import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";

interface RevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  selector?: string; // if provided, animate children matching selector
  scale?: number;
}

/** Fade-up on-scroll reveal. Attach ref to a container. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(opts: RevealOptions = {}) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const targets: Element[] = opts.selector
      ? Array.from(el.querySelectorAll(opts.selector))
      : [el];
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: opts.y ?? 24,
          scale: opts.scale ?? 1,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: opts.duration ?? 0.7,
          ease: "power3.out",
          stagger: opts.stagger ?? 0,
          delay: opts.delay ?? 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [opts.y, opts.duration, opts.stagger, opts.delay, opts.selector, opts.scale]);
  return ref;
}
