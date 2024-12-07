import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import PrayerUploadPage from "./pages/PrayerUploadPage";
import PrayerEditPage, { EditHeadingContent } from "./pages/PrayerEditPage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/prayer-upload" element={<PrayerUploadPage />} />
      <Route path="/prayer-edit" element={<PrayerEditPage />} />
      <Route path="/prayer-edit/:id" element={<EditHeadingContent />} />
    </Routes>
  );
}

export default App;
