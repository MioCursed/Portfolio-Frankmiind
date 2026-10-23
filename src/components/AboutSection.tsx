import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Clock3, Timer, Wallet } from 'lucide-react';
import { PortfolioContent } from '../data/portfolioData';
import { formatBrasiliaTime } from '../utils/portfolioUtils';

interface AboutSectionProps {
  content: PortfolioContent;
}

export function AboutSection({ content }: AboutSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [localTime, setLocalTime] = useState<string>(() => formatBrasiliaTime());
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    const update = () => setLocalTime(formatBrasiliaTime());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-16 sm:py-20 lg:py-[108px] border-t border-[rgba(181,188,201,0.24)]"
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
        className="w-[min(1360px,calc(100%-34px))] sm:w-[min(1360px,calc(100%-72px))] xl:w-[min(1360px,calc(100%-104px))] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-9 sm:gap-11 lg:gap-[clamp(38px,5vw,82px)] items-stretch"
      >
        {/* Left Column: Signature Portrait Frame with edge-to-edge circular avatar */}
        <div className="border border-[rgba(194,201,216,0.43)] bg-[#222329] p-2.5 rounded-[20px] sm:rounded-[24px] flex items-stretch min-w-0 shadow-[0_14px_36px_rgba(0,0,0,0.22)]">
          <div className="relative w-full min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] rounded-[14px] sm:rounded-[16px] bg-[#141519] overflow-hidden flex flex-col items-center justify-center p-8 text-center">
            {/* Architectural isometric cube lines echoing frankmiind.carrd.co */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full opacity-[0.14] pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="frank-iso-grid"
                  width="96"
                  height="56"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M48 0L96 28L48 56L0 28Z M48 0V56"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#frank-iso-grid)" />
            </svg>

            <div className="relative z-10 flex flex-col items-center">
              {/* Avatar filling the entire circular div edge-to-edge */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden bg-white shadow-xl">
                {!avatarError ? (
                  <img
                    src={content.about.avatarSrc}
                    alt={content.about.avatarAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setAvatarError(true)}
                    className="w-full h-full rounded-full object-cover object-center block"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#1b1c20] flex items-center justify-center font-display text-3xl font-extrabold text-white">
                    FM
                  </div>
                )}
              </div>

              <p className="font-display text-[28px] sm:text-[32px] font-extrabold tracking-[-0.04em] text-[#f5f6f8] mt-6 leading-none">
                {content.brandName}
              </p>
              <p className="text-[14px] sm:text-[15px] text-[#bcbec7] mt-2">
                <span>@{content.fullHandle}</span>
                <span aria-hidden="true" className="mx-2 text-[#969aa5]">
                  ·
                </span>
                <span className="text-[#ff0095] font-semibold">{content.about.roleBadge}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Bio, Adobe Software Toolset, and Live Metadata */}
        <div className="flex flex-col justify-center min-w-0">
          <h2
            id="about-heading"
            className="font-display text-[clamp(38px,5.2vw,80px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#f5f6f8] mb-5 text-balance"
          >
            {content.about.heading.endsWith('.') ? (
              <>
                {content.about.heading.slice(0, -1)}
                <span className="text-[#ff0095]">.</span>
              </>
            ) : (
              content.about.heading
            )}
          </h2>

          <div className="space-y-3 text-[16px] sm:text-[18px] leading-[1.65] text-[#bcbec7] max-w-[54ch]">
            <p className="text-[#f5f6f8] font-medium">{content.about.bio}</p>
            <p>{content.about.bioExtra}</p>
          </div>

          {/* Software Cards with Adobe icons */}
          <div
            aria-label={content.about.toolsAriaLabel}
            className="grid grid-cols-2 gap-3 sm:gap-4 mt-8"
          >
            {content.about.tools.map((tool) => (
              <ToolCard
                key={tool.id}
                vendor={tool.vendor}
                name={tool.name}
                iconSrc={tool.iconSrc}
                iconAlt={tool.iconAlt}
              />
            ))}
          </div>

          {/* 3-Column Metadata Strip with Delivery, Payment, and Live Brasília Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            {content.about.meta.map((item) => (
              <div
                key={item.id}
                className="bg-[#282a30] border border-[rgba(181,188,201,0.24)] p-4 sm:p-[19px_16px] rounded-[16px] min-w-0"
              >
                <span className="flex items-center gap-1.5 text-[13px] sm:text-[14px] text-[#c7c9d0] mb-1.5">
                  {item.id === 'delivery' ? (
                    <Timer className="w-3.5 h-3.5 text-[#ff0095] shrink-0" aria-hidden="true" />
                  ) : (
                    <Wallet className="w-3.5 h-3.5 text-[#ff0095] shrink-0" aria-hidden="true" />
                  )}
                  <span>{item.label}</span>
                </span>
                <span className="block text-[18px] sm:text-[20px] font-bold tracking-[-0.03em] leading-[1.25] text-[#f5f6f8]">
                  {item.value}
                </span>
              </div>
            ))}

            <div className="bg-[#282a30] border border-[rgba(181,188,201,0.24)] p-4 sm:p-[19px_16px] rounded-[16px] min-w-0">
              <span className="flex items-center gap-1.5 text-[13px] sm:text-[14px] text-[#c7c9d0] mb-1.5">
                <Clock3 className="w-3.5 h-3.5 text-[#ff0095] shrink-0" aria-hidden="true" />
                <span>{content.about.brasiliaTimeLabel}</span>
              </span>
              <time
                id="local-time"
                className="block font-mono tabular-nums text-[18px] sm:text-[20px] font-semibold tracking-[-0.02em] leading-[1.25] text-[#f5f6f8] whitespace-nowrap"
              >
                {localTime}
              </time>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

interface ToolCardProps {
  vendor: string;
  name: string;
  iconSrc: string;
  iconAlt: string;
}

function ToolCard({ vendor, name, iconSrc, iconAlt }: ToolCardProps) {
  const [iconFailed, setIconFailed] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:justify-start gap-4 sm:gap-5 p-4 sm:p-5 bg-[#222329] border border-[rgba(181,188,201,0.24)] hover:border-white rounded-[18px] hover:rounded-[22px] min-h-[144px] sm:min-h-[132px] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] min-w-0">
      {/* Adobe App Icon without white frame/border */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-[16px] overflow-hidden flex items-center justify-center">
        {!iconFailed ? (
          <img
            src={iconSrc}
            alt={iconAlt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setIconFailed(true)}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full rounded-[12px] bg-[#1b1c20] flex items-center justify-center font-display text-2xl font-bold text-white">
            {name
              .split(' ')
              .map((w) => w[0])
              .join('')}
          </div>
        )}
      </div>

      <div className="min-w-0 leading-[1.25]">
        <span className="block text-[13px] sm:text-[14px] text-[#bcbec7] mb-1">
          {vendor}
        </span>
        <strong className="block text-[20px] sm:text-[24px] font-bold tracking-[-0.035em] text-[#f5f6f8] break-words">
          {name}
        </strong>
      </div>
    </div>
  );
}
