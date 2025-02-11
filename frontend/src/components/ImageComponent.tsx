export const ImageComponent = (props: {
  images: string[];
  children?: React.ReactNode;
  className?: string;
  imageClass?: string;
}) => {
  const finalClass =
    props.className || "mb-4 rounded-md overflow-hidden mx-auto md:w-[50%]";
  const images = props.images;
  return images.map((eachImage, index) => {
    return (
      <div key={index} className={finalClass}>
        <img
          src={eachImage}
          alt="prayerImages"
          className={props.imageClass || "w-full h-full object-cover"}
        />
        {props.children}
      </div>
    );
  });
};
