import React, { useState, useEffect } from 'react';
import { pedidoService } from '../services/api';
import { formatCOP } from '../utils/formatCurrency';
import Toast from './Toast';

const AdminPanel = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, idPedido: null, nuevoEstado: null });

  useEffect(() => {
    cargarPedidos();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const cargarPedidos = async () => {
    try {
      setLoading(true);
      const data = await pedidoService.obtenerTodos();
      setPedidos(data);
    } catch (err) {
      console.error('Error al cargar pedidos:', err);
      showToast('No se pudieron cargar los pedidos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const solicitarActualizacion = (idPedido, nuevoEstado) => {
    setConfirmDialog({ show: true, idPedido, nuevoEstado });
  };

  const confirmarActualizacion = async () => {
    const { idPedido, nuevoEstado } = confirmDialog;
    setConfirmDialog({ show: false, idPedido: null, nuevoEstado: null });

    try {
      await pedidoService.actualizarEstado(idPedido, nuevoEstado);
      showToast('Estado actualizado. Notificación enviada al cliente.', 'success');
      cargarPedidos();
    } catch (err) {
      console.error('Error al actualizar estado:', err);
      showToast('No se pudo actualizar el estado', 'error');
    }
  };

  const cancelarActualizacion = () => {
    setConfirmDialog({ show: false, idPedido: null, nuevoEstado: null });
  };

  const pedidosFiltrados = filtroEstado === 'TODOS'
    ? pedidos
    : pedidos.filter(p => p.estado === filtroEstado);

  const getEstadoBadgeClass = (estado) => {
    const classes = {
      PENDIENTE: 'badge-warning',
      EN_PREPARACION: 'badge-info',
      LISTO: 'badge-success',
      ENVIADO: 'badge-info',
      ENTREGADO: 'badge'
    };
    return classes[estado] || 'badge';
  };

  const siguienteEstado = (estadoActual) => {
    const flujo = {
      PENDIENTE: 'EN_PREPARACION',
      EN_PREPARACION: 'LISTO',
      LISTO: 'ENVIADO',
      ENVIADO: 'ENTREGADO'
    };
    return flujo[estadoActual];
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fast-blue mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Toast de notificaciones */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      {/* Modal de confirmación */}
      {confirmDialog.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                ¿Actualizar estado a {confirmDialog.nuevoEstado?.replace('_', ' ')}?
              </h3>
              <p className="text-gray-600">
                Se enviará una notificación automática al cliente informando el cambio de estado.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={cancelarActualizacion}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarActualizacion}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h2>
        <p className="text-gray-600">Gestiona los pedidos y actualiza sus estados</p>
      </div>

      {/* Filtros */}
      <div className="card p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFiltroEstado('TODOS')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filtroEstado === 'TODOS'
                ? 'bg-fast-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todos ({pedidos.length})
          </button>
          {['PENDIENTE', 'EN_PREPARACION', 'LISTO', 'ENVIADO', 'ENTREGADO'].map(estado => {
            const count = pedidos.filter(p => p.estado === estado).length;
            return (
              <button
                key={estado}
                onClick={() => setFiltroEstado(estado)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filtroEstado === estado
                    ? 'bg-fast-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {estado.replace('_', ' ')} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card p-4">
          <div className="text-sm text-gray-600 mb-1">Pedidos Totales</div>
          <div className="text-3xl font-bold text-gray-900">{pedidos.length}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-600 mb-1">Pendientes</div>
          <div className="text-3xl font-bold text-yellow-600">
            {pedidos.filter(p => p.estado === 'PENDIENTE').length}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-600 mb-1">En Preparación</div>
          <div className="text-3xl font-bold text-blue-600">
            {pedidos.filter(p => p.estado === 'EN_PREPARACION').length}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-600 mb-1">Listos</div>
          <div className="text-3xl font-bold text-green-600">
            {pedidos.filter(p => p.estado === 'LISTO').length}
          </div>
        </div>
      </div>

      {/* Lista de pedidos */}
      <div className="space-y-4">
        {pedidosFiltrados.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-gray-600">No hay pedidos en este estado</p>
          </div>
        ) : (
          pedidosFiltrados.map(pedido => (
            <div key={pedido.idPedido} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      Pedido #{pedido.idPedido.substring(0, 8)}...
                    </h3>
                    <span className={`badge ${getEstadoBadgeClass(pedido.estado)}`}>
                      {pedido.estado.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>📧 {pedido.clienteCorreo}</p>
                    <p>
                      {pedido.tipoEntrega === 'DOMICILIO' ? '🏠' : '🏪'} {pedido.tipoEntrega}
                      {pedido.direccionEntrega && ` - ${pedido.direccionEntrega}`}
                    </p>
                    <p>🕐 {new Date(pedido.fechaCreacion).toLocaleString('es-CO')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-fast-blue">
                    {formatCOP(pedido.total)}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Productos:</p>
                <div className="space-y-1">
                  {pedido.items.map((item, index) => (
                    <div key={index} className="text-sm text-gray-600 flex justify-between">
                      <span>
                        • {item.nombreProducto} x{item.cantidad}
                        {item.personalizacion && (
                          <span className="text-xs ml-2">
                            ({item.personalizacion.tamaño}
                            {item.personalizacion.ingredientesExtra && 
                             item.personalizacion.ingredientesExtra.length > 0 &&
                             `, +${item.personalizacion.ingredientesExtra.length} extra`})
                          </span>
                        )}
                      </span>
                      <span className="font-medium">{formatCOP(item.subtotal)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Acciones */}
              <div className="flex flex-wrap gap-2">
                {pedido.estado !== 'ENTREGADO' && siguienteEstado(pedido.estado) && (
                  <button
                    onClick={() => solicitarActualizacion(pedido.idPedido, siguienteEstado(pedido.estado))}
                    className="btn-primary text-sm"
                  >
                    ▶️ Mover a {siguienteEstado(pedido.estado).replace('_', ' ')}
                  </button>
                )}

                {/* Botones de estado directo */}
                {pedido.estado !== 'LISTO' && pedido.estado !== 'ENTREGADO' && (
                  <button
                    onClick={() => solicitarActualizacion(pedido.idPedido, 'LISTO')}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-sm transition"
                  >
                    ✅ Marcar LISTO
                  </button>
                )}

                {pedido.estado === 'LISTO' && (
                  <button
                    onClick={() => solicitarActualizacion(pedido.idPedido, 'ENVIADO')}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg text-sm transition"
                  >
                    🏍️ Marcar ENVIADO
                  </button>
                )}

                {pedido.estado === 'ENVIADO' && (
                  <button
                    onClick={() => solicitarActualizacion(pedido.idPedido, 'ENTREGADO')}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg text-sm transition"
                  >
                    📦 Marcar ENTREGADO
                  </button>
                )}
              </div>

              {/* Indicador de notificación */}
              {(pedido.estado === 'LISTO' || pedido.estado === 'ENVIADO') && (
                <div className="mt-3 flex items-center text-xs text-green-600">
                  <span className="mr-1">✅</span>
                  <span>Notificación enviada al cliente</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <button
        onClick={cargarPedidos}
        className="mt-6 w-full btn-secondary"
      >
        🔄 Actualizar Lista
      </button>
    </div>
  );
};

export default AdminPanel;
