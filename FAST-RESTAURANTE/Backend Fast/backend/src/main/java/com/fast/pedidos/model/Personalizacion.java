package com.fast.pedidos.model;

import lombok.Data;
import java.util.List;

@Data
public class Personalizacion {
    private Tamaño tamaño;
    private List<String> ingredientesExtra;
    private List<String> ingredientesRemover;
    
    public Double calcularCostoAdicional() {
        Double costo = 0.0;
        
        // Precios en COP (Pesos Colombianos)
        if (tamaño != null) {
            if (tamaño == Tamaño.MEDIANO) {
                costo += 3000.0;
            } else if (tamaño == Tamaño.GRANDE) {
                costo += 5000.0;
            }
        }
        
        // Cada ingrediente extra cuesta $2.000 COP
        if (ingredientesExtra != null) {
            costo += ingredientesExtra.size() * 2000.0;
        }
        
        return costo;
    }
}