"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useApp } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function Navbar({ onToggleMobileMenu, showMobileMenu = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const { lang, setLang, theme, setTheme, isRTL, isDark } = useApp();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={
        (isDark ? "bg-slate-900 border-slate-800 shadow-sm" : "bg-white/70 border-slate-200 ") +
        " border-b sticky top-0 z-[60] backdrop-blur-md cursor-pointer"
      }
      dir={isRTL ? "rtl" : "ltr"}
      onClick={(e) => {
        // Only navigate if clicking on the header background, not on buttons
        if (e.target === e.currentTarget || e.target.closest('.header-container') === e.currentTarget.firstChild) {
          router.push("/");
        }
      }}
    >
      <div className="mx-auto flex max-w-[1350px] items-center lg:justify-between px-4 py-2.5 gap-3 header-container">
        
        {/* Mobile Menu Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleMobileMenu?.();
          }}
          className={
            (isDark
              ? " text-slate-300"
              : " text-slate-700") +
            " md:hidden transition-colors"
          }
          aria-label="Toggle menu"
        >
          {showMobileMenu ? (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = window.location.pathname.replace(/\/$/, '') || '/';
            }}
            className={
              " flex h-9 w-9 items-center justify-center hover:opacity-90 transition overflow-visible"
            }
            aria-label="Go to home"
          >
            <Image 
              src="/logo.png" 
              alt="JUST ARCHIVE Logo" 
              width={48} 
              height={48}
              className="object-contain"
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = window.location.pathname.replace(/\/$/, '') || '/';
            }}
            className={isRTL ? "text-right" : "text-left"}
          >
            <p className={(isDark ? "text-slate-100" : "text-slate-900") + " text-base font-semibold leading-tight"}>
              {t('appName')}
            </p>
            <p className={"lg:text-sm text-xs leading-tight " + (isDark ? "text-slate-400" : "text-slate-500")}>
              {t('university')}
            </p>
          </button>
        </div>

        {/* Desktop Navigation & Controls */}
        <div className="hidden md:flex items-center gap-1">
          {/* Language Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLang(lang === "en" ? "ar" : "en");
            }}
            className={
              (isDark
                ? "border-slate-800 hover:bg-slate-800/50 text-slate-300"
                : "border-slate-200 hover:bg-slate-50 text-slate-700") +
              " rounded-md px-1.5 py-1.5 text-sm font-medium flex items-center gap-1.5 transition"
            }
            aria-label={t('langToggle')}
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setTheme(isDark ? "light" : "dark");
            }}
            className={
              (isDark
                ? "border-slate-800 hover:bg-slate-800/50 text-slate-300"
                : "border-slate-200 hover:bg-slate-50 text-slate-700") +
              " rounded-md px-1.5 py-1.5 text-sm font-medium flex items-center gap-1.5 transition"
            }
            aria-label={isDark ? t('themeToggleLight') : t('themeToggleDark')}
          >
            {isDark ? (
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Favorites */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push("/favorite");
            }}
            className={
              (isDark
                ? "border-slate-800 hover:bg-slate-800/50 text-slate-300"
                : "border-slate-200 hover:bg-slate-50 text-slate-700") +
              " rounded-md px-1.5 py-1.5 text-sm font-medium flex items-center gap-1.5 transition"
            }
            aria-label="Favorites"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

      </div>


    </header>
  );
}
