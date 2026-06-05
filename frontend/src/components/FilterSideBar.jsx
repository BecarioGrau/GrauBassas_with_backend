import React, { useState } from "react";

const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  totalProducts,
}) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const materials = [
    { id: "everything", name: "Todos los productos" },
    { id: "all", name: "Materiales" },
    { id: "inoxidables", name: "Inoxidables" },
    { id: "aluminios", name: "Aluminios" },
    { id: "aceros", name: "Aceros" },
    { id: "hierros_fundicion", name: "Hierros de fundición" },
    { id: "bronce", name: "Bronce" },
    { id: "laton", name: "Latón" },
    { id: "cobre", name: "Cobre" },
    { id: "zinc", name: "Zinc" },
    { id: "plasticos_mecanizados", name: "Plástico mecánizado" },
    { id: "plasticos_industriales", name: "Plástico industrial" },
    { id: "suministros", name: "Suministros" },
  ];

  return (
    <>
      <button
        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        className="lg:hidden w-full mb-4 flex items-center justify-between px-4 py-3 bg-white border rounded-lg shadow-sm"
      >
        <span className="font-medium">Filtros</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isMobileFiltersOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`${isMobileFiltersOpen ? "block" : "hidden"} lg:block bg-white rounded-lg shadow-md p-6`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
          <button
            onClick={onClearFilters}
            className="text-sm bg-primary text-white hover:bg-primary-dark transition-colors px-4 py-2 rounded cursor-pointer"
          >
            Limpiar todo
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Materiales</h3>
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {materials.map((material) => (
              <label
                key={material.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="material"
                    value={material.id}
                    checked={filters.material === material.id}
                    onChange={(e) =>
                      onFilterChange({ material: e.target.value })
                    }
                    className="mr-3 accent-primary w-4 h-4"
                  />
                  <span
                    className={`text-sm ${filters.material === material.id ? "font-bold text-primary" : "text-gray-700"}`}
                  >
                    {material.name}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-primary/10 rounded-lg p-4">
          <p className="text-sm text-primary italic">
            Mostrando <span className="font-bold">{totalProducts}</span>{" "}
            resultados
          </p>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
