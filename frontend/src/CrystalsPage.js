import React, { useEffect, useState } from 'react';
import './CrystalsPage.css';
import crystalImageUrls from './crystalImageUrls';
import crystalLore from './crystalLore';
import getProductLore from './productLore';
import productCatalog from './productCatalog.json';

const whatsappNumber = '917795119975';
const catalogTabs = [
  { id: 'crystals', label: 'Crystals', singular: 'crystal', plural: 'crystals' },
  { id: 'malas', label: 'Malas', singular: 'mala', plural: 'malas' },
  { id: 'beads', label: 'Beads', singular: 'bead', plural: 'beads' },
  { id: 'bracelets', label: 'Bracelets', singular: 'bracelet', plural: 'bracelets' },
];
const zodiacSigns = [
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
];

const getCatalogColumnCount = () => {
  if (window.innerWidth <= 380) return 1;
  if (window.innerWidth <= 680) return 2;
  if (window.innerWidth <= 900) return 3;
  return 4;
};

const crystalTypes = [
  'Amazonite',
  'Amber',
  'Amethyst',
  'Angelite',
  'Aquamarine',
  'Azurite',
  'Black Obsidian',
  'Black Tourmaline',
  'Bloodstone',
  'Blue Apatite',
  'Blue Calcite',
  'Blue Kyanite',
  'Blue Lace Agate',
  'Blue Opal',
  'Bumble Bee Jasper',
  'Carnelian',
  'Celestite',
  'Chrysocolla',
  'Chrysoprase',
  'Citrine',
  'Clear Quartz',
  'Emerald',
  'Garnet',
  'Dark Green Aventurine',
  'Light Green Aventurine',
  'Green Fluorite',
  'Hematite',
  'Howlite',
  'Iolite',
  'Kambaba Jasper',
  'Kunzite',
  'Labradorite',
  'Lapis Lazuli',
  'Larimar',
  'Lepidolite',
  'Libyan Desert Glass',
  'Mahogany Obsidian',
  'Malachite',
  'Mangano Calcite',
  'Moldavite',
  'Moss Agate',
  'Moonstone',
  'Multi Fluorite',
  'Multi Moonstone',
  'Multi Tiger Eye',
  'Multi-Tourmaline',
  'Nephrite Jade',
  'Orthoceras',
  'Peach Moonstone',
  'Peridot',
  'Petrified Wood',
  'Pietersite',
  'Pink Opal',
  'Prehnite',
  'Pyrite',
  'Red Jasper',
  'Rhodochrosite',
  'Rhodonite',
  'Rose Quartz',
  'Ruby',
  'Ruby Fuchsite',
  'Rutilated Quartz',
  'Selenite',
  'Septarian',
  'Seraphinite',
  'Serpentine',
  'Shungite',
  'Smoky Quartz',
  'Sodalite',
  'Sulemani Hakik',
  'Sunstone',
  'Tanzanite',
  'Tiger Eye',
  'Tourmalinated Quartz',
  'Turquoise',
  'Unakite',
  'Yellow/Orange Calcite',
  'Yellow Quartz',
];

