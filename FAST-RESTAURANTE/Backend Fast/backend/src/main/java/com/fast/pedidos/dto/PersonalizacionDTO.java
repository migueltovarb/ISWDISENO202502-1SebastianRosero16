package com.fast.pedidos.dto;

import com.fast.pedidos.model.Tamaño;
import lombok.Data;
import java.util.List;

@Data
public class PersonalizacionDTO {
    private Tamaño tamaño;
    private List<String> ingredientesExtra;
    private List<String> ingredientesRemover;
}