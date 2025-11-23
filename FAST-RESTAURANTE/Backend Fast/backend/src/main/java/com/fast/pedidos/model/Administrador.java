package com.fast.pedidos.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "administradores")
public class Administrador extends Usuario {
    private String rol;
}