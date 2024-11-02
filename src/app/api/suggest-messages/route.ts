import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Use fetch to call the OpenAI API directly for streaming
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      stream: true,
      messages,
    }),
  });

  // Pass the streaming response directly back to the client
  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
}
