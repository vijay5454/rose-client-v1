import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export type Testimony = {
  testimoniesHeading: string;
  testimoniesContent: string;
  testimoniesURL: string[];
};

const TestimoniesUploadPage = () => {
  const url = import.meta.env.VITE_API_URL;
  const [testimoniesPayload, setTestimoniesPayload] = useState<Testimony>({
    testimoniesHeading: "",
    testimoniesContent: "",
    testimoniesURL: [],
  });
  const navigate = useNavigate();
  const uploadTestimony = useMutation({
    mutationFn: async (payLoad: Testimony) => {
      const response = await axios.post(url + "/testimonies/create", payLoad);
      return response.data;
    },
    onSuccess: () => {
      alert("Testimony uploaded successfully!");
      navigate("/");
    },
    onError: (error) => {
      alert(error);
      setTestimoniesPayload({
        testimoniesHeading: "",
        testimoniesContent: "",
        testimoniesURL: [],
      });
    },
  });
  const handleTestimonySubmit = async () => {
    if (testimoniesPayload.testimoniesHeading === "") {
      alert("Please give Testimony heading");
      return;
    }
    //Setting up payload using local payload state
    // const payload = new FormData();
    // payload.append("readingHeading", readingPayload.readingHeading);
    // payload.append("readingContent", readingPayload.readingContent);
    // readingPayload.readingImages.forEach((eachImage) => {
    //   payload.append("images", eachImage);
    // });
    const payload = {
      testimoniesHeading: testimoniesPayload.testimoniesHeading,
      testimoniesContent: testimoniesPayload.testimoniesContent,
      testimoniesURL: testimoniesPayload.testimoniesURL,
    };

    uploadTestimony.mutate(payload);
  };

  return (
    <div className="max-w-[90%] mx-auto py-5 md:py-12">
      <h1 className="text-xl md:text-2xl text-center">Testimony Upload</h1>
      <hr className="my-3 md:mb-10" />
      <div className="my-3">
        <Link to="/">
          <ArrowLeft />
        </Link>
      </div>
      <div className="flex flex-col gap-4 md:max-w-[60%] mx-auto">
        <input
          type="text"
          value={testimoniesPayload.testimoniesHeading}
          onChange={(e) => {
            setTestimoniesPayload((prevValue) => {
              return { ...prevValue, testimoniesHeading: e.target.value };
            });
          }}
          className="border-gray-300 border-2 rounded-md focus:border-gray-600 outline-none p-2"
          placeholder="Enter Testimony heading"
        />
        <input
          type="text"
          value={testimoniesPayload.testimoniesURL[0]}
          onChange={(e) => {
            setTestimoniesPayload((prevValue) => {
              return { ...prevValue, testimoniesURL: [e.target.value] };
            });
          }}
          className="border-gray-300 border-2 rounded-md focus:border-gray-600 outline-none p-2"
          placeholder="Enter Testimony Youtube URL"
        />
        <textarea
          rows={15}
          value={testimoniesPayload.testimoniesContent}
          onChange={(e) => {
            setTestimoniesPayload((prevValue) => {
              return { ...prevValue, testimoniesContent: e.target.value };
            });
          }}
          className="border-gray-300 border-2 rounded-md focus:border-gray-600 outline-none p-2"
          placeholder="Enter Testimony content"
        />
      </div>
      <div className="text-center mt-4">
        <button
          className="bg-gray-500 py-2 px-4 rounded-md text-white hover:bg-gray-300 hover:text-black disabled:bg-gray-300 disabled:text-black"
          onClick={handleTestimonySubmit}
          disabled={uploadTestimony.isLoading}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TestimoniesUploadPage;
