import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const FareCard = ({ fare, isSelected, onSelect, isDisabled }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  return (
    <div
      onClick={() => !isDisabled && onSelect()}
      className={`
      p-4 rounded-lg border-2 cursor-pointer transition-all relative
      ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300 bg-white"}
      ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}
    `}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-bold text-lg mb-2">{fare?.code}</h4>
          <div className="space-y-1">
            {fare?.amenities?.map((amenity, i) => (
              <p key={i} className="text-xs text-gray-600">
                {amenity?.free ? "✓" : "+"} {amenity?.description}
              </p>
            ))}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-primary">
            {t("AED")} {fare?.starts_from_price.toFixed(2)}
          </div>
          {isSelected && (
            <div className={`absolute bottom-1 ${language === "en" ? "right-3" : "left-3"}`}>
              <Check className="w-6 h-6 text-white bg-primary rounded-full p-1" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FareCard;
