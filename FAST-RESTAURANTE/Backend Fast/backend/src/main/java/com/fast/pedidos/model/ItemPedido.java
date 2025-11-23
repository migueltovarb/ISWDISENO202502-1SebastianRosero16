package com.fast.pedidos.model;

import lombok.Data;

@Data
public class ItemPedido {
    private String idProducto;
    private String nombreProducto;
    private Integer cantidad;
    private Double precioUnitario;
    private Personalizacion personalizacion;
    private Double subtotal;
    
    public void calcularSubtotal() {
        Double precioBase = precioUnitario;
        if (personalizacion != null) {
            precioBase += personalizacion.calcularCostoAdicional();
        }
        this.subtotal = precioBase * cantidad;
    }
}