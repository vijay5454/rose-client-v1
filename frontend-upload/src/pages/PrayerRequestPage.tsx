import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

type PrayerRequest = {
  name: string;
  email: string;
  prayerRequest: string;
};

const url = import.meta.env.VITE_API_URL;

const PrayerRequestPage = () => {
  const [prayerRequestList, setPrayerRequestList] = useState<PrayerRequest[]>([
    {
      name: "",
      email: "",
      prayerRequest: "",
    },
  ]);

  const fetchAllPrayerRequest = async () => {
    const response = await axios.get(url + "/prayer-requests");
    setPrayerRequestList(response.data);
    return response.data;
  };

  const { isLoading, error, isFetching } = useQuery({
    queryKey: ["fetchAllPrayerRequest"],
    queryFn: fetchAllPrayerRequest,
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
    <div className="py-4 md:max-w-[80%] mx-auto">
      <h1 className="text-2xl text-center">List of Prayer Requests</h1>
      <hr className="m-2" />
      <div className="flex flex-col gap-3">
        {prayerRequestList.map((eachPrayerRequest) => {
          return (
            <div className="px-3 py-2 rounded-md shadow-md">
              <h3 className="font-semibold">
                {eachPrayerRequest.name ? eachPrayerRequest.name : "Anonymous"}
              </h3>
              <h3 className="font-semibold">{eachPrayerRequest.email}</h3>
              <p>{eachPrayerRequest.prayerRequest}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrayerRequestPage;
