import { INITIAL_STATE } from "../constants/productConstants";

export const safeObject = (value) => {
  if (!value || Array.isArray(value)) return {};
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? parsed
        : {};
    } catch {
      return {};
    }
  }
  return typeof value === "object" ? value : {};
};

export const normalizeSpecsForForm = (specs) => {
  if (!Array.isArray(specs)) return [];
  return specs.map((s) => {
    if (typeof s === "string") return s;
    if (s && typeof s === "object") {
      const label = String(s.label ?? s.titulo ?? "").trim();
      const value = String(s.value ?? s.valor ?? s.text ?? "").trim();
      if (label && value) return `${label}: ${value}`;
      if (value) return value;
      if (label) return label;
      try {
        return JSON.stringify(s);
      } catch {
        return "";
      }
    }
    return String(s ?? "");
  });
};

export const normalizeMechanicalForForm = (mechanical) => {
  const m = mechanical;
  let rows = [];
  if (!m || typeof m !== "object") {
    return { rows: [] };
  }
  if (Array.isArray(m.rows)) {
    rows = m.rows;
  } else if (Array.isArray(m)) {
    rows = m;
  } else if (typeof m === "object" && !m.diametro) {
    rows = Object.entries(m)
      .filter(([k]) => k !== "rows")
      .map(([k, v]) => {
        const vo =
          typeof v === "object" && v !== null && !Array.isArray(v)
            ? v
            : { notas: String(v ?? "") };
        return {
          diametro: String(vo.diametro ?? vo.diameter ?? vo.d ?? k),
          rm: String(vo.rm ?? vo.Rm ?? vo.resistencia ?? ""),
          rp02: String(
            vo.rp02 ?? vo.Rp02 ?? vo.limite_elastico ?? vo.limite ?? vo.le ?? "",
          ),
          a5: String(vo.a5 ?? vo.A5 ?? vo.alargamiento ?? ""),
          notas: String(vo.notas ?? vo.notes ?? vo.dureza ?? ""),
        };
      });
  } else if (m.diametro) {
    const diameters = Array.isArray(m.diametro) ? m.diametro : [m.diametro];
    rows = diameters.map((d, i) => ({
      diametro: String(d ?? ""),
      rm: String(
        (Array.isArray(m.resistencia) ? m.resistencia[i] : m.resistencia) ?? "",
      ),
      rp02: String(
        (Array.isArray(m.limite) ? m.limite[i] : m.limite) ?? "",
      ),
      a5: String(
        (Array.isArray(m.alargamiento) ? m.alargamiento[i] : m.alargamiento) ??
          "",
      ),
      notas: String(
        (Array.isArray(m.dureza) ? m.dureza[i] : m.dureza) ?? "",
      ),
    }));
  }

  const mapped =
    rows.length > 0
      ? rows.map((r) => ({
          diametro: String(r?.diametro ?? r?.diameter ?? r?.d ?? ""),
          rm: String(r?.rm ?? r?.Rm ?? r?.resistencia ?? ""),
          rp02: String(
            r?.rp02 ?? r?.Rp02 ?? r?.limite_elastico ?? r?.limite ?? r?.le ?? "",
          ),
          a5: String(r?.a5 ?? r?.A5 ?? r?.alargamiento ?? ""),
          notas: String(r?.notas ?? r?.notes ?? r?.dureza ?? ""),
        }))
      : [];

  return { rows: mapped };
};

export const normalizeCortesForForm = (cortes) => {
  if (!Array.isArray(cortes)) return [];
  return cortes.map((c) => {
    if (typeof c === "string") return c;
    if (c && typeof c === "object") {
      const label = String(c.label ?? c.nombre ?? c.nombre_corte ?? "").trim();
      if (label) return label;
      const value = String(c.value ?? "").trim();
      if (value) return value;
      try {
        return JSON.stringify(c);
      } catch {
        return "";
      }
    }
    return String(c ?? "");
  });
};

export const normalizeProductForForm = (product = {}) => ({
  ...INITIAL_STATE,
  ...product,
  material_kind: product.material_kind || INITIAL_STATE.material_kind,
  suministros: product.suministros ?? product.suministro ?? "",
  table_config:
    product.table_config ?? product.tableConfig ?? INITIAL_STATE.table_config,
  specs: normalizeSpecsForForm(product.specs),
  cortes: normalizeCortesForForm(product.cortes),
  chemical: safeObject(product.chemical),
  mechanical: normalizeMechanicalForForm(product.mechanical),
  equivalencias: safeObject(product.equivalencias),
  gama_medidas: safeObject(product.gama_medidas),
});

export const stringifyMechanicalForApi = (mechanical) => {
  const src = mechanical && typeof mechanical === "object" ? mechanical : {};
  const raw = Array.isArray(src.rows) ? src.rows : [];
  const rows = raw
    .map((r) => ({
      diametro: String(r?.diametro ?? "").trim(),
      rm: String(r?.rm ?? "").trim(),
      rp02: String(r?.rp02 ?? "").trim(),
      a5: String(r?.a5 ?? "").trim(),
      notas: String(r?.notas ?? "").trim(),
    }))
    .filter((r) =>
      ["diametro", "rm", "rp02", "a5", "notas"].some((k) => r[k] !== ""),
    );
  return rows.length ? { rows } : {};
};

export const trimNonEmptyStringList = (arr) =>
  (Array.isArray(arr) ? arr : [])
    .map((line) => String(line ?? "").trim())
    .filter((line) => line.length > 0);

export const stringifyCortesForApi = (cortes) =>
  trimNonEmptyStringList(cortes).map((label) => ({ label, href: "#" }));

export const cleanObjectValues = (obj = {}) =>
  Object.fromEntries(
    Object.entries(safeObject(obj)).filter(([, value]) => {
      if (value === null || value === undefined) return false;
      return String(value).trim() !== "";
    }),
  );

export const formatApiError = async (res, fallback) => {
  try {
    const payload = await res.json();
    if (payload && typeof payload === "object") {
      const messages = Object.entries(payload)
        .flatMap(([field, value]) => {
          const normalized = Array.isArray(value)
            ? value.join(", ")
            : String(value);
          return `${field}: ${normalized}`;
        })
        .filter(Boolean);
      if (messages.length) return messages.join(" | ");
    }
  } catch {
    /* ignore */
  }
  return fallback;
};
