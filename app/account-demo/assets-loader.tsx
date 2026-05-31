"use client";

import { useEffect } from "react";

export default function AssetsLoader() {

  useEffect(() => {

    const createdElements: HTMLElement[] = [];

    const loadScript = (src: string) => {

      const existing = document.querySelector(
        `script[data-src="${src}"]`
      );

      if (existing) return;

      const script = document.createElement("script");

      script.src = src;
      script.async = true;
      script.dataset.src = src;

      script.onload = () => {
        console.log(`Loaded: ${src}`);
      };

      document.body.appendChild(script);

      createdElements.push(script);
    };

    const loadCss = (href: string) => {

      const existing = document.querySelector(
        `link[data-href="${href}"]`
      );

      if (existing) return;

      const link = document.createElement("link");

      link.rel = "stylesheet";
      link.href = href;
      link.dataset.href = href;

      document.head.appendChild(link);

      createdElements.push(link);
    };

    // Scripts
    loadScript("/bundles/runtime.0716c8089d42c5b9ea4c.js");

    // CSS
    loadCss("/css/2666.d7dd4a59f33a2f52cf86.css");
    loadCss("/css/2092.4b97d1e084a7f81e17f2.css");
    loadCss("/bundles/4986.8b484bfeff805649f879.css");
    loadCss("/css/preloader.css");

    return () => {

      console.log("Removing FYERS assets");

      createdElements.forEach(el => {

        try {
          el.remove();
        } catch (err) {
          console.error(err);
        }

      });

    };

  }, []);

  return null;
}