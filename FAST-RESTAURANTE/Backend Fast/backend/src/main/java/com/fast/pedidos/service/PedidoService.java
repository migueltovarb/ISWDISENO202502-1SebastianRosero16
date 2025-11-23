package com.fast.pedidos.service;

import com.fast.pedidos.dto.PedidoDTO;
import com.fast.pedidos.dto.ItemPedidoDTO;
import com.fast.pedidos.model.*;
import com.fast.pedidos.repository.PedidoRepository;
import com.fast.pedidos.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {
    
    @Autowired
    private PedidoRepository pedidoRepository;
    
    @Autowired
    private ProductoRepository productoRepository;
    
    @Autowired
    private NotificacionService notificacionService;
    
    public String crearPedido(PedidoDTO pedidoDTO) {
        Pedido pedido = new Pedido();
        pedido.setClienteId(pedidoDTO.getClienteId());
        pedido.setClienteCorreo(pedidoDTO.getClienteCorreo());
        pedido.setEstado(EstadoPedido.PENDIENTE);
        pedido.setTipoEntrega(pedidoDTO.getTipoEntrega());
        pedido.setDireccionEntrega(pedidoDTO.getDireccionEntrega());
        pedido.setFechaCreacion(LocalDateTime.now());
        pedido.setFechaActualizacion(LocalDateTime.now());
        
        List<ItemPedido> items = new ArrayList<>();
        for (ItemPedidoDTO itemDTO : pedidoDTO.getItems()) {
            Optional<Producto> productoOpt = productoRepository.findById(itemDTO.getIdProducto());
            
            if (productoOpt.isEmpty()) {
                throw new RuntimeException("Producto no encontrado: " + itemDTO.getIdProducto());
            }
            
            Producto producto = productoOpt.get();
            
            if (!producto.getDisponible()) {
                throw new RuntimeException("Producto no disponible: " + producto.getNombre());
            }
            
            ItemPedido item = new ItemPedido();
            item.setIdProducto(producto.getIdProducto());
            item.setNombreProducto(producto.getNombre());
            item.setCantidad(itemDTO.getCantidad());
            item.setPrecioUnitario(producto.getPrecio());
            item.setPersonalizacion(itemDTO.getPersonalizacion());
            item.calcularSubtotal();
            
            items.add(item);
        }
        
        pedido.setItems(items);
        pedido.calcularTotal();
        
        Pedido pedidoGuardado = pedidoRepository.save(pedido);
        
        return pedidoGuardado.getIdPedido();
    }
    
    public List<Pedido> obtenerTodos() {
        return pedidoRepository.findAll();
    }
    
    public Optional<Pedido> obtenerPorId(String id) {
        return pedidoRepository.findById(id);
    }
    
    public List<Pedido> obtenerPorEstado(EstadoPedido estado) {
        return pedidoRepository.findByEstado(estado);
    }
    
    public void actualizarEstado(String id, EstadoPedido nuevoEstado) {
        Optional<Pedido> pedidoOpt = pedidoRepository.findById(id);
        
        if (pedidoOpt.isEmpty()) {
            throw new RuntimeException("Pedido no encontrado: " + id);
        }
        
        Pedido pedido = pedidoOpt.get();
        pedido.setEstado(nuevoEstado);
        pedido.setFechaActualizacion(LocalDateTime.now());
        
        pedidoRepository.save(pedido);
        
        // Enviar notificación para CUALQUIER cambio de estado
        notificacionService.enviarNotificacion(pedido);
    }
}