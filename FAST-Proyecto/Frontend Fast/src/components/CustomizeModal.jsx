import React, { useState } from 'react';
import { formatCOP } from '../utils/formatCurrency';

const CustomizeModal = ({ producto, onClose, onConfirm }) => {
  const [tamaño, setTamaño] = useState('PEQUEÑO');
  const [ingredientesExtra, setIngredientesExtra] = useState([]);
  const [ingredientesRemover, setIngredientesRemover] = useState([]);
  const [cantidad, setCantidad] = useState(1);

  const ingredientesDisponibles = [
    'champiñones', 'aceitunas', 'tocino', 'cebolla', 
    'pimientos', 'jalapeños', 'extra queso', 'aguacate'
  ];

  const calcularTotal = () => {
    let total = producto.precio * cantidad;
    
    // Costo por tamaño (precios en COP)
    if (tamaño === 'MEDIANO') {
      total += 3000 * cantidad;
    } else if (tamaño === 'GRANDE') {
      total += 5000 * cantidad;
    }
    
    // Costo por ingredientes extra (precios en COP)
    total += ingredientesExtra.length * 2000 * cantidad;
    
    return total; // return number; format when rendering
  };

  const toggleIngredienteExtra = (ing) => {
    if (ingredientesExtra.includes(ing)) {
      setIngredientesExtra(ingredientesExtra.filter(i => i !== ing));
    } else {
      setIngredientesExtra([...ingredientesExtra, ing]);
    }
  };

  const toggleIngredienteRemover = (ing) => {
    if (ingredientesRemover.includes(ing)) {
      setIngredientesRemover(ingredientesRemover.filter(i => i !== ing));
    } else {
      setIngredientesRemover([...ingredientesRemover, ing]);
    }
  };

  const handleConfirm = () => {
    const customization = {
      tamaño,
      ingredientesExtra,
      ingredientesRemover,
      cantidad,
    };
    onConfirm(customization);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                Personaliza tu pedido
              </h3>
              <p className="text-gray-600 mt-1">{producto.nombre}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Cantidad */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Cantidad
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold text-lg"
              >
                −
              </button>
              <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                {cantidad}
              </span>
              <button
                onClick={() => setCantidad(cantidad + 1)}
                className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Tamaño */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tamaño
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['PEQUEÑO', 'MEDIANO', 'GRANDE'].map((size) => {
                const costoAdicional = size === 'MEDIANO' ? `+${formatCOP(3000)}` : size === 'GRANDE' ? `+${formatCOP(5000)}` : '';
                return (
                  <button
                    key={size}
                    onClick={() => setTamaño(size)}
                    className={`p-4 rounded-lg border-2 transition ${
                      tamaño === size
                        ? 'border-fast-blue bg-blue-50 text-fast-blue'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold">{size}</div>
                    {costoAdicional && (
                      <div className="text-sm mt-1">{costoAdicional}</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ingredientes Extra */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {`Ingredientes Extra (${formatCOP(2000)} c/u)`}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {ingredientesDisponibles.map((ing) => (
                <label
                  key={ing}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition ${
                    ingredientesExtra.includes(ing)
                      ? 'border-fast-blue bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={ingredientesExtra.includes(ing)}
                    onChange={() => toggleIngredienteExtra(ing)}
                    className="w-5 h-5 text-fast-blue rounded focus:ring-fast-blue"
                  />
                  <span className="text-sm font-medium capitalize">{ing}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Remover Ingredientes */}
          {producto.ingredientes && producto.ingredientes.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Remover Ingredientes (Sin costo)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {producto.ingredientes.map((ing) => (
                  <label
                    key={ing}
                    className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition ${
                      ingredientesRemover.includes(ing)
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={ingredientesRemover.includes(ing)}
                      onChange={() => toggleIngredienteRemover(ing)}
                      className="w-5 h-5 text-red-500 rounded focus:ring-red-500"
                    />
                    <span className="text-sm font-medium capitalize">{ing}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Resumen */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Precio base (x{cantidad})</span>
              <span className="font-medium">{formatCOP(producto.precio * cantidad)}</span>
            </div>
            {tamaño !== 'PEQUEÑO' && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tamaño {tamaño}</span>
                <span className="font-medium">
                  {`+${formatCOP((tamaño === 'MEDIANO' ? 3000 : 5000) * cantidad)}`}
                </span>
              </div>
            )}
            {ingredientesExtra.length > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Ingredientes extra (x{ingredientesExtra.length})
                </span>
                <span className="font-medium">
                  {`+${formatCOP(ingredientesExtra.length * 2000 * cantidad)}`}
                </span>
              </div>
            )}
            <div className="border-t border-gray-300 pt-2 flex justify-between">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-2xl text-fast-blue">
                {formatCOP(calcularTotal())}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 btn-primary"
          >
            {`Agregar al Carrito - ${formatCOP(calcularTotal())}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeModal;
