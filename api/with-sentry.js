import * as Sentry from "@sentry/node";

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

export default async function handler(req, res) {
  console.log("Starting with-sentry");

  const startTime = performance.now();
  Sentry.init({
    dsn: "https://db6121e8bd7e232482b48a01223b855d@o4505635661873152.ingest.sentry.io/4506717174824960",
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
  });

  try {
    console.log("in the try");
    if (Sentry !== undefined) {
      console.log("SENTRY NOT UNDEFINED");
    }

    const response = await fetch(
      "https://pokeapi.c/api/v2/pokemon?limit=100000&offset=0",
    );

    const data = await response.json();
    const sorted = data.results.sort(sortByNameAsc);
    const endTime = performance.now();
    const timeToExecute = endTime - startTime;
    res.status(200).json({
      message: `Vercel serverless function, with Sentry. Time to execute: ${timeToExecute}.`,
    });
  } catch (error) {
    Sentry.captureException(error);
    return new Response(error);
  }
}
