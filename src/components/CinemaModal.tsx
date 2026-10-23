import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { VideoProject } from '../data/portfolioData';
import { buildYoutubeEmbedUrl } from '../utils/portfolioUtils';

interface CinemaModalProps {
  project: VideoProject | null;
  closeAriaLabel?: string;
  onClose: () => void;
}

export function CinemaModal({
  project,
  closeAriaLabel = 'Close cinema view',
  onClose,
}: CinemaModalProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const isVertical = project?.aspectRatio === '9:16';

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cinema-modal-title"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full ${
              isVertical ? 'max-w-[430px]' : 'max-w-[1120px]'
            } bg-[#222329] border border-[rgba(194,201,216,0.43)] rounded-[16px] p-3 sm:p-5 shadow-2xl`}
          >
            <div className="flex items-center justify-between gap-4 pb-3.5 px-1">
              <div className="min-w-0">
                <p className="text-[12px] sm:text-[13px] text-[#bcbec7] truncate">
                  <span className="text-[#ff0095] font-semibold">{project.formatBadge}</span>
                  <span aria-hidden="true" className="mx-1.5">
                    ·
                  </span>
                  <span>{project.channelName}</span>
                  {project.note && (
                    <>
                      <span aria-hidden="true" className="mx-1.5">
                        ·
                      </span>
                      <span>{project.note}</span>
                    </>
                  )}
                </p>
                <h3
                  id="cinema-modal-title"
                  className="font-display text-[18px] sm:text-[22px] font-bold text-[#f5f6f8] truncate"
                >
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href={project.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[42px] text-[13px] font-semibold text-[#d2d4db] hover:text-white border border-[rgba(181,188,201,0.24)] hover:border-white rounded-[9px] transition-colors duration-150 whitespace-nowrap"
                >
                  <span>YouTube</span>
                  <ArrowUpRight className="w-4 h-4 text-[#bcbec7]" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label={closeAriaLabel}
                  className="w-[42px] h-[42px] rounded-[9px] bg-[#282a30] border border-[rgba(194,201,216,0.43)] hover:border-white text-white grid place-items-center transition-colors duration-150 cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              className={`w-full ${
                isVertical ? 'aspect-[9/16] max-h-[75vh] mx-auto' : 'aspect-video'
              } rounded-[10px] overflow-hidden bg-black`}
            >
              <iframe
                src={buildYoutubeEmbedUrl(project.youtubeId, true)}
                title={`Cinema player — ${project.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
