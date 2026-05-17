"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // In development, unregister all SWs and clear caches so hot reload works correctly
    if (process.env.NODE_ENV === "development") {
      navigator.serviceWorker.getRegistrations().then((registrations) =>
        Promise.all(registrations.map((r) => r.unregister()))
      );
      if ("caches" in window) {
        caches.keys().then((names) => Promise.all(names.map((n) => caches.delete(n))));
      }
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch((err) =>
      console.warn("SW registration failed:", err)
    );
  }, []);

  return null;
}
