import React from "react";

const ProductCard = ({ product }) => {
  return (
    <a
      href={product.url || product.href}
      className="group relative h-48 md:h-48 w-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
    >
      <div
        className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${product.image})` }}
      />

      <div className=" absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <div className="flex flex-col transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-bold md:text-lg text-sm text-white text-center mb-1 tracking-wide leading-tight">
              {product.label || product.title}
            </h3>
            <div className="w-6 h-0.5 bg-primary group-hover:w-full transition-all duration-500"></div>
            <span className="hidden md:inline-block text-white/80 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity font-bold tracking-widest">
              Detalles +
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
