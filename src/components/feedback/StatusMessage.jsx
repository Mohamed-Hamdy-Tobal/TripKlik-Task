import { AlertCircle, Info, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const variants = {
  error: {
    icon: XCircle,
    bg: "bg-red-50",
    text: "text-red-700",
  },
  warning: {
    icon: AlertCircle,
    bg: "bg-yellow-50",
    text: "text-yellow-700",
  },
  success: {
    icon: CheckCircle2,
    bg: "bg-green-50",
    text: "text-green-700",
  },
  info: {
    icon: Info,
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  empty: {
    icon: Info,
    bg: "bg-gray-50",
    text: "text-gray-700",
  },
};

export default function StatusMessage({ variant = "info", message }) {
  const { t } = useTranslation();
  const { icon: Icon, bg, text } = variants[variant] || variants.info;

  return (
    <div className={cn("p-6 rounded-lg flex items-center gap-3 shadow-sm border", bg, text)}>
      <Icon className="w-5 h-5 shrink-0" />
      <span className="text-sm font-medium">{t(message)}</span>
    </div>
  );
}
