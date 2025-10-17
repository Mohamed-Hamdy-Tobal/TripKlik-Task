import { useGetTripFares } from "@/hooks/services/tripFares";
import useBookingStore from "@/store/bookingStore";
import { ArrowLeft, ArrowRight, CreditCard, Mail, Phone } from "lucide-react";
import { useState } from "react";
import SuccessConfirm from "./SuccessConfirm";
import { useTranslation } from "react-i18next";
import PriceSummary from "./PriceSummary";
import CustomButton from "@/components/common/button/Button";
import { Button } from "@/components/ui/button";
import { errorToast } from "@/components/common/toast";

export const ConfirmSection = ({ onBack }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { selectedFares, currentItinerary, passengers } = useBookingStore();
  const { tripFares } = useGetTripFares();

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const getFlightDetails = (tripIndex) => {
    const fare = selectedFares[tripIndex];
    if (!fare) return null;
    return tripFares.find((t) => t.fareFamilies.some((f) => f.itinerary_id === fare.itinerary_id));
  };

  const handlePayment = () => {
    if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.expiryDate || !paymentData.cvv) {
      errorToast(t("Please fill in all payment details."));
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
    }, 2000);
  };

  if (isConfirmed) {
    return <SuccessConfirm passengers={passengers} currentItinerary={currentItinerary} selectedFares={selectedFares} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t("Complete Payment")}</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {t("Enter your payment details to confirm your booking")}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-100">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                {t("Payment Details")}
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("Card Number")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          cardNumber: e.target.value,
                        })
                      }
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("Cardholder Name")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={paymentData.cardName}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        cardName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    placeholder={t("Enter Full Name")}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("Expiry Date")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={paymentData.expiryDate}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          expiryDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t("CVV")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={paymentData.cvv}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          cvv: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                      placeholder="123"
                      maxLength="4"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button variant="outline" onClick={onBack} disabled={isProcessing} className="w-full sm:w-auto">
                  ← {t("Back")}
                </Button>

                <CustomButton
                  onClick={handlePayment}
                  isLoading={isProcessing}
                  disabled={
                    isProcessing ||
                    !paymentData.cardNumber ||
                    !paymentData.cardName ||
                    !paymentData.expiryDate ||
                    !paymentData.cvv
                  }
                  className="w-full sm:w-auto"
                >
                  {isProcessing ? t("Processing...") : t("Confirm & Pay")}
                </CustomButton>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{t("Passenger")}</h3>
              {passengers[0] && (
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-gray-900">
                    {passengers[0].firstName} {passengers[0].lastName}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2 break-words">
                    <Mail className="w-4 h-4" />
                    {passengers[0].email}
                  </p>
                  {passengers[0].phone && (
                    <p className="text-gray-600 flex items-center gap-2 break-words">
                      <Phone className="w-4 h-4" />
                      {passengers[0].phone}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{t("Flight Summary")}</h3>
              <div className="space-y-3">
                {Object.entries(selectedFares)
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([tripIndex, fare]) => {
                    const trip = currentItinerary?.trips?.[tripIndex];
                    const flight = getFlightDetails(Number(tripIndex));
                    const airline = flight?.airline || t("EgyptAir");
                    const origin = trip?.departure || flight?.origin || t("CAI");
                    const destination = trip?.arrival || flight?.destination || t("DXB");
                    const code = fare?.code || t("ECO-123");
                    return (
                      <div key={tripIndex} className="text-sm pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                        <p className="font-semibold text-gray-900 mb-1">
                          {t("Segment")} {Number(tripIndex) + 1}
                        </p>
                        <p className="text-gray-600 flex items-center gap-1.5">
                          <span>{origin}</span> {language === "en" ? <ArrowRight /> : <ArrowLeft />}{" "}
                          <span>{destination}</span>
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {airline} • {code}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>

            {currentItinerary && <PriceSummary currentItinerary={currentItinerary} />}
          </div>
        </div>
      </div>
    </div>
  );
};
