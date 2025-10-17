import { useTranslation } from "react-i18next";
import Container from "../layout/Container";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <Container>
        <div className="text-center">
          <p className="text-gray-400">{t("© 2025 Flight Booking System. All rights reserved.")}</p>
          <p className="text-gray-500 text-sm mt-2">{t("Need help? Contact support@flightbooking.com")}</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
