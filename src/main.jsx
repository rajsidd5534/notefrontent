import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./style.css";

// Import Sentry
import * as Sentry from "@sentry/react";

// Initialize Sentry
// Sentry.init({
//   dsn: "your-dsn-here", // replace with your actual Sentry DSN
//   integrations: [new BrowserTracing()],
//   tracesSampleRate: 0.1, // adjust for production
// });

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Sentry.ErrorBoundary fallback={"An error has occurred"}>
        <App />
      </Sentry.ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
