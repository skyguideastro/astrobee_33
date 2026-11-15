import { render, screen } from '@testing-library/react';
import App from './App';

test('loads backend status on mount', async () => {
  global.fetch = jest.fn((url) => {
    if (url === '/health') {
      return Promise.resolve({
        ok: true,
        text: () => Promise.resolve('OK'),
      });
    }

    if (url === '/api/info') {
      return Promise.resolve({
        ok: true,
        text: () => Promise.resolve('Spring Boot Application: astrologybackend'),
      });
    }

    return Promise.resolve({ ok: false, text: () => Promise.resolve('') });
  });

  render(<App />);

  expect(screen.getByText('Bhumika Rittimath')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Astrology' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Numerology' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Chakra balancing' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Crystal guidance' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Cord cutting' })).toBeInTheDocument();
  expect(screen.getByText(/Explore astrological themes/)).toBeInTheDocument();
  expect(screen.getByAltText('Astrobee 33 logo')).toHaveAttribute(
    'src',
    screen.getByAltText('Astrobee 33 profile logo').getAttribute('src')
  );
  expect(screen.getByRole('link', { name: 'Crystals' })).toHaveAttribute('href', '/?page=crystals');
  expect(screen.getByRole('link', { name: 'Visit Instagram' })).toHaveAttribute(
    'href',
    'https://www.instagram.com/astrobee_33/'
  );
  expect(await screen.findByText(/Backend online/i)).toBeInTheDocument();
  expect(await screen.findByText(/Spring Boot Application: astrologybackend/i)).toBeInTheDocument();
});
