import { useTranslation } from "react-i18next";

const PriceSummary = ({ currentItinerary }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl shadow-lg p-6 text-white sticky top-6">
      <h3 className="text-lg font-bold mb-4">{t("Payment Summary")}</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-indigo-100">{t("Base Fare")}</span>
          <span className="font-semibold">
            {t("AED")} {currentItinerary?.passengers[0].prices.base.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm pb-3 border-b border-indigo-400/30">
          <span className="text-indigo-100">{t("Taxes & Fees")}</span>
          <span className="font-semibold">
            {t("AED")} {currentItinerary?.passengers[0].prices.taxes.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-bold">Total</span>
          <span className="text-2xl font-bold">
            {t("AED")} {currentItinerary?.passengers[0].prices.total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;
