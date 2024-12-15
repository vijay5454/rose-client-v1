import { Outlet } from "react-router";
import Navbar from "./Navbar";

const Navlayout = () => {
  return (
    <>
      <main className="font-catamaran">
        <Navbar />
        <Outlet />
      </main>
    </>
  );
};

export default Navlayout;
