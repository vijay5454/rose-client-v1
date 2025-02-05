import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Testimony } from "./TestimoniesUploadPage";

const url = import.meta.env.VITE_API_URL;

function TestimonyEditPage() {
  const fetchAllTestimonies = async () => {
    const response = await axios.get(url + "/testimonies");
    return response.data;
  };

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["fetchAllTestimonies"],
    queryFn: fetchAllTestimonies,
  });

  if (error) {
    return (
      <div className="py-4 md:max-w-[80%] mx-auto">
        <h1>Error happened. Sorry for inconvenience.</h1>
      </div>
    );
  }
  return (
    <div className="py-4 md:max-w-[80%] mx-auto">
      <h1 className="text-2xl text-center">
        List of Testimonies to Edit/Delete
      </h1>
      <hr className="m-2" />
      <Link to="/">
        <ArrowLeft />
      </Link>
      <p className="text-center">
        (Note: Select any below testimony to edit/delete)
      </p>
      <div className="mt-4">
        <h3 className="px-3 text-xl">List of Testimonies:</h3>
        <div className="px-2 underline mt-2">
          {isLoading || isFetching
            ? "Loading..."
            : data?.map((eachTestimony: Testimony, index: number) => {
                return (
                  <li key={index}>
                    <Link to={`/testimony-edit/${eachTestimony._id}`}>
                      {eachTestimony.testimoniesHeading}
                    </Link>
                  </li>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export function EditTestimony() {
  //Getting Params from the url
  const { id } = useParams();
  //State to hold single prayer for edit/delete.
  const [singleTestimonyPayload, setSingleTestimonyPayload] =
    useState<Testimony>({
      _id: "",
      testimoniesContent: "",
      testimoniesHeading: "",
      testimoniesURL: [],
    });
  const navigate = useNavigate();

  const { error } = useQuery({
    queryKey: ["fetchTestimonyById"],
    queryFn: async () => {
      const response = await axios.get(url + "/testimonies/" + id);
      return response.data;
    },
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setSingleTestimonyPayload(data);
    },
  });

  const editTestimony = useMutation({
    mutationFn: async (payload: Testimony) => {
      const response = await axios.put(
        url + "/testimonies/update/" + id,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      navigate("/testimony-edit");
    },
  });
  const deleteTestimony = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(url + "/testimonies/" + id);
      return response.data;
    },
    onSuccess: () => {
      navigate("/testimony-edit");
    },
  });

  // const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     setSingleTestimonyPayload((prevValue: Testimony) => {
  //       return { ...prevValue, testimoniesURL: Array.from(files) };
  //     });
  //   }
  // };

  const handleTestimonySubmit = async () => {
    if (
      singleTestimonyPayload.testimoniesHeading === "" ||
      singleTestimonyPayload.testimoniesContent === "" ||
      singleTestimonyPayload.testimoniesURL.length === 0
    ) {
      alert(
        "Please give Testimony heading, Testimony content and Testimony URL."
      );
      return;
    }
    //Setting up payload using local payload state
    const payload = {
      testimoniesHeading: singleTestimonyPayload.testimoniesHeading,
      testimoniesContent: singleTestimonyPayload.testimoniesContent,
      testimoniesURL: singleTestimonyPayload.testimoniesURL,
    };
    editTestimony.mutate(payload);
  };

  const handleDeleteTestimony = async () => {
    deleteTestimony.mutate();
  };
  if (error) {
    return <div>Error Happened</div>;
  }
  return (
    <div className="max-w-[90%] mx-auto py-5 md:py-12">
      <h1 className="text-xl md:text-2xl text-center">Edit/Delete Prayer</h1>
      <hr className="my-3 md:mb-10" />
      <div className="flex flex-col gap-4 md:max-w-[60%] mx-auto">
        <input
          type="text"
          value={singleTestimonyPayload.testimoniesHeading}
          onChange={(e) => {
            setSingleTestimonyPayload((prevValue: Testimony) => {
              return { ...prevValue, testimoniesHeading: e.target.value };
            });
          }}
          className="border-gray-300 border-2 rounded-md focus:border-gray-600 outline-none p-2"
          placeholder="Enter Testimony Heading"
        />
        <textarea
          rows={15}
          value={singleTestimonyPayload.testimoniesContent}
          onChange={(e) => {
            setSingleTestimonyPayload((prevValue: Testimony) => {
              return { ...prevValue, testimoniesContent: e.target.value };
            });
          }}
          className="border-gray-300 border-2 rounded-md focus:border-gray-600 outline-none p-2"
          placeholder="Enter Testimony content"
        />
        {/* <div className="flex flex-col">
          <label htmlFor="prayer-image" className="font-semibold">
            Choose images for prayer
          </label>
          <input
            type="file"
            id="prayer-image"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
          />
        </div> */}
        <input
          type="text"
          value={singleTestimonyPayload.testimoniesURL[0]}
          onChange={(e) => {
            setSingleTestimonyPayload((prevValue: Testimony) => {
              const tempArr = [e.target.value];
              return { ...prevValue, testimoniesURL: tempArr };
            });
          }}
          className="border-gray-300 border-2 rounded-md focus:border-gray-600 outline-none p-2"
          placeholder="Enter Youtube URL"
        />
      </div>
      <div className="text-center mt-4 space-x-4">
        <Link to="/testimony-edit">
          <button className="bg-gray-500 py-2 px-4 rounded-md text-white">
            Go back
          </button>
        </Link>
        <button
          className="bg-gray-500 py-2 px-4 rounded-md text-white hover:bg-gray-300 hover:text-black disabled:bg-gray-300 disabled:text-black"
          onClick={handleTestimonySubmit}
          disabled={editTestimony.isLoading}
        >
          Submit
        </button>
        <button
          className="bg-red-500 py-2 px-4 rounded-md text-white hover:bg-red-300 hover:text-black disabled:bg-red-300 disabled:text-black"
          onClick={handleDeleteTestimony}
          disabled={deleteTestimony.isLoading}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TestimonyEditPage;
