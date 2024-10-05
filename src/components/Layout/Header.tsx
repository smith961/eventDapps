import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUser, FaGlobe, FaBars } from "react-icons/fa"; // Icons
import classNames from "classnames"; // For conditional classes
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"; // Shadcn UI Sheet
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State for sheet

  // Detect scrolling for background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Conditional class for background blur and shadow on scroll
  const headerClass = classNames(
    "fixed top-0 left-0 w-full z-50 transition-all",
    {
      "bg-transparent shadow-lg backdrop-blur-lg": scrolled,
      "bg-white": !scrolled,
    }
  );

  return (
    <header className={headerClass}>
      <div className="container flex items-center justify-between p-4 mx-auto">
        {/* Logo */}
        <Link to="/">
          <div className="text-2xl font-bold">Eventos</div>
        </Link>

        {/* Desktop Navigation Links (hidden on mobile) */}
        <nav className="hidden space-x-6 md:flex">
          <NavLink to="/" label="Home" icon={<FaHome />} location={location} />
          <NavLink
            to="/events"
            label="Events"
            icon={<FaCalendarAlt />}
            location={location}
          />
          {
            address && <NavLink
            to="/profile"
            label="Profile"
            icon={<FaUser />}
            location={location}
          />
          }
        </nav>

        {/* Mobile Menu Button and Connect Wallet */}
        <div className="flex items-center space-x-4">
          {/* Connect Wallet Button (Full text for desktop, icon-only for mobile) */}
          {address ? (
            <ConnectButton />
          ) : (
            <button
              onClick={openConnectModal}
              className="flex items-center px-4 py-2 text-white transition bg-black rounded-lg shadow-lg hover:bg-gray-800"
            >
              <FaGlobe className="mr-2 " />
              <span className=" md:inline">Connect Wallet</span>{" "}
              {/* Hide text on mobile */}
            </button>
          )}

          {/* Mobile Navigation Menu Trigger (Hamburger Menu) */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="text-2xl focus:outline-none md:hidden">
                <FaBars />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4">
              <h1 className="mb-12 text-2xl font-bold">Eventos </h1>
              <nav className="flex flex-col items-center space-y-4">
                <NavLink
                  to="/"
                  label="Home"
                  icon={<FaHome />}
                  location={location}
                />
                <NavLink
                  to="/events"
                  label="Events"
                  icon={<FaCalendarAlt />}
                  location={location}
                />
               {address &&  <NavLink
                  to="/profile"
                  label="Profile"
                  icon={<FaUser />}
                  location={location}
                />}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

// Reusable NavLink Component for active styles
interface NavLinkProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  location: { pathname: string };
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, icon, location }) => {
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={classNames(
        "flex items-center text-lg font-semibold transition-colors pb-2",
        {
          "text-black border-b-2 border-black": isActive,
          "text-gray-500 hover:text-gray-800": !isActive,
        }
      )}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Link>
  );
};

export default Header;
