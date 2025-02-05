import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import PrayerUploadPage from "./pages/PrayerUploadPage";
import PrayerEditPage, { EditPrayer } from "./pages/PrayerEditPage";
import ReadingUploadPage from "./pages/ReadingUploadPage";
import TestimoniesUploadPage from "./pages/TestimoniesUploadPage";
import PrayerRequestPage from "./pages/PrayerRequestPage";
import TestimonyEditPage, { EditTestimony } from "./pages/TestimoniesEditPage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/reading-upload" element={<ReadingUploadPage />} />
      <Route path="/prayer-request" element={<PrayerRequestPage />} />
      <Route path="/prayer-upload" element={<PrayerUploadPage />} />
      <Route path="/prayer-edit" element={<PrayerEditPage />} />
      <Route path="/prayer-edit/:id" element={<EditPrayer />} />
      <Route path="/testimonies-upload" element={<TestimoniesUploadPage />} />
      <Route path="/testimony-edit" element={<TestimonyEditPage />} />
      <Route path="/testimony-edit/:id" element={<EditTestimony />} />
    </Routes>
  );
}

export default App;
