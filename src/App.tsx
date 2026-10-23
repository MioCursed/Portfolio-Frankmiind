import { useEffect, useState } from 'react';
import { getPortfolioData, Locale, VideoProject } from './data/portfolioData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ShortFormSection, LongFormSection } from './components/VideoSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CinemaModal } from './components/CinemaModal';
import { Footer } from './components/Footer';

export default function App() {
  const [locale, setLocale] = useState<Locale>('en-US');

  const [activeCinemaProjectId, setActiveCinemaProjectId] = useState<VideoProject['id'] | null>(
    null
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const content = getPortfolioData(locale);

  const shortProject =
    content.projects.find((p) => p.sectionId === 'short') ?? content.projects[0];
  const longProjects = content.projects.filter((p) => p.sectionId === 'long');
  const featuredProject = longProjects[0] ?? content.projects[0];
  const activeCinemaProject =
    activeCinemaProjectId !== null
      ? content.projects.find((p) => p.id === activeCinemaProjectId) ?? null
      : null;

  return (
    <div id="top" className="min-h-screen bg-[#1b1c20] text-[#f5f6f8] flex flex-col">
      <Header
        content={content}
        locale={locale}
        onToggleLocale={(nextLocale) => setLocale(nextLocale)}
      />

      <main className="flex-1">
        <Hero
          content={content}
          featuredProject={featuredProject}
          onOpenCinema={(project) => setActiveCinemaProjectId(project.id)}
        />

        <ShortFormSection
          content={content}
          project={shortProject}
          onOpenCinema={(selected) => setActiveCinemaProjectId(selected.id)}
        />

        <LongFormSection
          content={content}
          projects={longProjects}
          onOpenCinema={(selected) => setActiveCinemaProjectId(selected.id)}
        />

        <AboutSection content={content} />

        <ContactSection content={content} />
      </main>

      <Footer content={content} />

      <CinemaModal
        project={activeCinemaProject}
        closeAriaLabel={content.cinemaModalUI.closeAriaLabel}
        onClose={() => setActiveCinemaProjectId(null)}
      />
    </div>
  );
}
