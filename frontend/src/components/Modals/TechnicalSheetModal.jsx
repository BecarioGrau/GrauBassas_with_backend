import React from "react";
import TechnicalSheetContent from "../ProductDetails/TechnicalSheetContent";

const TechnicalSheetModal = ({ isOpen, onClose, data, template }) => {
  if (!isOpen || !data) return null;

  const handlePrint = () => {
    setTimeout(() => window.print(), 150);
  };

  return (
    <div className="print:block">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] print:hidden"
        onClick={onClose}
      />

      <div className="printable-modal-container fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-white shadow-2xl print:static print:translate-x-0 print:translate-y-0 print:max-h-none print:shadow-none print:overflow-visible print:w-full">
        <div className="sticky top-0 right-0 p-4 bg-white/95 border-b flex justify-end gap-3 print:hidden z-[1010]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-black cursor-pointer"
          >
            CERRAR
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-primary text-white font-bold hover:bg-primary-dark transition-all flex items-center gap-2 shadow-md cursor-pointer"
          >
            IMPRIMIR FICHA
          </button>
        </div>

        <div
          id="printable-area"
          className="p-8 md:p-12 text-black bg-white flex flex-col print:p-0 print:m-0"
        >
          <header className="flex justify-between items-start border-b-4 border-black pb-6 mb-6">
            <div>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
                {data.title}
              </h1>
              <h2 className="text-xl font-bold mt-2 text-gray-600 uppercase">
                Ficha Técnica de Material
              </h2>
            </div>
            <div className="border-2 border-black p-4 text-center min-w-[120px]">
              <span className="block text-[10px] font-black uppercase">
                Calidad
              </span>
              <span className="text-2xl font-black italic">
                {data.equivalencias?.agb || data.title}
              </span>
            </div>
          </header>

          <div className="grid gap-5 mb-5">
            <TechnicalSheetContent
              data={data}
              template={template}
              variant="modal"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSheetModal;
