import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders Guidance content and direct contact links', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Meet Bhumika L. Rittimath' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Astrology' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Chakra balancing' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Crystal guidance' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Cord cutting' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Tarot' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'How a consultation starts' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Frequently asked questions' })).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Customer reviews' })).toBeInTheDocument();
  expect(screen.queryByText('Share your experience')).not.toBeInTheDocument();
  expect(document.querySelector('.review-submission-panel')).not.toBeInTheDocument();
  expect(document.querySelector('.site-background')).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Meet Bhumika L. Rittimath' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'A pleasant and insightful session' })).toBeInTheDocument();
  expect(screen.getAllByText('Client reflection')).toHaveLength(10);
  expect(screen.getByRole('button', { name: 'Show customer review 1' })).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  expect(screen.getByAltText('Astrobee 33 logo')).toHaveAttribute(
    'src',
    screen.getByAltText('Astrobee 33 profile logo').getAttribute('src')
  );
  expect(screen.getByRole('link', { name: 'Crystals' })).toHaveAttribute(
    'href',
    '/?page=crystals'
  );
  expect(screen.getByRole('link', { name: 'Guidance' })).toHaveAttribute(
    'aria-current',
    'page'
  );
  expect(screen.getByRole('link', { name: 'Book' })).not.toHaveAttribute('aria-current');
  expect(screen.getByRole('link', { name: 'View profile' })).toHaveAttribute(
    'href',
    'https://www.instagram.com/astrobee_33/'
  );
  expect(screen.getByRole('link', { name: '@astrobee33' })).toHaveAttribute(
    'href',
    'https://youtube.com/@astrobee33-w8e?si=AdED7rKHwH5Rh7Om'
  );
  expect(screen.getByRole('link', { name: 'Ask about Astrology' })).toHaveAttribute(
    'href',
    expect.stringContaining('https://wa.me/917795119975')
  );
  expect(screen.getByRole('link', { name: 'skyguideastro@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:skyguideastro@gmail.com'
  );
  expect(screen.getByText(/^© \d{4} Astrobee 33\. All rights reserved\.$/)).toBeInTheDocument();
  expect(screen.queryByText(/backend|Spring Boot/i)).not.toBeInTheDocument();
});

test('lets visitors navigate the auto-sliding customer reviews', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'Show customer review 2' }));

  expect(screen.getByRole('button', { name: 'Show customer review 2' })).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  expect(screen.getByText('Helpful, personal guidance').closest('article')).toHaveAttribute(
    'aria-hidden',
    'false'
  );
});

test('automatically advances customer reviews every five seconds', () => {
  jest.useFakeTimers();
  const { unmount } = render(<App />);

  try {
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByRole('button', { name: 'Show customer review 2' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  } finally {
    unmount();
    jest.useRealTimers();
  }
});

test('updates preparation guidance when the selected service changes', () => {
  render(<App />);

  expect(screen.getByText(/Have your birth date, birth time/)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('Service of interest'), {
    target: { value: 'Tarot' },
  });

  expect(screen.getByText(/Bring an open-ended question or life area/)).toBeInTheDocument();
});

test('builds a WhatsApp inquiry with the selected service and optional details', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText('Service of interest'), {
    target: { value: 'Tarot' },
  });
  fireEvent.change(screen.getByLabelText('Your name (optional)'), {
    target: { value: 'Mira' },
  });
  fireEvent.change(screen.getByLabelText('What would you like to explore? (optional)'), {
    target: { value: 'Understanding my personal year' },
  });

  const bookingLink = screen.getByRole('link', { name: 'Continue to WhatsApp' });
  const inquiry = new URL(bookingLink.getAttribute('href')).searchParams.get('text');

  expect(inquiry).toContain('Service: Tarot');
  expect(inquiry).toContain('Name: Mira');
  expect(inquiry).toContain('What I’d like to explore: Understanding my personal year');
  expect(inquiry).toContain('Please share current availability, format, duration, and fee.');
});
