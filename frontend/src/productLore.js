import crystalLore from './crystalLore';

const crystalNames = Object.keys(crystalLore).sort((left, right) => right.length - left.length);
const materialAliases = [
  ['ambar', 'Amber'],
  ['firoza', 'Turquoise'],
  ['sphatik', 'Clear Quartz'],
  ['hakik', 'Sulemani Hakik'],
  ['green aventurine', 'Light Green Aventurine'],
];

const categorySignificance = {
  malas: 'Traditionally used to count mantra repetitions during prayer or meditation.',
  beads: 'Traditionally carried, worn, or used for japa and devotional practice.',
  bracelets: 'Traditionally worn as a symbolic or devotional reminder.',
};

const findCrystalMaterial = (productName) => {
  const normalizedName = productName.toLowerCase();
  const crystalName = crystalNames.find((name) => normalizedName.includes(name.toLowerCase()));
  if (crystalName) return crystalName;

  const alias = materialAliases.find(([name]) => normalizedName.includes(name));
  return alias ? alias[1] : '';
};

function getProductLore(product) {
  const isRudraksha = /rudraksha|mukhi/i.test(product.name);
  const crystalMaterial = isRudraksha ? '' : findCrystalMaterial(product.name);
  const whoCanUse =
    product.category === 'bracelets'
      ? 'Anyone drawn to wear it as a personal or devotional reminder; wearing and care customs vary by tradition.'
      : 'People who include prayer, mantra, or meditation in their practice; follow the customs of their own tradition.';
  const significance = isRudraksha
    ? 'Rudraksha is traditionally used for japa and associated with Shiva devotion. The significance of specific mukhi counts varies across traditions.'
    : `${categorySignificance[product.category]}${
        crystalMaterial
          ? ` The material is traditionally associated with ${crystalLore[crystalMaterial].meaning.toLowerCase()}`
          : ''
      }`;
  let zodiac = 'Zodiac association not specified';
  if (isRudraksha) {
    zodiac = 'All zodiac signs';
  } else if (crystalMaterial) {
    zodiac = crystalLore[crystalMaterial].zodiac;
  }

  return { whoCanUse, significance, zodiac };
}

export default getProductLore;
