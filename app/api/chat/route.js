
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY missing" }, { status: 500 });
    }

    const { message } = await req.json();
    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // free + fast
      messages: [{ role: "user", content: message }],
    });

    return NextResponse.json({
      response: completion.choices?.[0]?.message?.content ?? "",
    });
  } catch (error) {
    console.error("🔥 /api/chat error:", error);
    return NextResponse.json(
      { error: error.message || "Internal error" },
      { status: 500 }
    );
  }
}
