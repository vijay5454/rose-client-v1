import axios from "axios";
import { useState } from "react";

function PrayerUploadPage() {
  const [prayerPayload, setPrayerPayload] = useState({
    prayerHeading: "",
    prayerContent: "",
    prayerImages: [],
  });
  const [loading, setLoading] = useState(false);
  const handlePrayerSubmit = async () => {
    if (
      prayerPayload.prayerHeading === "" ||
      prayerPayload.prayerContent === ""
    ) {
      alert("Please give Prayer heading and Prayer content!");
      return;
    }
    try {
      setLoading(true);
      const url = import.meta.env.VITE_API_URL;
      const response = await axios.post(url + "/prayers", prayerPayload);
      console.log(response.data);
      setPrayerPayload((prevValue) => {
        return { ...prevValue, prayerHeading: "", prayerContent: "" };
      });
      alert("Prayer Upload successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-[90%] mx-auto py-5 md:py-12">
      <h1 className="text-xl md:text-2xl">Prayers Upload</h1>
      <hr className="my-3 md:mb-10" />
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
          value={prayerPayload.prayerContent}
          onChange={(e) => {
            setPrayerPayload((prevValue) => {
              return { ...prevValue, prayerContent: e.target.value };
            });
          }}
          className="border-gray-300 border-2 rounded-md focus:border-gray-600 outline-none p-2"
          placeholder="Enter Prayer content"
        />
      </div>
      <div className="text-center mt-4">
        <button
          className="bg-gray-500 py-2 px-4 rounded-md text-white hover:bg-gray-300 hover:text-black"
          onClick={handlePrayerSubmit}
          disabled={loading}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default PrayerUploadPage;
