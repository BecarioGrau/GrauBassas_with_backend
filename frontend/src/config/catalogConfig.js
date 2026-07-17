/** Mapeo slug de ruta → archivo JSON estático en public/data */
export const CATEGORY_JSON_FILES = {
  aceros: "aceros.json",
  aluminios: "aluminios.json",
  inoxidables: "inoxidables.json",
  bronce: "bronce.json",
  laton: "laton.json",
  cobre: "cobre.json",
  hierros_fundidos: "hierros_fundidos.json",
  zinc: "zinc.json",
  plasticos_industriales: "plasticos_industriales.json",
};

export const API_PRODUCTS_BASE =
  import.meta.env.VITE_API_URL || "https://graubassaswithbackend-production.up.railway.app/api/products/";
