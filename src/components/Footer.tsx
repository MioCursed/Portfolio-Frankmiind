import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { PortfolioContent } from '../data/portfolioData';

interface FooterProps {
  content: PortfolioContent;
}

export function Footer({ content }: FooterProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <footer className="border-t border-[rgba(181,188,201,0.24)] py-9 sm:py-11 bg-[#1b1c20]">
        <div className="w-[min(1360px,calc(100%-34px))] sm:w-[min(1360px,calc(100%-72px))] xl:w-[min(1360px,calc(100%-104px))] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <a
            href="#home"
            className="font-display text-[22px] font-extrabold tracking-[-0.05em] text-[#f5f6f8] whitespace-nowrap shrink-0"
          >
            {content.fullHandle}
            <span className="text-[#ff0095]">.</span>
          </a>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] sm:text-[15px] text-[#bcbec7]"
          >
            {content.footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors duration-150 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-[14px] sm:text-[15px] text-[#969aa5] whitespace-nowrap">
            © {currentYear} {content.fullHandle}
          </p>
        </div>
      </footer>

      <a
        href="#top"
        id="back-to-top"
        aria-label={content.backToTopLabel}
        title={content.backToTopLabel}
        className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 w-12 h-12 sm:w-[54px] sm:h-[54px] border border-[rgba(194,201,216,0.43)] hover:border-white bg-[#303138] text-white rounded-[13px] hover:rounded-[18px] grid place-items-center z-30 transition-all duration-200 ${
          showBackToTop
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible translate-y-2.5 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
      </a>
    </>
  );
}
