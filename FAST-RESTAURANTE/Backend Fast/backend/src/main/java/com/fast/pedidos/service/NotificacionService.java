package com.fast.pedidos.service;

import com.fast.pedidos.model.Pedido;
import com.fast.pedidos.model.EstadoPedido;
import org.springframework.stereotype.Service;

@Service
public class NotificacionService {
    
    public void enviarNotificacion(Pedido pedido) {
        String mensaje = generarMensaje(pedido.getEstado());
        
        System.out.println("\n=====================================");
        System.out.println("📧 [NOTIFICACIÓN] → " + pedido.getClienteCorreo());
        System.out.println("📝 Mensaje: " + mensaje);
        System.out.println("🆔 Pedido ID: " + pedido.getIdPedido());
        System.out.println("=====================================\n");
    }
    
    private String generarMensaje(EstadoPedido estado) {
        return switch (estado) {
            case PENDIENTE -> "Tu pedido ha sido recibido y está pendiente de confirmación";
            case EN_PREPARACION -> "Tu pedido está en preparación";
            case LISTO -> "Tu pedido está listo para recoger";
            case ENVIADO -> "Tu pedido ha sido enviado";
            case ENTREGADO -> "Tu pedido ha sido entregado. ¡Buen provecho!";
        };
    }
}