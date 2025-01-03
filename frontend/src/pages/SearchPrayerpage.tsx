import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";

const url = import.meta.env.VITE_API_URL;

type SearchList = {
  _id: string;
  prayerHeading: string;
  score: number;
};

const SearchPrayerpage = () => {
  const { keyword } = useParams();
  // const [keyword, setKeyword] = useState("");
  const [foundList, setFoundList] = useState<SearchList[]>([]);
  const [responseText, setResponseText] = useState("");
  const handleSearchPrayer = async () => {
    const response = await axios.get(url + `/prayer-search?keyword=${keyword}`);
    if (response.data.data.length === 0) {
      setResponseText("No results found");
    }
    setFoundList(response.data.data);
  };
  useEffect(() => {
    handleSearchPrayer();
  }, [keyword]);
  return (
    <section className="min-h-[81vh] md:min-h-[80vh] bg-secondary p-2 md:p-8">
      <h2 className="text-center font-semibold text-2xl mb-2">Search</h2>
      {foundList.length !== 0 && (
        <h3 className="font-semibold text-xl mt-3 pl-3 md:pl-6">
          Search Results
        </h3>
      )}
      {foundList.length === 0 && (
        <h3 className="font-semibold text-xl mt-3 pl-3 md:pl-6 text-center">
          {responseText}
        </h3>
      )}
      <div className="p-3 md:p-6 md:text-lg md:max-w-[50%] flex flex-col gap-2">
        <ul>
          {foundList.map((eachResult) => {
            return (
              <Link to={`/prayers/${eachResult._id}`} key={eachResult._id}>
                <li className="underline">{eachResult.prayerHeading}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default SearchPrayerpage;
