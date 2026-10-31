export type ClassUpdateType = "Class Delayed" | "Class Cancelled" | "Room Changed" | "Extra Class" | "Schedule Changed" | "General Class Information";
export type ClassUpdate = {
  id: string; version: number; code: string; type: ClassUpdateType; detail: string; note: string;
  time: string; color: string; emoji: string; status: "published" | "archived";
};
export const appearance: Record<ClassUpdateType, { color: string; emoji: string }> = {
  "Class Delayed": { color: "#F59E0B", emoji: "⚠️" },
  "Class Cancelled": { color: "#EF4444", emoji: "❌" },
  "Room Changed": { color: "#3B82F6", emoji: "📍" },
  "Extra Class": { color: "#10B981", emoji: "📅" },
  "Schedule Changed": { color: "#8B5CF6", emoji: "📅" },
  "General Class Information": { color: "#64748B", emoji: "📢" },
};
