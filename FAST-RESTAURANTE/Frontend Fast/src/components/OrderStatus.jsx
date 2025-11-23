import React, { useState, useEffect } from 'react';
import { pedidoService } from '../services/api';
import { formatCOP } from '../utils/formatCurrency';
import Toast from './Toast';

const OrderStatus = ({ orderId }) => {
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState(orderId || '');
  const [estadoAnterior, setEstadoAnterior] = useState(null);
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    if (orderId) {
      cargarPedido(orderId);
    }
  }, [orderId]);

  // Polling: Consulta el estado cada 10 segundos
  useEffect(() => {
    if (!pedido) return;

    const interval = setInterval(() => {
      cargarPedidoSilencioso(pedido.idPedido);
    }, 10000); // 10 segundos

    return () => clearInterval(interval);
  }, [pedido]);

  const cargarPedido = async (id) => {
    try {
      setLoading(true);
      const data = await pedidoService.obtenerPorId(id);
      setPedido(data);
      setEstadoAnterior(data.estado);
    } catch (err) {
      console.error('Error al cargar pedido:', err);
      showToast('No se pudo cargar el pedido. Verifica el ID.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const cargarPedidoSilencioso = async (id) => {
    try {
      const data = await pedidoService.obtenerPorId(id);
      
      // Detectar cambio de estado
      if (estadoAnterior && data.estado !== estadoAnterior) {
        setMostrarNotificacion(true);
        setTimeout(() => setMostrarNotificacion(false), 5000);
      }
      
      setPedido(data);
      setEstadoAnterior(data.estado);
    } catch (err) {
      console.error('Error al actualizar pedido:', err);
    }
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      cargarPedido(searchId);
    }
  };

  const getEstadoInfo = (estado) => {
    const estados = {
      PENDIENTE: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: '⏳',
        mensaje: 'Tu pedido está pendiente de confirmación'
      },
      EN_PREPARACION: {
        color: 'bg-blue-100 text-blue-800',
        icon: '👨‍🍳',
        mensaje: 'Estamos preparando tu pedido con mucho cuidado'
      },
      LISTO: {
        color: 'bg-green-100 text-green-800',
        icon: '✅',
        mensaje: '¡Tu pedido está listo para recoger!'
      },
      ENVIADO: {
        color: 'bg-purple-100 text-purple-800',
        icon: '🏍️',
        mensaje: 'Tu pedido está en camino'
      },
      ENTREGADO: {
        color: 'bg-gray-100 text-gray-800',
        icon: '📦',
        mensaje: '¡Pedido entregado! ¡Buen provecho!'
      }
    };
    return estados[estado] || estados.PENDIENTE;
  };

  const getProgreso = (estado) => {
    const niveles = {
      PENDIENTE: 20,
      EN_PREPARACION: 40,
      LISTO: 60,
      ENVIADO: 80,
      ENTREGADO: 100
    };
    return niveles[estado] || 0;
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Toast de notificaciones */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <h2 className="text-3xl font-bold text-gray-900 mb-6">Estado de Pedido</h2>

      {/* Buscador de pedido */}
      <div className="card p-6 mb-6">
        <form onSubmit={handleBuscar} className="flex gap-3">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Ingresa el ID de tu pedido"
            className="input-field flex-1"
          />
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? '⏳' : '🔍'} Buscar
          </button>
        </form>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fast-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando pedido...</p>
        </div>
      )}

      {pedido && !loading && (
        <div className="space-y-6">
          {/* Estado actual */}
          <div className="card p-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">
                {getEstadoInfo(pedido.estado).icon}
              </div>
              <span className={`badge text-lg px-6 py-2 ${getEstadoInfo(pedido.estado).color}`}>
                {pedido.estado.replace('_', ' ')}
              </span>
              <p className="text-gray-600 mt-3 text-lg">
                {getEstadoInfo(pedido.estado).mensaje}
              </p>
            </div>

            {/* Barra de progreso */}
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-fast-blue">
                    Progreso
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold inline-block text-fast-blue">
                    {getProgreso(pedido.estado)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-200">
                <div
                  style={{ width: `${getProgreso(pedido.estado)}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-fast-blue transition-all duration-500"
                ></div>
              </div>
            </div>
          </div>

          {/* Detalles del pedido */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Detalles del Pedido
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">ID del Pedido:</span>
                <span className="font-mono font-semibold">{pedido.idPedido}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cliente:</span>
                <span className="font-semibold">{pedido.clienteCorreo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tipo de Entrega:</span>
                <span className="font-semibold">
                  {pedido.tipoEntrega === 'DOMICILIO' ? '🏠 Domicilio' : '🏪 Recoger'}
                </span>
              </div>
              {pedido.direccionEntrega && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Dirección:</span>
                  <span className="font-semibold">{pedido.direccionEntrega}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Fecha:</span>
                <span className="font-semibold">
                  {new Date(pedido.fechaCreacion).toLocaleString('es-CO')}
                </span>
              </div>
            </div>
          </div>

          {/* Items del pedido */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Productos
            </h3>
            
            <div className="space-y-3">
              {pedido.items.map((item, index) => (
                <div key={index} className="flex justify-between items-start pb-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {item.nombreProducto} x{item.cantidad}
                    </p>
                    {item.personalizacion && (
                      <div className="text-xs text-gray-600 mt-1">
                        <p>Tamaño: {item.personalizacion.tamaño}</p>
                        {item.personalizacion.ingredientesExtra && 
                         item.personalizacion.ingredientesExtra.length > 0 && (
                          <p>Extra: {item.personalizacion.ingredientesExtra.join(', ')}</p>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="font-bold text-gray-900">
                    {formatCOP(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t-2 border-gray-200 flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-fast-blue">
                {formatCOP(pedido.total)}
              </span>
            </div>
          </div>

          {/* Notificación */}
          {(pedido.estado === 'LISTO' || pedido.estado === 'ENVIADO') && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-start space-x-3">
              <span className="text-2xl">📧</span>
              <div>
                <p className="font-semibold text-green-800">Notificación Enviada</p>
                <p className="text-sm text-green-700 mt-1">
                  Hemos enviado una notificación a {pedido.clienteCorreo} informando 
                  que el pedido está {pedido.estado === 'LISTO' ? 'listo para recoger' : 'en camino'}.
                </p>
              </div>
            </div>
          )}

          <button
            onClick={() => cargarPedido(pedido.idPedido)}
            className="w-full btn-secondary"
          >
            🔄 Actualizar Estado
          </button>
        </div>
      )}

      {!pedido && !loading && searchId && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600">
            No se encontró el pedido. Verifica el ID e intenta de nuevo.
          </p>
        </div>
      )}

      {/* Notificación de cambio de estado */}
      {mostrarNotificacion && pedido && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-[350px]">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center text-2xl">
              🔔
            </div>
            <div className="flex-1">
              <p className="font-bold">¡Estado actualizado!</p>
              <p className="text-sm">
                {pedido.estado === 'LISTO' && 'Tu pedido está listo para recoger'}
                {pedido.estado === 'ENVIADO' && 'Tu pedido ha sido enviado'}
                {pedido.estado === 'EN_PREPARACION' && 'Tu pedido está en preparación'}
                {pedido.estado === 'ENTREGADO' && 'Tu pedido ha sido entregado'}
              </p>
            </div>
            <button 
              onClick={() => setMostrarNotificacion(false)}
              className="flex-shrink-0 text-white hover:text-gray-200 font-bold text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
