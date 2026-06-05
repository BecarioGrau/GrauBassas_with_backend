import React from "react";
import MaterialsCard from "./MaterialsCard";

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

const MaterialsSection = ({ grupo, iconName }) => {
  const sectionId = slugify(grupo.label);
  return (
    <section id={sectionId} className="scroll-mt-32">
      <div className="flex items-center space-x-4 mb-8 border-b pb-4 border-gray-100">
        <div className="bg-primary/10 p-3 rounded-lg text-primary text-2xl">
          {iconName}
        </div>
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">
          {grupo.label}
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {grupo.children &&
          grupo.children.map((producto, subIndex) => (
            <MaterialsCard key={subIndex} producto={producto} />
          ))}
      </div>
    </section>
  );
};

export default MaterialsSection;
