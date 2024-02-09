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
  const startTime = performance.now();

  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
    );

    const data = await response.json();
    const sorted = data.results.sort(sortByNameAsc);
    const endTime = performance.now();
    const timeToExecute = endTime - startTime;
    res.status(200).json({
      message: `Vercel serverless function, no error monitoring. Time to execute: ${timeToExecute}.`,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
}
