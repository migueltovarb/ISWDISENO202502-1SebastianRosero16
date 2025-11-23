package com.fast.pedidos.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "productos")
public class Producto {
    @Id
    private String idProducto;
    private String nombre;
    private String descripcion;
    private Double precio;
    private Boolean disponible;
    private List<String> ingredientes;
}