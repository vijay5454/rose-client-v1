import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Prayer {
  prayerHeading: string;
  prayerContent: string;
  prayerImages: File[];
}

function PrayerUploadPage() {
  const url = import.meta.env.VITE_API_URL;
  const [prayerPayload, setPrayerPayload] = useState<Prayer>({
    prayerHeading: "",
    prayerContent: "",
    prayerImages: [],
  });
  const navigate = useNavigate();
  const uploadPrayer = useMutation({
    mutationFn: async (payLoad: FormData) => {
      const response = await axios.post(url + "/prayers", payLoad);
      return response.data;
    },
    onSuccess: () => {
      alert("Prayer uploaded successfully!");
      navigate("/");
    },
    onError: (error) => {
      alert(error);
      setPrayerPayload({
        prayerHeading: "",
        prayerContent: "",
        prayerImages: [],
      });
    },
  });
  const handlePrayerSubmit = async () => {
    if (
      prayerPayload.prayerHeading === "" ||
      prayerPayload.prayerContent === ""
    ) {
      alert("Please give Prayer heading and Prayer content!");
      return;
    }
    //Setting up payload using local payload state
    const payload = new FormData();
    payload.append("prayerHeading", prayerPayload.prayerHeading);
    payload.append("prayerContent", prayerPayload.prayerContent);
    prayerPayload.prayerImages.forEach((eachImage) => {
      payload.append("images", eachImage);
    });
    uploadPrayer.mutate(payload);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setPrayerPayload((prevValue) => {
        return { ...prevValue, prayerImages: Array.from(files) };
      });
    }
  };
  return (
    <div className="max-w-[90%] mx-auto py-5 md:py-12">
      <h1 className="text-xl md:text-2xl text-center">Prayers Upload</h1>
      <hr className="my-3 md:mb-10" />
      <div className="my-3">
        <Link to="/">
          <ArrowLeft />
        </Link>
      </div>
      <div className="flex flex-col gap-4 md:max-w-[60%] mx-auto">
        <input
          type="text"
          value={prayerPayload.prayerHeading}
          onChange={(e) => {
            setPrayerPayload((prevValue) => {
              return { ...prevValue, prayerHeading: e.target.value };
            });
          }}
          className="border-gray-300 border-2 rounded-md focus:border-gray-600 outline-none p-2"
          placeholder="Enter Prayer Heading"
        />
        <textarea
          rows={15}
          value={prayerPayload.prayerContent}
          onChange={(e) => {
            setPrayerPayload((prevValue) => {
              return { ...prevValue, prayerContent: e.target.value };
            });
          }}
          className="border-gray-300 border-2 rounded-md focus:border-gray-600 outline-none p-2"
          placeholder="Enter Prayer content"
        />
        <div className="flex flex-col">
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
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          className="bg-gray-500 py-2 px-4 rounded-md text-white hover:bg-gray-300 hover:text-black disabled:bg-gray-300 disabled:text-black"
          onClick={handlePrayerSubmit}
          disabled={uploadPrayer.isLoading}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default PrayerUploadPage;
