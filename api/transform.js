// api/transform.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { image, model } = req.body;

  if (!image || !model) {
    return res.status(400).json({ error: "Missing image or model" });
  }

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

    const json = await replicateResponse.json();
    res.status(200).json(json);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

