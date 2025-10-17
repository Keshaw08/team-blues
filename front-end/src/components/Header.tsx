import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    } else {
      navigate("/");
    }
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Marathon Details", id: "marathon" },
    { label: "Latest News", id: "news" },
    { label: "Gallery", id: "gallery" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <div className="flex flex-col">
              <span className="text-blue-600">Team Blues</span>
              <span className="text-xs text-gray-600">Fitness Club</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => navigate("/about")}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About Us
            </button>
            <Button
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSeNJVOjnBAlkMTV47URue1G4eU1y1UOPmgiglA11IoULqRtPw/viewform?usp=dialog",
                  "_blank"
                )
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              Register
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 hover:text-blue-600 transition-colors text-left"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => navigate("/about")}
              className="text-gray-700 hover:text-blue-600 transition-colors text-left"
            >
              About Us
            </button>
            <Button
              onClick={() => scrollToSection("marathon")}
              className="bg-blue-600 hover:bg-blue-700 w-full"
            >
              Register
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
