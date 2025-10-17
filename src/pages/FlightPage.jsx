import Container from "@/components/layout/Container";
import SelectFlightSection from "@/features/trips/SelectFlightSection";

const FlightPage = () => {
  return (
    <div className="py-10 bg-background min-h-screen">
      <Container>
        <SelectFlightSection />
      </Container>
    </div>
  );
};

export default FlightPage;
