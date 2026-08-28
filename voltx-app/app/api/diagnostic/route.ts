import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/diagnostic — Process diagnostic answers
 * Returns scored product recommendations
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { industry, teamSize, currentTools, devices, concerns, hadIncident } = body;

    // In production, this would:
    // 1. Analyze answers against product_problem_fit table
    // 2. Score products based on how well they match the user's profile
    // 3. Return ranked recommendations
    //
    // For now, return a simple acknowledgment
    // (the client-side result page handles display with seed data)

    return NextResponse.json({
      success: true,
      message: "Diagnostic processed",
      // Don't return product recommendations here in the mock —
      // the result page pulls from seed data directly
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
