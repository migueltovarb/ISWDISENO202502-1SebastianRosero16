package com.fast.pedidos.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "clientes")
public class Cliente extends Usuario {
    private String direccion;
    private List<String> historialPedidos;
}