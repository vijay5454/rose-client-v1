import { Link, useParams } from "react-router";
import { prayersData } from "../data/prayers";
import parse from "html-react-parser";

const Prayerpage = () => {
  return (
    <section className="min-h-[81vh] md:min-h-[80vh] bg-secondary p-2 md:p-8">
      <h1 className="text-xl md:text-2xl font-semibold py-2">Prayer List</h1>
      <div className="p-3 md:p-6 md:text-lg md:max-w-[50%] flex flex-col gap-2">
        {prayersData.map((eachPrayerData, index) => {
          return (
            <Link to={`/prayers/${eachPrayerData.id}`} key={index}>
              <li className="underline">{eachPrayerData.prayerHeading}</li>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export const EachPrayer = () => {
  const { id } = useParams();
  console.log(id);
  const prayerToDisplay = prayersData.filter(
    (eachPrayer) => eachPrayer.id === id
  )[0];
  return (
    <section className="min-h-[81vh] md:min-h-[80vh] bg-secondary p-2 md:p-8">
      <div className="md:max-w-[85%] mx-auto mb-20 md:mb-0">
        <h1 className="text-xl md:text-2xl font-semibold py-2">
          {prayerToDisplay.prayerHeading}
        </h1>
        <p className="md:mt-2 space-y-2">
          {parse(prayerToDisplay.prayerContent)}
        </p>
        <p className="font-semibold text-center md:mt-2">Amen.</p>
      </div>
    </section>
  );
};

export default Prayerpage;
