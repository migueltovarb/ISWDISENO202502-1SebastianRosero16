import React, { useState } from 'react';
import { pedidoService } from '../services/api';
import { formatCOP } from '../utils/formatCurrency';
import Toast from './Toast';

const Cart = ({ cart, removeFromCart, clearCart, onOrderCreated }) => {
  const [tipoEntrega, setTipoEntrega] = useState('RECOGER');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const calcularTotal = () => {
    return cart.reduce((total, item) => {
      let precio = item.precio * (item.customization?.cantidad || 1);
      
      const custom = item.customization;
      if (custom) {
        if (custom.tamaño === 'MEDIANO') {
          precio += 3000 * custom.cantidad;
        } else if (custom.tamaño === 'GRANDE') {
          precio += 5000 * custom.cantidad;
        }
        
        if (custom.ingredientesExtra) {
          precio += custom.ingredientesExtra.length * 2000 * custom.cantidad;
        }
      }
      
      return total + precio;
    }, 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      showToast('El carrito está vacío', 'error');
      return;
    }

    if (!correo) {
      showToast('Por favor ingresa tu correo electrónico', 'error');
      return;
    }

    if (tipoEntrega === 'DOMICILIO' && !direccion) {
      showToast('Por favor ingresa tu dirección de entrega', 'error');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const items = cart.map(item => ({
        idProducto: item.idProducto,
        cantidad: item.customization?.cantidad || 1,
        personalizacion: item.customization ? {
          tamaño: item.customization.tamaño,
          ingredientesExtra: item.customization.ingredientesExtra || [],
          ingredientesRemover: item.customization.ingredientesRemover || []
        } : null
      }));

      const pedidoData = {
        clienteId: 'cliente_web',
        clienteCorreo: correo,
        items: items,
        tipoEntrega: tipoEntrega,
        direccionEntrega: tipoEntrega === 'DOMICILIO' ? direccion : null
      };

      const response = await pedidoService.crearPedido(pedidoData);
      
      if (response.success) {
        showToast('¡Pedido creado exitosamente!', 'success');
        setTimeout(() => {
          onOrderCreated(response.data.idPedido);
        }, 1500);
      }
    } catch (err) {
      console.error('Error al crear pedido:', err);
      setError('No se pudo crear el pedido. Verifica que el backend esté corriendo.');
      showToast('No se pudo crear el pedido', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-600 mb-6">
          Agrega productos del menú para comenzar tu pedido
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Toast de notificaciones */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <h2 className="text-3xl font-bold text-gray-900 mb-6">Tu Carrito</h2>

      {/* Items del carrito */}
      <div className="space-y-4 mb-6">
        {cart.map((item) => {
          const cantidad = item.customization?.cantidad || 1;
          let precioTotal = item.precio * cantidad;
          
          const custom = item.customization;
          if (custom) {
            if (custom.tamaño === 'MEDIANO') precioTotal += 3000 * cantidad;
            if (custom.tamaño === 'GRANDE') precioTotal += 5000 * cantidad;
            if (custom.ingredientesExtra) {
              precioTotal += custom.ingredientesExtra.length * 2000 * cantidad;
            }
          }

          return (
            <div key={item.id} className="card p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {item.nombre}
                  </h3>
                  
                  {custom && (
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Cantidad: {cantidad}</p>
                      <p>Tamaño: {custom.tamaño}</p>
                      {custom.ingredientesExtra && custom.ingredientesExtra.length > 0 && (
                        <p>Extra: {custom.ingredientesExtra.join(', ')}</p>
                      )}
                      {custom.ingredientesRemover && custom.ingredientesRemover.length > 0 && (
                        <p>Sin: {custom.ingredientesRemover.join(', ')}</p>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="text-right ml-4">
                          <p className="text-xl font-bold text-fast-blue mb-2">
                            {formatCOP(precioTotal)}
                          </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Formulario de checkout */}
      <div className="card p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Información de Entrega
        </h3>

        <div className="space-y-4">
          {/* Correo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correo Electrónico *
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="tu@email.com"
              className="input-field"
              required
            />
          </div>

          {/* Tipo de entrega */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tipo de Entrega
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTipoEntrega('RECOGER')}
                className={`p-4 rounded-lg border-2 transition ${
                  tipoEntrega === 'RECOGER'
                    ? 'border-fast-blue bg-blue-50 text-fast-blue'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">🏪</div>
                <div className="font-semibold">Recoger</div>
                <div className="text-xs mt-1">En tienda</div>
              </button>
              <button
                onClick={() => setTipoEntrega('DOMICILIO')}
                className={`p-4 rounded-lg border-2 transition ${
                  tipoEntrega === 'DOMICILIO'
                    ? 'border-fast-blue bg-blue-50 text-fast-blue'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">🏠</div>
                <div className="font-semibold">Domicilio</div>
                <div className="text-xs mt-1">A tu dirección</div>
              </button>
            </div>
          </div>

          {/* Dirección (solo si es domicilio) */}
          {tipoEntrega === 'DOMICILIO' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dirección de Entrega *
              </label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Calle 123 #45-67, Pasto, Nariño"
                className="input-field"
                required
              />
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Total y acciones */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold text-gray-900">Total</span>
          <span className="text-3xl font-bold text-fast-blue">
            {formatCOP(calcularTotal())}
          </span>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`w-full btn-primary text-lg py-3 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Procesando...' : '🚀 Confirmar Pedido'}
          </button>
          <button
            onClick={clearCart}
            className="w-full btn-secondary"
          >
            Vaciar Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
