import { NavLink } from "react-router";
import { PiHandsPrayingDuotone } from "react-icons/pi";
import { MdHomeFilled } from "react-icons/md";
import { PiChurch } from "react-icons/pi";
import { LuChurch } from "react-icons/lu";
import { FaBible } from "react-icons/fa";
import { GiHolySymbol } from "react-icons/gi";

const BottomNavbar = () => {
  return (
    <div className="h-20 bg-primary fixed bottom-0 w-full md:hidden px-1">
      <div className="flex justify-between items-center text-xs h-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-secondary rounded-lg w-[16%] p-1" : "w-[16%] p-1"
          }
        >
          <div className="flex flex-col gap-2 items-center">
            <MdHomeFilled className="w-5 h-5" />
            <p>Home</p>
          </div>
        </NavLink>
        <NavLink
          to="/prayers"
          className={({ isActive }) =>
            isActive ? "bg-secondary rounded-lg w-[16%] p-1" : "w-[16%] p-1"
          }
        >
          <div className="flex flex-col gap-2 items-center">
            <PiHandsPrayingDuotone className="w-5 h-5" />
            <p>Prayers</p>
          </div>
        </NavLink>
        <NavLink
          to="/holy-mass"
          className={({ isActive }) =>
            isActive ? "bg-secondary rounded-lg w-[16%] p-1" : "w-[16%] p-1"
          }
        >
          <div className="flex flex-col gap-2 items-center">
            <PiChurch className="w-5 h-5" />
            <div className="text-center">
              <p>Holy</p>
              <p>Mass</p>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/holy-eucharist"
          className={({ isActive }) =>
            isActive ? "bg-secondary rounded-lg w-[16%] p-1" : "w-[16%] p-1"
          }
        >
          <div className="flex flex-col gap-2 items-center">
            <LuChurch className="w-5 h-5" />
            <div className="text-center">
              <p>Holy</p>
              <p>Eucharist</p>
            </div>
          </div>
        </NavLink>
        <NavLink
          to="/saints"
          className={({ isActive }) =>
            isActive ? "bg-secondary rounded-lg w-[16%] p-1" : "w-[16%] p-1"
          }
        >
          <div className="flex flex-col gap-2 items-center">
            <GiHolySymbol className="w-5 h-5" />
            <p>Saints</p>
          </div>
        </NavLink>
        <NavLink
          to="/bible"
          className={({ isActive }) =>
            isActive ? "bg-secondary rounded-lg w-[16%] p-1" : "w-[16%] p-1"
          }
        >
          <div className="flex flex-col gap-2 items-center">
            <FaBible className="w-5 h-5" />
            <p>Bible</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNavbar;
