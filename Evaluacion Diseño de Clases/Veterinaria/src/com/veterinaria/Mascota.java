package com.veterinaria;

import java.util.ArrayList;
import java.util.List;

public class Mascota {
    private String nombre;
    private String especie;
    private int edad;
    private Dueno dueno;
    private List<ControlVeterinario> controles = new ArrayList<>();

    public Mascota() {}

    public Mascota(String nombre, String especie, int edad, Dueno dueno) {
        this.nombre = nombre;
        this.especie = especie;
        this.edad = edad;
        this.dueno = dueno;
    }

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getEspecie() {
        return especie;
    }
    public void setEspecie(String especie) {
        this.especie = especie;
    }
    public int getEdad() {
        return edad;
    }
    public void setEdad(int edad) {
        this.edad = edad;
    }
    public Dueno getDueno() {
        return dueno;
    }
    public void setDueno(Dueno dueno) {
        this.dueno = dueno;
    }
    public List<ControlVeterinario> getControles() {
        return controles;
    }
    public void setControles(List<ControlVeterinario> controles) {
        this.controles = controles;
    }

    public void agregarControl(ControlVeterinario control) {
        controles.add(control);
    }

    public void registrarMascota() {
        System.out.println("Registrando Mascota:");
        System.out.println("  Nombre: " + nombre);
        System.out.println("  Especie: " + especie);
        System.out.println("  Edad: " + edad);
        System.out.println("  Dueño: " + (dueno != null ? dueno.getNombreCompleto() : "N/A"));
    }

    public String historialControles() {
        if (controles.isEmpty()) {
            return "No hay controles registrados para " + nombre;
        }
        StringBuilder sb = new StringBuilder();
        sb.append("Historial de controles para ").append(nombre).append(":\n");
        int i = 1;
        for (ControlVeterinario c : controles) {
            sb.append(i++).append(") ").append(c.toString()).append("\n");
        }
        return sb.toString();
    }

    public String generarResumen() {
        return "Resumen Mascota: " + nombre + " - " + especie + " - Controles realizados: " + controles.size();
    }

    @Override
    public String toString() {
        return nombre + " (" + especie + ")";
    }
}
