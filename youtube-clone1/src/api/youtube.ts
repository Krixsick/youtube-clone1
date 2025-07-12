import axios from "axios";
import { type VideoSnippet, type SearchResult } from "../types/youtube";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = import.meta.env.VITE_YOUTUBE_KEY;

//Videos
export async function getVideos(): Promise<SearchResult[]> {
  const response = await axios.get<{ items: SearchResult[] }>(
    `${BASE_URL}/search`,
    {
      params: {
        part: "snippet",
        maxResults: 25,
        q: "cats",
        type: "video",
        key: API_KEY, // your real key here
      },
    }
  );
  return response.data.items;
}

//Getting Views

export async function getVideosViews(
  ids: string
): Promise<Array<{ id: string; statistics: { viewCount: string } }>> {
  const response = await axios.get<{
    items: Array<{ id: string; statistics: { viewCount: string } }>;
  }>(`${BASE_URL}/videos`, {
    params: {
      part: "statistics",
      id: ids,
      key: API_KEY,
    },
  });
  return response.data.items;
}
