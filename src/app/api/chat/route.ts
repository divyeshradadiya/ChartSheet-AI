import { NextRequest, NextResponse } from "next/server";
import { ZypherAgent } from "@/lib/zypherAgent";

export async function POST(request: NextRequest) {
  try {
    const { messages, csvContent } = await request.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY not configured" },
        { status: 500 }
      );
    }

    const agent = new ZypherAgent(apiKey, "anthropic/claude-3.5-sonnet");

    if (csvContent) {
      agent.setCSVData(csvContent);
    }

    const result = await agent.runTask(messages, csvContent);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
