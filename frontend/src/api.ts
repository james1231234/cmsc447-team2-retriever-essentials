export type OverviewData = {
  academicYear: string;
  semesterLabel: string;
  totalStudents: number;
  undergraduate: number;
  graduate: number;
  eventsThisWeek: number;
  topEvents: {
    id: number;
    name: string;
    department: string;
    date: string;
    attendance: number;
    percentage: number;
  }[];
  source: "demo" | "live";
};

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3001";

export async function getOverview(): Promise<OverviewData> {
  const response = await fetch(`${API_BASE}/api/overview`);
  if (!response.ok) throw new Error("Unable to load dashboard data.");
  return response.json();
}
