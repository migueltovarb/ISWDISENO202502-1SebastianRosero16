import React from 'react';
import { formatCOP } from '../utils/formatCurrency';

const ProductCard = ({ producto, onAddToCart }) => {
  return (
    <div className="card hover:scale-105 transform transition duration-300">
      {/* Imagen del producto (placeholder) */}
      <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
        <span className="text-6xl">🍽️</span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 flex-1">
            {producto.nombre}
          </h3>
          <span className="badge badge-success ml-2">
            Disponible
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {producto.descripcion}
        </p>

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Ingredientes:</p>
          <div className="flex flex-wrap gap-1">
            {producto.ingredientes && producto.ingredientes.slice(0, 4).map((ing, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {ing}
              </span>
            ))}
            {producto.ingredientes && producto.ingredientes.length > 4 && (
              <span className="text-xs text-gray-500">
                +{producto.ingredientes.length - 4} más
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-fast-blue">
              {formatCOP(producto.precio)}
            </span>
          </div>
          <button
            onClick={() => onAddToCart(producto)}
            className="btn-primary text-sm py-2 px-4"
          >
            🛒 Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
