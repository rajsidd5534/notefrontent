import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://e2c5f13f6c17b902451f67c5626717ef@o4509961722986496.ingest.de.sentry.io/4509961724952656",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

const container = document.getElementById(“app”);
const root = createRoot(container);
root.render(<App />);