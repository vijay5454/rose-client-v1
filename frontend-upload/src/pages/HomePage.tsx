import { Link } from "react-router";

const HomePage = () => {
  return (
    <div className="p-2">
      <h1 className="text-center text-2xl py-5">Upload Content</h1>
      <div className="underline flex justify-center items-center h-[50vh]">
        <div>
          <li>
            <Link to="/prayer-upload">Click to upload new Prayer</Link>
          </li>
          <li>
            <Link to="/prayer-edit">Click to edit Prayers</Link>
          </li>
          <li>
            <Link to="/testimonies-upload">Click to upload new testimony</Link>
          </li>
          <li>
            <Link to="/testimony-edit">Click to edit testimonies</Link>
          </li>
          <li>
            <Link to="/reading-upload">Click to upload today's reading</Link>
          </li>
          <li>
            <Link to="/prayer-request">
              Click to view all the prayer requests.
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
