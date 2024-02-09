// https://www.npmjs.com/package/@sentry/vercel-edge
import * as Sentry from "@sentry/vercel-edge";

export const config = {
  runtime: "edge",
};

function sortByNameAsc(a, b) {
  if (a.name.charAt(0) < b.name.charAt(0)) {
    return -1;
  }

  if (a.name.charAt(0) > b.name.charAt(0)) {
    return 1;
  }

  return 0;
}

// NOT cached by default: https://vercel.com/docs/edge-network/caching

export default async function handler() {
  const startTime = Date.now();
  Sentry.init({
    dsn: "https://db6121e8bd7e232482b48a01223b855d@o4505635661873152.ingest.sentry.io/4506717174824960",
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
  });

  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
    );

    const data = await response.json();
    const sorted = data.results.sort(sortByNameAsc);
    const endTime = Date.now();
    const timeToExecute = endTime - startTime + "ms";
    return new Response(
      `Vercel edge function, with Sentry. \n\nTime to execute: ${timeToExecute}.`,
    );
  } catch (error) {
    Sentry.captureException(error);
    return new Response(error);
  }
}
