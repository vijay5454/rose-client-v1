import { Album, Church, HandHeart, HeartHandshake, House } from "lucide-react";
import { NavLink } from "react-router";

const BottomNavbar = () => {
  return (
    <div className="h-20 bg-primary fixed bottom-0 w-full md:hidden p-2">
      <div className="flex justify-between">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-secondary rounded-lg" : ""
          }
        >
          <div className="flex flex-col gap-2 items-center pt-2">
            <House width={50} />
            <p>Home</p>
          </div>
        </NavLink>
        <NavLink
          to="/prayers"
          className={({ isActive }) =>
            isActive ? "bg-secondary rounded-lg" : ""
          }
        >
          <div className="flex flex-col gap-2 items-center pt-2">
            <HeartHandshake width={50} />
            <p>Prayers</p>
          </div>
        </NavLink>
        <div className="flex flex-col gap-2 items-center pt-2">
          <HandHeart width={50} />
          <p>Holy Mass</p>
        </div>
        <div className="flex flex-col gap-2 items-center pt-2">
          <Church width={50} />
          <p>Holy Eucharist</p>
        </div>
        <div className="flex flex-col gap-2 items-center pt-2">
          <Album width={50} />
          <p>Bible</p>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
