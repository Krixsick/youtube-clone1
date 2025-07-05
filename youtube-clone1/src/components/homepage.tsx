import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetVideos, useGetVideosViews } from "../queries/youtube";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import "../assets/homepage.css";
function formatViews(count: string | number | undefined): string {
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

export default function homepage() {
  const { data: videos = [], isLoading, isError } = useGetVideos();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  //Getting Youtube video views
  const ids = videos.length ? videos.map((v) => v.id.videoId).join(",") : "";
  const { data: stats = [] } = useGetVideosViews(ids);
  const viewsById = useMemo(() => {
    const map = new Map<string, string>();
    stats.forEach((item) => {
      map.set(item.id, item.statistics.viewCount);
    });
    return map;
  }, [stats]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error...</div>;
  }
  //        bg-blue-100 flex flex-col justify-center items-center   <p className="font-medium">{video.snippet.title}</p>

  return isMobile ? (
    <div className="w-full h-full bg-black flex flex-col justify-center items-center">
      {videos.map((video) => {
        const vid = video.id.videoId;
        return (
          <div
            key={video.id.videoId}
            className="mt-[5%] w-[90%] video-container cursor-pointer"
            onClick={() => navigate({ to: `/video/${vid}` })}
          >
            {/* Video Thumbnail */}
            <div className="w-full video-thumbnail-container rounded-2xl">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-full object-contain"
              />
            </div>
            {/* Video Information */}
            <div className="w-full h-[20%] flex mt-[5px]">
              {/* Left Side*/}
              <div className="h-full w-[15%] flex items-start justify-center">
                <div className="bg-white rounded-[50%] channel-profile mt-[5px]"></div>
              </div>
              {/* Right Side*/}
              <div className="w-[85%] h-full flex flex-col justify-start">
                <p className="text-white video-title">{video.snippet.title}</p>
                <p className="text-[#aaa] video-subtitles">
                  {video.snippet.channelTitle}
                </p>
                <div className="w-full flex gap-[5px]">
                  <p className="text-[#aaa] video-subtitles">
                    {formatViews(viewsById.get(vid) ?? "No")} •
                  </p>
                  <p className="text-[#aaa] video-subtitles">
                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {/* <p>{video.snippet.title}</p>
              <p>{video.snippet.description}</p>
              <p>{formatViews(viewsById.get(vid) ?? "0")} views</p>
              <p>{new Date(video.snippet.publishedAt).toLocaleDateString()}</p> */}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p>w</p>
  );
}
