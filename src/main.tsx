import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/sidebar-theme.css";
import { initFaviconRotation } from "./utils/faviconRotation";

console.log('[Boot] Seeksy app starting...');

// Unregister any stale service workers on boot
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    if (registrations.length > 0) {
      console.log(`[Boot] Found ${registrations.length} service worker(s), unregistering...`);
      for (const registration of registrations) {
        console.log('[Boot] Unregistering service worker:', registration.scope);
        registration.unregister();
      }
    }
  }).catch((err) => {
    console.warn('[Boot] Failed to unregister service workers:', err);
  });
}

// Initialize hourly favicon rotation
initFaviconRotation();

console.log('[Boot] Rendering React app...');
const root = document.getElementById("root")!;
createRoot(root).render(<App />);

// Wait for React to paint before revealing — prevents grey→white→grey flash
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const loader = document.getElementById("initial-loader");
    if (loader) loader.remove();
    root.classList.add("ready");
  });
});
