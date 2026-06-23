import React from "react";
import { Link } from "react-router-dom";

const Th = ({ children, className = "", isPage = false, ...props }) => (
  <th
    className={`${isPage ? "border border-slate-300 p-2 font-semibold bg-slate-100 text-slate-800 normal-case" : "border border-black p-1 uppercase font-black bg-gray-100"} ${className}`}
    {...props}
  >
    {children}
  </th>
);

const DynamicTable = ({ section, data, variant = "modal" }) => {
  const isPage = variant === "page";
  const linkColumn = section.linkColumn;
  const tableClass = isPage
    ? "hidden md:table w-full text-sm border-collapse border border-slate-300 text-center min-w-[640px]"
    : "hidden md:table print:table w-full text-[11px] border-collapse border-2 border-black text-center table-fixed";
  const mobileTableClass = isPage
    ? "block md:hidden space-y-4"
    : "block md:hidden print:hidden space-y-4";
  const sectionTitleClass = isPage
    ? "text-xs font-bold uppercase rounded-full border border-black px-5 py-1.5 inline-block mb-4"
    : "text-sm font-black uppercase border-b-2 border-black mb-4 inline-block";
  const rawRows = section.dataSource ? data[section.dataSource] : data.data;
  const rows = Array.isArray(rawRows) ? rawRows : [rawRows];

  if (!rawRows || rows.length === 0) return null;

  const isValueEmpty = (val) => {
    if (val === undefined || val === null) return true;
    if (Array.isArray(val))
      return val.length === 0 || val.every((v) => isValueEmpty(v));
    const strVal = String(val).trim();
    return strVal === "";
  };

  const filteredColumns = section.columns
    .filter((col) => {
      if (col.subColumns) {
        const activeSub = col.subColumns.filter((sub) =>
          rows.some((r) => !isValueEmpty(r?.[sub.key])),
        );
        return activeSub.length > 0;
      }
      return rows.some((r) => !isValueEmpty(r?.[col.key]));
    })
    .map((col) => {
      if (col.subColumns) {
        return {
          ...col,
          subColumns: col.subColumns.filter((sub) =>
            rows.some((r) => !isValueEmpty(r?.[sub.key])),
          ),
        };
      }
      return col;
    });

  const flatColumns = filteredColumns.flatMap((col) =>
    col.subColumns
      ? col.subColumns.map((sub) => ({ ...sub, parentHeader: col.header }))
      : [col],
  );

  const renderCellContent = (row, key) => {
    const val = row?.[key];
    const innerBorder = isPage ? "border-b border-slate-300" : "border-b border-black";

    if (Array.isArray(val)) {
      return (
        <div className="flex flex-col w-full h-full">
          {val.map((item, i) => (
            <div
              key={i}
              className={`p-2 flex-1 flex items-center justify-center ${
                i !== val.length - 1 ? innerBorder : ""
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      );
    }

    const displayValue =
      val !== undefined && val !== null && val !== "—" ? val : "-";

    if (linkColumn === key && row?._href && displayValue !== "-") {
      return (
        <div className="p-2">
          <Link
            to={row._href}
            className="text-primary font-bold hover:underline"
          >
            {displayValue}
          </Link>
        </div>
      );
    }

    return <div className="p-2">{displayValue}</div>;
  };

  const renderMobileCell = (row, col) => {
    const val = row?.[col.key];
    const displayValue =
      val !== undefined && val !== null && val !== "—" ? val : "-";
    const isLink = linkColumn === col.key && row?._href && displayValue !== "-";

    if (isLink) {
      return (
        <Link
          to={row._href}
          className="text-primary font-bold hover:underline"
        >
          {displayValue}
        </Link>
      );
    }
    return renderCellContent(row, col.key);
  };

  const mobileCardClass = isPage
    ? "border border-slate-300 divide-y divide-slate-300"
    : "border-2 border-black divide-y divide-black";
  const mobileLabelClass = isPage
    ? "w-1/3 bg-slate-100 p-2 font-semibold border-r border-slate-300 flex items-center justify-center text-center text-xs"
    : "w-1/3 bg-gray-100 p-2 font-black uppercase border-r border-black flex items-center justify-center text-center";

  return (
    <section className={`${isPage ? "mb-8" : "mb-4"} break-inside-avoid`}>
      <h3 className={sectionTitleClass}>{section.title}</h3>

      <div className={mobileTableClass}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={mobileCardClass}>
            {flatColumns.map((col, colIndex) => (
              <div key={colIndex} className={`flex ${isPage ? "text-sm" : "text-[11px]"}`}>
                <div className={mobileLabelClass}>
                  {col.parentHeader
                    ? `${col.parentHeader} (${col.header})`
                    : col.header}
                </div>
                <div className="w-2/3 font-bold flex flex-col justify-center text-center">
                  {renderMobileCell(row, col)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={isPage ? "overflow-x-auto hidden md:block" : ""}>
        <table className={tableClass}>
        <thead>
          <tr>
            {filteredColumns.map((col, i) => (
              <Th
                key={i}
                isPage={isPage}
                colSpan={col.subColumns?.length || 1}
                rowSpan={col.subColumns ? 1 : 2}
              >
                {col.header}
              </Th>
            ))}
          </tr>
          {filteredColumns.some((c) => c.subColumns) && (
            <tr className={isPage ? "text-xs" : "bg-gray-50 text-[10px]"}>
              {filteredColumns
                .flatMap((col) => col.subColumns || [])
                .map((sub, i) => (
                  <Th key={i} isPage={isPage}>
                    {sub.header}
                  </Th>
                ))}
            </tr>
          )}
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="even:bg-gray-50/50">
              {filteredColumns.map((col) => {
                if (col.subColumns) {
                  return col.subColumns.map((sub) => (
                    <td
                      key={sub.key}
                      className={`border ${isPage ? "border-slate-300" : "border-black"} p-0 align-top`}
                    >
                      {renderCellContent(row, sub.key)}
                    </td>
                  ));
                }
                const isHighlight = col.key === "agb" || col.key === "diametro";
                return (
                  <td
                    key={col.key}
                    className={`border ${isPage ? "border-slate-300" : "border-black"} p-0 ${isHighlight ? "font-bold bg-gray-50" : ""}`}
                  >
                    {renderCellContent(row, col.key)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </section>
  );
};

export default DynamicTable;
