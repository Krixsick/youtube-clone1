import { useMemo } from "react";
import { useGetVideosViews } from "../queries/youtube";
import type { SearchResult } from "../types/youtube";

export function viewsByVideo(list_of_videos: SearchResult[]) {
  const ids = list_of_videos.length
    ? list_of_videos.map((v) => v.id.videoId).join(",")
    : "";
  const { data: stats = [] } = useGetVideosViews(ids);

  const viewsById = useMemo(() => {
    const map = new Map<string, string>();
    stats.forEach((item) => {
      map.set(item.id, item.statistics.viewCount);
    });
    return map;
  }, [stats]);

  return viewsById;
}

export function formatViews(count: string | number | undefined): string {
  const num = typeof count === "string" ? parseInt(count, 10) : (count ?? 0);
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

export function checkTitleLength(title: string): string {
  return title.length > 50 ? title.slice(0, 50) + " ..." : title;
}
