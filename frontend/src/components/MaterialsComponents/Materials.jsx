import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Link,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import Hero from "../HeroComponents/Hero";
import { useNavigation } from "../../context/NavigationContext";
import MaterialsSection from "./MaterialsSection";
import MedidaSection from "./MedidaSection";
import {
  PrecisionManufacturingIcon,
  FoundationIcon,
  FitnessCenterIcon,
  SettingsBackupRestoreIcon,
  TimelineIcon,
  ScienceIcon,
  HandymanIcon,
} from "../Icons";
import DynamicTable from "../Modals/DynamicTable";
import { getProductsByCategory } from "../../services/catalogService";

const slugify = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^\w\d_]/g, "");
};

const ICON_MAP = {
  "Al Carbono": <PrecisionManufacturingIcon />,
  Cementación: <FoundationIcon />,
  Resistencia: <FitnessCenterIcon />,
  Rodamientos: <SettingsBackupRestoreIcon />,
  "Alta elasticidad": <TimelineIcon />,
  Nituración: <ScienceIcon />,
  Herramientas: <HandymanIcon />,
};

const EQUIVALENCIAS_TABLE_CONFIG = {
  title: "Tabla de Equivalencias Internacionales",
  linkColumn: "agb",
  columns: [
    { header: "AGB", key: "agb" },
    { header: "WNr.", key: "wnr" },
    { header: "EUROPA (EN)", key: "europa" },
    { header: "ESPAÑA (UNE)", key: "espana" },
    { header: "ALEMANIA (DIN)", key: "alemania" },
    { header: "FRANCIA (AFNOR)", key: "francia" },
    { header: "ITALIA (UNI)", key: "italia" },
    { header: "USA (AISI/SAE)", key: "usa" },
    { header: "JAPÓN (JIS)", key: "japon" },
  ],
};

