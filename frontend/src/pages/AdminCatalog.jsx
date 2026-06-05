import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getUserStatus,
  getProducts,
} from "../api/catalogApi";
import {
  INITIAL_STATE,
  MATERIAL_KIND_OPTIONS,
  MATERIAL_KIND_LABEL,
} from "../constants/productConstants";
import { ProductFormDrawer } from "../components/admin/ProductFormDrawer";
import { ToastNotifications } from "../components/admin/ToastNotifications";
import {
  cleanObjectValues,
  formatApiError,
  normalizeProductForForm,
  stringifyCortesForApi,
  stringifyMechanicalForApi,
  trimNonEmptyStringList,
} from "../utils/productUtils";

function AdminCatalog() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(INITIAL_STATE);
  const [editProductId, setEditProductId] = useState(null);
  const [editForm, setEditForm] = useState(INITIAL_STATE);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [kindFilter, setKindFilter] = useState("");
  const [nameQuery, setNameQuery] = useState("");
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);

  useEffect(() => {
    load();
    checkAuth();
  }, []);

  useEffect(() => {
    if (message || error) {
      const t = setTimeout(() => {
        setMessage("");
        setError("");
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [message, error]);

  const closeFormDrawer = useCallback(() => {
    setFormDrawerOpen(false);
    setEditProductId(null);
    setEditForm(INITIAL_STATE);
    setForm(INITIAL_STATE);
  }, []);

  useEffect(() => {
    if (!formDrawerOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeFormDrawer();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [formDrawerOpen, closeFormDrawer]);

  async function checkAuth() {
    try {
      const data = await getUserStatus();
      setIsAdmin(data.is_staff);
    } catch (err) {
      console.error("Error al verificar auth", err);
    } finally {
      setAuthChecked(true);
    }
  }

  async function load() {
    try {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
    }
  }

  const prepareFormData = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("material_kind", data.material_kind || "aceros");
    formData.append("table_config", data.table_config);
    formData.append("suministros", data.suministros);
    formData.append(
      "specs",
      JSON.stringify(trimNonEmptyStringList(data.specs)),
    );
    formData.append(
      "chemical",
      JSON.stringify(cleanObjectValues(data.chemical)),
    );
    formData.append(
      "mechanical",
      JSON.stringify(stringifyMechanicalForApi(data.mechanical)),
    );
    formData.append("equivalencias", JSON.stringify(data.equivalencias || {}));
    formData.append(
      "cortes",
      JSON.stringify(stringifyCortesForApi(data.cortes)),
    );
    formData.append("gama_medidas", JSON.stringify(data.gama_medidas || {}));
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }
    return formData;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await createProduct(prepareFormData(form));
    setLoading(false);
    if (res.ok) {
      closeFormDrawer();
      setMessage("Material añadido con éxito.");
      load();
    } else {
      setError(await formatApiError(res, "Error al crear."));
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    const res = await updateProduct(editProductId, prepareFormData(editForm));
    setLoading(false);
    if (res.ok) {
      closeFormDrawer();
      load();
      setMessage("Material actualizado.");
    } else {
      setError(await formatApiError(res, "Error al actualizar."));
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("¿Eliminar este material definitivamente?")) return;
    setDeletingId(id);
    await deleteProduct(id);
    await load();
    setDeletingId(null);
    setMessage("Material eliminado.");
  }

  const openCreateProduct = () => {
    setEditProductId(null);
    setForm({
      ...INITIAL_STATE,
      material_kind: kindFilter || INITIAL_STATE.material_kind,
    });
    setFormDrawerOpen(true);
  };

  const openEditProduct = (product) => {
    setEditProductId(product.id);
    setEditForm(normalizeProductForForm(product));
    setFormDrawerOpen(true);
  };

  const activeForm = editProductId ? editForm : form;
  const setActiveForm = editProductId ? setEditForm : setForm;

  const filteredProducts = useMemo(() => {
    let list = products;
    if (kindFilter) {
      list = list.filter((p) => (p.material_kind || "aceros") === kindFilter);
    }
    const q = nameQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        String(p.title ?? "")
          .toLowerCase()
          .includes(q),
      );
    }
    return list;
  }, [products, kindFilter, nameQuery]);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Verificando acceso...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-black text-slate-900 mb-4 uppercase">
          Gestión de catálogo
        </h1>
        <p className="text-slate-600 max-w-md mb-6">
          Inicia sesión en el panel de Django como usuario administrador para
          editar materiales. Los visitantes siguen viendo el catálogo desde los
          archivos JSON y la API pública.
        </p>
        <a
          href="https://graubassaswithbackend-production.up.railway.app/panel-interno-58us/"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark"
        >
          Ir al panel de administración
        </a>
        <Link
          to="/productos"
          className="mt-4 text-primary font-semibold hover:underline"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastNotifications message={message} error={error} />

      <header className="bg-primary text-white py-10 px-6">
        <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-80 mb-1">
              Grau Bassas · Backoffice
            </p>
            <h1 className="text-4xl font-black uppercase">
              Gestión de productos
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/productos"
              className="px-4 py-2 border border-white/40 rounded-lg font-bold text-sm hover:bg-white/10"
            >
              Ver catálogo
            </Link>
            <button
              type="button"
              onClick={openCreateProduct}
              className="px-5 py-2 bg-white text-primary font-bold rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              + Nuevo producto
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8 space-y-4">
          <input
            type="search"
            placeholder="Buscar por nombre..."
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/30 outline-none"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setKindFilter("")}
              className={`text-xs font-bold cursor-pointer hover:bg-primary-dark hover:text-white uppercase px-3 py-2 rounded-lg border ${
                kindFilter === ""
                  ? "bg-primary text-white border-primary"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              Todos ({products.length})
            </button>
            {MATERIAL_KIND_OPTIONS.map(({ value, label }) => {
              const count = products.filter(
                (p) => (p.material_kind || "aceros") === value,
              ).length;
              if (count === 0 && kindFilter !== value) return null;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setKindFilter(value)}
                  className={`text-xs font-bold cursor-pointer hover:bg-primary-dark hover:text-white uppercase px-3 py-2 rounded-lg border ${
                    kindFilter === value
                      ? "bg-primary text-white border-primary"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  {label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-slate-500 border-2 border-dashed border-slate-200 rounded-2xl">
            No hay materiales en la API para este filtro.
            <br />
            <span className="text-sm">
              Importa los JSON con:{" "}
              <code className="bg-slate-100 px-1">
                python manage.py load_json_catalog
              </code>
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <article
                key={p.id}
                className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col"
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-40 w-full object-cover"
                  />
                )}
                <div className="p-5 flex-1">
                  <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {MATERIAL_KIND_LABEL[p.material_kind] || p.material_kind}
                  </span>
                  <h3 className="font-black text-lg text-slate-900 mt-2 ">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mt-1">
                    {p.description || "Sin descripción"}
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    {p.suministros || p.suministro || "—"}
                  </p>
                </div>
                <div className="px-5 py-3 border-t border-slate-100 flex justify-between">
                  <button
                    type="button"
                    onClick={() => openEditProduct(p)}
                    className="text-sm font-bold text-primary cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id)}
                    disabled={deletingId === p.id}
                    className="text-sm font-bold text-red-600 cursor-pointer"
                  >
                    {deletingId === p.id ? "..." : "Eliminar"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {formDrawerOpen && (
        <ProductFormDrawer
          key={editProductId ?? "create"}
          editProductId={editProductId}
          activeForm={activeForm}
          setActiveForm={setActiveForm}
          loading={loading}
          onClose={closeFormDrawer}
          onSubmit={editProductId ? handleUpdate : handleSubmit}
        />
      )}
    </div>
  );
}

export default AdminCatalog;
