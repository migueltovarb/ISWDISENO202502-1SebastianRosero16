package com.fast.pedidos.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public abstract class Usuario {
    @Id
    private String idUsuario;
    private String nombreCompleto;
    private String correo;
    private String telefono;
}