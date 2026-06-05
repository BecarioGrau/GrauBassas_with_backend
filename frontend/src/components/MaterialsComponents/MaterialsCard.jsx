import React from "react";
import useIsMobile from "../../hooks/useIsMobile";

const MaterialsCard = ({ producto, icon, onClick }) => {
  const isMobile = useIsMobile();

  const content = (
    <>
      <div
        className={
          isMobile
            ? "absolute top-0 right-0 w-16 h-16  rounded-bl-full bg-primary "
            : "absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full group-hover:bg-primary  transition-colors duration-300"
        }
      >
        {icon && (
          <div
            className={
              isMobile
                ? "z-20 scale-90 translate-x-5.5 translate-y-3 text-white"
                : "z-20 scale-90 translate-x-5.5 translate-y-3 group-hover:text-white"
            }
          >
            {icon}
          </div>
        )}
      </div>
      <span
        className={
          isMobile
            ? "block text-xl font-bold font-display text-primary z-10 relative pr-8 text-left"
            : "block text-xl font-bold font-display text-slate-700 group-hover:text-primary transition-colors z-10 relative pr-8 text-left"
        }
      >
        {producto.label}
      </span>
      <span className="block text-[10px] uppercase tracking-tighter text-slate-400 mt-1 z-10 relative text-left">
        {producto.tag || "Ver detalles"}
      </span>
    </>
  );

  const className =
    "group relative bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer overflow-hidden flex flex-col justify-center h-full w-full";

  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  return (
    <a href={producto.href} className={className}>
      {content}
    </a>
  );
};
export default MaterialsCard;
