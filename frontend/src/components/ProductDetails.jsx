import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import ProductsDetailsHero from "./HeroComponents/ProductsDetailsHero";
import MaterialsCard from "./MaterialsComponents/MaterialsCard";
import TechnicalSheetContent from "./ProductDetails/TechnicalSheetContent";
import ProductWeightsPanel from "./ProductDetails/ProductWeightsPanel";
import MedidaSection from "./MaterialsComponents/MedidaSection";
import { getProductWithTemplate } from "../services/catalogService";
import {
  LayersIcon,
  AngleIcon,
  SquareIcon,
  HexagonIcon,
  CircleIcon,
  TubosIcon,
} from "./Icons";

const ICON_MAP = {
  Chapa: <LayersIcon />,
  Ángulo: <AngleIcon />,
  Cuadrado: <SquareIcon />,
  Hexágono: <HexagonIcon />,
  Redondo: <CircleIcon />,
  Tubo: <TubosIcon />,
};

const TABS = [
  { id: "propiedades", label: "Propiedades" },
  { id: "pesos", label: "Pesos teóricos" },
];

const SLUG_TO_MATERIAL = {
  aceros: "acero",
  aluminios: "aluminio",
  inoxidables: "inox",
  hierros_fundicion: "acero",
  bronce: "bronce",
  laton: "laton",
  cobre: "cobre",
  zinc: "zinc",
  plasticos_mecanizados: "pomc",
  plasticos_industriales: "pomc",
};

const ProductDetails = () => {
  const { title } = useParams();
  const { pathname } = useLocation();
  const [data, setData] = useState({
    calidad: null,
    template: null,
    allTemplates: null,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("propiedades");
  const [selectedCut, setSelectedCut] = useState(null);

  const categorySlug = useMemo(() => pathname.split("/")[3] || "", [pathname]);
  const categoryName =
    categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

  useEffect(() => {
    if (!categorySlug) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getProductWithTemplate(categorySlug, title)
      .then(({ calidad, template, allTemplates }) => {
        setData({ calidad, template, allTemplates });
        const firstCut = calidad?.cortes?.[0]?.label;
        if (firstCut) setSelectedCut(firstCut);
      })
      .catch((err) => console.error("Error cargando producto:", err))
      .finally(() => setLoading(false));
  }, [title, categorySlug]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center font-bold text-primary">
        Cargando...
      </div>
    );
  }

  if (!data.calidad) {
    return (
      <h2 className="flex justify-center items-center h-screen text-3xl font-bold">
        Calidad no encontrada
      </h2>
    );
  }

  const { calidad, template } = data;
  const materialKey = SLUG_TO_MATERIAL[categorySlug.toLowerCase()] || "acero";
  const cortes = calidad.cortes || [];

  return (
    <main className="layout-container flex h-full grow flex-col">
      <ProductsDetailsHero calidad={calidad} title={title} />

      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex gap-2 text-sm font-semibold py-4 overflow-x-auto whitespace-nowrap">
          <Link to="/productos" className="hover:text-primary">
            Productos
          </Link>
          <span className="text-gray-400">/</span>
          <Link to="/productos?view=categories" className="hover:text-primary">
            Materiales
          </Link>
          {categoryName && (
            <>
              <span className="text-gray-400">/</span>
              <Link
                to={`/productos/materiales/${categorySlug}`}
                className="hover:text-primary"
              >
                {categoryName}
              </Link>
            </>
          )}
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 capitalize">{title}</span>
        </nav>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div>
            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">
              Calidad
            </span>
            <span className="text-sm font-bold text-slate-800">
              {calidad.equivalencias?.agb || calidad.title}
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">
              Suministro
            </span>
            <span className="text-sm font-bold text-slate-800">
              {calidad.suministro || calidad.suministros || "Consultar"}
            </span>
          </div>
          <div className="col-span-2">
            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest">
              Material
            </span>
            <span className="text-sm font-bold text-slate-800 capitalize">
              {categoryName}
            </span>
          </div>
        </div>

        <div className="mb-16">
          <div className="flex flex-wrap gap-1">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 md:px-8 py-3 text-xs md:text-sm font-bold uppercase tracking-wide border border-slate-300 rounded-t-lg transition-colors cursor-pointer ${
                    isActive
                      ? "bg-slate-100 border-b-0 text-slate-900 relative z-10"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="bg-slate-100 border border-slate-300 rounded-b-xl rounded-tr-xl p-6 md:p-10 shadow-sm">
            {activeTab === "propiedades" && (
              <TechnicalSheetContent data={calidad} template={template} />
            )}

            {activeTab === "pesos" && (
              <div className="space-y-8">
                {cortes.length > 0 ? (
                  <>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">
                        Tipo de corte
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {cortes.map((corte, idx) => (
                          <div
                            key={idx}
                            className={
                              selectedCut === corte.label
                                ? "ring-2 ring-primary rounded-xl"
                                : ""
                            }
                          >
                            <MaterialsCard
                              producto={{
                                label: corte.label,
                                href: corte.href || "#",
                                tag:
                                  selectedCut === corte.label
                                    ? "Seleccionado"
                                    : "Ver pesos",
                              }}
                              icon={ICON_MAP[corte.label]}
                              onClick={() => setSelectedCut(corte.label)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <ProductWeightsPanel
                      calidad={calidad}
                      selectedCut={selectedCut}
                      materialType={materialKey}
                    />
                  </>
                ) : (
                  <p className="text-sm text-slate-500 italic">
                    No hay tipos de corte definidos para esta calidad.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <MedidaSection />
    </main>
  );
};

export default ProductDetails;
