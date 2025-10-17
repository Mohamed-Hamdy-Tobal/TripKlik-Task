import Container from "@/components/layout/Container";
import { ConfirmSection } from "@/features/book/confirm/ConfirmationSection";
import { ReviewSection } from "@/features/book/review/ReviewSection";
import { useState } from "react";

const BookingPage = () => {
  const [currentView, setCurrentView] = useState("review");

  return (
    <div className="py-10">
      <Container>
        {currentView === "review" ? (
          <ReviewSection onNext={() => setCurrentView("confirm")} />
        ) : (
          <ConfirmSection onBack={() => setCurrentView("review")} />
        )}
      </Container>
    </div>
  );
};

export default BookingPage;
