import test from 'node:test';
import assert from 'node:assert/strict';
import { getPortfolioData, PORTFOLIO_DATA } from '../data/portfolioData';
import {
  buildYoutubeEmbedUrl,
  buildYoutubeThumbnailUrl,
  findProjectById,
  formatBrasiliaTime,
  formatCopyFeedback,
} from './portfolioUtils';

test('portfolio data includes 9:16 Short-Form, both Long-Form videos (KamPlays & Fleexi), human-written copy, and removes Mio video', () => {
  assert.equal(PORTFOLIO_DATA.brandName, 'Frank');
  assert.equal(PORTFOLIO_DATA.fullHandle, 'FrankMiind');

  const shortProject = findProjectById('short');
  assert.ok(shortProject, 'Short-Form project must exist');
  assert.equal(shortProject.youtubeId, 'Q4cHxJKnKKM');
  assert.equal(shortProject.sectionId, 'short');
  assert.equal(shortProject.aspectRatio, '9:16');

  const kamPlaysProject = findProjectById('long-kamplays');
  assert.ok(kamPlaysProject, 'KamPlays Long-Form project must exist');
  assert.equal(kamPlaysProject.youtubeId, 'vJFt1ySW4yQ');
  assert.equal(kamPlaysProject.channelName, 'KamPlays');
  assert.equal(kamPlaysProject.aspectRatio, '16:9');

  const fleexiProject = findProjectById('long-fleexi');
  assert.ok(fleexiProject, 'Fleexi Long-Form project must exist');
  assert.equal(fleexiProject.youtubeId, 'UNJOhMmQK9o');
  assert.equal(fleexiProject.channelName, 'Fleexi');
  assert.equal(fleexiProject.aspectRatio, '16:9');

  const removedMioVideo = PORTFOLIO_DATA.projects.find((p) => p.youtubeId === 'CRvtg6e2aKE');
  assert.equal(removedMioVideo, undefined, 'Mio video must be completely removed');

  assert.equal(PORTFOLIO_DATA.shortFormBreakdown.highlights.length, 3);

  assert.doesNotMatch(PORTFOLIO_DATA.about.bio, /18/);
  assert.match(PORTFOLIO_DATA.about.bio, /attention to detail/);
  assert.match(PORTFOLIO_DATA.about.bioExtra, /creator's vision/);

  assert.deepEqual(
    PORTFOLIO_DATA.about.meta.map((m) => ({ label: m.label, value: m.value })),
    [
      { label: 'Delivery', value: '1 to 2 days' },
      { label: 'Payment', value: 'Wise' },
    ]
  );

  assert.equal(PORTFOLIO_DATA.about.tools.length, 2);
  assert.deepEqual(
    PORTFOLIO_DATA.about.tools.map((t) => t.name),
    ['Premiere Pro', 'After Effects']
  );

  const discord = PORTFOLIO_DATA.contact.channels.find((c) => c.id === 'discord');
  assert.ok(discord);
  assert.equal(discord.displayValue, 'eig6');
  assert.equal(discord.copyValue, 'eig6');
  assert.equal(discord.href, 'https://discord.com/users/1310385192732463126');

  const twitter = PORTFOLIO_DATA.contact.channels.find((c) => c.id === 'twitter');
  assert.ok(twitter);
  assert.equal(twitter.href, 'https://x.com/FrankMiind');

  const email = PORTFOLIO_DATA.contact.channels.find((c) => c.id === 'email');
  assert.ok(email);
  assert.equal(email.copyValue, 'frankcontactofficial@gmail.com');
  assert.equal(email.href, 'mailto:frankcontactofficial@gmail.com');
});

test('pt-BR localization provides full Portuguese content across sections', () => {
  const pt = getPortfolioData('pt-BR');
  assert.equal(pt.locale, 'pt-BR');
  assert.equal(pt.about.heading, 'Sobre mim.');
  assert.doesNotMatch(pt.about.bio, /18/);
  assert.deepEqual(
    pt.about.meta.map((m) => ({ label: m.label, value: m.value })),
    [
      { label: 'Entrega', value: '1 a 2 dias' },
      { label: 'Pagamento', value: 'Wise' },
    ]
  );
  assert.equal(pt.contact.heading, 'Contato.');
});

test('buildYoutubeEmbedUrl and buildYoutubeThumbnailUrl generate valid URLs', () => {
  const url = buildYoutubeEmbedUrl('Q4cHxJKnKKM', false);
  assert.equal(
    url,
    'https://www.youtube-nocookie.com/embed/Q4cHxJKnKKM?rel=0&loop=0&controls=1&cc_load_policy=0&autoplay=0'
  );

  const autoplayUrl = buildYoutubeEmbedUrl('vJFt1ySW4yQ', true);
  assert.match(autoplayUrl, /autoplay=1/);

  const thumbUrl = buildYoutubeThumbnailUrl('vJFt1ySW4yQ', 'hqdefault');
  assert.equal(thumbUrl, 'https://i.ytimg.com/vi/vJFt1ySW4yQ/hqdefault.jpg');
});

test('formatBrasiliaTime formats UTC timestamp into America/Sao_Paulo 24h clock', () => {
  const sample = new Date('2026-10-23T15:05:09.000Z');
  assert.equal(formatBrasiliaTime(sample), '12:05:09');
});

test('formatCopyFeedback returns clear accessible status strings in en-US and pt-BR', () => {
  assert.equal(
    formatCopyFeedback('discord', 'eig6', true, 'en-US'),
    'Discord username "eig6" copied to clipboard!'
  );
  assert.equal(
    formatCopyFeedback('email', 'frankcontactofficial@gmail.com', false, 'en-US'),
    'Email address: frankcontactofficial@gmail.com'
  );
  assert.equal(
    formatCopyFeedback('discord', 'eig6', true, 'pt-BR'),
    'Usuário do Discord "eig6" copiado para a área de transferência!'
  );
});
