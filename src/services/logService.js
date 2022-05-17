// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";

function init() {
  // Sentry.init({
  //   dsn: "https://9289e7a984ff4caba711bf56f12a8ed6@o1230614.ingest.sentry.io/6377437",
  //   integrations: [new BrowserTracing()],
  //   tracesSampleRate: 1.0,
  // });
}

function log(error) {
  console.log(error);
  // Sentry.captureException(error);
}

export default {
  init,
  log,
};
