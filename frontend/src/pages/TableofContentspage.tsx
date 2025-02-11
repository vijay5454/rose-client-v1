import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const pagesContent = [
  {
    pageName: "Prayers",
    pathName: "/prayers",
    description:
      "A dedicated space for heartfelt Christian prayers, reflections, and inspirations to deepen your faith. Join us to nurture your spiritual journey and connect through the beauty of prayer.",
  },
  {
    pageName: "Holy Mass",
    pathName: "/holy-mass",
    description:
      "Discover the profound beauty and significance of the Catholic Holy Mass, the central act of worship in the Church. Join us in exploring its prayers, rituals, and meaning as we unite in faith and devotion to Christ.",
  },
  {
    pageName: "Holy Eucharist",
    pathName: "/holy-eucharist",
    description:
      "Celebrate the sacred mystery of the Holy Eucharist, the source and summit of Christian life. Explore its profound meaning as the true presence of Christ, uniting us with His love and grace.",
  },
  {
    pageName: "Bible",
    pathName: "/bible",
    description:
      "Dive into the timeless wisdom and teachings of the Holy Catholic Bible. Explore its sacred scriptures as a guide for faith, inspiration, and daily living in Christ's light.",
  },
  {
    pageName: "Saints",
    pathName: "/saints",
    description:
      "Discover the inspiring lives of saints who exemplify devotion, courage, and virtue. Explore their stories to deepen your faith and seek guidance through their intercession.",
  },
  {
    pageName: "Prayer Request",
    pathName: "/prayer-request",
    description:
      "Submit your prayer requests and let our community join you in lifting your intentions to God. Together, we stand in faith, offering support and hope through the power of prayer.",
  },
  {
    pageName: "Videos",
    pathName: "/videos",
    description:
      "Explore a collection of Catholic videos featuring prayers, teachings, and reflections. Strengthen your faith and understanding through engaging and uplifting visual content.",
  },
];

const TableofContent = () => {
  return (
    <section className="min-h-[81vh] md:min-h-[80vh] bg-secondary p-2 pb-20 md:p-8">
      <h1 className="font-semibold py-2">Table of Content</h1>
      <div className="w-full">
        <Table className="overflow-hidden md:text-base">
          <TableHeader>
            <TableRow>
              <TableHead>Pages</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagesContent.map((eachContent) => {
              return (
                <TableRow key={eachContent.pageName}>
                  <TableHead className="underline text-nowrap">
                    <Link to={eachContent.pathName}>
                      {eachContent.pageName}
                    </Link>
                  </TableHead>
                  <TableHead>{eachContent.description}</TableHead>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default TableofContent;
