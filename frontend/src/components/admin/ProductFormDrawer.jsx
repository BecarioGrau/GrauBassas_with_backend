import { useState } from "react";
import {
  COMMON_ELEMENTS,
  EMPTY_MECHANICAL_ROW,
  MATERIAL_KIND_OPTIONS,
} from "../../constants/productConstants";
import { safeObject } from "../../utils/productUtils";

const inputClass =
  "w-full bg-white border border-slate-200 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";
const labelClass = "text-xs text-slate-500 uppercase font-bold tracking-wide mb-1 block";

export function ProductFormDrawer({
  editProductId,
  activeForm,
  setActiveForm,
  loading,
  onClose,
  onSubmit,
}) {
  const [chemExtraDraft, setChemExtraDraft] = useState({ symbol: "", pct: "" });

  const handleJsonFieldChange = (field, key, value) => {
    setActiveForm({
      ...activeForm,
      [field]: { ...safeObject(activeForm[field]), [key]: value },
    });
  };

  const removeChemicalKey = (key) => {
    const next = { ...safeObject(activeForm.chemical) };
    delete next[key];
    setActiveForm({ ...activeForm, chemical: next });
  };

  const appendChemicalExtra = () => {
    const symbol = chemExtraDraft.symbol.trim().toLowerCase();
    const pct = chemExtraDraft.pct.trim();
    if (!symbol) return;
    handleJsonFieldChange("chemical", symbol, pct);
    setChemExtraDraft({ symbol: "", pct: "" });
  };

  const specsLines = Array.isArray(activeForm.specs) ? activeForm.specs : [];
  const setSpecsLines = (next) => setActiveForm({ ...activeForm, specs: next });

  const cortesLines = Array.isArray(activeForm.cortes) ? activeForm.cortes : [];
  const setCortesLines = (next) => setActiveForm({ ...activeForm, cortes: next });

  const mechanicalRows = Array.isArray(activeForm.mechanical?.rows)
    ? activeForm.mechanical.rows
    : [];

  const setMechanicalRows = (rows) =>
    setActiveForm({ ...activeForm, mechanical: { rows } });

  const updateMechCell = (i, key, value) => {
    const rows = [...mechanicalRows];
    rows[i] = { ...EMPTY_MECHANICAL_ROW, ...rows[i], [key]: value };
    setMechanicalRows(rows);
  };

  const chemicalForDisplay = safeObject(activeForm.chemical);
  const extraChemKeys = Object.keys(chemicalForDisplay).filter(
    (k) => !COMMON_ELEMENTS.map((e) => e.toLowerCase()).includes(k.toLowerCase()),
  );

  return (
    <>
      <button
        type="button"
        aria-label="Cerrar panel"
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-xl flex flex-col bg-white shadow-2xl border-l border-slate-200"
      >
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">
              {editProductId ? "Edición" : "Alta"}
            </p>
            <h2 className="text-lg font-black text-slate-900 uppercase">
              {editProductId ? "Modificar ficha" : "Nueva referencia"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:text-primary"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <span className={labelClass}>Familia de material</span>
              <select
                className={inputClass}
                value={activeForm.material_kind || "aceros"}
                onChange={(e) =>
                  setActiveForm({ ...activeForm, material_kind: e.target.value })
                }
              >
                {MATERIAL_KIND_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className={labelClass}>Nombre del material *</span>
              <input
                required
                className={inputClass}
                value={activeForm.title}
                onChange={(e) =>
                  setActiveForm({ ...activeForm, title: e.target.value })
                }
              />
            </div>

            <div>
              <span className={labelClass}>Descripción</span>
              <textarea
                className={`${inputClass} h-24 resize-none`}
                value={activeForm.description}
                onChange={(e) =>
                  setActiveForm({ ...activeForm, description: e.target.value })
                }
              />
            </div>

            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-sm font-black text-slate-800 uppercase mb-3">
                Composición química
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {["c", "mn", "si", "cr", "ni", "mo", "v", "cu", "sn", "pb"].map(
                  (sym) => (
                    <div key={sym}>
                      <span className="text-[10px] font-bold uppercase text-slate-400">
                        {sym}
                      </span>
                      <input
                        className={`${inputClass} py-2 text-xs`}
                        value={chemicalForDisplay[sym] ?? ""}
                        placeholder="min - max"
                        onChange={(e) =>
                          handleJsonFieldChange("chemical", sym, e.target.value)
                        }
                      />
                    </div>
                  ),
                )}
              </div>
              {extraChemKeys.map((k) => (
                <div key={k} className="flex gap-2 mt-2">
                  <span className="text-xs font-bold w-8">{k}</span>
                  <input
                    className={`${inputClass} py-2 text-xs flex-1`}
                    value={chemicalForDisplay[k] ?? ""}
                    onChange={(e) =>
                      handleJsonFieldChange("chemical", k, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeChemicalKey(k)}
                    className="text-xs text-red-600"
                  >
                    Quitar
                  </button>
                </div>
              ))}
              <div className="flex gap-2 mt-3">
                <input
                  className={`${inputClass} py-2 text-xs flex-1`}
                  placeholder="Símbolo"
                  value={chemExtraDraft.symbol}
                  onChange={(e) =>
                    setChemExtraDraft((d) => ({ ...d, symbol: e.target.value }))
                  }
                />
                <input
                  className={`${inputClass} py-2 text-xs flex-2`}
                  placeholder="%"
                  value={chemExtraDraft.pct}
                  onChange={(e) =>
                    setChemExtraDraft((d) => ({ ...d, pct: e.target.value }))
                  }
                />
                <button
                  type="button"
                  onClick={appendChemicalExtra}
                  className="px-3 py-2 bg-slate-100 rounded-lg text-xs font-bold cursor-pointer hover:bg-primary-dark hover:text-white"
                >
                  Añadir
                </button>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between mb-2">
                <h3 className="text-sm font-black text-slate-800 uppercase">
                  Especificaciones
                </h3>
                <button
                  type="button"
                  onClick={() => setSpecsLines([...specsLines, ""])}
                  className="text-xs font-bold text-primary cursor-pointer"
                >
                  + Línea
                </button>
              </div>
              {(specsLines.length ? specsLines : [""]).map((line, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    className={inputClass}
                    value={line}
                    onChange={(e) => {
                      const next = [...(specsLines.length ? specsLines : [""])];
                      next[i] = e.target.value;
                      setSpecsLines(next);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const base = [...(specsLines.length ? specsLines : [""])];
                      base.splice(i, 1);
                      setSpecsLines(base.length ? base : []);
                    }}
                    className="text-xs text-slate-400"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between mb-2">
                <h3 className="text-sm font-black text-slate-800 uppercase">
                  Cortes / formatos
                </h3>
                <button
                  type="button"
                  onClick={() => setCortesLines([...cortesLines, ""])}
                  className="text-xs font-bold text-primary cursor-pointer"
                >
                  + Formato
                </button>
              </div>
              {(cortesLines.length ? cortesLines : [""]).map((line, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    className={inputClass}
                    value={line}
                    placeholder="Redondo, Cuadrado..."
                    onChange={(e) => {
                      const next = [...(cortesLines.length ? cortesLines : [""])];
                      next[i] = e.target.value;
                      setCortesLines(next);
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between mb-2">
                <h3 className="text-sm font-black text-slate-800 uppercase">
                  Propiedades mecánicas
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    setMechanicalRows([
                      ...mechanicalRows,
                      { ...EMPTY_MECHANICAL_ROW },
                    ])
                  }
                  className="text-xs font-bold text-primary cursor-pointer"
                >
                  + Fila
                </button>
              </div>
              {mechanicalRows.map((row, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 mb-2 p-3 bg-slate-50 rounded-lg">
                  {["diametro", "notas"].map((field) => (
                    <input
                      key={field}
                      className={`${inputClass} py-2 text-xs`}
                      placeholder={field}
                      value={row[field] ?? ""}
                      onChange={(e) => updateMechCell(i, field, e.target.value)}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setMechanicalRows(mechanicalRows.filter((_, idx) => idx !== i))
                    }
                    className="col-span-2 text-xs text-red-600"
                  >
                    Quitar fila
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-sm font-black text-slate-800 uppercase mb-3">
                Equivalencias
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "agb",
                  "wnr",
                  "europa",
                  "espana",
                  "alemania",
                  "francia",
                  "italia",
                  "usa",
                  "japon",
                ].map((field) => (
                  <div key={field}>
                    <span className="text-[10px] uppercase text-slate-400 font-bold">
                      {field}
                    </span>
                    <input
                      className={`${inputClass} py-2 text-xs`}
                      value={activeForm.equivalencias?.[field] || ""}
                      onChange={(e) =>
                        handleJsonFieldChange("equivalencias", field, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label>
                <span className={labelClass}>Estado suministro</span>
                <input
                  className={inputClass}
                  value={activeForm.suministros}
                  onChange={(e) =>
                    setActiveForm({ ...activeForm, suministros: e.target.value })
                  }
                />
              </label>
            </div>

            <div>
              <span className={labelClass}>Imagen</span>
              <input
                type="file"
                className="block w-full text-sm text-slate-500"
                onChange={(e) =>
                  setActiveForm({ ...activeForm, image: e.target.files[0] })
                }
              />
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark disabled:opacity-50 cursor-pointer"
              >
                {loading
                  ? "Guardando..."
                  : editProductId
                    ? "Guardar cambios"
                    : "Publicar material"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-slate-200 rounded-lg font-bold text-slate-600 cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </aside>
    </>
  );
}
