import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { PortfolioContent } from '../data/portfolioData';
import { formatCopyFeedback } from '../utils/portfolioUtils';

async function copyTextToClipboard(value: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // Fall through to execCommand fallback for cross-origin iframe environments
    }
  }
  try {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand('copy');
    textarea.remove();
    return ok;
  } catch {
    return false;
  }
}

interface ContactSectionProps {
  content: PortfolioContent;
}

export function ContactSection({ content }: ContactSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [copyStatus, setCopyStatus] = useState<string>('');
  const [copiedId, setCopiedId] = useState<'discord' | 'email' | null>(null);

  const handleCopy = async (channelId: 'discord' | 'email', value: string) => {
    const ok = await copyTextToClipboard(value);
    setCopyStatus(formatCopyFeedback(channelId, value, ok, content.locale));
    if (ok) {
      setCopiedId(channelId);
      window.setTimeout(() => {
        setCopiedId((current) => (current === channelId ? null : current));
      }, 2400);
    }
  };

  const discordChannel = content.contact.channels.find((c) => c.id === 'discord')!;
  const twitterChannel = content.contact.channels.find((c) => c.id === 'twitter')!;
  const emailChannel = content.contact.channels.find((c) => c.id === 'email')!;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-[112px] lg:pb-[132px] border-t border-[rgba(181,188,201,0.24)]"
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-[min(1360px,calc(100%-34px))] sm:w-[min(1360px,calc(100%-72px))] xl:w-[min(1360px,calc(100%-104px))] mx-auto"
      >
        <h2
          id="contact-heading"
          className="font-display text-[clamp(38px,5.2vw,80px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#f5f6f8] mb-4 text-balance"
        >
          {content.contact.heading.endsWith('.') ? (
            <>
              {content.contact.heading.slice(0, -1)}
              <span className="text-[#ff0095]">.</span>
            </>
          ) : (
            content.contact.heading
          )}
        </h2>
        <p className="text-[17px] sm:text-[20px] text-[#bcbec7] max-w-[54ch] mb-10 text-pretty">
          {content.contact.intro}
        </p>

        <div className="border-t border-[rgba(181,188,201,0.24)]">
          {/* Row 1: Discord (username eig6) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[108px] sm:min-h-[132px] py-5 sm:py-6 border-b border-[rgba(181,188,201,0.24)]">
            <button
              id="copy-discord"
              type="button"
              onClick={() => handleCopy('discord', discordChannel.copyValue!)}
              aria-label={`${discordChannel.actionHint}: ${discordChannel.displayValue}`}
              className="group flex items-center gap-4 sm:gap-5 text-left flex-1 min-w-0 cursor-pointer transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] sm:hover:translate-x-1.5"
            >
              <span className="w-12 h-12 sm:w-[66px] sm:h-[66px] grid place-items-center shrink-0 border border-[rgba(194,201,216,0.43)] group-hover:border-white rounded-[14px] sm:rounded-[18px] group-hover:rounded-[24px] bg-[#222329] text-[#f5f6f8] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 sm:w-[30px] sm:h-[30px]"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </span>

              <span className="flex flex-col min-w-0 flex-1">
                <span className="text-[14px] sm:text-[16px] text-[#bcbec7] mb-1">
                  {discordChannel.label}
                </span>
                <span className="text-[clamp(22px,3vw,36px)] font-bold tracking-[-0.04em] leading-[1.2] text-[#f5f6f8] group-hover:text-white transition-colors duration-150 break-all">
                  {discordChannel.displayValue}
                </span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#bcbec7] group-hover:text-white transition-colors duration-150 shrink-0 pr-2">
                {copiedId === 'discord' ? (
                  <>
                    <Check className="w-5 h-5 text-[#ff0095]" aria-hidden="true" />
                    <span className="text-[#ff0095]">{content.contact.copiedLabel}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden md:inline">{content.contact.copyLabel}</span>
                  </>
                )}
              </span>
            </button>

            {discordChannel.href && (
              <a
                href={discordChannel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] text-[14px] font-semibold text-[#d2d4db] hover:text-white bg-[#222329] hover:bg-[#282a30] border border-[rgba(194,201,216,0.43)] hover:border-white rounded-[12px] hover:rounded-[18px] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap shrink-0 self-start sm:self-center"
              >
                <span>{discordChannel.secondaryLinkLabel}</span>
                <ArrowUpRight className="w-4 h-4 text-[#bcbec7]" aria-hidden="true" />
              </a>
            )}
          </div>

          {/* Row 2: Twitter / X (@FrankMiind) */}
          <a
            href={twitterChannel.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${twitterChannel.actionHint}`}
            className="group flex items-center gap-4 sm:gap-5 min-h-[108px] sm:min-h-[132px] py-5 sm:py-6 pr-2 border-b border-[rgba(181,188,201,0.24)] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] sm:hover:translate-x-1.5"
          >
            <span className="w-12 h-12 sm:w-[66px] sm:h-[66px] grid place-items-center shrink-0 border border-[rgba(194,201,216,0.43)] group-hover:border-white rounded-[14px] sm:rounded-[18px] group-hover:rounded-[24px] bg-[#222329] text-[#f5f6f8] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 sm:w-[30px] sm:h-[30px]"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </span>

            <span className="flex flex-col min-w-0 flex-1">
              <span className="text-[14px] sm:text-[16px] text-[#bcbec7] mb-1">
                {twitterChannel.label}
              </span>
              <span className="text-[clamp(22px,3vw,36px)] font-bold tracking-[-0.04em] leading-[1.2] text-[#f5f6f8] group-hover:text-white transition-colors duration-150 break-all">
                {twitterChannel.displayValue}
              </span>
            </span>

            <ArrowUpRight
              className="w-6 h-6 sm:w-7 sm:h-7 text-[#bcbec7] group-hover:text-white transition-colors duration-150 shrink-0"
              aria-hidden="true"
            />
          </a>

          {/* Row 3: Email */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[108px] sm:min-h-[132px] py-5 sm:py-6 border-b border-[rgba(181,188,201,0.24)]">
            <button
              id="copy-email"
              type="button"
              onClick={() => handleCopy('email', emailChannel.copyValue!)}
              aria-label={`${emailChannel.actionHint}: ${emailChannel.displayValue}`}
              className="group flex items-center gap-4 sm:gap-5 text-left flex-1 min-w-0 cursor-pointer transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] sm:hover:translate-x-1.5"
            >
              <span className="w-12 h-12 sm:w-[66px] sm:h-[66px] grid place-items-center shrink-0 border border-[rgba(194,201,216,0.43)] group-hover:border-white rounded-[14px] sm:rounded-[18px] group-hover:rounded-[24px] bg-[#222329] text-[#f5f6f8] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <Mail className="w-6 h-6 sm:w-[32px] sm:h-[32px]" aria-hidden="true" />
              </span>

              <span className="flex flex-col min-w-0 flex-1">
                <span className="text-[14px] sm:text-[16px] text-[#bcbec7] mb-1">
                  {emailChannel.label}
                </span>
                <span className="text-[clamp(18px,2.7vw,34px)] font-bold tracking-[-0.035em] leading-[1.25] text-[#f5f6f8] group-hover:text-white transition-colors duration-150 break-all">
                  {emailChannel.displayValue}
                </span>
              </span>

              <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#bcbec7] group-hover:text-white transition-colors duration-150 shrink-0 pr-2">
                {copiedId === 'email' ? (
                  <>
                    <Check className="w-5 h-5 text-[#ff0095]" aria-hidden="true" />
                    <span className="text-[#ff0095]">{content.contact.copiedLabel}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden md:inline">{content.contact.copyLabel}</span>
                  </>
                )}
              </span>
            </button>

            {emailChannel.href && (
              <a
                href={emailChannel.href}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] text-[14px] font-semibold text-[#d2d4db] hover:text-white bg-[#222329] hover:bg-[#282a30] border border-[rgba(194,201,216,0.43)] hover:border-white rounded-[12px] hover:rounded-[18px] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap shrink-0 self-start sm:self-center"
              >
                <span>{emailChannel.secondaryLinkLabel}</span>
                <ArrowUpRight className="w-4 h-4 text-[#bcbec7]" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <p
          id="copy-status"
          role="status"
          aria-live="polite"
          className="text-[#ff0095] text-[15px] sm:text-[16px] font-medium min-h-[1.75em] mt-4"
        >
          {copyStatus}
        </p>
      </motion.div>
    </section>
  );
}
