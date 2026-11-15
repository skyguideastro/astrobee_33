import getPublicUrl from './publicUrl';

describe('getPublicUrl', () => {
  const originalPublicUrl = process.env.PUBLIC_URL;

  afterEach(() => {
    if (originalPublicUrl === undefined) {
      delete process.env.PUBLIC_URL;
    } else {
      process.env.PUBLIC_URL = originalPublicUrl;
    }
  });

  it('resolves assets and navigation under the configured public path', () => {
    process.env.PUBLIC_URL = '.';

    expect(getPublicUrl('/crystals/amethyst.webp')).toBe('./crystals/amethyst.webp');
    expect(getPublicUrl('/?page=crystals')).toBe('./?page=crystals');
  });

  it('keeps root paths during local development', () => {
    process.env.PUBLIC_URL = '/';

    expect(getPublicUrl('/crystals/amethyst.webp')).toBe('/crystals/amethyst.webp');
  });
});
