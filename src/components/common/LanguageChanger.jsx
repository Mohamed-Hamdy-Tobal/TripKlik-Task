import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { EgyptIcon, USIcon } from "./Icons";
import { GlobeIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/helpers/useLanguage";
import { FONT_FAMILIES } from "@/config/constants";

const LanguageChanger = () => {
  const {
    i18n: { language },
  } = useTranslation();

  const { setLanguage } = useLanguage();

  const changeLanguage = (language) => {
    setLanguage(language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outlined" className="text-black font-medium transition-all hover:text-black/70 p-0">
          <GlobeIcon style={{ width: "20px", height: "20px" }} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          style={{ fontFamily: FONT_FAMILIES.en }}
          className={`flex gap-2 ${language === "en" ? "bg-primary text-white" : ""} hover:bg-primary/10`}
          onClick={() => changeLanguage("en")}
        >
          <USIcon />
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          style={{ fontFamily: FONT_FAMILIES.ar }}
          className={`flex gap-2 ${language === "ar" ? "bg-primary text-white" : ""}`}
          onClick={() => changeLanguage("ar")}
        >
          <EgyptIcon /> العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageChanger;
