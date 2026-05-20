import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface SEOHistoryItem {
  id: number;
  topic: string;
  provider: string;
  created_at: string;
}

export interface SEOStats {
  total_generations: number;
  unique_topics: number;
  latest_generation_at: string | null;
  providers: string[];
}

export interface SEOGeneration {
  id: number;
  topic: string;
  content: string;
  provider: string;
  created_at: string;
}

export async function getSEOStats(): Promise<SEOStats> {
  const response = await api.get("/seo/stats");
  return response.data;
}

export async function getSEOHistory(): Promise<SEOHistoryItem[]> {
  const response = await api.get("/seo/history");
  return response.data;
}

export async function getSEOGeneration(
  id: number
): Promise<SEOGeneration> {
  const response = await api.get(`/seo/${id}`);
  return response.data;
}

export async function generateSEO(topic: string) {
  const response = await api.post("/seo/generate", { topic });
  return response.data;
}