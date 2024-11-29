import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Navlayout from "./components/Navlayout";
import Prayerpage, { EachPrayer } from "./pages/Prayerpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navlayout />}>
          <Route index element={<Homepage />} />
          <Route path="/prayers" element={<Prayerpage />} />
          <Route path="/prayers/:id" element={<EachPrayer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
