"use client";

import { useEffect } from "react";

export default function Preloader() {
  useEffect(() => {
    const dismiss = () => {
      const el = document.getElementById("site-preloader");
      if (!el) {
        document.body.style.overflow = "";
        return;
      }
      
      // Short delay for a brief visual of the loader
      setTimeout(() => {
        el.style.opacity = "0";
        el.style.visibility = "hidden";
        el.style.pointerEvents = "none";
        
        // Remove from DOM after fade out transition (0.6s)
        setTimeout(() => {
          el.remove();
          document.body.style.overflow = "";
        }, 600);
      }, 400);
    };

    if (document.readyState === "complete" || document.readyState === "interactive") {
      dismiss();
    } else {
      window.addEventListener("DOMContentLoaded", dismiss);
      window.addEventListener("load", dismiss);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("DOMContentLoaded", dismiss);
      window.removeEventListener("load", dismiss);
    };
  }, []);

  // Return nothing — the HTML is statically rendered in layout.js so it shows instantly.
  // This component only handles fading it out and removing it safely after React hydrates.
  return null;
}
