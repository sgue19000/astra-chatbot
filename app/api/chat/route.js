import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(req) {
  const { messages } = await req.json();

  const client = new OpenAI({
    baseURL: "https://api.experientiallabs.ai/v1",
    apiKey: process.env.EXPLABS_API_KEY,
  });

  const stream = await client.chat.completions.create({
    model: "gpt-6-astra",
    stream: true,
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const token = chunk.choices?.[0]?.delta?.content || "";
          if (token) controller.enqueue(encoder.encode(token));
        }
      } catch (err) {
        controller.enqueue(encoder.encode(`\n[error] ${err.message}`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
