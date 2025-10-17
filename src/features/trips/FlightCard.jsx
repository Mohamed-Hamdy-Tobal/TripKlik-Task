import { Plane, ChevronDown, ChevronUp, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import FareCard from "./FareCard";
import { useTranslation } from "react-i18next";

const FlightCard = ({ trip, tripIndex, selectedFare, onSelectFare, validFareIds }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-4">
      <div className="p-5 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Plane className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-bold text-lg">{trip?.airline || t("Egypt Airlines")}</h3>
              <p className="text-sm text-gray-600">
                {t("Flight")} {trip?.flight_id}
              </p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-primary font-medium hover:text-blue-700"
          >
            {expanded ? "Hide Fares" : "View Fares"}
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="font-semibold">{trip?.origin || t("CAI")}</span>
            <Plane className="w-4 h-4 text-gray-400" />
            <span className="font-semibold">{trip?.destination || t("IST")}</span>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>
                {trip?.departure_time || t("10:00")} - {trip?.arrival_time || t("13:00")}
              </span>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{trip?.duration || t("3h 00m")}</span>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="p-5 bg-gray-50">
          {trip?.fareFamilies?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {trip?.fareFamilies?.map((fare) => {
                const isSelected = selectedFare?.itinerary_id === fare.itinerary_id;
                const isDisabled = validFareIds && !validFareIds.has(String(fare.itinerary_id));

                return (
                  <FareCard
                    key={fare.itinerary_id}
                    fare={fare}
                    isSelected={isSelected}
                    onSelect={() => onSelectFare(tripIndex, fare)}
                    isDisabled={isDisabled}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">{t("No fare options available for this flight.")}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FlightCard;
