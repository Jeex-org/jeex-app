import { Metadata } from "next";
import { MeetingGenerator } from "@/features/meeting/MeetingGenerator/MeetingGenerator";

export const metadata: Metadata = {
  title: "Jeex room",
  description: "...Description",
};

export default function RoomCallPage() {
  return <MeetingGenerator />;
}
