import { NavLink } from "react-router";
import img1 from "../assets/anthusmedia.png";

const Navbar = () => {
  return (
    <nav className="min-h-[10vh] bg-primary p-2 md:px-10 md:flex justify-between items-center">
      <div className="w-full md:w-[30%]">
        <img src={img1} width={250} height={100} className="h-32 w-full" />
      </div>
      <div className="hidden md:flex justify-around items-center mt-2 w-[60%]">
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
  );
};

export default Navbar;
