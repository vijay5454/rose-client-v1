import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Reading {
  readingHeading: string;
  readingContent: string;
  readingImages: File[];
}

function ReadingUploadPage() {
  const url = import.meta.env.VITE_API_URL;
  const [readingPayload, setReadingPayload] = useState<Reading>({
    readingHeading: "",
    readingContent: "",
    readingImages: [],
  });
  const navigate = useNavigate();
  const uploadReading = useMutation({
    mutationFn: async (payLoad: FormData) => {
      const response = await axios.post(url + "/reading/create", payLoad);
      return response.data;
    },
    onSuccess: () => {
      alert("Reading uploaded successfully!");
      navigate("/");
    },
    onError: (error) => {
      alert(error);
      setReadingPayload({
        readingHeading: "",
        readingContent: "",
        readingImages: [],
      });
    },
  });
  const handleReadingSubmit = async () => {
    if (
      readingPayload.readingHeading === "" ||
      readingPayload.readingContent === ""
    ) {
      alert("Please give Prayer heading and Prayer content!");
      return;
    }
    //Setting up payload using local payload state
    const payload = new FormData();
    payload.append("readingHeading", readingPayload.readingHeading);
    payload.append("readingContent", readingPayload.readingContent);
    readingPayload.readingImages.forEach((eachImage) => {
      payload.append("images", eachImage);
    });
    uploadReading.mutate(payload);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setReadingPayload((prevValue) => {
        return { ...prevValue, readingImages: Array.from(files) };
      });
    }
  };
  return (
    <div className="max-w-[90%] mx-auto py-5 md:py-12">
      <h1 className="text-xl md:text-2xl text-center">Reading Upload</h1>
      <hr className="my-3 md:mb-10" />
      <div className="my-3">
        <Link to="/">
          <ArrowLeft />
        </Link>
      </div>
      <div className="flex flex-col gap-4 md:max-w-[60%] mx-auto">
        <input
          type="text"
          value={readingPayload.readingHeading}
          onChange={(e) => {
            setReadingPayload((prevValue) => {
              return { ...prevValue, readingHeading: e.target.value };
            });
          }}
          className="border-gray-300 border-2 rounded-md focus:border-gray-600 outline-none p-2"
          placeholder="Enter today's reading heading"
        />
        <textarea
          rows={15}
          value={readingPayload.readingContent}
          onChange={(e) => {
            setReadingPayload((prevValue) => {
              return { ...prevValue, readingContent: e.target.value };
            });
          }}
          className="border-gray-300 border-2 rounded-md focus:border-gray-600 outline-none p-2"
          placeholder="Enter today's reading content"
        />
        <div className="flex flex-col">
          <label htmlFor="reading-image" className="font-semibold">
            Choose images for Today's reading
          </label>
          <input
            type="file"
            id="reading-image"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
          />
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          className="bg-gray-500 py-2 px-4 rounded-md text-white hover:bg-gray-300 hover:text-black disabled:bg-gray-300 disabled:text-black"
          onClick={handleReadingSubmit}
          disabled={uploadReading.isLoading}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ReadingUploadPage;
