import Loader from "@/components/loading/Loader";
import { Button as ShadcnButton } from "@/components/ui/button";

function CustomButton({
  children,
  className = "",
  isLoading,
  disabled,
  intent = "primary", // primary | secondary | success | danger | warning | info | neutral
  variant = "solid", // solid | outline | ghost | link
  size = "md", // sm | md | lg
  shape = "rounded", // rounded | sharp | pill
  fullWidth = false,
  variation,
  cursor = "pointer",
  ...props
}) {
  if (variation) {
    if (variation === "danger") intent = "danger";
    if (variation === "info") intent = "info";
    if (variation === "warning") intent = "warning";
    if (variation === "outline") variant = "outline";
    if (variation === "outline-main") {
      variant = "outline";
      intent = "primary";
    }
  }

  const baseClass =
    "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

  const sizeClass =
    {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-11 px-5 text-base",
    }[size] || "h-10 px-4 text-sm";

  const shapeClass = shape === "sharp" ? "rounded-none" : shape === "pill" ? "rounded-full" : "rounded-lg";

  const intentSolid = {
    primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary",
    secondary: "bg-secondary text-text hover:bg-secondary/90 focus:ring-secondary",
    success: "bg-emerald-600 text-white hover:bg-emerald-600/90 focus:ring-emerald-600",
    danger: "bg-red-600 text-white hover:bg-red-600/90 focus:ring-red-600",
    warning: "bg-amber-500 text-white hover:bg-amber-500/85 focus:ring-amber-500",
    info: "bg-sky-600 text-white hover:bg-sky-600/90 focus:ring-sky-600",
    neutral: "bg-gray-200 text-gray-900 hover:bg-gray-200/80 focus:ring-gray-300",
  };

  const intentOutline = {
    primary: "border border-primary text-primary hover:bg-primary/5 focus:ring-primary",
    secondary: "border border-secondary text-text hover:bg-secondary/20 focus:ring-secondary",
    success: "border border-emerald-600 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-600",
    danger: "border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-600",
    warning: "border border-amber-500 text-amber-600 hover:bg-amber-50 focus:ring-amber-500",
    info: "border border-sky-600 text-sky-600 hover:bg-sky-50 focus:ring-sky-600",
    neutral: "border border-gray-300 text-gray-900 hover:bg-gray-100 focus:ring-gray-300",
  };

  const intentGhost = {
    primary: "text-primary hover:bg-primary/5 focus:ring-primary",
    secondary: "text-text hover:bg-secondary/20 focus:ring-secondary",
    success: "text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-600",
    danger: "text-red-600 hover:bg-red-50 focus:ring-red-600",
    warning: "text-amber-600 hover:bg-amber-50 focus:ring-amber-500",
    info: "text-sky-600 hover:bg-sky-50 focus:ring-sky-600",
    neutral: "text-gray-900 hover:bg-gray-100 focus:ring-gray-300",
  };

  const variantClass =
    variant === "outline"
      ? intentOutline[intent] || intentOutline.primary
      : variant === "ghost"
        ? intentGhost[intent] || intentGhost.primary
        : variant === "link"
          ? "bg-transparent underline underline-offset-4 text-primary hover:text-primary/80 focus:ring-primary"
          : intentSolid[intent] || intentSolid.primary;

  const widthClass = fullWidth ? "w-full" : "";

  const cursorClass = `cursor-${cursor}`;

  const composedClassName = [baseClass, sizeClass, shapeClass, variantClass, cursorClass, widthClass, className]
    .filter(Boolean)
    .join(" ");

  const shadcnVariant = intent === "danger" && variant === "solid" ? "destructive" : "default";

  return (
    <ShadcnButton disabled={isLoading || disabled} variant={shadcnVariant} className={composedClassName} {...props}>
      {children}
      {isLoading && <Loader loader size="sm" />}
    </ShadcnButton>
  );
}

export default CustomButton;
