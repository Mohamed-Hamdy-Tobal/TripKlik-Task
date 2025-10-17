import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SuccessConfirm = ({ passengers = [], currentItinerary = {}, selectedFares = {} }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const passenger = passengers[0] || {};
  const bookingRef = currentItinerary?.id || "987654";
  const totalPaid = currentItinerary?.passengers?.[0]?.prices?.total?.toFixed(2) || "999.99";
  const segmentCount = Object.keys(selectedFares).length || 1;

  console.log("segmentCount : ", segmentCount);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-white rounded-2xl shadow-xl sm:shadow-2xl p-6 sm:p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{t("Booking Confirmed")}!</h2>
        <p className="text-gray-600 mb-8 text-sm sm:text-base leading-relaxed">
          {t("Your flight has been successfully booked. A confirmation email has been sent to")}{" "}
          <span className="font-semibold text-gray-900 break-all">{passenger.email || "user@email.com"}</span>
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 sm:p-6 mb-8 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{t("Booking Reference")}</p>
              <p className="text-base sm:text-lg font-bold text-gray-900">
                {t("BK")}
                {bookingRef}
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{t("Total Paid")}</p>
              <p className="text-base sm:text-lg font-bold text-green-600">
                {t("AED")} {totalPaid}
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{t("Passenger")}</p>
              <p className="text-base sm:text-lg font-semibold text-gray-900">
                {passenger?.firstName || "Mohamed"} {passenger?.lastName || "Tobal"}
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">{t("Segments")}</p>
              <p className="text-base sm:text-lg font-semibold text-gray-900">
                {segmentCount} {segmentCount > 1 ? t("Flights") : t("Flight")}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={() => window.print()}
            className="w-full px-6 py-3 sm:py-3.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/70 transition"
          >
            {t("Download Ticket")}
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full px-6 py-3 sm:py-3.5 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            {t("Book Another Flight")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessConfirm;
