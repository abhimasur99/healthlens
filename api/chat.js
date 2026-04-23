export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      await notify(`HealthLens API error ${response.status}: ${data?.error?.message || "unknown"}`);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    await notify(`HealthLens proxy error: ${err.message}`);
    return res.status(500).json({ error: "proxy_error" });
  }
}

async function notify(message) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) return;
  try {
    await fetch(`https://ntfy.sh/${topic}`, { method: "POST", body: message });
  } catch {
    // notification failure must never break the response
  }
}
