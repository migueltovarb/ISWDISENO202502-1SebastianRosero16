package com.fast.pedidos.dto;

import com.fast.pedidos.model.TipoEntrega;
import lombok.Data;
import java.util.List;

@Data
public class PedidoDTO {
    private String clienteId;
    private String clienteCorreo;
    private List<ItemPedidoDTO> items;
    private TipoEntrega tipoEntrega;
    private String direccionEntrega;
}