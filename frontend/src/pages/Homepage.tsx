import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import parse from "html-react-parser";
import { ImageComponent } from "../components/ImageComponent";

const url = import.meta.env.VITE_API_URL;

export type Reading = {
  readingHeading: string;
  readingContent: string;
  readingImages: string[];
};

const Homepage = () => {
  const date = new Date();
  const [todayReading, setTodayReading] = useState<Reading>({
    readingContent: "",
    readingImages: [],
    readingHeading: "",
  });
  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
    <section className="min-h-[81vh] md:min-h-[80vh] bg-secondary p-2 md:p-8 space-y-3">
      <h1 className="text-2xl font-bold">
        Today's Mass Reading - {formattedDate}
      </h1>
      <h3 className="text-xl font-semibold text-center">
        {todayReading.readingHeading}
      </h3>
      {todayReading.readingImages.length !== 0 && (
        <ImageComponent images={todayReading.readingImages} />
      )}
      <div className="md:mt-2 space-y-2 text-center">
        {todayReading.readingContent}
      </div>
    </section>
  );
};

export default Homepage;
