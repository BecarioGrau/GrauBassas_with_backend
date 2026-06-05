import React, { useState, useEffect, useMemo } from "react";
import DynamicTable from "./DynamicTable";
import { PESOS_TEORICOS } from "../../data/pesosTeoricos";

const MATERIALES = {
  acero: { nombre: "Acero", densidad: 7.85 },
  aluminio: { nombre: "Aluminio", densidad: 2.7 },
  cobre: { nombre: "Cobre", densidad: 8.96 },
  laton: { nombre: "Latón", densidad: 8.5 },
  bronce: { nombre: "Bronce", densidad: 8.7 },
  zinc: { nombre: "Zinc", densidad: 7.14 },
  inox: { nombre: "Inoxidable", densidad: 8.0 },
  pomc: { nombre: "POMC", densidad: 1.41 },
};

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

const parseChapasEntry = (entry) => {
  if (!entry) return null;
  if (typeof entry === "object" && !Array.isArray(entry)) {
    return entry;
  }
  if (typeof entry === "string") {
    return { rango: entry, formatos: [] };
  }
  return null;
};

const buildTableData = (section, densidad) => {
  if (!section) return null;
  const formulaFn = FORMULAS[section.formula];
  if (!formulaFn) return null;

  const data = section.medidas.map((m) => ({
    medida: String(m),
    peso: formulaFn(m, densidad).toFixed(3),
  }));

  return { ...section, data };
};

