import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/click/[productId] — Log affiliate click
 * Records click data for analytics
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const body = await request.json();
    const { locale, page_slug, placement } = body;

    // Generate session ID from request headers
    const sessionId =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // In production, this would insert into affiliate_clicks table:
    // INSERT INTO affiliate_clicks (product_id, session_id, locale, page_slug, placement)
    // VALUES ($1, $2, $3, $4, $5)

    console.log("[Click Log]", {
      productId,
      sessionId: sessionId.substring(0, 8) + "...",
      locale,
      page_slug,
      placement,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
