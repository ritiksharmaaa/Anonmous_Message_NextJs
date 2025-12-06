import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const prompt = "create a liost of three open-ended and engagin question formattd as a single string. Each question houl be separated by '||'. These questions are for an amonmymous social messaging platform , like Qooh.me, and should be suitable for a diverse audience. Avoid personla or senstive topics, forcusing instead on universal themes that encourage friendly interaction . For example, your outpur should be structurred like this: 'What is a hobby you've and historical figure, who wuld it be?|| what's a simple thing that makes you happy?. Ensure the questions are intriguing foster curiosity, and ontribure to a positive and welcoming conversational environment."
    const { messages }: { messages: UIMessage[] } = await req.json();
    

  const result = streamText({
    model: openai("gpt-4.1"),
    messages: convertToModelMessages(messages,),
    system : prompt
  });

  return result.toUIMessageStreamResponse();
  } catch (error) {
    // log the we have get the different type of error     
    console.error('Error processing request:', error);
    throw error;
  }
}