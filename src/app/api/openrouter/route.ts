import { NextRequest, NextResponse } from "next/server";
import { config } from "dotenv";

config();

export async function POST(req: NextRequest) {
  const { prompt, model, max_length = 512, temperature = 0.7, top_p = 0.9, do_sample = true } = await req.json();
  if (!prompt || !model) {
    return NextResponse.json({ error: "Prompt and model are required" }, { status: 400 });
  }
  
  try {
    // Use the dedicated Railway Gemma URL if available
    const railwayUrl = process.env.RAILWAY_GEMMA_URL;
    
    if (!railwayUrl) {
      return NextResponse.json({ error: "Railway model URL not configured" }, { status: 500 });
    }
    
    console.log(`Sending request to Railway endpoint: ${railwayUrl}/generate`);
    
    const response = await fetch(`${railwayUrl}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        prompt, 
        max_length, 
        temperature, 
        top_p, 
        do_sample 
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Railway API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json({ 
      output: data.generated_text || "No response", 
      processing_time: data.processing_time || 0,
      model: "railway-gemma-2b"
    });
  } catch (error) {
    console.error('Railway API request failed:', error);
    return NextResponse.json({ 
      error: "Failed to generate from Railway model", 
      message: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}