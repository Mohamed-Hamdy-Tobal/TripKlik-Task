import { useMemo } from "react";
import useBookingStore from "@/store/bookingStore";
import { useGetTripFares, useGetAvailableCombinations, useGetItineraries } from "@/hooks/services/tripFares";
import FlightCard from "./FlightCard";
import { useNavigate } from "react-router-dom";
import FlightCardSkeleton from "@/components/loading/FlightCardSkeleton";
import StatusMessage from "@/components/feedback/StatusMessage";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/common";
import { getValidFareIds } from "@/utils/getValidFareIds";
import { errorToast } from "@/components/common/toast";
import { config } from "@/config/config";
import { STATIC_DATA } from "@/data/staticData";

const SelectFlightSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { is_dev } = config;

  console.log("is_dev", is_dev);

  const { searchParams, selectedFares, selectFareForTrip, getCombinationKey, setCurrentItinerary } = useBookingStore();

  const tripType = searchParams?.tripType || "oneway";

  const { tripFares: apiTripFares = [], isLoading: faresLoading, error: faresError } = useGetTripFares();

  const { availableCombinations: apiAvailableCombinations = {}, isLoading: combosLoading } =
    useGetAvailableCombinations();

  const { itineraries: apiItineraries = [], isLoading: itinerariesLoading } = useGetItineraries();

  const tripFares = is_dev ? apiTripFares : STATIC_DATA.tripFares;
  const availableCombinations = is_dev ? apiAvailableCombinations : STATIC_DATA.availableCombinations;
  const itineraries = is_dev ? apiItineraries : STATIC_DATA.itineraries;

  // If using static data, no loading states
  const isLoading = is_dev ? faresLoading || combosLoading || itinerariesLoading : false;

  console.log("tripFares  : ", tripFares);
  console.log("isLoading  : ", isLoading);
  console.log("faresError  : ", faresError);

  const groupedTrips = useMemo(() => {
    return tripFares.reduce((acc, trip) => {
      if (!acc[trip.trip_index]) acc[trip.trip_index] = [];
      acc[trip.trip_index].push(trip);
      return acc;
    }, {});
  }, [tripFares]);

  const handleContinue = () => {
    console.log("Selected Fares on Continue:", selectedFares);
    const key = getCombinationKey();
    if (!key) {
      errorToast(t("Error"), t("Please select required fares."));
      return;
    }

    const combo = availableCombinations[key];
    if (!combo) {
      errorToast(t("Error"), t("Selected combination is not available."));
      return;
    }

    const itinerary = itineraries.find((it) => it.id === combo.iti_id);
    if (itinerary) {
      setCurrentItinerary(itinerary);
    }

    navigate("/booking");
  };

  const requiredCount = tripType === "oneway" ? 1 : tripType === "round" ? 2 : 3;
  const selectedCount = Object.keys(selectedFares).length;

  if (isLoading)
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">{t("Select Your Flight")}</h2>
        <div>
          {[...Array(3)].map((_, i) => (
            <FlightCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );

  if (faresError) return <StatusMessage variant="error" message="Failed to load flight data. Please try again." />;

  if (!tripFares.length)
    return <StatusMessage variant="warning" message="No flight fares available for the selected criteria." />;

  return (
    <div className="space-y-6">
      {tripType === "oneway" && groupedTrips[0] && (
        <div>
          <h3 className="text-xl font-bold mb-3 px-1">{t("Outbound Flights")}</h3>
          {groupedTrips[0].map((trip) => (
            <FlightCard
              key={trip.flight_id}
              trip={trip}
              tripIndex={0}
              selectedFare={selectedFares[0]}
              onSelectFare={selectFareForTrip}
              validFareIds={null}
            />
          ))}
        </div>
      )}

      {tripType === "round" && (
        <>
          {groupedTrips[0] && (
            <div>
              <h3 className="text-xl font-bold mb-3 px-1">{t("Outbound Flights")}</h3>
              {groupedTrips[0].map((trip) => (
                <FlightCard
                  key={trip.flight_id}
                  trip={trip}
                  tripIndex={0}
                  selectedFare={selectedFares[0]}
                  onSelectFare={selectFareForTrip}
                  validFareIds={getValidFareIds(0, { tripType, selectedFares, availableCombinations })}
                />
              ))}
            </div>
          )}
          {groupedTrips[1] && (
            <div>
              <h3 className="text-xl font-bold mb-3 px-1">{t("Return Flights")}</h3>
              {groupedTrips[1]?.map((trip) => (
                <FlightCard
                  key={trip.flight_id}
                  trip={trip}
                  tripIndex={1}
                  selectedFare={selectedFares[1]}
                  onSelectFare={selectFareForTrip}
                  validFareIds={getValidFareIds(1, { tripType, selectedFares, availableCombinations })}
                />
              ))}
            </div>
          )}
        </>
      )}

      {tripType === "multi" &&
        [0, 1, 2].map(
          (idx) =>
            groupedTrips[idx] && (
              <div key={idx}>
                <h3 className="text-xl font-bold mb-3 px-1">
                  {t("Segment")} {idx + 1}
                </h3>
                {groupedTrips[idx].map((trip) => (
                  <FlightCard
                    key={trip.flight_id}
                    trip={trip}
                    tripIndex={idx}
                    selectedFare={selectedFares[idx]}
                    onSelectFare={selectFareForTrip}
                    validFareIds={getValidFareIds(idx, { tripType, selectedFares, availableCombinations })}
                  />
                ))}
              </div>
            ),
        )}

      <div className="bg-white rounded-lg shadow-md p-6 sticky bottom-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              {t("Selected")}: {selectedCount} / {requiredCount}
            </p>
            {getCombinationKey() && (
              <p className="text-xs text-gray-500 mt-1">
                {t("Key")}: {getCombinationKey()}
              </p>
            )}
          </div>
          <Button onClick={handleContinue} disabled={selectedCount !== requiredCount}>
            {t("Continue to Review")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectFlightSection;
