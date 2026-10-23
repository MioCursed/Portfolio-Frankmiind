import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Globe } from 'lucide-react';
import { Locale, PortfolioContent } from '../data/portfolioData';

interface HeaderProps {
  content: PortfolioContent;
  locale: Locale;
  onToggleLocale: (nextLocale: Locale) => void;
}

export function Header({ content, locale, onToggleLocale }: HeaderProps) {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [spinCount, setSpinCount] = useState<number>(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const sectionIds = ['home', 'short', 'long', 'about', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.2, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const nextLocale: Locale = locale === 'en-US' ? 'pt-BR' : 'en-US';
  const shortCode = locale === 'en-US' ? 'EN' : 'BR';

  const handleLanguageClick = () => {
    setSpinCount((prev) => prev + 1);
    onToggleLocale(nextLocale);
  };

  return (
    <header className="bg-[#1b1c20]/95 backdrop-blur-md border-b border-[rgba(181,188,201,0.24)] lg:sticky lg:top-0 z-30">
      <div className="w-[min(1360px,calc(100%-34px))] sm:w-[min(1360px,calc(100%-72px))] xl:w-[min(1360px,calc(100%-104px))] mx-auto min-h-[76px] lg:h-[83px] py-3.5 lg:py-0 flex flex-wrap lg:flex-nowrap items-center justify-between gap-x-6 gap-y-3">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          aria-label="FrankMiind, home"
          className="font-display text-[26px] sm:text-[29px] font-extrabold tracking-[-0.06em] leading-none text-[#f5f6f8] whitespace-nowrap shrink-0 transition-opacity duration-150 hover:opacity-90"
        >
          {content.brandName}
          <span className="text-[#ff0095]">.</span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Main navigation"
          className="order-3 lg:order-2 w-full lg:w-auto flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-0.5"
        >
          {content.navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={`group relative py-1 text-[15px] sm:text-[16px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                  isActive ? 'text-white' : 'text-[#d2d4db] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-0 right-0 bottom-0 h-[2px] rounded-full origin-left transition-transform duration-150 ${
                    isActive
                      ? 'scale-x-100 bg-[#ff0095]'
                      : 'scale-x-0 group-hover:scale-x-100 bg-white'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Language Switcher (Animated Globe + EN/BR) + Primary Contact CTA */}
        <div className="order-2 lg:order-3 flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={handleLanguageClick}
            aria-label={content.languageToggleAriaLabel}
            title={content.languageToggleAriaLabel}
            className="group inline-flex items-center gap-2 px-3 py-2 min-h-[42px] bg-[#222329] hover:bg-[#282a30] border border-[rgba(194,201,216,0.43)] hover:border-white rounded-[12px] hover:rounded-[18px] text-[13px] font-bold text-[#f5f6f8] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer shrink-0 overflow-hidden"
          >
            <motion.span
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      rotate: spinCount * 360,
                      scale: [1, 1.18, 1],
                    }
              }
              transition={{
                duration: 0.48,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-6 h-6 rounded-full bg-[#1b1c20] border border-[rgba(181,188,201,0.28)] group-hover:border-[#ff0095] grid place-items-center text-[#ff0095] transition-colors duration-200"
            >
              <Globe className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
            </motion.span>

            <span className="relative inline-flex items-center justify-center w-[22px] h-5 overflow-hidden font-mono text-[13px] font-bold tracking-tight text-[#f5f6f8]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={shortCode}
                  initial={prefersReducedMotion ? { opacity: 1 } : { y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { y: -12, opacity: 0 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="block leading-none"
                >
                  {shortCode}
                </motion.span>
              </AnimatePresence>
            </span>
          </button>

          <a
            href="#contact"
            aria-current={activeSection === 'contact' ? 'true' : undefined}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-[14px] sm:text-[15px] font-semibold text-white border rounded-[12px] hover:rounded-[18px] hover:border-white hover:bg-[#282a30] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap shrink-0 min-h-[42px] ${
              activeSection === 'contact'
                ? 'border-white bg-[#282a30]'
                : 'border-[rgba(194,201,216,0.43)]'
            }`}
          >
            <span>{content.headerContactLabel}</span>
            <ArrowUpRight className="w-4 h-4 text-[#bcbec7]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
