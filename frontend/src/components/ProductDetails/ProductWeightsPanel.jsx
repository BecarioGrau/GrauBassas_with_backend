import { useMemo } from "react";
import DynamicTable from "../Modals/DynamicTable";
import {
  buildWeightTableData,
  getChapaInfo,
  getWeightTableForCut,
} from "../../utils/weightTableUtils";

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

const SectionPill = ({ children }) => (
  <h3 className="inline-block rounded-full border border-black px-5 py-1.5 text-xs font-bold uppercase tracking-wide mb-4">
    {children}
  </h3>
);

const EmptyState = ({ message }) => (
  <div className="py-12 text-center bg-white/60 rounded-xl border border-dashed border-slate-300 text-slate-500">
    <p className="text-sm">{message}</p>
  </div>
);

const ProductWeightsPanel = ({ calidad, selectedCut, materialType = "acero" }) => {
  const currentMaterial = MATERIALES[materialType] || MATERIALES.acero;
  const densidad = currentMaterial.densidad;
  const isChapa = selectedCut === "Chapa";

  const chapaInfo = useMemo(
    () => (isChapa ? getChapaInfo(calidad) : null),
    [isChapa, calidad],
  );

  const chapaTableData = useMemo(
    () => (isChapa ? buildWeightTableData("Chapa", densidad) : null),
    [isChapa, densidad],
  );

  const { filteredData, matchRanges } = useMemo(() => {
    if (!selectedCut) return { filteredData: null, matchRanges: [] };
    if (isChapa) return { filteredData: null, matchRanges: [] };
    return getWeightTableForCut(selectedCut, calidad, densidad);
  }, [selectedCut, calidad, isChapa, densidad]);

  if (!selectedCut) {
    return (
      <EmptyState message="Selecciona un tipo de corte para ver los pesos teóricos." />
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <SectionPill>
          {selectedCut} — {calidad?.title}
        </SectionPill>
        <p className="text-sm text-slate-600 mb-6">
          Pesos teóricos calculados con densidad de {currentMaterial.nombre} (
          {densidad} kg/dm³). Valores orientativos; pueden variar por tolerancias
          de fabricación.
        </p>
      </section>

      {isChapa ? (
        <>
          {chapaInfo && (
            <section className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">
                Gama de espesores y formatos
              </p>
              {chapaInfo.rango && chapaInfo.rango !== "—" && (
                <p className="text-2xl font-black text-primary mb-4">
                  {chapaInfo.rango}
                </p>
              )}
              {chapaInfo.formatos?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {chapaInfo.formatos.map((fmt, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              )}
            </section>
          )}

          {chapaTableData?.data?.length > 0 ? (
            <DynamicTable
              section={chapaTableData}
              data={chapaTableData}
              variant="page"
            />
          ) : (
            <EmptyState message="Datos de chapa no disponibles." />
          )}
        </>
      ) : (
        <>
          {matchRanges.length > 0 && (
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {matchRanges.map((m, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-slate-200 p-4"
                >
                  <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                    {m.finish}
                  </span>
                  <span className="text-xl font-black text-primary">{m.range}</span>
                </div>
              ))}
            </section>
          )}

          {filteredData?.data?.length > 0 ? (
            <DynamicTable
              section={filteredData}
              data={filteredData}
              variant="page"
            />
          ) : (
            <EmptyState
              message={
                filteredData
                  ? "No hay medidas registradas para este rango."
                  : "Datos técnicos no disponibles para este corte."
              }
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductWeightsPanel;
