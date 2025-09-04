import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./style.css";

// Sentry for error tracking
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// Initialize Sentry only if NOT running in a browser extension
if (!window.chrome || !window.chrome.runtime) {
  Sentry.init({
    dsn: "your-dsn-here", // replace with your Sentry DSN
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0, // reduce in production
  });
}

// Render the React app
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