const WeightModal = ({
  isOpen,
  onClose,
  selectedCut,
  calidad,
  materialType = "acero",
}) => {
  const isChapa = selectedCut === "Chapa";
  const currentMaterial = MATERIALES[materialType] || MATERIALES.acero;
  const densidad = currentMaterial.densidad;

  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen, onClose]);

  const chapaInfo = useMemo(() => {
    if (!isChapa || !calidad?.gama_medidas) return null;
    const entry =
      calidad.gama_medidas["Chapas"] || calidad.gama_medidas["Chapa"];
    return parseChapasEntry(entry);
  }, [isChapa, calidad]);

  const chapaTableData = useMemo(() => {
    if (!isChapa) return null;
    const section = PESOS_TEORICOS["Chapa"];
    return buildTableData(section, densidad);
  }, [isChapa, densidad]);

  const { filteredData, matchRanges } = useMemo(() => {
    if (isChapa || !isOpen || !selectedCut) {
      return { filteredData: null, matchRanges: [] };
    }

    const rawSection = PESOS_TEORICOS[selectedCut];
    if (!rawSection) return { filteredData: null, matchRanges: [] };

    const fullSection = buildTableData(rawSection, densidad);
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
        profiles[selectedCut + "s"];

      Object.entries(calidad.gama_medidas).forEach(([finish, profiles]) => {
        const rangeStr = findRangeString(profiles);
        if (rangeStr) {
          ranges.push({ finish, range: rangeStr });
          const matches = rangeStr.match(/(\d+(?:\.\d+)?)/g);
          if (matches && matches.length >= 1) {
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
  }, [selectedCut, calidad, isOpen, isChapa, densidad]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col border border-gray-100 animate-in zoom-in-95 duration-300">
        <div className="p-5 border-b flex justify-between items-center bg-gray-50/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex flex-col">
            <h2 className="text-xl font-black uppercase tracking-tight text-primary leading-tight">
              {selectedCut}{" "}
              <span className="text-gray-300 font-light mx-1">|</span>{" "}
              {calidad?.title}
            </h2>
            <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mt-0.5">
              Especificaciones Técnicas y Pesos
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-gray-200/50 rounded-full transition-all duration-200 cursor-pointer active:scale-90"
            aria-label="Cerrar modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar bg-white">
          {isChapa ? (
            <>
              {chapaInfo && (
                <div className="mb-8 p-5 bg-gray-50/50 border border-gray-100 rounded-[2rem] shadow-sm">
                  <header className="mb-4 flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-sm shadow-primary/50" />
                    <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.15em]">
                      Gama de Espesores y Formatos Disponibles
                    </h3>
                  </header>

                  {chapaInfo.rango && chapaInfo.rango !== "—" && (
                    <div className="mb-4 p-4 bg-white border border-gray-200/60 rounded-2xl shadow-sm">
                      <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5 opacity-70">
                        Rango de Espesores
                      </span>
                      <span className="text-2xl font-black text-primary leading-none tracking-tighter">
                        {chapaInfo.rango}
                      </span>
                    </div>
                  )}

                  {chapaInfo.formatos && chapaInfo.formatos.length > 0 && (
                    <>
                      <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-3 opacity-70">
                        Formatos de Chapa
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {chapaInfo.formatos.map((fmt, i) => (
                          <div
                            key={i}
                            className="p-3 bg-white border border-gray-200/60 rounded-xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 text-center"
                          >
                            <span className="text-sm font-bold text-gray-700 leading-tight">
                              {fmt}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="relative">
                <header className="mb-4 flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.15em]">
                    Tabla de Pesos Teóricos — Chapa (kg/m²)
                  </h3>
                </header>

                {chapaTableData && chapaTableData.data.length > 0 ? (
                  <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm bg-white">
                    <DynamicTable
                      section={chapaTableData}
                      data={chapaTableData}
                    />
                  </div>
                ) : (
                  <EmptyState message="Datos de chapa no disponibles." />
                )}
              </div>
            </>
          ) : (
            <>
              {matchRanges.length > 0 && (
                <div className="mb-8 p-5 bg-gray-50/50 border border-gray-100 rounded-[2rem] shadow-sm">
                  <header className="mb-4 flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-sm shadow-primary/50" />
                    <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.15em]">
                      Gama de Medidas Disponibles
                    </h3>
                  </header>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {matchRanges.map((m, i) => (
                      <div
                        key={i}
                        className="group p-4 bg-white border border-gray-200/60 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5 opacity-70">
                          {m.finish}
                        </span>
                        <span className="text-2xl font-black text-primary leading-none tracking-tighter">
                          {m.range}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="relative">
                <header className="mb-4 flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.15em]">
                    Tabla de Pesos Teóricos (kg/m)
                  </h3>
                </header>

                {filteredData && filteredData.data.length > 0 ? (
                  <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm bg-white">
                    <DynamicTable section={filteredData} data={filteredData} />
                  </div>
                ) : (
                  <EmptyState
                    message={
                      filteredData
                        ? "No hay medidas registradas para este rango."
                        : "Datos técnicos no disponibles."
                    }
                  />
                )}
              </div>
            </>
          )}

          <div className="mt-8 p-5 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-blue-100/50 rounded-2xl text-[10px] text-blue-900/80 leading-relaxed shadow-inner flex gap-4 items-start">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <span className="font-black text-[10px]">i</span>
            </div>
            <p>
              <strong className="text-blue-900 font-black">IMPORTANTE:</strong>{" "}
              {isChapa
                ? `Pesos calculados como espesor × ${densidad} kg/dm³. Peso de pieza = kg/m² × superficie (m²).`
                : `Pesos calculados con densidad ${densidad} kg/dm³. Valores teóricos; pueden variar por tolerancias de fabricación.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Spinner = () => (
  <div className="py-24 flex flex-col items-center justify-center text-gray-400 gap-5">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
      <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
    <div className="text-center">
      <p className="font-black text-[10px] uppercase tracking-widest text-primary animate-pulse">
        Sincronizando
      </p>
      <p className="italic text-xs mt-1">Cargando base de datos técnica...</p>
    </div>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="py-16 text-center bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-200 text-gray-400 transition-all">
    <svg
      className="w-12 h-12 mx-auto mb-4 opacity-20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
    <p className="text-xs font-bold uppercase tracking-widest mb-1">
      Sin datos
    </p>
    <p className="text-xs opacity-60">{message}</p>
  </div>
);

export default WeightModal;
