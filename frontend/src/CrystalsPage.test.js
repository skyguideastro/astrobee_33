import { fireEvent, render, screen, within } from '@testing-library/react';
import CrystalsPage from './CrystalsPage';

test('shows the crystal catalog without prices and links inquiries to WhatsApp', () => {
  render(<CrystalsPage />);

  expect(screen.getByRole('group', { name: 'Shop by category' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Shop by crystal' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Amazonite' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Yellow Quartz' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('img')).toHaveLength(8);
  expect(screen.queryByText(/₹|sale price|regular price/i)).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'View more' })).toBeInTheDocument();

  const amethystCard = screen.getAllByRole('article')[2];
  expect(within(amethystCard).getByRole('img')).toHaveAttribute('src', '/crystals/amethyst.webp');
  fireEvent.click(within(amethystCard).getByText('Meaning & zodiac'));
  expect(within(amethystCard).getByText('Calm, intuition, and reflection.')).toBeInTheDocument();
  expect(within(amethystCard).getByText('Pisces, Aquarius')).toBeInTheDocument();

  const crystalInquiry = screen.getAllByRole('link', { name: /Ask on WhatsApp/i })[0];
  expect(crystalInquiry.href).toContain('https://wa.me/917795119975');
  expect(crystalInquiry.href).toContain(encodeURIComponent('Amazonite'));

  fireEvent.click(screen.getByRole('button', { name: 'View more' }));
  expect(screen.getAllByRole('img')).toHaveLength(78);
  expect(screen.getByRole('heading', { name: 'Yellow Quartz' })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'View less' }));
  expect(screen.getAllByRole('img')).toHaveLength(8);
});

test('filters crystals by zodiac sign and includes crystals linked to all signs', () => {
  render(<CrystalsPage />);

  [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces',
  ].forEach((zodiac) => {
    expect(screen.getByRole('button', { name: zodiac })).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole('button', { name: 'Pisces' }));

  expect(screen.getByRole('button', { name: 'Pisces' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('heading', { name: 'Amethyst' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Clear Quartz' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Amazonite' })).not.toBeInTheDocument();

  screen.getAllByRole('article').forEach((card) => {
    expect(within(card).getByText(/Pisces|All zodiac signs/)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole('button', { name: 'All crystals' }));
  expect(screen.getByRole('heading', { name: 'Amazonite' })).toBeInTheDocument();
});

test.each([
  [1024, 8],
  [800, 6],
  [600, 4],
  [360, 2],
])('shows two catalog rows at %ipx viewport width', (width, expectedItems) => {
  const originalWidth = window.innerWidth;
  window.innerWidth = width;

  render(<CrystalsPage />);
  expect(screen.getAllByRole('article')).toHaveLength(expectedItems);

  window.innerWidth = originalWidth;
});

test.each([
  ['Malas', 'malas', 35],
  ['Beads', 'beads', 117],
  ['Bracelets', 'bracelets', 61],
])('shows all %s products without prices', (label, category, expectedCount) => {
  render(<CrystalsPage />);

  const categoryTab = screen.getByRole('button', { name: label });
  fireEvent.click(categoryTab);

  expect(categoryTab).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('heading', { name: `Shop ${label.toLowerCase()}` })).toBeInTheDocument();
  expect(screen.getByText(`${expectedCount} ${category}`)).toBeInTheDocument();
  expect(screen.getAllByRole('img')).toHaveLength(8);
  expect(screen.queryByText(/₹|sale price|regular price/i)).not.toBeInTheDocument();

  const firstProductCard = screen.getAllByRole('article')[0];
  const firstProductName = within(firstProductCard).getByRole('heading', { level: 4 }).textContent;
  expect(within(firstProductCard).getByRole('img').getAttribute('src')).toMatch(
    new RegExp(`^/${category}/`)
  );

  const inquiry = within(firstProductCard).getByRole('link', { name: /Ask on WhatsApp/i });
  expect(inquiry.href).toContain('https://wa.me/917795119975');
  expect(inquiry.href).toContain(encodeURIComponent(firstProductName));

  fireEvent.click(screen.getByRole('button', { name: 'View more' }));
  expect(screen.getAllByRole('article')).toHaveLength(expectedCount);
  expect(screen.getByRole('button', { name: 'View less' })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Crystals' }));
  expect(screen.getByRole('heading', { name: 'Shop by crystal' })).toBeInTheDocument();
  expect(screen.getAllByRole('article')).toHaveLength(8);
});

test('shows use and traditional significance and filters beads by zodiac', () => {
  render(<CrystalsPage />);
  fireEvent.click(screen.getByRole('button', { name: 'Beads' }));

  const firstBead = screen.getAllByRole('article')[0];
  fireEvent.click(within(firstBead).getByText('Use, significance & zodiac'));
  expect(within(firstBead).getByText(/People who include prayer, mantra, or meditation/)).toBeInTheDocument();
  expect(within(firstBead).getByText(/Rudraksha is traditionally used for japa/)).toBeInTheDocument();
  expect(within(firstBead).getByText('All zodiac signs')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Pisces' }));
  expect(screen.getAllByRole('article')).toHaveLength(8);
  expect(screen.getByRole('button', { name: 'Pisces' })).toHaveAttribute('aria-pressed', 'true');
});

test('preserves the selected zodiac across tabs and excludes products without a mapped sign', () => {
  render(<CrystalsPage />);

  fireEvent.click(screen.getByRole('button', { name: 'Aries' }));
  fireEvent.click(screen.getByRole('button', { name: 'Malas' }));

  expect(screen.getByRole('button', { name: 'Aries' })).toHaveAttribute('aria-pressed', 'true');
  const filteredCount = Number(screen.getByText(/^\d+ malas$/).textContent.match(/^\d+/)[0]);
  expect(filteredCount).toBeGreaterThan(0);
  expect(filteredCount).toBeLessThan(35);

  fireEvent.change(screen.getByRole('searchbox', { name: 'Find a mala' }), {
    target: { value: 'Kamal Gatta' },
  });

  expect(screen.getByText('0 malas')).toBeInTheDocument();
  expect(screen.getByText(/No malas match your search and zodiac selection/)).toBeInTheDocument();
});

test('filters gemstone bracelets by their traditional zodiac associations', () => {
  render(<CrystalsPage />);
  fireEvent.click(screen.getByRole('button', { name: 'Bracelets' }));
  fireEvent.change(screen.getByRole('searchbox', { name: 'Find a bracelet' }), {
    target: { value: 'Rose Quartz' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Taurus' }));

  const roseQuartzBracelet = screen.getAllByRole('article')[0];
  expect(within(roseQuartzBracelet).getByRole('heading', { name: /Rose Quartz Bracelet/ })).toBeInTheDocument();
  fireEvent.click(within(roseQuartzBracelet).getByText('Use, significance & zodiac'));
  expect(within(roseQuartzBracelet).getByText(/love, compassion, and self-kindness/)).toBeInTheDocument();
  expect(within(roseQuartzBracelet).getByText('Taurus, Libra')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Pisces' }));
  expect(screen.getByText(/No bracelets match your search and zodiac selection/)).toBeInTheDocument();
});
