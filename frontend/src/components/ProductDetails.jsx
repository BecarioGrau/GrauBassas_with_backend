import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import ProductsDetailsHero from "./HeroComponents/ProductsDetailsHero";
import MaterialsCard from "./MaterialsComponents/MaterialsCard";
import TechnicalSheetModal from "./Modals/TechnicalSheetModal";
import WeightModal from "./Modals/WeightModal";
import MedidaSection from "./MaterialsComponents/MedidaSection";
import useIsMobile from "../hooks/useIsMobile";
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

const SectionHeader = ({ title }) => (
  <div className="mb-8 text-center md:text-left">
    <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight uppercase">
      {title}
    </h2>
    <div className="w-16 h-1 bg-primary mb-4 mx-auto md:mx-0"></div>
  </div>
);

const ProductDetails = () => {
  const isMobile = useIsMobile();
  const { title } = useParams();
  const { pathname } = useLocation();
  const [data, setData] = useState({
    calidad: null,
    template: null,
    allTemplates: null,
  });
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
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
      })
      .catch((err) => console.error("Error cargando producto:", err))
      .finally(() => setLoading(false));
  }, [title, categorySlug]);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center font-bold text-primary">
        Cargando...
      </div>
    );
  if (!data.calidad)
    return (
      <h2 className="flex justify-center items-center h-screen text-3xl font-bold">
        Calidad no encontrada
      </h2>
    );

  const { calidad, template, allTemplates } = data;

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
  };
  const materialKey = SLUG_TO_MATERIAL[categorySlug.toLowerCase()] || "acero";

  return (
    <main className="layout-container flex h-full grow flex-col">
      <ProductsDetailsHero calidad={calidad} title={title} />
      <div className="flex items-center justify-between px-10">
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

        <button
          className="px-4 py-2 bg-primary text-white hover:bg-primary-dark cursor-pointer transition-all shadow-lg flex items-center gap-2 font-bold"
          onClick={() => setIsSheetOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
          {isMobile ? "" : "Ver Ficha Técnica"}
        </button>
      </div>

      <section className="pt-5 pb-25 container mx-auto px-6">
        <SectionHeader title="Pesos Teóricos" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {calidad.cortes &&
            calidad.cortes.map((corte, idx) => (
              <MaterialsCard
                key={idx}
                producto={{
                  label: corte.label,
                  href: corte.href || "#",
                  tag: "Ver medidas",
                }}
                icon={ICON_MAP[corte.label]}
                onClick={() => {
                  setSelectedCut(corte.label);
                  setIsWeightModalOpen(true);
                }}
              />
            ))}
        </div>
      </section>

      <TechnicalSheetModal
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        data={calidad}
        template={template}
      />

      <WeightModal
        isOpen={isWeightModalOpen}
        onClose={() => setIsWeightModalOpen(false)}
        selectedCut={selectedCut}
        calidad={calidad}
        materialType={materialKey}
      />

      <MedidaSection />
    </main>
  );
};

export default ProductDetails;
