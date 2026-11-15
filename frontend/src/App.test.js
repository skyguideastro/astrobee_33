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

  expect(await screen.findByText(/Backend online/i)).toBeInTheDocument();
  expect(await screen.findByText(/Spring Boot Application: astrologybackend/i)).toBeInTheDocument();
});
