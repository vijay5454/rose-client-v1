import { NavLink } from "react-router";
import img1 from "../assets/img1.jpg";

const Navbar = () => {
  return (
    <nav className="min-h-[10vh] bg-primary p-2 md:px-10 flex justify-between items-center">
      <div className="w-full flex justify-center items-center md:w-auto">
        <img src={img1} width={250} height={100} />
      </div>
      <div className="hidden w-[80%] md:flex justify-around items-center">
        <NavLink to="/">
          <p className="font-bold text-xl">Home</p>
        </NavLink>
        <NavLink to="/prayers">
          <p className="font-bold text-xl">Prayers</p>
        </NavLink>
        <p className="font-bold text-xl">Holy Mass</p>
        <p className="font-bold text-xl">Bible</p>
      </div>
    </nav>
  );
};

export default Navbar;
