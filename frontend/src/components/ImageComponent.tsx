export const ImageComponent = (props: { images: string[] }) => {
  const images = props.images;
  return images.map((eachImage, index) => {
    return (
      <div
        key={index}
        className="mb-4 rounded-md overflow-hidden mx-auto md:w-[50%]"
      >
        <img
          src={eachImage}
          alt="prayerImages"
          className="w-full h-full object-cover"
        />
      </div>
    );
  });
};
