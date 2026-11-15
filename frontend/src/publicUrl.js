const getPublicUrl = (path) => {
  const baseUrl = (process.env.PUBLIC_URL || '').replace(/\/+$/, '');
  const relativePath = path.replace(/^\/+/, '');

  return `${baseUrl}/${relativePath}`;
};

export default getPublicUrl;
