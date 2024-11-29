import { Outlet } from "react-router";
import Navbar from "./Navbar";
import BottomNavbar from "./BottomNavbar";

const Navlayout = () => {
  return (
    <>
      <main className="font-catamaran">
        <Navbar />
        <Outlet />
      </main>
      <BottomNavbar />
    </>
  );
};

export default Navlayout;
