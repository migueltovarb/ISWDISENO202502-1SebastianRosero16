package com.fast.pedidos.dto;

import com.fast.pedidos.model.Personalizacion;
import lombok.Data;

@Data
public class ItemPedidoDTO {
    private String idProducto;
    private Integer cantidad;
    private Personalizacion personalizacion;
}