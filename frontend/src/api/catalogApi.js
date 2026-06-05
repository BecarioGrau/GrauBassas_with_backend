import { API_PRODUCTS_BASE } from "../config/catalogConfig";

function getCSRFToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken"))
    ?.split("=")[1];
}

export const getProducts = async (materialKind) => {
  const url = materialKind
    ? `${API_PRODUCTS_BASE}?material_kind=${encodeURIComponent(materialKind)}`
    : API_PRODUCTS_BASE;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
};

export const getUserStatus = async () => {
  const res = await fetch(`${API_PRODUCTS_BASE}me/`, {
    credentials: "include",
  });
  if (!res.ok) return { is_authenticated: false, is_staff: false };
  return res.json();
};

export const createProduct = async (data) =>
  fetch(API_PRODUCTS_BASE, {
    method: "POST",
    credentials: "include",
    headers: { "X-CSRFToken": getCSRFToken() },
    body: data,
  });

export const updateProduct = async (id, data) =>
  fetch(`${API_PRODUCTS_BASE}${id}/`, {
    method: "PUT",
    credentials: "include",
    headers: { "X-CSRFToken": getCSRFToken() },
    body: data,
  });

export const deleteProduct = async (id) =>
  fetch(`${API_PRODUCTS_BASE}${id}/`, {
    method: "DELETE",
    credentials: "include",
    headers: { "X-CSRFToken": getCSRFToken() },
  });
