'use client';
import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all .reveal elements
    const observe = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
    };

    observe();

    // Re-observe on DOM changes (for dynamic sections like the report)
    const mutObs = new MutationObserver(observe);
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      mutObs.disconnect();
    };
  }, []);

  return null;
}
