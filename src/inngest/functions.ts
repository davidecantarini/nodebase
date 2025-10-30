import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world", retries: 0},
  { event: "test/hello.world" },
  async ({ event, step }) => {

    //fetching the video
    await step.sleep("fetching", "5s");

    //transcribing the video
    await step.sleep("transcribing", "5s");

    //Sending transcription to AI 
    await step.sleep("sending", "5s");

    await step.run("create-workflow", () => {
        return prisma.workflows.create({
            data: {
                name: "workflow-from-inngest",
            },
        });
    });
  },
);