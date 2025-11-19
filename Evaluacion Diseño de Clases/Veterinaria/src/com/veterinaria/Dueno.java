package com.veterinaria;

public class Dueno {
    private String nombreCompleto;
    private String documento;
    private String telefono;

    public Dueno() {}

    public Dueno(String nombreCompleto, String documento, String telefono) {
        this.nombreCompleto = nombreCompleto;
        this.documento = documento;
        this.telefono = telefono;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }
    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }
    public String getDocumento() {
        return documento;
    }
    public void setDocumento(String documento) {
        this.documento = documento;
    }
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public void registrarDueno() {
        System.out.println("Registrando Dueño:");
        System.out.println("  Nombre: " + nombreCompleto);
        System.out.println("  Documento: " + documento);
        System.out.println("  Teléfono: " + telefono);
    }

    @Override
    public String toString() {
        return nombreCompleto + " (" + documento + ")";
    }
}
