import { NavLink } from "react-router";
import img1 from "../assets/anthusmedia.png";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <>
      <div className="bg-primary">
        <div className="w-[75%] mx-auto md:h-[20vh] md:w-[40%]">
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
            <p className="font-bold text-xl">Home</p>
          </NavLink>
          <NavLink
            to="/prayers"
            className={({ isActive }) =>
              isActive
                ? "border-b-secondary border-b-4"
                : "border-b-4 border-b-primary"
            }
          >
            <p className="font-bold text-xl">Prayers</p>
          </NavLink>
          <NavLink
            to="/holy-mass"
            className={({ isActive }) =>
              isActive
                ? "border-b-secondary border-b-4"
                : "border-b-4 border-b-primary"
            }
          >
            <p className="font-bold text-xl">Holy Mass</p>
          </NavLink>
          <NavLink
            to="/holy-eucharist"
            className={({ isActive }) =>
              isActive
                ? "border-b-secondary border-b-4"
                : "border-b-4 border-b-primary"
            }
          >
            <p className="font-bold text-xl">Holy Eucharist</p>
          </NavLink>
          <NavLink
            to="/saints"
            className={({ isActive }) =>
              isActive
                ? "border-b-secondary border-b-4"
                : "border-b-4 border-b-primary"
            }
          >
            <p className="font-bold text-xl">Saints</p>
          </NavLink>
          <NavLink
            to="/bible"
            className={({ isActive }) =>
              isActive
                ? "border-b-secondary border-b-4"
                : "border-b-4 border-b-primary"
            }
          >
            <p className="font-bold text-xl">Bible</p>
          </NavLink>
        </div>
      </nav>
      <div className="bg-primary flex justify-end py-2 px-4 md:px-10">
        <NavLink
          to="/prayer-search"
          className={({ isActive }) => (isActive ? "hidden" : "")}
        >
          <Search width={35} height={35} />
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
