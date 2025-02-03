const YouTubeEmbed = ({ shareUrl }: { shareUrl: string }) => {
  // Function to extract the YouTube video ID
  const extractVideoId = (url: string) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/live\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  // Extract the video ID from the share URL
  const videoId = extractVideoId(shareUrl); // Extract ID from "https://youtu.be/VIDEO_ID"
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  // console.log("Embed URL", embedUrl);

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
