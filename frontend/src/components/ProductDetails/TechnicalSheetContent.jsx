import DynamicTable from "../Modals/DynamicTable";

const SectionPill = ({ children }) => (
  <h3 className="inline-block rounded-full border border-black px-5 py-1.5 text-xs font-bold uppercase tracking-wide mb-4">
    {children}
  </h3>
);

const TechnicalSheetContent = ({ data, template, variant = "page" }) => {
  if (!data) return null;

  const hasSpecs = Array.isArray(data.specs) && data.specs.some((s) => String(s).trim());

  return (
    <div className="text-slate-700 space-y-8">
      {hasSpecs && (
        <section>
          <SectionPill>Descripción / Usos</SectionPill>
          <ul className="space-y-2 text-sm leading-relaxed pl-1">
            {data.specs.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary font-bold">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.description && !hasSpecs && (
        <section>
          <SectionPill>Descripción</SectionPill>
          <p className="text-sm leading-relaxed text-justify">{data.description}</p>
        </section>
      )}

      <section>
        <SectionPill>Estado de suministro</SectionPill>
        <p className="text-sm leading-relaxed">
          {data.suministro || data.suministros || "Consultar"}
        </p>
      </section>

      {template?.sections?.map((section, idx) => (
        <DynamicTable
          key={idx}
          section={section}
          data={data}
          variant={variant}
        />
      ))}

      {!template?.sections?.length && (
        <p className="text-sm text-slate-500 italic">
          No hay datos técnicos tabulados para esta calidad.
        </p>
      )}
    </div>
  );
};

export default TechnicalSheetContent;
