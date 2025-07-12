import { useGetVideos } from "../queries/youtube";
import React from "react";
import { useState, useMemo, useEffect } from "react";
import { formatViews, viewsByVideo, checkTitleLength } from "./hooks";
export default function pcHomepage() {
  //Queries
  const { data: videos = [], isLoading, isError } = useGetVideos();
  const viewsById = viewsByVideo(videos);
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error...</div>;
  }

  //Width of screen
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  //Calculating Width, Height and columns for the cards

  const columnCount = useMemo(() => {
    if (width > 1800) return 5;
    if (width > 1400) return 4;
    if (width > 1000) return 3;
    if (width > 600) return 2;
    return 1;
  }, [width]);
  //Calculating Width, Height and columns for the cards
  const cardHeight = useMemo(() => {
    if (width < 2000) return 290;
    if (width < 3500) return 350;
    if (width < 5000) return 400;
    return 800;
  }, [width]);

  const gridWidth = useMemo(() => window.innerWidth - 32, [width]);

  const columnWidth = useMemo(
    () => gridWidth / columnCount,
    [gridWidth, columnCount]
  );
  const cardWidth = useMemo(() => columnWidth * 0.95, [columnWidth]);

  return (
    <div
      className="grid p-4 overflow-y-auto"
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        height: "100%",
      }}
    >
      {videos.map((video) => {
        const vid = video.id.videoId;
        return (
          <div
            key={video.id.videoId}
            className="rounded-2xl flex flex-col overflow-hidden"
            style={{
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
            }}
          >
            {/* Thumbnail*/}
            <div className="w-full h-full">
              <div className="w-full h-[55%] ">
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="w-full h-full rounded-2xl object-cover"
                />
              </div>
              {/* Video Information*/}
              <div className="w-full h-[25%] flex mt-[5px]">
                {/* Left Side*/}
                <div className="h-full w-[15%] flex items-start justify-center">
                  <div className="bg-white rounded-[50%] w-[50%] h-[35%] mt-[5px]"></div>
                </div>
                {/* Right Side*/}
                <div className="w-[85%] h-full flex flex-col justify-start">
                  <p className="text-white video-title">
                    {checkTitleLength(video.snippet.title)}
                  </p>
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
