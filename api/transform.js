try {
  const replicateResponse = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: "replicate-model-version-id",
      input: { image }
    })
  });

  if (replicateResponse.status === 429) {
    // Trop de requêtes
    return res.status(429).json({ error: "Too many requests, please wait and try again." });
  }

  if (!replicateResponse.ok) {
    // Autres erreurs HTTP
    const errorDetails = await replicateResponse.text();
    return res.status(replicateResponse.status).json({ error: errorDetails });
  }

  const json = await replicateResponse.json();
  res.status(200).json(json);
} catch (error) {
  res.status(500).json({ error: error.message });
}
