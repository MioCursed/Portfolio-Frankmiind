export type Locale = 'en-US' | 'pt-BR';

export interface ShortFormHighlight {
  index: string;
  icon: 'scissors' | 'captions' | 'audio';
  title: string;
  description: string;
}

export interface VideoProject {
  id: 'short' | 'long-kamplays' | 'long-fleexi';
  sectionId: 'short' | 'long';
  sectionHeading: string;
  aspectRatio: '9:16' | '16:9';
  formatBadge: string;
  formatDetails: string;
  title: string;
  channelName: string;
  channelUrl: string;
  youtubeId: string;
  watchUrl: string;
  thumbnailSrc: string;
  note?: string;
}

export interface SoftwareTool {
  id: string;
  vendor: string;
  name: string;
  iconSrc: string;
  iconAlt: string;
}

export interface AboutMetaItem {
  id: 'delivery' | 'payment';
  label: string;
  value: string;
  highlight: boolean;
}

export interface ContactChannel {
  id: 'discord' | 'email' | 'twitter';
  label: string;
  actionHint: string;
  displayValue: string;
  copyValue?: string;
  href?: string;
  secondaryLinkLabel?: string;
  iconSrc?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PortfolioContent {
  locale: Locale;
  brandName: string;
  fullHandle: string;
  kickerHandle: string;
  kickerRole: string;
  availabilityStatus: string;
  heroHeadline: string;
  heroHeadlinePrefix: string;
  heroHeadlineHighlight: string;
  heroPrimaryCta: {
    label: string;
    href: string;
  };
  heroSecondaryCta: {
    label: string;
    href: string;
  };
  heroFeaturedBadge: string;
  heroWatchCta: string;
  headerContactLabel: string;
  languageToggleAriaLabel: string;
  navItems: NavItem[];
  footerLinks: NavItem[];
  backToTopLabel: string;
  shortFormBreakdown: {
    eyebrow: string;
    headline: string;
    summary: string;
    cinemaViewLabel: string;
    watchOnYoutubeLabel: string;
    highlights: ShortFormHighlight[];
  };
  longFormUI: {
    eyebrow: string;
    heading: string;
    cinemaViewLabel: string;
    directLinkLabel: string;
  };
  cinemaModalUI: {
    closeAriaLabel: string;
  };
  projects: VideoProject[];
  about: {
    heading: string;
    roleBadge: string;
    avatarSrc: string;
    avatarAlt: string;
    bio: string;
    bioExtra: string;
    toolsAriaLabel: string;
    tools: SoftwareTool[];
    meta: AboutMetaItem[];
    brasiliaTimeLabel: string;
  };
  contact: {
    heading: string;
    intro: string;
    copyLabel: string;
    copiedLabel: string;
    channels: ContactChannel[];
  };
}

const SHARED_TOOLS: SoftwareTool[] = [
  {
    id: 'premiere-pro',
    vendor: 'Adobe',
    name: 'Premiere Pro',
    iconSrc: '/assets/aistudio/adobe-premiere-pro-icon_55a453cc.svg',
    iconAlt: 'Adobe Premiere Pro icon',
  },
  {
    id: 'after-effects',
    vendor: 'Adobe',
    name: 'After Effects',
    iconSrc: '/assets/aistudio/adobe-after-effects-icon_0546d88c.svg',
    iconAlt: 'Adobe After Effects icon',
  },
];

export const PORTFOLIO_I18N: Record<Locale, PortfolioContent> = {
  'en-US': {
    locale: 'en-US',
    brandName: 'Frank',
    fullHandle: 'FrankMiind',
    kickerHandle: 'FrankMiind',
    kickerRole: 'Content Video Editor',
    availabilityStatus: 'Available for new projects',
    heroHeadline: 'Video Editing for YouTubers.',
    heroHeadlinePrefix: 'Video Editing for ',
    heroHeadlineHighlight: 'YouTubers',
    heroPrimaryCta: {
      label: 'See Portfolio',
      href: '#short',
    },
    heroSecondaryCta: {
      label: 'Get in touch',
      href: '#contact',
    },
    heroFeaturedBadge: 'Featured Edit',
    heroWatchCta: 'Watch video',
    headerContactLabel: 'Contact',
    languageToggleAriaLabel: 'Switch language to Portuguese (BR)',
    navItems: [
      { label: 'Home', href: '#home' },
      { label: 'Short-Form', href: '#short' },
      { label: 'Long-Form', href: '#long' },
      { label: 'About Me', href: '#about' },
    ],
    footerLinks: [
      { label: 'Home', href: '#home' },
      { label: 'Short', href: '#short' },
      { label: 'Long', href: '#long' },
      { label: 'About Me', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
    backToTopLabel: 'Back to top',
    shortFormBreakdown: {
      eyebrow: 'YouTube Shorts & Reels',
      headline: 'Built to keep people watching.',
      summary:
        'Quick cuts, clean subtitles, and sound effects timed to the beat so the video feels natural from the very first second.',
      cinemaViewLabel: 'Cinema view',
      watchOnYoutubeLabel: 'Watch on YouTube',
      highlights: [
        {
          index: '01',
          icon: 'scissors',
          title: 'Clean Pacing',
          description: 'Tight cuts that keep the energy moving without feeling rushed.',
        },
        {
          index: '02',
          icon: 'captions',
          title: 'Subtitles & Motion',
          description: 'Smooth zooms and readable captions that match the voice.',
        },
        {
          index: '03',
          icon: 'audio',
          title: 'Sound Design',
          description: 'Well-timed SFX and music hits that make moments land.',
        },
      ],
    },
    longFormUI: {
      eyebrow: 'YouTube Videos',
      heading: 'Long-Form.',
      cinemaViewLabel: 'Cinema view',
      directLinkLabel: 'Direct link',
    },
    cinemaModalUI: {
      closeAriaLabel: 'Close cinema view',
    },
    projects: [
      {
        id: 'short',
        sectionId: 'short',
        sectionHeading: 'Short-Form.',
        aspectRatio: '9:16',
        formatBadge: 'YouTube Shorts',
        formatDetails: '9:16 Vertical',
        title: 'cweamcat',
        channelName: 'Frank (@frankmiind)',
        channelUrl: 'https://www.youtube.com/@frankmiind',
        youtubeId: 'Q4cHxJKnKKM',
        watchUrl: 'https://www.youtube.com/shorts/Q4cHxJKnKKM',
        thumbnailSrc: '/assets/short-thumb.jpg',
      },
      {
        id: 'long-kamplays',
        sectionId: 'long',
        sectionHeading: 'Long-Form.',
        aspectRatio: '16:9',
        formatBadge: 'YouTube Video',
        formatDetails: 'Gameplay Edit',
        title: 'This NEW Roblox Game Looks INSANE!',
        channelName: 'KamPlays',
        channelUrl: 'https://www.youtube.com/@KamPlays',
        youtubeId: 'vJFt1ySW4yQ',
        watchUrl: 'https://www.youtube.com/watch?v=vJFt1ySW4yQ',
        thumbnailSrc: '/assets/hero-kamplays.jpg',
      },
      {
        id: 'long-fleexi',
        sectionId: 'long',
        sectionHeading: 'Long-Form.',
        aspectRatio: '16:9',
        formatBadge: 'YouTube Video',
        formatDetails: 'Challenge Edit',
        title: 'Getting EVERY Axe in Lumber Tycoon 2',
        channelName: 'Fleexi',
        channelUrl: 'https://www.youtube.com/@fleexi2',
        youtubeId: 'UNJOhMmQK9o',
        watchUrl: 'https://www.youtube.com/watch?v=UNJOhMmQK9o',
        thumbnailSrc: '/assets/thumb-fleexi.jpg',
      },
    ],
    about: {
      heading: 'About Me.',
      roleBadge: 'Video Editor',
      avatarSrc: '/assets/aistudio/niceshirt_15823b31.jpg',
      avatarAlt: 'Frank (FrankMiind) profile illustration',
      bio: "I'm Frank, a video editor focused on YouTube content. I create dynamic edits with clean pacing, smooth flow, and attention to detail.",
      bioExtra:
        "To me, editing goes beyond simple cuts and captions—it's about understanding the creator's vision, learning from feedback, and making every video genuinely enjoyable to watch.",
      toolsAriaLabel: 'Editing software I use',
      tools: SHARED_TOOLS,
      meta: [
        { id: 'delivery', label: 'Delivery', value: '1 to 2 days', highlight: false },
        { id: 'payment', label: 'Payment', value: 'Wise', highlight: false },
      ],
      brasiliaTimeLabel: 'Brasília time',
    },
    contact: {
      heading: 'Contact.',
      intro: 'Want to work together on your next video? Reach out on Discord, Twitter/X, or email.',
      copyLabel: 'Copy',
      copiedLabel: 'Copied',
      channels: [
        {
          id: 'discord',
          label: 'Discord · click to copy username',
          actionHint: 'Copy username',
          displayValue: 'eig6',
          copyValue: 'eig6',
          href: 'https://discord.com/users/1310385192732463126',
          secondaryLinkLabel: 'Open Discord profile',
          iconSrc: '/assets/aistudio/discord_3b25f002.png',
        },
        {
          id: 'twitter',
          label: 'Twitter / X · open profile',
          actionHint: 'Visit @FrankMiind',
          displayValue: '@FrankMiind',
          href: 'https://x.com/FrankMiind',
        },
        {
          id: 'email',
          label: 'Email · click to copy address',
          actionHint: 'Copy email',
          displayValue: 'frankcontactofficial@gmail.com',
          copyValue: 'frankcontactofficial@gmail.com',
          href: 'mailto:frankcontactofficial@gmail.com',
          secondaryLinkLabel: 'Send email',
        },
      ],
    },
  },
  'pt-BR': {
    locale: 'pt-BR',
    brandName: 'Frank',
    fullHandle: 'FrankMiind',
    kickerHandle: 'FrankMiind',
    kickerRole: 'Editor de Vídeo',
    availabilityStatus: 'Disponível para projetos',
    heroHeadline: 'Edição de vídeos para YouTubers.',
    heroHeadlinePrefix: 'Edição de vídeos para ',
    heroHeadlineHighlight: 'YouTubers',
    heroPrimaryCta: {
      label: 'Ver trabalhos',
      href: '#short',
    },
    heroSecondaryCta: {
      label: 'Falar comigo',
      href: '#contact',
    },
    heroFeaturedBadge: 'Destaque',
    heroWatchCta: 'Assistir',
    headerContactLabel: 'Contato',
    languageToggleAriaLabel: 'Mudar idioma para Inglês (EN)',
    navItems: [
      { label: 'Início', href: '#home' },
      { label: 'Shorts', href: '#short' },
      { label: 'Longos', href: '#long' },
      { label: 'Sobre mim', href: '#about' },
    ],
    footerLinks: [
      { label: 'Início', href: '#home' },
      { label: 'Shorts', href: '#short' },
      { label: 'Longos', href: '#long' },
      { label: 'Sobre mim', href: '#about' },
      { label: 'Contato', href: '#contact' },
    ],
    backToTopLabel: 'Voltar ao topo',
    shortFormBreakdown: {
      eyebrow: 'Shorts & Reels',
      headline: 'Edição dinâmica do início ao fim.',
      summary:
        'Cortes no tempo certo, legendas limpas e efeitos sonoros bem encaixados pro vídeo fluir bem e prender quem está assistindo.',
      cinemaViewLabel: 'Modo cinema',
      watchOnYoutubeLabel: 'Ver no YouTube',
      highlights: [
        {
          index: '01',
          icon: 'scissors',
          title: 'Bom Ritmo',
          description: 'Cortes diretos que mantêm o vídeo dinâmico sem ficar cansativo.',
        },
        {
          index: '02',
          icon: 'captions',
          title: 'Legendas & Zoom',
          description: 'Legendas fáceis de ler e movimentos suaves que acompanham a fala.',
        },
        {
          index: '03',
          icon: 'audio',
          title: 'Sound Design',
          description: 'Efeitos sonoros e músicas na hora certa pra dar peso a cada cena.',
        },
      ],
    },
    longFormUI: {
      eyebrow: 'Vídeos de YouTube',
      heading: 'Vídeos Longos.',
      cinemaViewLabel: 'Modo cinema',
      directLinkLabel: 'Ver no YouTube',
    },
    cinemaModalUI: {
      closeAriaLabel: 'Fechar modo cinema',
    },
    projects: [
      {
        id: 'short',
        sectionId: 'short',
        sectionHeading: 'Shorts.',
        aspectRatio: '9:16',
        formatBadge: 'YouTube Shorts',
        formatDetails: '9:16 Vertical',
        title: 'cweamcat',
        channelName: 'Frank (@frankmiind)',
        channelUrl: 'https://www.youtube.com/@frankmiind',
        youtubeId: 'Q4cHxJKnKKM',
        watchUrl: 'https://www.youtube.com/shorts/Q4cHxJKnKKM',
        thumbnailSrc: '/assets/short-thumb.jpg',
      },
      {
        id: 'long-kamplays',
        sectionId: 'long',
        sectionHeading: 'Vídeos Longos.',
        aspectRatio: '16:9',
        formatBadge: 'YouTube',
        formatDetails: 'Gameplay Edit',
        title: 'This NEW Roblox Game Looks INSANE!',
        channelName: 'KamPlays',
        channelUrl: 'https://www.youtube.com/@KamPlays',
        youtubeId: 'vJFt1ySW4yQ',
        watchUrl: 'https://www.youtube.com/watch?v=vJFt1ySW4yQ',
        thumbnailSrc: '/assets/hero-kamplays.jpg',
      },
      {
        id: 'long-fleexi',
        sectionId: 'long',
        sectionHeading: 'Vídeos Longos.',
        aspectRatio: '16:9',
        formatBadge: 'YouTube',
        formatDetails: 'Challenge Edit',
        title: 'Getting EVERY Axe in Lumber Tycoon 2',
        channelName: 'Fleexi',
        channelUrl: 'https://www.youtube.com/@fleexi2',
        youtubeId: 'UNJOhMmQK9o',
        watchUrl: 'https://www.youtube.com/watch?v=UNJOhMmQK9o',
        thumbnailSrc: '/assets/thumb-fleexi.jpg',
      },
    ],
    about: {
      heading: 'Sobre mim.',
      roleBadge: 'Editor de Vídeo',
      avatarSrc: '/assets/aistudio/niceshirt_15823b31.jpg',
      avatarAlt: 'Foto de perfil do Frank (FrankMiind)',
      bio: 'Sou o Frank, editor focado em vídeos para o YouTube. Gosto de criar edições com bom ritmo, leitura limpa e atenção aos detalhes.',
      bioExtra:
        'Pra mim, editar vai além de só cortar e colocar legenda — é entender a ideia do vídeo, trocar ideia no feedback e deixar o conteúdo do jeito que o canal pede.',
      toolsAriaLabel: 'Programas de edição que eu uso',
      tools: SHARED_TOOLS,
      meta: [
        { id: 'delivery', label: 'Entrega', value: '1 a 2 dias', highlight: false },
        { id: 'payment', label: 'Pagamento', value: 'Wise', highlight: false },
      ],
      brasiliaTimeLabel: 'Horário de Brasília',
    },
    contact: {
      heading: 'Contato.',
      intro: 'Quer editar seu próximo vídeo comigo? Só me chamar no Discord, Twitter/X ou mandar um e-mail.',
      copyLabel: 'Copiar',
      copiedLabel: 'Copiado',
      channels: [
        {
          id: 'discord',
          label: 'Discord · clique para copiar',
          actionHint: 'Copiar usuário',
          displayValue: 'eig6',
          copyValue: 'eig6',
          href: 'https://discord.com/users/1310385192732463126',
          secondaryLinkLabel: 'Abrir Discord',
          iconSrc: '/assets/aistudio/discord_3b25f002.png',
        },
        {
          id: 'twitter',
          label: 'Twitter / X · perfil oficial',
          actionHint: 'Visitar @FrankMiind',
          displayValue: '@FrankMiind',
          href: 'https://x.com/FrankMiind',
        },
        {
          id: 'email',
          label: 'E-mail · clique para copiar',
          actionHint: 'Copiar e-mail',
          displayValue: 'frankcontactofficial@gmail.com',
          copyValue: 'frankcontactofficial@gmail.com',
          href: 'mailto:frankcontactofficial@gmail.com',
          secondaryLinkLabel: 'Mandar e-mail',
        },
      ],
    },
  },
};

export const PORTFOLIO_DATA = PORTFOLIO_I18N['en-US'];

export function getPortfolioData(locale: Locale): PortfolioContent {
  return PORTFOLIO_I18N[locale] ?? PORTFOLIO_I18N['en-US'];
}
