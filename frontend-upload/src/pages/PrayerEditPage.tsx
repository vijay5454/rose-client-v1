import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

type Prayer = {
  _id: string;
  prayerHeading: string;
  prayerContent: string;
  prayerImages: File[];
  __v: number;
};
const url = import.meta.env.VITE_API_URL;

function PrayerEditPage() {
  const fetchAllPrayers = async () => {
    const response = await axios.get(url + "/prayers");
    return response.data;
  };

  const { data, isLoading, error, isFetching } = useQuery({
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
          {isLoading || isFetching
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

export function EditPrayer() {
  //Getting Params from the url
  const { id } = useParams();
  //State to hold single prayer for edit/delete.
  const [singlePrayerPayload, setSinglePrayerPayload] = useState<Prayer>({
    _id: "",
    prayerContent: "",
    prayerHeading: "",
    prayerImages: [],
    __v: 0,
  });
  const navigate = useNavigate();

  const { error } = useQuery({
    queryKey: ["fetchPrayerbyId"],
    queryFn: async () => {
      const response = await axios.get(url + "/prayers/" + id);
      return response.data;
    },
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setSinglePrayerPayload(data);
    },
  });

  const editPrayer = useMutation({
    mutationFn: async (payload: FormData) => {
      const response = await axios.put(url + "/prayers/" + id, payload);
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSinglePrayerPayload((prevValue) => {
        return { ...prevValue, prayerImages: Array.from(files) };
      });
    }
  };

  const handlePrayerSubmit = async () => {
    if (
      singlePrayerPayload.prayerHeading === "" ||
      singlePrayerPayload.prayerContent === ""
    ) {
      alert("Please give Prayer heading and Prayer content!");
      return;
    }
    //Setting up payload using local payload state
    const payload = new FormData();
    payload.append("prayerHeading", singlePrayerPayload.prayerHeading);
    payload.append("prayerContent", singlePrayerPayload.prayerContent);
    singlePrayerPayload.prayerImages.forEach((eachImage) => {
      payload.append("images", eachImage);
    });
    editPrayer.mutate(payload);
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
          value={singlePrayerPayload.prayerHeading}
          onChange={(e) => {
            setSinglePrayerPayload((prevValue) => {
              return { ...prevValue, prayerHeading: e.target.value };
            });
          }}
          className="border-gray-300 border-2 rounded-md focus:border-gray-600 outline-none p-2"
          placeholder="Enter Prayer Heading"
        />
        <textarea
          rows={15}
          value={singlePrayerPayload.prayerContent}
          onChange={(e) => {
            setSinglePrayerPayload((prevValue) => {
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
      <div className="text-center mt-4 space-x-4">
        <Link to="/prayer-edit">
          <button className="bg-gray-500 py-2 px-4 rounded-md text-white">
            Go back
          </button>
        </Link>
        <button
          className="bg-gray-500 py-2 px-4 rounded-md text-white hover:bg-gray-300 hover:text-black disabled:bg-gray-300 disabled:text-black"
          onClick={handlePrayerSubmit}
          disabled={editPrayer.isLoading}
        >
          Submit
        </button>
        <button
          className="bg-red-500 py-2 px-4 rounded-md text-white hover:bg-red-300 hover:text-black disabled:bg-red-300 disabled:text-black"
          onClick={handlePrayerDelete}
          disabled={deletePrayer.isLoading}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default PrayerEditPage;
