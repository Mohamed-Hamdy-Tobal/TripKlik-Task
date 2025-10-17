import Container from "@/components/layout/Container";
import SearchForm from "@/features/home/SearchForm";
import useBookingStore from "@/store/bookingStore";
import { useEffect } from "react";

const HomePage = () => {
  const { reset } = useBookingStore();

  useEffect(() => {
    reset();
  }, []);

  return (
    <div className="py-10">
      <Container>
        <SearchForm />
      </Container>
    </div>
  );
};

export default HomePage;
