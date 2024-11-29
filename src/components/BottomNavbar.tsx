import { NavLink } from "react-router";
import { PiHandsPrayingDuotone } from "react-icons/pi";
import { MdHomeFilled } from "react-icons/md";
import { PiChurch } from "react-icons/pi";
import { LuChurch } from "react-icons/lu";
import { FaBible } from "react-icons/fa";

const BottomNavbar = () => {
  return (
    <div className="h-20 bg-primary fixed bottom-0 w-full md:hidden px-1">
      <div className="flex justify-between items-center h-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-secondary rounded-lg" : ""
          }
        >
          <div className="flex flex-col gap-2 items-center py-2 px-1">
            <MdHomeFilled />
            <p>Home</p>
          </div>
        </NavLink>
        <NavLink
          to="/prayers"
          className={({ isActive }) =>
            isActive ? "bg-secondary rounded-lg" : ""
          }
        >
          <div className="flex flex-col gap-2 items-center py-2 px-1">
            <PiHandsPrayingDuotone />
            <p>Prayers</p>
          </div>
        </NavLink>
        <NavLink to="#">
          <div className="flex flex-col gap-2 items-center py-2 px-1">
            <PiChurch />
            <p>Holy Mass</p>
          </div>
        </NavLink>
        <NavLink to="#">
          <div className="flex flex-col gap-2 items-center py-2 px-1">
            <LuChurch />
            <p>Holy Eucharist</p>
          </div>
        </NavLink>
        <NavLink to="#">
          <div className="flex flex-col gap-2 items-center py-2 px-1">
            <FaBible />
            <p>Bible</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNavbar;
