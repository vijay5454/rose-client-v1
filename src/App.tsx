import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Navlayout from "./components/Navlayout";
import Prayerpage, { EachPrayer } from "./pages/Prayerpage";
import Holymasspage from "./pages/Holymasspage";
import HolyEucharistpage from "./pages/HolyEucharistpage";
import Saintspage from "./pages/Saintspage";
import Biblepage from "./pages/Biblepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navlayout />}>
          <Route index element={<Homepage />} />
          <Route path="/prayers" element={<Prayerpage />} />
          <Route path="/holy-mass" element={<Holymasspage />} />
          <Route path="/holy-eucharist" element={<HolyEucharistpage />} />
          <Route path="/saints" element={<Saintspage />} />
          <Route path="/bible" element={<Biblepage />} />
          <Route path="/prayers" element={<Prayerpage />} />
          <Route path="/prayers/:id" element={<EachPrayer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
