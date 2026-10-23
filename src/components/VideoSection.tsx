import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  Captions,
  Maximize2,
  Play,
  Scissors,
  Volume2,
} from 'lucide-react';
import { PortfolioContent, ShortFormHighlight, VideoProject } from '../data/portfolioData';
import { buildYoutubeEmbedUrl, buildYoutubeThumbnailUrl } from '../utils/portfolioUtils';

interface VideoThumbnailPlayerProps {
  project: VideoProject;
  aspectClassName: string;
}

function VideoThumbnailPlayer({ project, aspectClassName }: VideoThumbnailPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbStage, setThumbStage] = useState<'local' | 'yt' | 'fallback'>('local');

  const resolvedThumbSrc =
    thumbStage === 'local'
      ? project.thumbnailSrc
      : buildYoutubeThumbnailUrl(project.youtubeId, 'hqdefault');

  const isVertical = project.aspectRatio === '9:16';

  return (
    <div
      className={`relative w-full ${aspectClassName} rounded-[12px] sm:rounded-[14px] overflow-hidden bg-[#121316]`}
    >
      {!isPlaying ? (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={`Play ${project.title} inline`}
          className="group relative w-full h-full block text-left cursor-pointer overflow-hidden focus:outline-none"
        >
          {thumbStage !== 'fallback' ? (
            <img
              src={resolvedThumbSrc}
              alt={`Thumbnail preview for ${project.title}`}
              referrerPolicy="no-referrer"
              onError={() =>
                setThumbStage((prev) => (prev === 'local' ? 'yt' : 'fallback'))
              }
              className={`w-full h-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isVertical
                  ? 'scale-[1.36] group-hover:scale-[1.4]'
                  : 'scale-100 group-hover:scale-[1.03]'
              }`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#1b1c20] p-6 text-center">
              <span className="font-display text-lg font-bold text-[#f5f6f8]">
                {project.title}
              </span>
              <span className="text-xs text-[#bcbec7] mt-1">{project.channelName}</span>
            </div>
          )}

          {/* Subtle cinematic contrast veil that keeps the full thumbnail artwork crisp and readable */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-200"
          />

          {/* Center Material 3 Expressive Play Button (morphs squircle -> circle on hover) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="w-15 h-15 sm:w-16 sm:h-16 rounded-[20px] group-hover:rounded-[32px] bg-[#1b1c20]/90 backdrop-blur-md border border-white/70 flex items-center justify-center text-white shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:border-white group-hover:bg-[#1b1c20]">
              <Play className="w-6 h-6 fill-current ml-0.5 text-white" />
            </span>
          </div>
        </button>
      ) : (
        <iframe
          src={buildYoutubeEmbedUrl(project.youtubeId, true)}
          title={`${project.formatBadge} — ${project.title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="relative z-10 w-full h-full border-0"
        />
      )}
    </div>
  );
}

function HighlightIcon({ type }: { type: ShortFormHighlight['icon'] }) {
  if (type === 'scissors') {
    return <Scissors className="w-4 h-4 text-[#ff0095]" aria-hidden="true" />;
  }
  if (type === 'captions') {
    return <Captions className="w-4 h-4 text-[#ff0095]" aria-hidden="true" />;
  }
  return <Volume2 className="w-4 h-4 text-[#ff0095]" aria-hidden="true" />;
}

interface ShortFormSectionProps {
  content: PortfolioContent;
  project: VideoProject;
  onOpenCinema: (project: VideoProject) => void;
}

export function ShortFormSection({ content, project, onOpenCinema }: ShortFormSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const { shortFormBreakdown } = content;

  return (
    <section
      id="short"
      aria-labelledby="short-heading"
      className="py-16 sm:py-20 lg:py-[104px] border-t border-[rgba(181,188,201,0.24)]"
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-[min(1360px,calc(100%-34px))] sm:w-[min(1360px,calc(100%-72px))] xl:w-[min(1360px,calc(100%-104px))] mx-auto"
      >
        {/* Section Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-11">
          <div>
            <p className="text-[13px] sm:text-[14px] font-medium text-[#969aa5] mb-2">
              <span className="text-[#ff0095] font-semibold tracking-wide">
                {project.formatBadge}
              </span>
              <span aria-hidden="true" className="mx-2 text-[#969aa5]">
                ·
              </span>
              <span className="text-[#d2d4db]">{project.channelName}</span>
            </p>
            <h2
              id="short-heading"
              className="font-display text-[clamp(38px,5.2vw,80px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#f5f6f8] text-balance"
            >
              {project.sectionHeading.endsWith('.') ? (
                <>
                  {project.sectionHeading.slice(0, -1)}
                  <span className="text-[#ff0095]">.</span>
                </>
              ) : (
                project.sectionHeading
              )}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenCinema(project)}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-[14px] font-semibold text-[#f5f6f8] bg-[#222329] border border-[rgba(194,201,216,0.43)] rounded-[12px] hover:rounded-[18px] hover:bg-[#282a30] hover:border-white transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4 text-white" aria-hidden="true" />
              <span>{shortFormBreakdown.cinemaViewLabel}</span>
            </button>

            <a
              href={project.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] text-[14px] font-semibold text-[#d2d4db] hover:text-white border border-[rgba(181,188,201,0.24)] hover:border-white rounded-[12px] hover:rounded-[18px] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap shrink-0"
            >
              <span>{shortFormBreakdown.watchOnYoutubeLabel}</span>
              <ArrowUpRight className="w-4 h-4 text-[#bcbec7]" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Dedicated 9:16 Vertical Showcase + Human Editorial Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-[330px_minmax(0,1fr)] xl:grid-cols-[350px_minmax(0,1fr)] gap-7 lg:gap-10 items-center">
          {/* Left Column: Authentic 9:16 Vertical Studio Frame */}
          <figure className="m-0 bg-[#222329] border border-[rgba(194,201,216,0.43)] hover:border-white p-2.5 sm:p-3 rounded-[20px] sm:rounded-[24px] transition-all duration-200 flex flex-col justify-between max-w-[350px] w-full mx-auto lg:mx-0 shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
            <VideoThumbnailPlayer project={project} aspectClassName="aspect-[9/16]" />

            <figcaption className="pt-3.5 pb-1 px-1.5 flex items-center justify-between gap-2 text-[14px]">
              <div className="flex items-center gap-2 min-w-0 truncate">
                <span className="font-semibold text-[#f5f6f8] truncate">{project.title}</span>
                <span aria-hidden="true" className="text-[#969aa5]">
                  ·
                </span>
                <a
                  href={project.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#bcbec7] hover:text-white underline-offset-4 hover:underline transition-colors duration-150 truncate"
                >
                  @frankmiind
                </a>
              </div>

              <a
                href={project.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[13px] font-medium text-[#969aa5] hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <span>Shorts</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#969aa5]" aria-hidden="true" />
              </a>
            </figcaption>
          </figure>

          {/* Right Column: Clean, Human-Authored Short-Form Card */}
          <div className="bg-[#222329] border border-[rgba(194,201,216,0.43)] rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-[9px] bg-[#282a30] border border-[rgba(181,188,201,0.22)] text-[12px] font-semibold text-[#f5f6f8] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff0095]" aria-hidden="true" />
                <span>{shortFormBreakdown.eyebrow}</span>
              </span>

              <h3 className="font-display text-[clamp(24px,2.7vw,36px)] font-extrabold leading-[1.12] tracking-[-0.025em] text-[#f5f6f8] mb-3 text-balance">
                {shortFormBreakdown.headline.endsWith('.') ? (
                  <>
                    {shortFormBreakdown.headline.slice(0, -1)}
                    <span className="text-[#ff0095]">.</span>
                  </>
                ) : (
                  shortFormBreakdown.headline
                )}
              </h3>

              <p className="text-[15px] sm:text-[17px] leading-[1.6] text-[#bcbec7] max-w-[56ch] mb-7">
                {shortFormBreakdown.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {shortFormBreakdown.highlights.map((item) => (
                  <div
                    key={item.index}
                    className="bg-[#1b1c20]/80 border border-[rgba(181,188,201,0.22)] hover:border-white/60 rounded-[16px] hover:rounded-[20px] p-4 sm:p-5 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-8 h-8 rounded-[10px] bg-[#222329] border border-[rgba(181,188,201,0.22)] grid place-items-center">
                        <HighlightIcon type={item.icon} />
                      </span>
                      <span className="font-mono text-[12px] font-semibold text-[#ff0095]">
                        {item.index}
                      </span>
                    </div>
                    <h4 className="font-display text-[16px] font-bold text-[#f5f6f8] mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-[13px] sm:text-[14px] leading-[1.5] text-[#bcbec7]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

interface LongFormCardProps {
  project: VideoProject;
  cinemaViewLabel: string;
  directLinkLabel: string;
  onOpenCinema: (project: VideoProject) => void;
}

function LongFormVideoCard({
  project,
  cinemaViewLabel,
  directLinkLabel,
  onOpenCinema,
}: LongFormCardProps) {
  return (
    <figure className="m-0 bg-[#222329] border border-[rgba(194,201,216,0.43)] hover:border-white p-2.5 sm:p-3.5 rounded-[18px] sm:rounded-[22px] transition-all duration-200 flex flex-col justify-between shadow-[0_14px_36px_rgba(0,0,0,0.25)]">
      {/* Top Card Header with Creator Info & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 px-1">
        <div className="min-w-0">
          <p className="text-[13px] sm:text-[14px] font-medium text-[#bcbec7] truncate flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff0095] shrink-0" aria-hidden="true" />
            <span className="text-[#f5f6f8] font-semibold">{project.channelName}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onOpenCinema(project)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] text-[13px] font-semibold text-[#f5f6f8] bg-[#1b1c20] border border-[rgba(194,201,216,0.43)] rounded-[10px] hover:rounded-[15px] hover:bg-[#282a30] hover:border-white transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5 text-white" aria-hidden="true" />
            <span>{cinemaViewLabel}</span>
          </button>

          <a
            href={project.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch ${project.title} on YouTube`}
            className="inline-flex items-center gap-1 px-3 py-1.5 min-h-[36px] text-[13px] font-semibold text-[#d2d4db] hover:text-white border border-[rgba(181,188,201,0.24)] hover:border-white rounded-[10px] hover:rounded-[15px] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap"
          >
            <span>YouTube</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#bcbec7]" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* 16:9 Interactive High-Res Thumbnail Preview -> Embedded Player */}
      <VideoThumbnailPlayer project={project} aspectClassName="aspect-video" />

      {/* Bottom Caption */}
      <figcaption className="pt-3.5 pb-1 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[14px] sm:text-[15px]">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
          <span className="font-semibold text-[#f5f6f8] truncate">{project.title}</span>
          <span aria-hidden="true" className="text-[#969aa5]">
            ·
          </span>
          <a
            href={project.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#bcbec7] hover:text-white underline-offset-4 hover:underline transition-colors duration-150 shrink-0"
          >
            {project.channelName}
          </a>
        </div>

        <a
          href={project.watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-[#969aa5] hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0"
        >
          <span>{directLinkLabel}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#969aa5]" aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  );
}

interface LongFormSectionProps {
  content: PortfolioContent;
  projects: VideoProject[];
  onOpenCinema: (project: VideoProject) => void;
}

export function LongFormSection({ content, projects, onOpenCinema }: LongFormSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const { longFormUI } = content;

  return (
    <section
      id="long"
      aria-labelledby="long-heading"
      className="py-16 sm:py-20 lg:py-[104px] border-t border-[rgba(181,188,201,0.24)]"
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-[min(1360px,calc(100%-34px))] sm:w-[min(1360px,calc(100%-72px))] xl:w-[min(1360px,calc(100%-104px))] mx-auto"
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-11">
          <div>
            <p className="text-[13px] sm:text-[14px] font-medium text-[#969aa5] mb-2">
              <span className="text-[#ff0095] font-semibold tracking-wide">
                {longFormUI.eyebrow}
              </span>
              <span aria-hidden="true" className="mx-2 text-[#969aa5]">
                ·
              </span>
              <span className="text-[#d2d4db]">
                {projects.map((p) => p.channelName).join(' & ')}
              </span>
            </p>
            <h2
              id="long-heading"
              className="font-display text-[clamp(38px,5.2vw,80px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#f5f6f8] text-balance"
            >
              {longFormUI.heading.endsWith('.') ? (
                <>
                  {longFormUI.heading.slice(0, -1)}
                  <span className="text-[#ff0095]">.</span>
                </>
              ) : (
                longFormUI.heading
              )}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-8">
          {projects.map((project) => (
            <LongFormVideoCard
              key={project.id}
              project={project}
              cinemaViewLabel={longFormUI.cinemaViewLabel}
              directLinkLabel={longFormUI.directLinkLabel}
              onOpenCinema={onOpenCinema}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