const Materials = () => {
  const { title } = useParams();
  const { productsData, loading } = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const scrollTimeoutRef = useRef(null);

  const material = useMemo(() => {
    if (!productsData || loading) return null;
    const productosNode = productsData.find(
      (item) => item.label === "Productos",
    );
    const targetSlug = slugify(title);
    return productosNode?.children.find(
      (item) => slugify(item.label) === targetSlug,
    );
  }, [productsData, title, loading]);

  const subCategories = useMemo(() => {
    if (!material?.children?.length) return [];

    const equivalenciasTab = material.children.find(
      (c) => c.label === "Equivalencias",
    );
    const contentChildren = material.children.filter(
      (c) => c.label !== "Equivalencias",
    );
    const eqEntry = equivalenciasTab || {
      label: "Equivalencias",
      href: `${material.href}?tab=Equivalencias`,
    };

    const hasDeepTabs = contentChildren.some((child) =>
      child.children?.some((grandChild) => grandChild.children?.length > 0),
    );

    if (hasDeepTabs) {
      return [...contentChildren, eqEntry];
    }

    return [
      {
        label: "Calidades",
        href: material.href,
        children: contentChildren,
      },
      eqEntry,
    ];
  }, [material]);

  const [activeTab, setActiveTab] = useState("");
  const [catalogData, setCatalogData] = useState([]);

  useEffect(() => {
    setCatalogData([]);
    setActiveTab("");
  }, [title]);

  useEffect(() => {
    if (subCategories.length > 0) {
      const tabParam = searchParams.get("tab");
      if (tabParam && subCategories.some((tab) => tab.label === tabParam)) {
        setActiveTab(tabParam);
      } else if (!activeTab) {
        setActiveTab(subCategories[0].label);
      }
    }
  }, [subCategories, searchParams]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [location.hash, activeTab]);

  useEffect(() => {
    if (activeTab === "Equivalencias" && title && catalogData.length === 0) {
      getProductsByCategory(title)
        .then((data) => setCatalogData(data))
        .catch((err) =>
          console.error(`Error cargando catálogo ${title}:`, err),
        );
    }
  }, [activeTab, title, catalogData.length]);

  const normalizedEquivalencias = useMemo(() => {
    if (!catalogData.length) return [];
    return catalogData.map((p) => ({
      agb: p.equivalencias?.agb || p.title || "-",
      wnr: p.equivalencias?.wnr || p.data?.wnr || "-",
      europa: p.equivalencias?.europa || "-",
      espana: p.equivalencias?.espana || "-",
      alemania: p.equivalencias?.alemania || p.data?.din || "-",
      francia: p.equivalencias?.francia || "-",
      italia: p.equivalencias?.italia || "-",
      usa: p.equivalencias?.usa || p.data?.aisi || "-",
      japon: p.equivalencias?.japon || "-",
      _href: `/productos/materiales/${title}/${encodeURIComponent(p.title)}`,
    }));
  }, [catalogData, title]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center italic text-gray-400">
        Cargando...
      </div>
    );
  if (!material)
    return (
      <div className="h-screen flex items-center justify-center font-bold">
        Material no encontrado
      </div>
    );

  const displayGroups =
    subCategories.find((c) => c.label === activeTab)?.children ||
    material?.children?.filter((c) => c.label !== "Equivalencias") ||
    [];

  return (
    <>
      <Hero
        title={material.label}
        description={`Descubre nuestro catálogo de ${material.label} seleccionado para garantizar calidad y disponibilidad.`}
      />

      <nav className="px-6 flex items-center gap-2 text-sm font-semibold py-2">
        <Link to="/productos" className="hover:text-primary transition-colors">
          Productos
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-primary uppercase tracking-wider">
          {material.label}
        </span>
      </nav>

      <main className="container mx-auto px-4 pb-12 mt-8">
        <div
          className={`mb-5 pb-5 flex flex-col ${subCategories.length > 0 ? "items-center gap-8" : "md:flex-row md:items-end justify-between gap-5"}`}
        >
          <div
            className={subCategories.length > 0 ? "text-center" : "text-left"}
          >
            <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase">
              Selector de calidades
            </h2>
            <div
              className={`w-16 h-1.5 bg-primary rounded-full ${subCategories.length > 0 ? "mx-auto" : "ml-0"}`}
            ></div>
          </div>

          {subCategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-xl shadow-inner border border-gray-200">
              {subCategories.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setSearchParams({ tab: tab.label })}
                  className={`px-6 md:px-12 py-3 md:py-4 text-xs md:text-sm cursor-pointer font-black uppercase tracking-widest transition-all rounded-lg flex-grow sm:flex-grow-0 ${
                    activeTab === tab.label
                      ? "bg-white text-primary shadow-md transform scale-105"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <section className="space-y-16">
          {activeTab === "Equivalencias" ? (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
              {normalizedEquivalencias.length > 0 ? (
                <DynamicTable
                  section={EQUIVALENCIAS_TABLE_CONFIG}
                  data={{ data: normalizedEquivalencias }}
                />
              ) : (
                <div className="py-16 text-center text-gray-400 italic">
                  No hay datos de equivalencias para este material.
                </div>
              )}
            </div>
          ) : displayGroups.length > 0 ? (
            displayGroups.some(
              (item) => item.children && item.children.length > 0,
            ) ? (
              displayGroups.map((grupo, index) => (
                <MaterialsSection
                  key={`${activeTab}-${index}`}
                  grupo={grupo}
                  iconName={ICON_MAP[grupo.label] || null}
                />
              ))
            ) : (
              <MaterialsSection
                key={activeTab}
                grupo={{
                  label: activeTab,
                  children: displayGroups,
                }}
                iconName={null}
              />
            )
          ) : (
            <div className="py-24 text-center text-gray-400 italic bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              No se encontraron calidades disponibles
            </div>
          )}
        </section>
      </main>

      <MedidaSection />
    </>
  );
};

export default Materials;
