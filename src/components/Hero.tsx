import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';
import { PortfolioContent, VideoProject } from '../data/portfolioData';
import { buildYoutubeThumbnailUrl } from '../utils/portfolioUtils';

interface HeroProps {
  content: PortfolioContent;
  featuredProject: VideoProject;
  onOpenCinema: (project: VideoProject) => void;
}

export function Hero({ content, featuredProject, onOpenCinema }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [thumbStage, setThumbStage] = useState<'local' | 'yt' | 'fallback'>('local');

  const resolvedThumbSrc =
    thumbStage === 'local'
      ? featuredProject.thumbnailSrc
      : buildYoutubeThumbnailUrl(featuredProject.youtubeId, 'hqdefault');

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="py-12 sm:py-16 lg:pt-[92px] lg:pb-[104px]"
    >
      <div className="w-[min(1360px,calc(100%-34px))] sm:w-[min(1360px,calc(100%-72px))] xl:w-[min(1360px,calc(100%-104px))] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] items-center gap-9 sm:gap-11 lg:gap-[clamp(36px,4.3vw,70px)]">
        {/* Left Column: Clean Human Editorial Hierarchy */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0"
        >
          {/* Role Kicker */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5">
            <p className="text-[14px] sm:text-[15px] font-medium text-[#bcbec7] tracking-[0.01em]">
              <span>@{content.fullHandle}</span>
              <span aria-hidden="true" className="mx-2 text-[#969aa5]">
                ·
              </span>
              <span className="text-[#ff0095] font-semibold tracking-wide">
                {content.kickerRole}
              </span>
            </p>
          </div>

          <h1
            id="hero-title"
            className="font-display text-[clamp(40px,4.6vw,72px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-[#f5f6f8] mb-8 text-balance"
          >
            {content.heroHeadlinePrefix}
            <span className="text-[#ff0095]">{content.heroHeadlineHighlight}</span>
            <span className="text-[#ff0095]">.</span>
          </h1>

          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href={content.heroPrimaryCta.href}
              className="min-h-[52px] sm:min-h-[56px] inline-flex items-center justify-center gap-2 px-6 py-3 text-[15px] sm:text-[16px] font-bold rounded-[14px] hover:rounded-[20px] border border-[#eee] bg-[#f4f5f7] text-[#191a1f] hover:bg-white hover:border-white hover:-translate-y-0.5 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap shrink-0"
            >
              <span>{content.heroPrimaryCta.label}</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href={content.heroSecondaryCta.href}
              className="min-h-[52px] sm:min-h-[56px] inline-flex items-center justify-center px-6 py-3 text-[15px] sm:text-[16px] font-bold rounded-[14px] hover:rounded-[20px] border border-[rgba(194,201,216,0.43)] bg-transparent text-[#f5f6f8] hover:bg-[#282a30] hover:border-white hover:-translate-y-0.5 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap shrink-0"
            >
              {content.heroSecondaryCta.label}
            </a>
          </div>
        </motion.div>

        {/* Right Column: Material 3 Expressive Framed 16:9 Showcase Preview */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#222329] border border-[rgba(194,201,216,0.43)] hover:border-white p-2 sm:p-2.5 rounded-[20px] sm:rounded-[24px] min-w-0 transition-all duration-200 shadow-[0_18px_48px_rgba(0,0,0,0.35)]"
        >
          <button
            type="button"
            onClick={() => onOpenCinema(featuredProject)}
            aria-label={`Play featured video "${featuredProject.title}"`}
            className="group relative block w-full aspect-video overflow-hidden rounded-[14px] sm:rounded-[16px] bg-[#141519] text-left cursor-pointer"
          >
            {thumbStage !== 'fallback' ? (
              <img
                src={resolvedThumbSrc}
                alt={`Preview of ${featuredProject.title} edited by Frank`}
                referrerPolicy="no-referrer"
                onError={() =>
                  setThumbStage((prev) => (prev === 'local' ? 'yt' : 'fallback'))
                }
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#1b1c20] p-6 text-center">
                <span className="font-display text-xl font-bold text-[#f5f6f8]">
                  {featuredProject.title}
                </span>
                <span className="text-sm text-[#bcbec7] mt-1">
                  {featuredProject.channelName}
                </span>
              </div>
            )}

            {/* Crisp bottom gradient scrim that keeps center of thumbnail vivid */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/75 transition-opacity duration-200"
            />

            {/* Center Material 3 Expressive Play Button (morphs squircle -> circle on hover) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-[22px] group-hover:rounded-[36px] bg-[#1b1c20]/90 backdrop-blur-md border border-white/70 flex items-center justify-center text-white shadow-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:border-white group-hover:bg-[#1b1c20]">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5 text-white" />
              </span>
            </div>

            {/* Bottom Caption inside Scrim */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[12px] sm:text-[13px] font-medium text-[#d2d4db]">
                  <span className="text-[#ff0095] font-semibold">
                    {content.heroFeaturedBadge}
                  </span>
                  <span aria-hidden="true" className="mx-1.5">
                    ·
                  </span>
                  <span>{featuredProject.channelName}</span>
                </p>
                <p className="text-[16px] sm:text-[19px] font-bold text-white truncate mt-0.5">
                  {featuredProject.title}
                </p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-[10px] bg-white/10 backdrop-blur-sm border border-white/15 text-[13px] font-semibold text-white group-hover:bg-white group-hover:text-[#191a1f] transition-all duration-200 whitespace-nowrap shrink-0">
                <span>{content.heroWatchCta}</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
