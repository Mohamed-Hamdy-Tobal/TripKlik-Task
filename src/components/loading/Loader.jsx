import "./Loader.css";

function Loader({ size = "lg", variation, loader, className = "" }) {
  const variationClasses = {
    danger: "loader-danger",
    warning: "loader-warning",
    success: "loader-success",
    info: "loader-info",
    default: "loader-primary",
  };

  const sizeClasses = {
    sm: "loader-sm",
    md: "loader-md",
    lg: "loader-lg",
    full: "loader-full",
  };

  const chosenVariation = variationClasses[variation] || variationClasses.default;
  const chosenSize = sizeClasses[size] || sizeClasses.lg;

  if (loader) {
    return <div className={`loader ${chosenVariation} ${chosenSize} ${className}`} />;
  }

  if (size === "sm" || size === "md" || size === "lg" || size === "full") {
    return (
      <div
        className={`w-full flex items-center justify-center ${
          size === "full" ? "min-h-[100vh]" : "min-h-[100px]"
        } bg-white bg-opacity-75 z-50`}
      >
        <div className={`loader ${chosenVariation} ${chosenSize}`} />
      </div>
    );
  }

  return null;
}

export default Loader;
