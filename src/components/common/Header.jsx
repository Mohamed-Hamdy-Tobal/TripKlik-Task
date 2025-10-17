import { Menu, Plane, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Container from "../layout/Container";
import LanguageChanger from "./LanguageChanger";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Flights", path: "/" },
    { name: "Hotels", path: "/" },
    { name: "Deals", path: "/" },
    { name: "My Trips", path: "/" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-primary to-blue-700 p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <Plane className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                {t("Travel")}
              </h1>
              <p className="text-xs text-gray-600 font-medium">{t("Your Journey Starts Here")}</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-primary font-medium transition-colors relative group"
              >
                {t(link.name)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageChanger />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg font-medium transition-colors"
                >
                  {t(link.name)}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
