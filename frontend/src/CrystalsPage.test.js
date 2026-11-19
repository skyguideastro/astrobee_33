import { fireEvent, render, screen, within } from '@testing-library/react';
import CrystalsPage from './CrystalsPage';

test('shows the crystal catalog without prices and links inquiries to WhatsApp', () => {
  render(<CrystalsPage />);

  expect(screen.getByRole('group', { name: 'Shop by category' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Shop by crystal' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Yellow Sapphire' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Opal' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Malas' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Beads' })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Bracelets' })).toBeInTheDocument();
  expect(screen.getAllByRole('img')).toHaveLength(8);
  expect(screen.queryByText(/₹|sale price|regular price/i)).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'View more' })).toBeInTheDocument();

  const citrineCard = screen.getAllByRole('article')[3];
  expect(within(citrineCard).getByRole('img')).toHaveAttribute('src', '/crystals/citrine.png');
  fireEvent.click(within(citrineCard).getByText('Meaning & zodiac'));
  expect(within(citrineCard).getByText('Optimism, confidence, and abundance intentions.')).toBeInTheDocument();
  expect(within(citrineCard).getByText('Gemini, Leo')).toBeInTheDocument();

  const crystalInquiry = screen.getAllByRole('link', { name: /Ask on WhatsApp/i })[0];
  expect(crystalInquiry.href).toContain('https://wa.me/917795119975');
  expect(crystalInquiry.href).toContain(encodeURIComponent('Yellow Sapphire'));

  fireEvent.click(screen.getByRole('button', { name: 'View more' }));
  expect(screen.getAllByRole('img')).toHaveLength(15);
  expect(screen.getByRole('heading', { name: 'Opal' })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'View less' }));
  expect(screen.getAllByRole('img')).toHaveLength(8);
});

test('does not render a customer reviews section on the Crystals page', () => {
  render(<CrystalsPage />);

  expect(screen.queryByRole('heading', { name: 'Customer reviews' })).not.toBeInTheDocument();
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
  expect(screen.getByRole('heading', { name: 'Pearl' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Opal' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Blue Sapphire' })).not.toBeInTheDocument();

  screen.getAllByRole('article').filter((card) =>
    card.classList.contains('crystal-item')
  ).forEach((card) => {
    expect(within(card).getByText(/Pisces|All zodiac signs/)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole('button', { name: 'All crystals' }));
  expect(screen.getByRole('heading', { name: 'Yellow Sapphire' })).toBeInTheDocument();
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
  expect(
    screen.getAllByRole('article').filter((card) => card.classList.contains('crystal-item'))
  ).toHaveLength(expectedItems);

  window.innerWidth = originalWidth;
});

test('keeps malas and beads removed while adding bracelets beside crystals', () => {
  render(<CrystalsPage />);
  fireEvent.change(screen.getByRole('searchbox', { name: 'Find a crystal' }), {
    target: { value: 'Emerald' },
  });

  expect(screen.getByRole('heading', { name: 'Emerald' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Yellow Sapphire' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Malas' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Beads' })).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Bracelets' }));
  expect(screen.getByRole('heading', { name: 'Shop bracelets' })).toBeInTheDocument();
  expect(screen.getByText('96 bracelets')).toBeInTheDocument();
});
