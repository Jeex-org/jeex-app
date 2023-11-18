import { RoomServiceClient } from "livekit-server-sdk";
import { NextResponse } from "next/server";
import { environments } from "@/features/livekit/constants";

export async function GET() {
  const { apiKey, apiSecret, wsUrl } = environments;

  if (!apiKey || !apiSecret || !wsUrl) {
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  const roomService = new RoomServiceClient(wsUrl, apiKey, apiSecret);

  const rooms = await roomService.listRooms();

  return NextResponse.json(rooms);
}
