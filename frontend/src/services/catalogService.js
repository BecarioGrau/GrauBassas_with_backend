import { CATEGORY_JSON_FILES } from "../config/catalogConfig";
import { getProducts as fetchApiProducts } from "../api/catalogApi";

const normalizeTitle = (title) =>
  String(title ?? "")
    .trim()
    .toLowerCase();

const PLACEHOLDER_VALUES = new Set(["", "-", "—", "–"]);

function isPlaceholder(val) {
  return PLACEHOLDER_VALUES.has(String(val ?? "").trim());
}

function isEmptyValue(val) {
  if (val === null || val === undefined) return true;
  if (Array.isArray(val)) {
    return val.length === 0 || val.every((item) => isPlaceholder(item));
  }
  if (typeof val === "object") {
    const entries = Object.entries(val);
    if (entries.length === 0) return true;
    return entries.every(([, v]) => isEmptyValue(v));
  }
  if (typeof val === "string") return isPlaceholder(val);
  return false;
}

function hasTechnicalContent(product) {
  if (!product) return false;
  if (Array.isArray(product.data) && product.data.length > 0) return true;
  if (Array.isArray(product.specs) && product.specs.some((s) => !isPlaceholder(s)))
    return true;
  if (!isEmptyValue(product.chemical)) return true;
  const mech = product.mechanical;
  if (!isEmptyValue(mech)) {
    if (Array.isArray(mech?.rows) && mech.rows.some((row) => !isEmptyValue(row)))
      return true;
    if (
      typeof mech === "object" &&
      Object.entries(mech).some(
        ([key, v]) => key !== "rows" && !isEmptyValue(v),
      )
    )
      return true;
  }
  if (
    product.equivalencias &&
    Object.values(product.equivalencias).some((v) => !isPlaceholder(v))
  )
    return true;
  return false;
}

/** Combina API + JSON: la API aporta id/cambios de admin; el JSON rellena fichas incompletas. */
function mergeDisplayProducts(jsonProduct, apiProduct) {
  if (!jsonProduct) return apiProduct;
  if (!apiProduct) return jsonProduct;

  const merged = { ...jsonProduct, ...apiProduct };
  const fields = ["specs", "chemical", "mechanical", "equivalencias", "data", "suministro"];
  for (const field of fields) {
    if (isEmptyValue(apiProduct[field]) && !isEmptyValue(jsonProduct[field])) {
      merged[field] = jsonProduct[field];
    }
  }

  if (!hasTechnicalContent(apiProduct) && hasTechnicalContent(jsonProduct)) {
    merged.specs = jsonProduct.specs ?? merged.specs;
    merged.chemical = jsonProduct.chemical ?? merged.chemical;
    merged.mechanical = jsonProduct.mechanical ?? merged.mechanical;
    merged.equivalencias = jsonProduct.equivalencias ?? merged.equivalencias;
    merged.data = jsonProduct.data ?? merged.data;
  }

  return toDisplayProduct(merged);
}

/** Convierte mechanical en filas (API) al formato columnar de los JSON para DynamicTable */
function mechanicalToColumnFormat(mechanical) {
  if (!mechanical || typeof mechanical !== "object") return mechanical;
  if (mechanical.diametro && !mechanical.rows) return mechanical;

  const rows = Array.isArray(mechanical.rows) ? mechanical.rows : [];
  if (!rows.length) return mechanical;

  return {
    diametro: rows.map((r) => r.diametro ?? "—"),
    resistencia: rows.map((r) => r.rm ?? r.resistencia ?? "—"),
    limite: rows.map((r) => r.rp02 ?? r.limite ?? "—"),
    alargamiento: rows.map((r) => r.a5 ?? r.alargamiento ?? "—"),
    dureza: rows.map((r) => r.notas ?? r.dureza ?? "—"),
  };
}

/** Asegura que chemical use arrays como en los JSON estáticos */
function chemicalToDisplayFormat(chemical) {
  const chem = chemical && typeof chemical === "object" ? { ...chemical } : {};
  for (const [key, val] of Object.entries(chem)) {
    if (val !== null && val !== undefined && !Array.isArray(val)) {
      chem[key] = [String(val), String(val)];
    }
  }
  return chem;
}

/**
 * Normaliza un producto (JSON estático o API Django) al formato que usa frontend2.
 */
export function toDisplayProduct(product) {
  if (!product) return null;
  return {
    ...product,
    id: product.id,
    suministro: product.suministro ?? product.suministros ?? "",
    chemical: chemicalToDisplayFormat(product.chemical),
    mechanical: mechanicalToColumnFormat(product.mechanical),
    cortes: Array.isArray(product.cortes)
      ? product.cortes.map((c) =>
          typeof c === "string" ? { label: c, href: "#" } : c,
        )
      : [],
  };
}

/** Slug de ruta → archivo JSON / API (cuando difieren) */
const CATEGORY_SLUG_ALIASES = {
  hierros_de_fundicion: "hierros_fundidos",
};

const API_KIND_ALIASES = {
  hierros_fundidos: "hierros_fundicion",
  hierros_de_fundicion: "hierros_fundicion",
};

function resolveJsonSlug(categorySlug) {
  const slug = categorySlug?.toLowerCase() || "";
  return CATEGORY_SLUG_ALIASES[slug] || slug;
}

function resolveApiKind(categorySlug) {
  const slug = categorySlug?.toLowerCase() || "";
  const jsonSlug = resolveJsonSlug(slug);
  return API_KIND_ALIASES[jsonSlug] || API_KIND_ALIASES[slug] || slug;
}

async function fetchJsonProducts(categorySlug) {
  const file = CATEGORY_JSON_FILES[resolveJsonSlug(categorySlug)];
  if (!file) return [];
  try {
    const res = await fetch(`/data/${file}`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function fetchApiProductsSafe(categorySlug) {
  const apiKind = resolveApiKind(categorySlug);
  try {
    const data = await fetchApiProducts(apiKind);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/**
 * Lista fusionada: JSON estático + API.
 * Si la API tiene ficha vacía (típico tras crear en admin), prevalece el JSON.
 */
export async function getProductsByCategory(categorySlug) {
  const slug = categorySlug?.toLowerCase() || "";
  const [jsonList, apiList] = await Promise.all([
    fetchJsonProducts(slug),
    fetchApiProductsSafe(slug),
  ]);

  const byTitle = new Map();
  for (const p of jsonList) {
    byTitle.set(normalizeTitle(p.title), toDisplayProduct(p));
  }
  for (const p of apiList) {
    const key = normalizeTitle(p.title);
    const jsonProduct = byTitle.get(key);
    byTitle.set(key, mergeDisplayProducts(jsonProduct, toDisplayProduct(p)));
  }

  return Array.from(byTitle.values()).sort((a, b) =>
    String(a.title ?? "").localeCompare(String(b.title ?? ""), "es"),
  );
}

export async function findProductByCategoryAndTitle(categorySlug, title) {
  const products = await getProductsByCategory(categorySlug);
  const target = normalizeTitle(title);
  return products.find((p) => normalizeTitle(p.title) === target) ?? null;
}

export async function fetchTemplates() {
  const res = await fetch("/data/templates.json");
  if (!res.ok) throw new Error("No se pudo cargar templates.json");
  return res.json();
}

export async function getProductWithTemplate(categorySlug, title) {
  const [calidad, allTemplates] = await Promise.all([
    findProductByCategoryAndTitle(categorySlug, title),
    fetchTemplates(),
  ]);

  const template = allTemplates["plantilla_universal"];

  return { calidad, template, allTemplates };
}