const getWhatsAppLink = (product) => {
  const message = product
    ? `Hi, I’m interested in ${product}. Could you share current availability and details?`
    : 'Hi, I’d like to know more about the products available from Astrobee 33.';

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

function CrystalsPage() {
  const [search, setSearch] = useState('');
  const [selectedZodiac, setSelectedZodiac] = useState('');
  const [selectedCatalogTab, setSelectedCatalogTab] = useState('crystals');
  const [showAllItems, setShowAllItems] = useState(false);
  const [catalogColumnCount, setCatalogColumnCount] = useState(getCatalogColumnCount);

  useEffect(() => {
    const updateCatalogColumnCount = () => setCatalogColumnCount(getCatalogColumnCount());
    window.addEventListener('resize', updateCatalogColumnCount);

    return () => window.removeEventListener('resize', updateCatalogColumnCount);
  }, []);

  const filteredCrystals = crystalTypes.filter((crystal) => {
    const matchesSearch = crystal.toLowerCase().includes(search.trim().toLowerCase());
    const zodiacAssociations = crystalLore[crystal].zodiac;
    const matchesZodiac =
      !selectedZodiac ||
      zodiacAssociations === 'All zodiac signs' ||
      zodiacAssociations.split(', ').includes(selectedZodiac);

    return matchesSearch && matchesZodiac;
  });
  const selectedTab = catalogTabs.find((tab) => tab.id === selectedCatalogTab);
  const isCrystalTab = selectedCatalogTab === 'crystals';
  const filteredProducts = productCatalog.filter((product) => {
    const matchesTab = product.category === selectedCatalogTab;
    const matchesSearch = product.name.toLowerCase().includes(search.trim().toLowerCase());
    const productZodiac = getProductLore(product).zodiac;
    const matchesZodiac =
      !selectedZodiac ||
      productZodiac === 'All zodiac signs' ||
      productZodiac.split(', ').includes(selectedZodiac);

    return matchesTab && matchesSearch && matchesZodiac;
  });
  const filteredItems = isCrystalTab ? filteredCrystals : filteredProducts;
  const initialVisibleCount = catalogColumnCount * 2;
  const visibleItems = showAllItems
    ? filteredItems
    : filteredItems.slice(0, initialVisibleCount);

  const updateSearch = (event) => {
    setSearch(event.target.value);
    setShowAllItems(false);
  };

  const updateZodiac = (zodiac) => {
    setSelectedZodiac(zodiac);
    setShowAllItems(false);
  };

  const selectCatalogTab = (tab) => {
    setSelectedCatalogTab(tab);
    setSearch('');
    setSelectedZodiac('');
    setShowAllItems(false);
  };

  return (
    <div className="crystals-page">
      <section className="crystals-hero">
        <div className="crystals-hero-copy">
          <p className="crystals-eyebrow">The Astrobee 33 collection</p>
          <h2>Find a piece that speaks to you.</h2>
          <p>
            Explore crystals, malas, beads, and bracelets. Message Bhumika for
            current availability and pricing—no prices are listed here.
          </p>
          <div className="crystals-hero-actions">
            <a href="#crystal-catalog" className="crystals-primary-link">
              Explore crystals
            </a>
            <a
              href={getWhatsAppLink()}
              className="crystals-secondary-link"
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
          <span className="crystals-contact-number">WhatsApp Business · +91 77951 19975</span>
        </div>

        <div className="crystals-hero-art" aria-hidden="true">
          <span className="hero-stone hero-stone-one" />
          <span className="hero-stone hero-stone-two" />
          <span className="hero-stone hero-stone-three" />
          <span className="hero-art-orbit" />
        </div>
      </section>

      <section className="crystal-catalog" id="crystal-catalog">
        <div className="catalog-tabs" role="group" aria-label="Shop by category">
          {catalogTabs.map((tab) => (
            <button
              type="button"
              className={`catalog-tab${selectedCatalogTab === tab.id ? ' is-active' : ''}`}
              aria-pressed={selectedCatalogTab === tab.id}
              key={tab.id}
              onClick={() => selectCatalogTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="catalog-heading">
          <div>
            <p className="crystals-eyebrow">Explore the collection</p>
            <h3>
              {isCrystalTab ? 'Shop by crystal' : `Shop ${selectedTab.label.toLowerCase()}`}
            </h3>
            <p>
              {isCrystalTab
                ? 'Ask on WhatsApp to confirm which pieces and forms are currently available. Crystal meanings and zodiac links below reflect traditional spiritual associations; they vary by tradition and are not medical or scientifically established effects.'
                : `Browse ${selectedTab.plural} and message Bhumika on WhatsApp to confirm current availability and pricing. Product meanings and zodiac links reflect traditional associations, vary by tradition, and are not medical or scientifically established effects. Prices are not displayed.`}
            </p>
          </div>
          <label className="crystal-search">
            <span>Find a {selectedTab.singular}</span>
            <input
              type="search"
              value={search}
              onChange={updateSearch}
              placeholder={`Search ${selectedTab.plural}`}
            />
          </label>
        </div>

        <div className="zodiac-filter" aria-labelledby="zodiac-filter-heading">
          <div className="zodiac-filter-heading">
            <h4 id="zodiac-filter-heading">Shop by zodiac sign</h4>
            <p>
              Choose a sign to see {selectedTab.plural} traditionally associated with it.
            </p>
          </div>
          <div className="zodiac-filter-options">
            <button
              type="button"
              className={`zodiac-filter-button${selectedZodiac ? '' : ' is-selected'}`}
              aria-pressed={!selectedZodiac}
              onClick={() => updateZodiac('')}
            >
              All {selectedTab.plural}
            </button>
            {zodiacSigns.map((zodiac) => (
              <button
                type="button"
                className={`zodiac-filter-button${selectedZodiac === zodiac ? ' is-selected' : ''}`}
                aria-pressed={selectedZodiac === zodiac}
                key={zodiac}
                onClick={() => updateZodiac(zodiac)}
              >
                {zodiac}
              </button>
            ))}
          </div>
        </div>

        <p className="catalog-count" aria-live="polite">
          {filteredItems.length}{' '}
          {filteredItems.length === 1 ? selectedTab.singular : selectedTab.plural}
        </p>

        {filteredItems.length ? (
          <div className="crystal-catalog-grid">
            {isCrystalTab
              ? visibleItems.map((crystal) => (
                  <article className="crystal-item" key={crystal}>
                    <img
                      className="crystal-photo"
                      src={crystalImageUrls[crystal]}
                      alt={`${crystal} crystal`}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="crystal-item-copy">
                      <h4>{crystal}</h4>
                      <details className="crystal-details">
                        <summary>Meaning & zodiac</summary>
                        <dl>
                          <div>
                            <dt>Traditional association</dt>
                            <dd>{crystalLore[crystal].meaning}</dd>
                          </div>
                          <div>
                            <dt>Often linked with</dt>
                            <dd>{crystalLore[crystal].zodiac}</dd>
                          </div>
                        </dl>
                      </details>
                      <a
                        href={getWhatsAppLink(crystal)}
                        target="_blank"
                        rel="noreferrer"
                        className="crystal-inquiry-link"
                      >
                        Ask on WhatsApp <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </article>
                ))
              : visibleItems.map((product) => (
                  <article className="crystal-item" key={product.id}>
                    <img
                      className="crystal-photo"
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="crystal-item-copy">
                      <h4>{product.name}</h4>
                      <details className="crystal-details">
                        <summary>Use, significance & zodiac</summary>
                        <dl>
                          <div>
                            <dt>Who may use</dt>
                            <dd>{getProductLore(product).whoCanUse}</dd>
                          </div>
                          <div>
                            <dt>Traditional significance</dt>
                            <dd>{getProductLore(product).significance}</dd>
                          </div>
                          <div>
                            <dt>Often linked with</dt>
                            <dd>{getProductLore(product).zodiac}</dd>
                          </div>
                        </dl>
                      </details>
                      <a
                        href={getWhatsAppLink(product.name)}
                        target="_blank"
                        rel="noreferrer"
                        className="crystal-inquiry-link"
                      >
                        Ask on WhatsApp <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </article>
                ))}
          </div>
        ) : (
          <p className="no-crystal-results">
            No {selectedTab.plural} match your search
            {selectedZodiac ? ' and zodiac selection' : ''}. Try another name
            {selectedZodiac ? ` or choose All ${selectedTab.plural}` : ''}.
          </p>
        )}
        {filteredItems.length > initialVisibleCount && (
          <button
            type="button"
            className="crystal-view-toggle"
            onClick={() => setShowAllItems(!showAllItems)}
          >
            {showAllItems ? 'View less' : 'View more'}
          </button>
        )}
      </section>

      <section className="crystal-contact-panel">
        <div>
          <p className="crystals-eyebrow">Need help choosing?</p>
          <h3>Let’s find the right piece for you.</h3>
          <p>Message Bhumika for current options, photos, and pricing.</p>
        </div>
        <a
          href={getWhatsAppLink()}
          className="crystals-primary-link"
          target="_blank"
          rel="noreferrer"
        >
          Message on WhatsApp
        </a>
      </section>
    </div>
  );
}

export default CrystalsPage;
