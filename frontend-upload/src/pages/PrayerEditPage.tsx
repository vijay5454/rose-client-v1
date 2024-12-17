import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

type Prayer = {
  _id: string;
  prayerHeading: string;
  prayerContent: string;
  prayerImages: string[];
  __v: number;
};
const url = import.meta.env.VITE_API_URL;

function PrayerEditPage() {
  const fetchAllPrayers = async () => {
    const response = await axios.get(url + "/prayers");
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchAllPrayers"],
    queryFn: fetchAllPrayers,
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
      <h1 className="text-2xl text-center">List of Prayers to Edit/Delete</h1>
      <hr className="m-2" />
      <Link to="/">
        <ArrowLeft />
      </Link>
      <p className="text-center">
        (Note: Select any below prayer to edit/delete)
      </p>
      <div className="mt-4">
        <h3 className="px-3 text-xl">List of Prayers:</h3>
        <div className="px-2 underline mt-2">
          {isLoading
            ? "Loading..."
            : data?.map((eachPrayer: Prayer, index: number) => {
                return (
                  <li key={index}>
                    <Link to={`/prayer-edit/${eachPrayer._id}`}>
                      {eachPrayer.prayerHeading}
                    </Link>
                  </li>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export function EditHeadingContent() {
  //Getting Params from the url
  const { id } = useParams();
  //State to hold single prayer for edit/delete.
  const [singlePrayer, setSinglePrayer] = useState<Prayer>({
    _id: "",
    prayerContent: "",
    prayerHeading: "",
    prayerImages: [],
    __v: 0,
  });
  const navigate = useNavigate();

  const { isLoading, error } = useQuery({
    queryKey: ["fetchPrayerbyId"],
    queryFn: async () => {
      const response = await axios.get(url + "/prayers/" + id);
      return response.data;
    },
    onSuccess: (data) => {
      setSinglePrayer(data);
    },
  });

  const editPrayer = useMutation({
    mutationFn: async (singlePrayer: Prayer) => {
      const response = await axios.put(url + "/prayers/" + id, singlePrayer);
      return response.data;
    },
    onSuccess: () => {
      navigate("/prayer-edit");
    },
  });
  const deletePrayer = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(url + "/prayers/" + id);
      return response.data;
    },
    onSuccess: () => {
      navigate("/prayer-edit");
    },
  });

  const handlePrayerSubmit = async () => {
    if (
      singlePrayer.prayerHeading === "" ||
      singlePrayer.prayerContent === ""
    ) {
      alert("Please give Prayer heading and Prayer content!");
      return;
    }
    editPrayer.mutate(singlePrayer);
  };

  const handlePrayerDelete = async () => {
    deletePrayer.mutate();
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
          value={singlePrayer.prayerHeading}
          onChange={(e) => {
            setSinglePrayer((prevValue) => {
              return { ...prevValue, prayerHeading: e.target.value };
            });
          }}
          className="border-gray-300 border-2 rounded-md focus:border-gray-600 outline-none p-2"
          placeholder="Enter Prayer Heading"
        />
        <textarea
          rows={15}
          value={singlePrayer.prayerContent}
          onChange={(e) => {
            setSinglePrayer((prevValue) => {
              return { ...prevValue, prayerContent: e.target.value };
            });
          }}
          className="border-gray-300 border-2 rounded-md focus:border-gray-600 outline-none p-2"
          placeholder="Enter Prayer content"
        />
      </div>
      <div className="text-center mt-4 space-x-4">
        <Link to="/prayer-edit">
          <button className="bg-gray-500 py-2 px-4 rounded-md text-white">
            Go back
          </button>
        </Link>
        <button
          className="bg-gray-500 py-2 px-4 rounded-md text-white hover:bg-gray-300 hover:text-black"
          onClick={handlePrayerSubmit}
          disabled={isLoading}
        >
          Submit
        </button>
        <button
          className="bg-red-500 py-2 px-4 rounded-md text-white hover:bg-red-300 hover:text-black"
          onClick={handlePrayerDelete}
          disabled={isLoading}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default PrayerEditPage;
