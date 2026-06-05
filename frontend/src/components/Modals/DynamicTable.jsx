import React from "react";

const Th = ({ children, className = "", ...props }) => (
  <th
    className={`border border-black p-1 uppercase font-black bg-gray-100 ${className}`}
    {...props}
  >
    {children}
  </th>
);

const DynamicTable = ({ section, data }) => {
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

    if (Array.isArray(val)) {
      return (
        <div className="flex flex-col w-full h-full">
          {val.map((item, i) => (
            <div
              key={i}
              className={`p-2 flex-1 flex items-center justify-center ${
                i !== val.length - 1 ? "border-b border-black" : ""
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
    return <div className="p-2">{displayValue}</div>;
  };

  return (
    <section className="mb-4 break-inside-avoid">
      <h3 className="text-sm font-black uppercase border-b-2 border-black mb-4 inline-block">
        {section.title}
      </h3>

      <div className="block md:hidden print:hidden space-y-4">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="border-2 border-black divide-y divide-black"
          >
            {flatColumns.map((col, colIndex) => (
              <div key={colIndex} className="flex text-[11px]">
                <div className="w-1/3 bg-gray-100 p-2 font-black uppercase border-r border-black flex items-center justify-center text-center">
                  {col.parentHeader
                    ? `${col.parentHeader} (${col.header})`
                    : col.header}
                </div>
                <div className="w-2/3 font-bold flex flex-col justify-center text-center">
                  {renderCellContent(row, col.key)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <table className="hidden md:table print:table w-full text-[11px] border-collapse border-2 border-black text-center table-fixed">
        <thead>
          <tr>
            {filteredColumns.map((col, i) => (
              <Th
                key={i}
                colSpan={col.subColumns?.length || 1}
                rowSpan={col.subColumns ? 1 : 2}
              >
                {col.header}
              </Th>
            ))}
          </tr>
          {filteredColumns.some((c) => c.subColumns) && (
            <tr className="bg-gray-50 text-[10px]">
              {filteredColumns
                .flatMap((col) => col.subColumns || [])
                .map((sub, i) => (
                  <Th key={i}>{sub.header}</Th>
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
                      className="border border-black p-0 vertical-align-top"
                    >
                      {renderCellContent(row, sub.key)}
                    </td>
                  ));
                }
                const isHighlight = col.key === "agb" || col.key === "diametro";
                return (
                  <td
                    key={col.key}
                    className={`border border-black p-0 ${isHighlight ? "font-bold bg-gray-50" : ""}`}
                  >
                    {renderCellContent(row, col.key)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default DynamicTable;
