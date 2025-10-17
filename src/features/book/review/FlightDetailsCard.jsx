import { Plane, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

const FlightDetailsCard = ({ tripIndex = 0, fare = {}, flight = {}, currentItinerary = {} }) => {
  const { t } = useTranslation();

  const trip = currentItinerary?.trips?.[tripIndex];

  const airline = flight?.airline || t("EgyptAir");
  const origin = trip?.departure || flight?.origin || t("CAI");
  const destination = trip?.arrival || flight?.destination || t("DXB");
  const departureTime = flight?.departure_time || t("09:30");
  const arrivalTime = flight?.arrival_time || t("13:15");
  const duration = flight?.duration || t("3h 45m");
  const code = fare?.code || t("ECO-123");

  const totalPrice = fare?.starts_from_price;
  const currency = currentItinerary?.passengers?.[0]?.prices?.currency || t("AED");

  return (
    <div className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-gradient-to-r from-primary/10 to-white hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">
              {tripIndex + 1}
            </span>
            <h4 className="font-semibold text-lg text-gray-900">
              {t("Segment")} {tripIndex + 1}
            </h4>
          </div>

          <div className="space-y-2 sm:ml-11">
            <div className="flex flex-wrap items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-semibold text-base sm:text-lg">{origin}</span>
              <Plane className="w-4 h-4 text-gray-400" />
              <span className="font-semibold text-base sm:text-lg">{destination}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                  {departureTime} - {arrivalTime}
                </span>
              </div>
              <span className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm font-medium whitespace-nowrap">
                {duration}
              </span>
            </div>

            <p className="font-medium text-gray-700 text-sm sm:text-base">{airline}</p>

            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mt-2">
              {code}
            </span>
          </div>
        </div>

        <div className="sm:text-right">
          <p className="text-xl sm:text-2xl font-bold text-primary">
            {currency} {totalPrice.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">{t("per passenger")}</p>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsCard;
