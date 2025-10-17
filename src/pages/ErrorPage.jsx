import { Link } from "react-router-dom";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-2xl">
        <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-6" />

        <h1 className="text-4xl font-bold text-text mb-4">{t("Oops! Something went wrong")}</h1>

        <p className="text-lg text-text/70 mb-6">{t("We encountered an unexpected error while loading the page.")}</p>

        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button size="lg">
              <Home className="w-4 h-4 mr-2" />
              {t("Go Home")}
            </Button>
          </Link>

          <Button size="lg" variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("Reload Page")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
