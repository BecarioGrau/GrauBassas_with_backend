import { PESOS_TEORICOS } from "../data/pesosTeoricos";

const FORMULAS = {
  redondo: (d, rho) => ((Math.PI / 4) * d * d * rho) / 1000,
  cuadrado: (a, rho) => (a * a * rho) / 1000,
  hexagono: (a, rho) => ((Math.sqrt(3) / 2) * a * a * rho) / 1000,
  chapa: (e, rho) => e * rho,
};

const PLURAL_MAPPING = {
  Redondo: "Redondos",
  Cuadrado: "Cuadrados",
  Hexágono: "Hexagonal",
  Llanta: "Llanta",
  Palanquilla: "Palanquilla",
  Chapa: "Chapas",
};

export const parseChapasEntry = (entry) => {
  if (!entry) return null;
  if (typeof entry === "object" && !Array.isArray(entry)) return entry;
  if (typeof entry === "string") return { rango: entry, formatos: [] };
  return null;
};

export const buildWeightTableData = (cutKey, densidad) => {
  const section = PESOS_TEORICOS[cutKey];
  if (!section) return null;
  const formulaFn = FORMULAS[section.formula];
  if (!formulaFn) return null;

  const data = section.medidas.map((m) => ({
    medida: String(m),
    peso: formulaFn(m, densidad).toFixed(3),
  }));

  return { ...section, data };
};

export const getChapaInfo = (calidad) => {
  if (!calidad?.gama_medidas) return null;
  const entry =
    calidad.gama_medidas["Chapas"] || calidad.gama_medidas["Chapa"];
  return parseChapasEntry(entry);
};

export const getWeightTableForCut = (selectedCut, calidad, densidad) => {
  const rawSection = PESOS_TEORICOS[selectedCut];
  if (!rawSection) return { filteredData: null, matchRanges: [] };

  const fullSection = buildWeightTableData(selectedCut, densidad);
  if (!fullSection) return { filteredData: null, matchRanges: [] };

  const pluralCut = PLURAL_MAPPING[selectedCut] || selectedCut;
  const ranges = [];
  let minMeasure = Infinity;
  let maxMeasure = -Infinity;

  if (calidad?.gama_medidas) {
    const findRangeString = (profiles) =>
      profiles[pluralCut] ||
      profiles[selectedCut] ||
      profiles[selectedCut.charAt(0).toUpperCase() + selectedCut.slice(1)] ||
      profiles[`${selectedCut}s`];

    Object.entries(calidad.gama_medidas).forEach(([finish, profiles]) => {
      const rangeStr = findRangeString(profiles);
      if (rangeStr) {
        ranges.push({ finish, range: rangeStr });
        const matches = rangeStr.match(/(\d+(?:\.\d+)?)/g);
        if (matches?.length >= 1) {
          const values = matches.map((v) => parseFloat(v));
          minMeasure = Math.min(minMeasure, ...values);
          maxMeasure = Math.max(maxMeasure, ...values);
        }
      }
    });
  }

  if (minMeasure === Infinity || maxMeasure === -Infinity) {
    return { filteredData: fullSection, matchRanges: ranges };
  }

  const filteredRows = fullSection.data.filter((row) => {
    const val = parseFloat(row.medida);
    return val >= minMeasure && val <= maxMeasure;
  });

  return {
    filteredData: { ...fullSection, data: filteredRows },
    matchRanges: ranges,
  };
};
