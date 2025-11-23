import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productoService = {
  obtenerMenuDisponible: async () => {
    const response = await api.get('/productos/menu');
    return response.data;
  },

  obtenerTodos: async () => {
    const response = await api.get('/productos');
    return response.data;
  },
};

export const pedidoService = {
  crearPedido: async (pedidoData) => {
    const response = await api.post('/pedidos', pedidoData);
    return response.data;
  },

  obtenerTodos: async () => {
    const response = await api.get('/pedidos');
    return response.data;
  },

  obtenerPorId: async (id) => {
    const response = await api.get(`/pedidos/${id}`);
    return response.data;
  },

  obtenerPorEstado: async (estado) => {
    const response = await api.get(`/pedidos/estado/${estado}`);
    return response.data;
  },

  actualizarEstado: async (id, estado) => {
    const response = await api.put(`/pedidos/${id}/estado`, null, {
      params: { estado }
    });
    return response.data;
  },
};

export default api;
