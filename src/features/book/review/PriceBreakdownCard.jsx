import { useTranslation } from "react-i18next";

export default function PriceBreakdownCard({ itinerary }) {
  const { t } = useTranslation();
  const { passengers = [], id, cabin_class } = itinerary || {};
  const passenger = passengers[0] || {};

  return (
    <div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl shadow-lg p-5 sm:p-6 text-white w-full">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">{t("Price Breakdown")}</h3>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 border-b border-primary/40 text-center sm:text-left">
          <span className="text-blue-100">{t("Base Fare")}</span>
          <span className="font-semibold text-lg">AED {passenger?.prices?.base?.toFixed(2) || "0.00"}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 border-b border-primary/40 text-center sm:text-left">
          <span className="text-blue-100">{t("Taxes & Fees")}</span>
          <span className="font-semibold text-lg">AED {passenger?.prices?.taxes?.toFixed(2) || "0.00"}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-2 text-center sm:text-left">
          <span className="text-xl font-bold">{t("Total Amount")}</span>
          <span className="text-3xl font-bold">AED {passenger?.prices?.total?.toFixed(2) || "0.00"}</span>
        </div>

        <div className="text-xs text-blue-100 mt-3 text-center sm:text-right">
          {t("Itinerary ID")}: {id || "—"} • {cabin_class || t("N/A")} {t("Class")}
        </div>
      </div>
    </div>
  );
}
