import { Metadata } from "next";
import { RoomEditLoader } from "@/features/rooms/RoomEditLoader/RoomEditLoader";

export const metadata: Metadata = {
  title: "Create room in Jeex",
  description: "...Description",
};

export default function CreateRoomPage() {
  return <RoomEditLoader />;
}
