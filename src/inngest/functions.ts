import prisma from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';


const google = createGoogleGenerativeAI()
const openai = createOpenAI();
const anthropic = createAnthropic();



export const execute = inngest.
createFunction(
  { id: "execute-ai"},
  { event: "execute/ai" },
  async ({ event, step }) => {
    
    await step.sleep("pretend", "5s");

    console.warn("Something is missing");
    console.error("This is an error I want to track");
    
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text", 
      generateText, 
      {
      system: "you are a helpful assistant",
      prompt: "what is 2 + 2",
      model: google("gemini-2.5-flash"),
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    }
  );

    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generate-text", 
      generateText, 
      {
      system: "you are a helpful assistant",
      prompt: "what is 2 + 2",
      model: openai("gpt-4"),
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    }
  );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text", 
      generateText, 
      {
      system: "you are a helpful assistant",
      prompt: "what is 2 + 2",
      model: anthropic("claude-sonnet-4-0"),
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    }
  );

  return {
    geminiSteps,
    openaiSteps,
    anthropicSteps
  };
  },
);