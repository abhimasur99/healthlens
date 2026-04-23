import { buildPatientPrompt } from "./prompts.js";

const MODEL       = "claude-sonnet-4-6";
const MAX_TOKENS  = 600;
const TEMPERATURE = 0.2;

export async function sendMessage(messages, day, d) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      temperature: TEMPERATURE,
      system: [
        {
          type: "text",
          text: buildPatientPrompt(day, d),
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: messages
        .filter((m) => m.role !== "system")
        .map((m) => ({ role: m.role, content: m.text })),
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    if (res.status === 429) throw new Error("rate_limit");
    throw new Error("api_error");
  }

  return json.content?.find((b) => b.type === "text")?.text ?? null;
}
