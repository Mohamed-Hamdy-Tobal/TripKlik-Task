import { Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
import FlightPage from "@/pages/FlightPage";
import BookingPage from "@/pages/BookingPage";

export const AppRoutes = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/trips" element={<FlightPage />} />
      <Route path="/booking" element={<BookingPage />} />
    </Route>
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);
