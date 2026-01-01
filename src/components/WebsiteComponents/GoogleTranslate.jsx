"use client";
import React, { useEffect, useState } from "react";

const GoogleTranslate = () => {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    // Initialize the google translate script
    const addScript = () => {
      if (document.getElementById("google-translate-script")) {
        // If script exists but window.google is not available yet, it might be loading.
        // If it is available, re-init.
        if (window.google && window.google.translate) {
          // Ensure init is called if needed, though usually automatic callback handles it.
          // window.googleTranslateElementInit(); 
        }
        return;
      }
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    // Define the callback function globally
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,bn",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    addScript();

    // Check for existing translation cookie to set initial state
    const checkCookie = () => {
      const match = document.cookie.match(/googtrans=\/en\/(bn|en)/);
      if (match) {
        setCurrentLang(match[1]);
      }
    };
    checkCookie();
  }, []);

  const toggleLanguage = () => {
    try {
      const newLang = currentLang === "en" ? "bn" : "en";
      const googleCombo = document.querySelector(".goog-te-combo");

      if (googleCombo) {
        googleCombo.value = newLang;
        googleCombo.dispatchEvent(new Event("change"));
        setCurrentLang(newLang);
      } else {
        // Fallback: Set cookie directly and reload if combo not found after script load (e.g. partially hidden or custom mode)
        // Note: Google Translate uses googtrans cookie: /SOURCE_LANG/TARGET_LANG
        document.cookie = `googtrans=/en/${newLang}; path=/`;
        // Also set domain cookie to be sure coverage is wide
        document.cookie = `googtrans=/en/${newLang}; path=/; domain=${window.location.hostname}`;
        window.location.reload();
      }
    } catch (error) {
      console.error("Error toggling language:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Google Translate Element - Hidden but present for initialization */}
      <div
        id="google_translate_element"
        className="fixed top-[-9999px] left-[-9999px] opacity-0 pointer-events-none"
      ></div>

      {/* Custom Toggle Button */}
      <button
        onClick={toggleLanguage}
        className={`lang-toggle-btn border transition-all duration-300 flex items-center gap-2 h-9 px-3 rounded-md text-black border-gray-400 hover:bg-gray-100`}
      >
        <span className={`${currentLang === "en" ? "font-bold" : "opacity-60"} notranslate`}>EN</span>
        <span className="opacity-40">|</span>
        <span className={`${currentLang === "bn" ? "font-bold" : "opacity-60"} notranslate`}>
          বাংলা
        </span>
      </button>
      <style jsx global>{`
                /* Ensure Google Top Bar is hidden */
                .goog-te-banner-frame.skiptranslate {
                    display: none !important;
                }
                body {
                    top: 0px !important;
                }
                /* Hide the google translate element just in case */
                #google_translate_element {
                    display: none;
                }
                /* Hide tooltips */
                .goog-tooltip {
                    display: none !important;
                }
                .goog-tooltip:hover {
                    display: none !important;
                }
                .goog-text-highlight {
                    background-color: transparent !important;
                    border: none !important; 
                    box-shadow: none !important;
                }
            `}</style>
    </div>
  );
};

export default GoogleTranslate;