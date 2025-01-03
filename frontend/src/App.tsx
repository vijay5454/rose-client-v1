import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Navlayout from "./components/Navlayout";
import Prayerpage, { EachPrayer } from "./pages/Prayerpage";
import Holymasspage from "./pages/HolyMasspage";
import HolyEucharistpage from "./pages/HolyEucharistpage";
import Saintspage from "./pages/Saintspage";
import Biblepage from "./pages/Biblepage";
import SearchPrayerpage from "./pages/SearchPrayerpage";
import AboutPage from "./pages/AboutUspage";
import TableofContent from "./pages/TableofContentspage";
import Testimony from "./pages/Testimonypage";
import PrayerRequest from "./pages/PrayerRequestpage";
import Videospage from "./pages/Videospage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navlayout />}>
          <Route index element={<Homepage />} />
          <Route path="/prayers" element={<Prayerpage />} />
          <Route path="/table-of-content" element={<TableofContent />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/testimonies" element={<Testimony />} />
          <Route path="/holy-mass" element={<Holymasspage />} />
          <Route path="/holy-eucharist" element={<HolyEucharistpage />} />
          <Route path="/saints" element={<Saintspage />} />
          <Route path="/bible" element={<Biblepage />} />
          <Route path="/prayers" element={<Prayerpage />} />
          <Route path="/prayers/:id" element={<EachPrayer />} />
          <Route
            path="/prayer-search/:keyword"
            element={<SearchPrayerpage />}
          />
          <Route path="/prayer-request" element={<PrayerRequest />} />
          <Route path="/videos" element={<Videospage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
