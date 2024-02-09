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

  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
    );

    const data = await response.json();
    const sorted = data.results.sort(sortByNameAsc);
    const endTime = Date.now();
    const timeToExecute = endTime - startTime + "ms";
    return new Response(
      `Vercel edge function, no error monitoring. \n\nTime to execute: ${timeToExecute}.`,
    );
  } catch (error) {
    return new Response(error);
  }
}
