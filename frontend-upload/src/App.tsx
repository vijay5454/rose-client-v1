import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import PrayerUploadPage from "./pages/PrayerUploadPage";
import PrayerEditPage, { EditHeadingContent } from "./pages/PrayerEditPage";
import ReadingUploadPage from "./pages/ReadingUploadPage";
import TestimoniesUploadPage from "./pages/TestimoniesUploadPage";
import PrayerRequestPage from "./pages/PrayerRequestPage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/prayer-upload" element={<PrayerUploadPage />} />
      <Route path="/reading-upload" element={<ReadingUploadPage />} />
      <Route path="/prayer-edit" element={<PrayerEditPage />} />
      <Route path="/testimonies-upload" element={<TestimoniesUploadPage />} />
      <Route path="/prayer-request" element={<PrayerRequestPage />} />
      <Route path="/prayer-edit/:id" element={<EditHeadingContent />} />
    </Routes>
  );
}

export default App;
