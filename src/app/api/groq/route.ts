import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "You are an AI assignment helper. Explain answers simply with steps and examples.",
            },
            {
              role: "user",
              content: question,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json({
      answer: data.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        answer: "Groq AI error occurred",
      },
      {
        status: 500,
      }
    );
  }
}