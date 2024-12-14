import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useApi from "../hooks/useApi";

type Prayer = {
  _id: string;
  prayerHeading: string;
  prayerContent: string;
  prayerImages: string[];
  __v: number;
};

function PrayerEditPage() {
  const url = import.meta.env.VITE_API_URL;
  const { data, error, loading } = useApi<Prayer[]>(url + "/prayers");
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
          {loading
            ? "Loading..."
            : data?.map((eachPrayer, index) => {
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
  const url = import.meta.env.VITE_API_URL;
  //Initialize custom hook
  const { data, loading, error, refetch, updateOptions } = useApi<Prayer>(
    url + "/prayers/" + id
  );
  //State to hold single prayer for edit/delete.
  const [singlePrayer, setSinglePrayer] = useState<Prayer>({
    _id: "",
    prayerContent: "",
    prayerHeading: "",
    prayerImages: [],
    __v: 0,
  });
  useEffect(() => {
    if (data) {
      setSinglePrayer(data); //Set the response to local state.
    }
  }, [data]);

  const navigate = useNavigate();

  const handlePrayerSubmit = async () => {
    if (
      singlePrayer.prayerHeading === "" ||
      singlePrayer.prayerContent === ""
    ) {
      alert("Please give Prayer heading and Prayer content!");
      return;
    }
    //Update the options for put request
    updateOptions({
      method: "PUT",
      data: singlePrayer,
    });
    try {
      const response = await refetch(); //Do refetch with new updated options.
      if (response) {
        alert("Prayer edited successfully!");
        navigate("/prayer-edit");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handlePrayerDelete = async () => {
    updateOptions({
      method: "DELETE",
    });
    try {
      const response = await refetch(); //Do refetch with new updated options.
      if (response) {
        alert("Deleted the prayer successfully!");
        navigate("/prayer-edit");
      }
    } catch (error) {
      alert(error);
    }
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
          disabled={loading}
        >
          Submit
        </button>
        <button
          className="bg-red-500 py-2 px-4 rounded-md text-white hover:bg-red-300 hover:text-black"
          onClick={handlePrayerDelete}
          disabled={loading}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default PrayerEditPage;
