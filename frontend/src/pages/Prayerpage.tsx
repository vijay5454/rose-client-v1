import { Link, useParams } from "react-router";
// import { prayersData } from "../data/prayers";
import parse from "html-react-parser";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ImageComponent } from "../components/ImageComponent";

type Prayer = {
  _id: string;
  prayerHeading: string;
  prayerContent: string;
  prayerImages: string[];
  __v: number;
};
const url = import.meta.env.VITE_API_URL;

const Prayerpage = () => {
  const [prayersData, setPrayersData] = useState<Prayer[]>([]);
  const fetchAllPrayers = async () => {
    const response = await axios.get(url + "/prayers");
    setPrayersData(response.data);
    return response.data;
  };

  const { isLoading, error, isFetching } = useQuery({
    queryKey: ["fetchAllPrayers"],
    queryFn: fetchAllPrayers,
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
    <section className="min-h-[81vh] md:min-h-[80vh] bg-secondary p-2 pb-20 md:p-8">
      <h1 className="font-semibold py-2 text-center">Prayer List</h1>
      {prayersData.length === 0 ? (
        <h1>No Prayers Found!</h1>
      ) : (
        <div className="p-3 md:p-6 md:max-w-[50%] flex flex-col gap-2">
          {prayersData.map((eachPrayerData, index) => {
            return (
              <Link to={`/prayers/${eachPrayerData._id}`} key={index}>
                <li className="underline">{eachPrayerData.prayerHeading}</li>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export const EachPrayer = () => {
  const { id } = useParams();
  const [singlePrayer, setSinglePrayer] = useState<Prayer>({
    _id: "",
    prayerContent: "",
    prayerHeading: "",
    prayerImages: [],
    __v: 0,
  });

  const fetchPrayerbyId = async () => {
    const response = await axios.get(url + "/prayers/" + id);
    return response.data;
  };

  const { isLoading, error, isFetching } = useQuery({
    queryKey: ["fetchSinglePrayer"],
    queryFn: fetchPrayerbyId,
    onSuccess: (data) => {
      setSinglePrayer(data);
    },
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
    <section className="min-h-[81vh] md:min-h-[80vh] bg-secondary p-2 md:p-8">
      <div className="md:max-w-[85%] mx-auto mb-20 md:mb-0">
        <h1 className="font-semibold py-2 text-center">
          {singlePrayer.prayerHeading}
        </h1>
        {singlePrayer.prayerImages.length !== 0 && (
          <ImageComponent images={singlePrayer.prayerImages} />
        )}
        <div className="md:mt-2 space-y-2 text-center">
          {parse(singlePrayer.prayerContent)}
        </div>
        <p className="font-semibold text-center md:mt-2">Amen.</p>
      </div>
    </section>
  );
};

export default Prayerpage;
