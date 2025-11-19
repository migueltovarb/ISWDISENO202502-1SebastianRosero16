package com.veterinaria;

import java.util.Date;
import java.util.List;
import java.text.SimpleDateFormat;

public class ControlVeterinario {
    private Date fecha;
    private List<TipoControl> tipoControl; 
    private String observaciones;
    private Mascota mascota;

    public ControlVeterinario() {}

    public ControlVeterinario(Date fecha, List<TipoControl> tipoControl, String observaciones, Mascota mascota) {
        this.fecha = fecha;
        this.tipoControl = tipoControl;
        this.observaciones = observaciones;
        this.mascota = mascota;
    }

    public Date getFecha() {
        return fecha;
    }
    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }
    public List<TipoControl> getTipoControl() {
        return tipoControl;
    }
    public void setTipoControl(List<TipoControl> tipoControl) {
        this.tipoControl = tipoControl;
    }
    public String getObservaciones() {
        return observaciones;
    }
    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
    public Mascota getMascota() {
        return mascota;
    }
    public void setMascota(Mascota mascota) {
        this.mascota = mascota;
    }

    public void registrarControlVeterinario() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String fechaStr = (fecha != null ? sdf.format(fecha) : "N/A");
        System.out.println("Registrando Control Veterinario:");
        System.out.println("  Fecha: " + fechaStr);
        System.out.println("  Mascota: " + (mascota != null ? mascota.getNombre() : "N/A"));
        System.out.print("  Tipos: ");
        if (tipoControl != null && !tipoControl.isEmpty()) {
            for (int i = 0; i < tipoControl.size(); i++) {
                System.out.print(tipoControl.get(i).getNombre());
                if (i < tipoControl.size()-1) System.out.print(", ");
            }
            System.out.println();
        } else {
            System.out.println("N/A");
        }
        System.out.println("  Observaciones: " + (observaciones != null ? observaciones : ""));
    }

    @Override
    public String toString() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String fechaStr = (fecha != null ? sdf.format(fecha) : "N/A");
        StringBuilder tipos = new StringBuilder();
        if (tipoControl != null && !tipoControl.isEmpty()) {
            for (int i = 0; i < tipoControl.size(); i++) {
                tipos.append(tipoControl.get(i).getNombre());
                if (i < tipoControl.size()-1) tipos.append(", ");
            }
        } else {
            tipos.append("N/A");
        }
        return fechaStr + " - " + tipos.toString() + " - " + (observaciones != null ? observaciones : "");
    }
}
