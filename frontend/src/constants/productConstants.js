export const MATERIAL_KIND_OPTIONS = [
  { value: "inoxidables", label: "Inoxidables" },
  { value: "aluminios", label: "Aluminios" },
  { value: "aceros", label: "Aceros" },
  { value: "hierros_fundicion", label: "Hierros de fundición" },
  { value: "bronce", label: "Bronce" },
  { value: "laton", label: "Latón" },
  { value: "cobre", label: "Cobre" },
  { value: "zinc", label: "Zinc" },
  { value: "plasticos_mecanizados", label: "Plásticos mecanizados" },
  { value: "plasticos_industriales", label: "Plásticos industriales" },
  { value: "suministros", label: "Suministros" },
];

export const MATERIAL_KIND_LABEL = Object.fromEntries(
  MATERIAL_KIND_OPTIONS.map(({ value, label }) => [value, label]),
);

export const INITIAL_STATE = {
  title: "",
  description: "",
  material_kind: "aceros",
  table_config: "plantilla_aceros",
  suministros: "",
  image: null,
  specs: [],
  chemical: {},
  mechanical: { rows: [] },
  equivalencias: {},
  cortes: [],
  gama_medidas: {},
};

export const COMMON_ELEMENTS = [
  "C",
  "Si",
  "Mn",
  "P",
  "S",
  "Cr",
  "Mo",
  "Ni",
  "V",
  "Al",
];

export const EMPTY_MECHANICAL_ROW = {
  diametro: "",
  rm: "",
  rp02: "",
  a5: "",
  notas: "",
};

export const TABLE_CONFIG_OPTIONS = [
  { value: "plantilla_aceros", label: "Aceros" },
  { value: "plantilla_bronce", label: "Bronce" },
  { value: "plantilla_aluminio", label: "Aluminio" },
  { value: "plantilla_cobre", label: "Cobre" },
  { value: "plantilla_zinc", label: "Zinc" },
];
