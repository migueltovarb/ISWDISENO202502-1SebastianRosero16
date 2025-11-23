package com.fast.pedidos.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "pedidos")
public class Pedido {
    @Id
    private String idPedido;
    private String clienteId;
    private String clienteCorreo;
    private List<ItemPedido> items;
    private Double total;
    private EstadoPedido estado;
    private TipoEntrega tipoEntrega;
    private String direccionEntrega;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    
    public void calcularTotal() {
        this.total = items.stream()
            .mapToDouble(ItemPedido::getSubtotal)
            .sum();
    }
}