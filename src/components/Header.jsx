import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/HomeLogo.png";
import profileIcon from "../assets/profile-circle_svgrepo.com.svg";

function Header() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setMobileMenuOpen(false);
  };

  const isAuthenticated = !!localStorage.getItem("access");

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access");
      const response = await fetch("https://survey-ink.com/api/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        localStorage.removeItem("access");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target)
      ) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutsideMobile = (e) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest("select")
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideMobile);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideMobile);
  }, [mobileMenuOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About us" },
    { to: "/contact", label: "Contact us" },
  ];

  const authLinks = [
    { to: "/login", label: "Login" },
    { to: "/signup", label: "Sign Up" },
  ];

  const isArabic = i18n.language === "ar";
  const logoOrder = isArabic ? 3 : 1;
  const navOrder = 2;
  const authOrder = isArabic ? 1 : 3;

  const displayedNavLinks = isArabic ? [...navLinks].reverse() : navLinks;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-5 h-16 bg-white flex items-center justify-between ${
        isArabic ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className={`flex-shrink-0 order-${logoOrder}`}>
        <img src={logo} alt="Logo" className="h-9 w-auto" />
      </div>

      <nav
        className={`hidden md:flex gap-8 order-${navOrder} mx-auto ${
          isArabic ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {displayedNavLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.to}
            className="uppercase text-black font-medium hover:border-b-2 border-black transition-all"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={`hidden md:flex items-center gap-4 order-${authOrder}`}>
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          value={i18n.language}
          className="border border-black px-2 py-1 text-black"
        >
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>

        {isAuthenticated ? (
          <div className="relative" ref={profileMenuRef}>
            <img
              src={profileIcon}
              alt="Profile"
              className="w-10 h-10 cursor-pointer"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            />
            {profileMenuOpen && (
              <div
                className={`absolute ${
                  isArabic ? "left-0" : "right-0"
                } top-12 w-36 bg-white shadow-md rounded-md overflow-hidden`}
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          authLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              className="px-3 py-1 border border-transparent rounded hover:border-black uppercase font-medium"
            >
              {link.label}
            </Link>
          ))
        )}
      </div>

      <div className={`md:hidden order-${isArabic ? 1 : 3}`}>
        <button
          className="text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed left-0 right-0 top-16 bottom-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className={`absolute top-full ${
            isArabic ? "left-5" : "right-5"
          } w-64 bg-white p-4 flex flex-col gap-4 shadow-md rounded-b-md z-50 ${
            isArabic ? "text-right" : "text-left"
          }`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          {navLinks.map((link, index) => (
            <Link
              key={`mnav-${index}`}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="text-black font-medium text-lg"
            >
              {link.label}
            </Link>
          ))}

          <hr className="border-gray-300 my-2" />

          <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className="bg-white text-black border border-black px-2 py-1"
          >
            <option value="en">EN</option>
            <option value="ar">AR</option>
          </select>

          {isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-black"
              >
                Profile
              </Link>
              <button
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleLogout(e);
                }}
                className="block py-2 text-black w-full text-left"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {authLinks.map((link, index) => (
                <Link
                  key={`mauth-${index}`}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-black"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
