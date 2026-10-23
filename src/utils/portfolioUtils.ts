import { getPortfolioData, Locale, PORTFOLIO_DATA, VideoProject } from '../data/portfolioData';

const BRASILIA_FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Sao_Paulo',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export function formatBrasiliaTime(date: Date = new Date()): string {
  return BRASILIA_FORMATTER.format(date);
}

export function buildYoutubeEmbedUrl(youtubeId: string, autoplay: boolean = false): string {
  const cleanId = youtubeId.trim();
  const params = new URLSearchParams({
    rel: '0',
    loop: '0',
    controls: '1',
    cc_load_policy: '0',
    autoplay: autoplay ? '1' : '0',
  });
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(cleanId)}?${params.toString()}`;
}

export function buildYoutubeThumbnailUrl(
  youtubeId: string,
  quality: 'maxresdefault' | 'hqdefault' = 'hqdefault'
): string {
  const cleanId = youtubeId.trim();
  return `https://i.ytimg.com/vi/${encodeURIComponent(cleanId)}/${quality}.jpg`;
}

export function findProjectById(id: string, locale: Locale = 'en-US'): VideoProject | undefined {
  return getPortfolioData(locale).projects.find((project) => project.id === id);
}

export function formatCopyFeedback(
  channelId: 'discord' | 'email',
  value: string,
  succeeded: boolean,
  locale: Locale = 'en-US'
): string {
  if (locale === 'pt-BR') {
    if (!succeeded) {
      return channelId === 'discord'
        ? `Usuário do Discord: ${value}`
        : `Endereço de e-mail: ${value}`;
    }
    return channelId === 'discord'
      ? `Usuário do Discord "${value}" copiado para a área de transferência!`
      : `E-mail "${value}" copiado para a área de transferência!`;
  }

  if (!succeeded) {
    return channelId === 'discord'
      ? `Discord username: ${value}`
      : `Email address: ${value}`;
  }
  return channelId === 'discord'
    ? `Discord username "${value}" copied to clipboard!`
    : `Email "${value}" copied to clipboard!`;
}

export { PORTFOLIO_DATA };
