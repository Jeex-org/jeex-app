import { Room, RoomServiceClient } from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";
import { environments } from "@/features/livekit/constants";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name") || "New Room";
  const emptyTimeout = req.nextUrl.searchParams.get("empty-timeout") || 10 * 60; // 10 minutes
  const maxParticipants =
    req.nextUrl.searchParams.get("max-participants") || 20;

  const { apiKey, apiSecret, wsUrl } = environments;

  if (!apiKey || !apiSecret || !wsUrl) {
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  const roomService = new RoomServiceClient(wsUrl, apiKey, apiSecret);

  const newRoom = await roomService.createRoom({
    name,
    emptyTimeout: Number(emptyTimeout),
    maxParticipants: Number(maxParticipants),
  });

  return NextResponse.json(newRoom);
}
