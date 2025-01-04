const YouTubeEmbed = ({ shareUrl }: { shareUrl: string }) => {
  // Extract the video ID from the share URL
  const videoId = shareUrl.split("youtu.be/")[1]; // Extract ID from "https://youtu.be/VIDEO_ID"
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div style={{ position: "relative", paddingTop: "56.25%" }}>
      <iframe
        src={embedUrl}
        title="YouTube video"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
