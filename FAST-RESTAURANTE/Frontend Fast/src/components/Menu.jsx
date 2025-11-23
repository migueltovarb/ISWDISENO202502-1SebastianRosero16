import React, { useState, useEffect } from 'react';
import { productoService } from '../services/api';
import ProductCard from './ProductCard';
import CustomizeModal from './CustomizeModal';
import Toast from './Toast';

const Menu = ({ addToCart, setCurrentView }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await productoService.obtenerMenuDisponible();
      setProductos(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('No se pudo cargar el menú. Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setShowCustomizeModal(true);
  };

  const handleConfirmCustomization = (customization) => {
    addToCart(selectedProduct, customization);
    setShowCustomizeModal(false);
    setSelectedProduct(null);
    setShowToast(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-fast-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando menú...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-semibold mb-2">❌ Error</p>
        <p className="text-gray-700">{error}</p>
        <button
          onClick={cargarProductos}
          className="mt-4 btn-primary"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Nuestro Menú</h2>
        <p className="text-gray-600">
          Selecciona tus productos favoritos y personalízalos a tu gusto
        </p>
        <div className="mt-4 flex items-center space-x-2">
          <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
          <span className="text-sm text-gray-600">
            Mostrando {productos.length} productos disponibles
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <ProductCard
            key={producto.idProducto}
            producto={producto}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {productos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No hay productos disponibles en este momento
          </p>
        </div>
      )}

      {showCustomizeModal && selectedProduct && (
        <CustomizeModal
          producto={selectedProduct}
          onClose={() => {
            setShowCustomizeModal(false);
            setSelectedProduct(null);
          }}
          onConfirm={handleConfirmCustomization}
        />
      )}

      {showToast && (
        <Toast
          message="¡Producto agregado al carrito!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Menu;
