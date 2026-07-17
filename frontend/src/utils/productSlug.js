
export function normalizeProductTitle(title) {
  return String(title ?? "")
    .trim()
    .toLowerCase();
}

export function slugifyProductTitle(title) {
  if (!title) return "";
  return String(title)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^\w\d_-]/g, "");
}

export function productTitleMatches(urlTitle, productTitle) {
  const fromUrl = normalizeProductTitle(urlTitle);
  const fromProduct = normalizeProductTitle(productTitle);
  if (fromUrl === fromProduct) return true;
  return slugifyProductTitle(urlTitle) === slugifyProductTitle(productTitle);
}

export function productDetailPath(categorySlug, productTitle) {
  const slug = slugifyProductTitle(productTitle);
  return `/productos/materiales/${categorySlug}/${encodeURIComponent(slug)}`;
}
