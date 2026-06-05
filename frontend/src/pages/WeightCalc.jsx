import React, { useState, useMemo, memo } from "react";

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

const UNIDADES = {
  mm: { nombre: "milímetros", factor: 0.1 },
  cm: { nombre: "centímetros", factor: 1 },
  m: { nombre: "metros", factor: 100 },
};

const WeightCalc = () => {
  const [corte, setCorte] = useState("chapa");
  const [materialKey, setMaterialKey] = useState("acero");
  const [subTipoTubo, setSubTipoTubo] = useState("redondo");

  const [dimensiones, setDimensiones] = useState({
    alto: { val: 40, unit: "mm" },
    ancho: { val: 40, unit: "mm" },
    largo: { val: 1000, unit: "mm" },
    diametro_ext: { val: 50, unit: "mm" },
    espesor: { val: 2, unit: "mm" },
    diametro_int: { val: 30, unit: "mm" },
  });

  const handleInputChange = (field, property, value) => {
    setDimensiones((prev) => ({
      ...prev,
      [field]: { ...prev[field], [property]: value },
    }));
  };

  const getCm = (field) => {
    const dim = dimensiones[field];
    return (parseFloat(dim.val) || 0) * UNIDADES[dim.unit].factor;
  };

  const pesoFinal = useMemo(() => {
    let areaCm2 = 0;
    const L = getCm("largo");
    const dens = MATERIALES[materialKey].densidad;
    const E = getCm("espesor");

    switch (corte) {
      case "chapa":
      case "cuadrado":
        areaCm2 = getCm("ancho") * getCm("alto");
        break;
      case "redondo":
        areaCm2 = Math.PI * Math.pow(getCm("diametro_ext") / 2, 2);
        break;
      case "perforado":
        const rExtP = getCm("diametro_ext") / 2;
        const rIntP = getCm("diametro_int") / 2;
        areaCm2 =
          Math.PI * (Math.pow(rExtP, 2) - Math.pow(Math.max(0, rIntP), 2));
        break;
      case "hexagonal":
        areaCm2 = (Math.sqrt(3) / 2) * Math.pow(getCm("ancho"), 2);
        break;
      case "tubos":
        if (subTipoTubo === "redondo") {
          const D = getCm("diametro_ext");
          const dInt = D - E * 2;
          areaCm2 =
            (Math.PI / 4) * (Math.pow(D, 2) - Math.pow(Math.max(0, dInt), 2));
        } else {
          const A = getCm("ancho");
          const H = getCm("alto");
          const aInt = A - E * 2;
          const hInt = H - E * 2;
          areaCm2 = A * H - Math.max(0, aInt) * Math.max(0, hInt);
        }
        break;
      default:
        break;
    }

    return ((Math.max(0, areaCm2) * L * dens) / 1000).toFixed(2);
  }, [corte, materialKey, dimensiones, subTipoTubo]);

  const tiposPerfil = [
    { id: "chapa", label: "Chapa" },
    { id: "cuadrado", label: "Cuadrado" },
    { id: "redondo", label: "Redondo" },
    { id: "tubos", label: "Tubo" },
    { id: "perforado", label: "Perforado" },
    { id: "hexagonal", label: "Hexagonal" },
  ];

  return (
    <div className="max-w-5xl mx-auto my-10 bg-white shadow-2xl overflow-hidden font-sans border border-gray-200 rounded-lg">
      <div className="flex flex-wrap bg-gray-100 border-b border-gray-200">
        {tiposPerfil.map((item) => (
          <button
            key={item.id}
            onClick={() => setCorte(item.id)}
            className={`py-5 px-6 text-sm font-bold uppercase tracking-wider transition-all duration-200 flex-grow border-r border-gray-200 last:border-r-0 cursor-pointer
              ${corte === item.id ? "bg-primary text-white" : "bg-white text-gray-500 hover:bg-primary hover:text-white"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 bg-white">
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-100 p-6 min-h-[320px]">
          <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-white relative p-4">
            <span className="text-primary/20 font-black text-2xl uppercase text-center">
              {corte === "tubos" ? `Tubo ${subTipoTubo}` : `Perfil ${corte}`}
            </span>
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <table className="w-full border-separate border-spacing-y-2">
            <tbody>
              {corte === "tubos" && (
                <tr>
                  <td className="py-4 px-6 font-bold text-primary uppercase text-xs border-l-4 border-primary">
                    Geometría Tubo
                  </td>
                  <td colSpan="2" className="py-2 px-2">
                    <select
                      className="w-full border-2 border-primary rounded p-3 font-bold bg-white outline-none"
                      value={subTipoTubo}
                      onChange={(e) => setSubTipoTubo(e.target.value)}
                    >
                      <option value="redondo">Circular / Redondo</option>
                      <option value="cuadrado">Cuadrado / Rectangular</option>
                    </select>
                  </td>
                </tr>
              )}

              {(corte === "chapa" ||
                corte === "cuadrado" ||
                (corte === "tubos" && subTipoTubo === "cuadrado") ||
                corte === "hexagonal") && (
                <CalcRow
                  label={corte === "hexagonal" ? "Ancho Caras" : "Ancho"}
                  field="ancho"
                  state={dimensiones}
                  onChange={handleInputChange}
                />
              )}

              {(corte === "chapa" ||
                corte === "cuadrado" ||
                (corte === "tubos" && subTipoTubo === "cuadrado")) && (
                <CalcRow
                  label="Alto"
                  field="alto"
                  state={dimensiones}
                  onChange={handleInputChange}
                />
              )}

              {(corte === "redondo" ||
                corte === "perforado" ||
                (corte === "tubos" && subTipoTubo === "redondo")) && (
                <CalcRow
                  label="Diámetro Ext."
                  field="diametro_ext"
                  state={dimensiones}
                  onChange={handleInputChange}
                />
              )}

              {corte === "perforado" && (
                <CalcRow
                  label="Diámetro Int."
                  field="diametro_int"
                  state={dimensiones}
                  onChange={handleInputChange}
                />
              )}

              {corte === "tubos" && (
                <CalcRow
                  label="Grosor (Pared)"
                  field="espesor"
                  state={dimensiones}
                  onChange={handleInputChange}
                />
              )}

              <CalcRow
                label="Longitud"
                field="largo"
                state={dimensiones}
                onChange={handleInputChange}
              />

              <tr className="bg-gray-50">
                <td className="py-4 px-6 font-bold text-gray-700 uppercase text-xs border-l-4 border-primary">
                  Material
                </td>
                <td className="py-4 px-2" colSpan="2">
                  <select
                    className="w-full border-2 border-gray-200 rounded p-3 font-bold text-gray-700 bg-white"
                    value={materialKey}
                    onChange={(e) => setMaterialKey(e.target.value)}
                  >
                    {Object.entries(MATERIALES).map(([key, m]) => (
                      <option key={key} value={key}>
                        {m.nombre}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-primary p-8 flex flex-col items-center border-t-4 border-white/20">
        <p className="text-white/80 uppercase text-xs font-bold tracking-[0.3em] mb-4">
          Resultado del Cálculo
        </p>
        <div className="bg-white text-primary px-16 py-5 text-5xl font-black rounded-xl shadow-2xl flex items-baseline gap-2">
          {pesoFinal} <span className="text-2xl font-bold opacity-70">Kg</span>
        </div>
      </div>
    </div>
  );
};

const CalcRow = memo(({ label, field, state, onChange }) => (
  <tr className="group">
    <td className="py-4 px-6 bg-gray-50 font-bold text-gray-600 uppercase text-xs group-hover:border-primary border-l-4 border-transparent transition-all w-1/4">
      {label}
    </td>
    <td className="py-2 px-2 w-1/2">
      <input
        type="number"
        value={state[field].val}
        onChange={(e) => onChange(field, "val", e.target.value)}
        className="w-full border-2 border-gray-100 rounded p-3 focus:border-primary outline-none font-mono text-lg text-gray-800"
      />
    </td>
    <td className="py-2 px-2 w-1/4">
      <select
        value={state[field].unit}
        onChange={(e) => onChange(field, "unit", e.target.value)}
        className="w-full border-2 border-gray-100 rounded p-3 bg-white text-xs font-bold text-gray-500 outline-none focus:border-primary cursor-pointer"
      >
        {Object.entries(UNIDADES).map(([key, u]) => (
          <option key={key} value={key}>
            {u.nombre}
          </option>
        ))}
      </select>
    </td>
  </tr>
));

export default WeightCalc;
