import { NavLink } from "react-router";
import img1 from "../assets/anthusmedia.png";
import { Rows4, X, Search } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <div className="bg-primary">
        <div className="w-[75%] mx-auto">
          <img src={img1} width={250} height={100} className="h-32 w-full" />
        </div>
      </div>
      <nav
        className={`fixed h-[100vh] top-0 w-[60%] bg-primary md:static md:h-auto md:w-[100%] transition-all duration-300 ${
          showSidebar ? "right-0" : "-right-[100%]"
        }`}
      >
        <div className="md:hidden">
          <X
            width={35}
            height={35}
            onClick={() => {
              setShowSidebar(false);
            }}
          />
        </div>
        <div className="w-full p-2 text-center md:flex md:gap-5 md:justify-around">
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
      <div className="bg-primary flex justify-between py-2 px-4 md:hidden">
        <Search width={35} height={35} />
        <Rows4
          width={35}
          height={35}
          onClick={() => {
            setShowSidebar(true);
          }}
        />
      </div>
    </>
  );
};

export default Navbar;
