import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../components/Cards/ProductCard";
import FilterSidebar from "../components/FilterSideBar";
import Pagination from "../components/Pagination";
import { materialsData } from "../data/HomeContentData";
import { useNavigation } from "../context/NavigationContext";
import { useLocation } from "react-router-dom";
const slugify = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^\w\d_-]/g, "");
};

const Product = () => {
  const { productsData, loading } = useNavigation();
  const location = useLocation();

  const getInitialMaterialFilter = () => {
    const params = new URLSearchParams(location.search);
    return params.get("view") === "categories" ? "all" : "everything";
  };

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    material: getInitialMaterialFilter(),
    sortBy: "title",
    sortOrder: "asc",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const view = params.get("view");
    if (view === "categories") {
      setFilters((prev) => ({ ...prev, material: "all" }));
    }
  }, [location.search]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const getDeepChildren = (node, categoryLabel, parentImage) => {
    if (!node.children || node.children.length === 0) {
      return [
        {
          ...node,
          title: node.label,
          category: categoryLabel,
          image: parentImage,
        },
      ];
    }
    return node.children.flatMap((child) =>
      getDeepChildren(child, categoryLabel, parentImage),
    );
  };

  useEffect(() => {
    if (loading || !productsData) return;

    let result = [];
    const productosRoot = productsData.find(
      (item) => item.label === "Productos",
    );

    if (filters.material === "everything") {
      if (productosRoot?.children) {
        result = productosRoot.children.flatMap((category) => {
          const parentImage =
            materialsData.find((m) =>
              slugify(m.title).includes(slugify(category.label)),
            )?.image || "";
          return getDeepChildren(category, category.label, parentImage);
        });
      }
    } else if (filters.material === "all") {
      result = [...materialsData];
    } else {
      const categoryFound = productosRoot?.children.find((cat) =>
        slugify(cat.label).includes(
          slugify(filters.material).replace("industriales", "industrial"),
        ),
      );

      if (categoryFound) {
        const parentImage =
          materialsData.find((m) =>
            slugify(m.title).includes(slugify(categoryFound.label)),
          )?.image || "";
        result = categoryFound.children.map((child) => ({
          ...child,
          title: child.label,
          category: categoryFound.label,
          image: parentImage,
        }));
      }
    }

    if (filters.search) {
      const searchSlug = slugify(filters.search);
      result = result.filter(
        (p) =>
          slugify(p.title || p.label).includes(searchSlug) ||
          slugify(p.category || "").includes(searchSlug),
      );
    }

    result.sort((a, b) => {
      const titleA = a.title || a.label || "";
      const titleB = b.title || b.label || "";
      return filters.sortOrder === "asc"
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [filters, loading, productsData]);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando catálogo...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-[1920px] mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <FilterSidebar
              filters={filters}
              onFilterChange={(newF) =>
                setFilters((prev) => ({ ...prev, ...newF }))
              }
              onClearFilters={() =>
                setFilters({
                  search: "",
                  material: "everything",
                  sortBy: "title",
                  sortOrder: "asc",
                })
              }
              totalProducts={filteredProducts.length}
            />
          </div>

          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <input
                type="text"
                placeholder="Buscar producto..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full md:w-96 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split("-");
                  setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
                }}
                className="border rounded-lg px-3 py-2 text-sm outline-none"
              >
                <option value="title-asc">Nombre (A-Z)</option>
                <option value="title-desc">Nombre (Z-A)</option>
              </select>
            </div>

            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {currentProducts.map((p, i) => (
                    <ProductCard key={i} product={p} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="text-center py-20 text-gray-500 text-xl">
                No se encontraron resultados
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
