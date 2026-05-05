import { OpenRouter } from '@openrouter/sdk';
import { ApiResponse } from '@/types/ApiResponse';

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const fallbackSuggestions = [
  "What's a hobby you've always wanted to pick up but never did?",
  "If you could have dinner with any historical figure, who would it be?",
  "What's a simple thing that makes you happy?",
];

const openRouterModel = "openrouter/free";

export async function POST() {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      console.warn("OPENROUTER_API_KEY is missing. Returning fallback suggestions.");
      return Response.json(
        {
          success: false,
          message: "OPENROUTER_API_KEY is missing",
          data: { suggestions: fallbackSuggestions },
        } as ApiResponse,
        { status: 200 }
      );
    }

    const prompt = "Create a list of three open-ended, engaging questions formatted as a single string. Separate each question with '||'. These questions are for an anonymous social messaging platform and should be suitable for a diverse audience. Avoid personal or sensitive topics and focus on universal, friendly themes.";

    const stream = await openrouter.chat.send({
      model: openRouterModel,
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    let responseText = "";

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;

      if (typeof content === "string") {
        responseText += content;
      }

      if (chunk.usage) {
        const usage = chunk.usage as { reasoningTokens?: number };
        console.log("Reasoning tokens:", usage.reasoningTokens);
      }
    }

    const suggestions = responseText
      .split("||")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 3);

    if (suggestions.length === 0) {
      console.warn(`${openRouterModel} returned no usable suggestions. Returning fallback suggestions.`);
    }

    const payload = {
      suggestions: suggestions.length > 0 ? suggestions : fallbackSuggestions,
    };

    return Response.json({ success: true, data: payload } as ApiResponse, {
      status: 200,
    });
  } catch (error) {
    console.error("Error processing suggestion request:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to generate suggestions",
        data: { suggestions: fallbackSuggestions },
      } as ApiResponse,
      { status: 200 }
    );
  }
}