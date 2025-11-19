package com.veterinaria;

import java.util.*;

public class SistemaVeterinaria {

    private Map<String, Dueno> duenios = new HashMap<>(); 
    private Map<String, Mascota> mascotas = new HashMap<>();

    public SistemaVeterinaria() {}

    public Map<String, Dueno> getDuenios() {
        return duenios;
    }
    public Map<String, Mascota> getMascotas() {
        return mascotas;
    }

    private boolean esValidoString(String s) {
        return s != null && !s.isBlank();
    }

    public boolean registrarDueno(Dueno d) {
        if (d == null || !esValidoString(d.getNombreCompleto())
                || !esValidoString(d.getDocumento())
                || !esValidoString(d.getTelefono())) {
            System.out.println("Error: campos obligatorios de dueño incompletos.");
            return false;
        }
        if (duenios.containsKey(d.getDocumento())) {
            System.out.println("Advertencia: el dueño con documento " + d.getDocumento() + " ya está registrado. Se actualizan datos.");
        }
        duenios.put(d.getDocumento(), d);
        d.registrarDueno();
        return true;
    }

    public boolean registrarMascota(Mascota m) {
        if (m == null || !esValidoString(m.getNombre()) || !esValidoString(m.getEspecie())
                || m.getEdad() < 0 || m.getDueno() == null || !esValidoString(m.getDueno().getDocumento())) {
            System.out.println("Error: campos obligatorios de mascota incompletos.");
            return false;
        }
        String doc = m.getDueno().getDocumento();
        if (!duenios.containsKey(doc)) {
            System.out.println("Error: el dueño con documento " + doc + " no está registrado. Registra el dueño primero.");
            return false;
        }
        String clave = doc + "|" + m.getNombre().toLowerCase().trim();
        if (mascotas.containsKey(clave)) {
            System.out.println("Error: ya existe una mascota con nombre '" + m.getNombre() + "' para el dueño con documento " + doc);
            return false;
        }
        mascotas.put(clave, m);
        m.registrarMascota();
        return true;
    }

    public boolean registrarControlVeterinario(String documentoDueno, String nombreMascota, ControlVeterinario c) {
        if (!esValidoString(documentoDueno) || !esValidoString(nombreMascota) || c == null) {
            System.out.println("Error: datos incompletos para registrar control.");
            return false;
        }
        String clave = documentoDueno + "|" + nombreMascota.toLowerCase().trim();
        if (!mascotas.containsKey(clave)) {
            System.out.println("Error: la mascota '" + nombreMascota + "' para el dueño con documento " + documentoDueno + " no existe.");
            return false;
        }
        if (c.getFecha() == null || c.getTipoControl() == null || c.getTipoControl().isEmpty()) {
            System.out.println("Error: los campos obligatorios del control (fecha y tipoControl al menos uno) están incompletos.");
            return false;
        }
        Mascota m = mascotas.get(clave);
        c.setMascota(m);
        m.agregarControl(c);
        c.registrarControlVeterinario();
        System.out.println("Control registrado para mascota '" + nombreMascota + "' del dueño " + documentoDueno);
        return true;
    }

    public String historialMedico(String documentoDueno, String nombreMascota) {
        String clave = documentoDueno + "|" + nombreMascota.toLowerCase().trim();
        if (!mascotas.containsKey(clave)) {
            return "No existe la mascota '" + nombreMascota + "' para el dueño " + documentoDueno;
        }
        Mascota m = mascotas.get(clave);
        return m.historialControles();
    }

    public String generarResumen(String documentoDueno, String nombreMascota) {
        String clave = documentoDueno + "|" + nombreMascota.toLowerCase().trim();
        if (!mascotas.containsKey(clave)) {
            return "No existe la mascota '" + nombreMascota + "' para el dueño " + documentoDueno;
        }
        Mascota m = mascotas.get(clave);
        return m.generarResumen();
    }
}
