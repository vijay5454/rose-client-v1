import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router";

export type Testimony = {
  _id: string;
  testimoniesHeading: string;
  testimoniesContent: string;
  testimoniesURL: string[];
};

interface ErrorResponse {
  message: string;
}

const url = import.meta.env.VITE_API_URL;

const Testimony = () => {
  const [testimonies, setTestimonies] = useState<Testimony[]>([
    {
      _id: "",
      testimoniesContent: "",
      testimoniesHeading: "",
      testimoniesURL: [],
    },
  ]);

  const fetchAllTestimonies = async () => {
    const response = await axios.get(url + "/testimonies");
    setTestimonies(response.data);
    return response.data;
  };

  const { isLoading, error, isFetching } = useQuery<Testimony[], AxiosError>({
    queryKey: ["fetchAllTestimonies"],
    queryFn: fetchAllTestimonies,
  });

  if (isLoading || isFetching) {
    return (
      <section className="min-h-[81vh] md:min-h-[80vh] bg-secondary p-2 md:p-8">
        <h3>Loading...</h3>
      </section>
    );
  }

  const errorResponse = (error?.response?.data as ErrorResponse)?.message;

  if (errorResponse === "No testimonies found!") {
    return (
      <section className="min-h-[81vh] md:min-h-[80vh] bg-secondary p-2 md:p-8">
        <h3>No testimonies Found!</h3>
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
      <h1 className="font-semibold text-center">Testimonies</h1>
      {/* <div className="md:max-w-[80%] md:mx-auto mt-3 space-y-3">
        {testimonies.map((eachTestimony: Testimony) => {
          return (
            <>
              <h3 className="text-xl font-semibold">
                {eachTestimony.testimoniesHeading}
              </h3>
              {eachTestimony.testimoniesURL[0] && (
                <YouTubeEmbed shareUrl={eachTestimony.testimoniesURL[0]} />
              )}
              {eachTestimony.testimoniesContent && (
                <div>{parse(eachTestimony.testimoniesContent)}</div>
              )}
            </>
          );
        })}
      </div> */}
      <div className="p-3 md:p-6 md:max-w-[50%] flex flex-col gap-2">
        {testimonies.map((eachTestimony, index) => {
          return (
            <Link to={`/testimonies/${eachTestimony._id}`} key={index}>
              <li className="underline">{eachTestimony.testimoniesHeading}</li>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export const EachTestimony = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <section className="min-h-[81vh] md:min-h-[80vh] bg-secondary p-2 md:p-8">
      <h3>Each Testimony</h3>
    </section>
  );
};

export default Testimony;
