import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import parse from "html-react-parser";
import { ImageComponent } from "../components/ImageComponent";
import ReadingCalendar from "../components/ReadingCalendar";
import NewsLetter from "../components/NewsLetter";
import YouTubeEmbed from "../components/YoutubeEmbed";
import ContactDetails from "../components/ContactDetails";

const url = import.meta.env.VITE_API_URL;

export type Reading = {
  readingHeading: string;
  readingContent: string;
  readingImages: string[];
};

const Homepage = () => {
  // const date = new Date();
  const [todayReading, setTodayReading] = useState<Reading>({
    readingContent: "",
    readingImages: [],
    readingHeading: "",
  });
  // const formattedDate = date.toLocaleDateString("en-IN", {
  //   day: "numeric",
  //   month: "long",
  //   year: "numeric",
  // });

  const fetchLatestReading = async () => {
    const response = await axios.get(url + "/latest-reading");
    delete response.data._id;
    delete response.data.createdAt;
    delete response.data.updatedAt;
    delete response.data.__v;
    setTodayReading(response.data);
    return response.data;
  };

  const { isLoading, error, isFetching } = useQuery({
    queryKey: ["fetchLatestReading"],
    queryFn: fetchLatestReading,
  });

  if (isLoading || isFetching) {
    return (
      <section className="min-h-[81vh] md:min-h-[80vh] bg-secondary p-2 md:p-8">
        <h3>Loading...</h3>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-[81vh] md:min-h-[80vh] bg-secondary p-2 md:p-8">
        <h3>Error happened.</h3>
      </section>
    );
  }

  return (
    <>
      <section className="min-h-[81vh] md:min-h-[80vh] bg-secondary p-2 md:p-8 space-y-3">
        {/* <h1 className="font-bold">Today's Mass Reading - {formattedDate}</h1> */}
        <h3 className="font-semibold text-center">
          {todayReading.readingHeading}
        </h3>
        <div className="flex flex-col md:flex-row md:gap-5">
          {todayReading.readingImages.length !== 0 && (
            <div className="md:flex-[3]">
              <ImageComponent
                images={todayReading.readingImages}
                className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:items-start"
                imageClass="w-full h-full object-cover"
              />
              <div className="md:mt-2 space-y-2 text-center">
                {parse(todayReading.readingContent)}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3 md:flex-[1]">
            <ReadingCalendar />
            <NewsLetter />
            <YouTubeEmbed shareUrl="https://youtu.be/XIhJXkscbBA?si=Oud58brnE1szKHS6" />
          </div>
        </div>
      </section>
      <ContactDetails />
    </>
  );
};

export default Homepage;
