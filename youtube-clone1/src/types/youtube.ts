export interface VideoSnippet {
  publishedAt: string;
  title: string;
  description: string;
  channelId: string;
  channelTitle: string;
  thumbnails: { medium: { url: string } };
}

export interface SearchResult {
  id: { videoId: string };
  snippet: VideoSnippet;
}
