import { NavLink, useNavigate } from "react-router";
import img1 from "../assets/anthusmedia.png";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";

const Navbar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (keyword === "") {
      toast.error("Please enter some keyword!");
      return;
    }
    navigate(`/prayer-search/${keyword}`);
    setKeyword("");
  };
  return (
    <>
      <div className="bg-primary">
        <div className="w-full mx-auto md:h-[20vh] md:w-[40%]">
          <img
            src={img1}
            width={250}
            height={100}
            className="h-32 w-full md:h-full"
          />
        </div>
      </div>
      <nav className={`bg-primary`}>
        <div className="w-full p-2 text-center flex gap-5 justify-around overflow-x-scroll md:overflow-hidden text-nowrap">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-b-secondary border-b-4"
                : "border-b-4 border-b-primary"
            }
          >
            <p className="font-bold">Home</p>
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              isActive
                ? "border-b-secondary border-b-4"
                : "border-b-4 border-b-primary"
            }
          >
            <p className="font-bold">About us</p>
          </NavLink>
          <NavLink
            to="/table-of-content"
            className={({ isActive }) =>
              isActive
                ? "border-b-secondary border-b-4"
                : "border-b-4 border-b-primary"
            }
          >
            <p className="font-bold">Table of Contents</p>
          </NavLink>
          <NavLink
            to="/testimonies"
            className={({ isActive }) =>
              isActive
                ? "border-b-secondary border-b-4"
                : "border-b-4 border-b-primary"
            }
          >
            <p className="font-bold">Testimony</p>
          </NavLink>
        </div>
      </nav>
      <div className="bg-primary flex justify-center items-center py-2 px-4 md:px-10 gap-5">
        <div className="w-full md:w-[30%]">
          <input
            id="search"
            type="text"
            placeholder="Type something..."
            className="px-4 py-2 w-full rounded-md border border-secondary outline-2 outline-secondary"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            onKeyDown={(e) => {
              if (keyword === "" && e.key === "Enter") {
                toast.error("Please enter some keyword!");
              }
              if (e.key === "Enter" && keyword !== "") {
                navigate(`/prayer-search/${keyword}`);
                setKeyword("");
              }
            }}
          />
        </div>
        <Search width={35} height={35} onClick={handleSearch} />
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            toast: "bg-secondary",
          },
        }}
      />
    </>
  );
};

export default Navbar;
