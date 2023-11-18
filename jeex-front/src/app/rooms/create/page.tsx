import { Metadata } from "next";
import { RoomCreateLoader } from "@/features/rooms/RoomCreateLoader/RoomCreateLoader";

export const metadata: Metadata = {
  title: "Create room in Jeex",
  description: "...Description",
};

export default function CreateRoomPage() {
  return <RoomCreateLoader />;
}
