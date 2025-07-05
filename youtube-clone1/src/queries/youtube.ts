import { useQuery } from "@tanstack/react-query";
import { getVideos, getVideosViews } from "../api/youtube";

export function useGetVideos() {
  return useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
    staleTime: 1000 * 60 * 5, // data stays fresh for 5 min
    refetchOnWindowFocus: false, // don’t refetch on tab focus
    refetchOnMount: false, // don’t refetch on remount when fresh
    refetchOnReconnect: false, // don’t refetch on reconnect
    retry: 1, // only retry once on failure
  });
}

// Hook to fetch view counts
export function useGetVideosViews(ids: string) {
  return useQuery({
    queryKey: ["videos", "views", ids],
    queryFn: () => getVideosViews(ids),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
  });
}
