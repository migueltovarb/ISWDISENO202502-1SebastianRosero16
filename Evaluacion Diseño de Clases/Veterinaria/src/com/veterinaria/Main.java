package com.veterinaria;

import java.util.*;

public class Main {
    private static final Scanner scanner = new Scanner(System.in);
    private static final SistemaVeterinaria sistema = new SistemaVeterinaria();

    public static void main(String[] args) {
        boolean salir = false;

        while (!salir) {
            mostrarMenu();
            System.out.print("Seleccione una opción: ");
            String opcion = scanner.nextLine().trim();

            switch (opcion) {
                case "1":
                    registrarDuenoInteractivo();
                    break;
                case "2":
                    registrarMascotaInteractivo();
                    break;
                case "3":
                    registrarControlInteractivo();
                    break;
                case "4":
                    mostrarHistorial();
                    break;
                case "5":
                    mostrarResumen();
                    break;
                case "6":
                    System.out.println("👋 Saliendo del sistema...");
                    salir = true;
                    break;
                default:
                    System.out.println("⚠️ Opción no válida. Intenta de nuevo.");
            }
            System.out.println();
        }

        scanner.close();
    }

    private static void mostrarMenu() {
        System.out.println("======= 🐾 SISTEMA VETERINARIO 🐾 =======");
        System.out.println("1. Registrar dueño");
        System.out.println("2. Registrar mascota");
        System.out.println("3. Registrar control veterinario");
        System.out.println("4. Ver historial médico de una mascota");
        System.out.println("5. Generar resumen de una mascota");
        System.out.println("6. Salir");
        System.out.println("==========================================");
    }


    private static void registrarDuenoInteractivo() {
        System.out.println("\n--- Registro de Dueño ---");

        System.out.print("Nombre completo: ");
        String nombre = scanner.nextLine().trim();

        System.out.print("Documento: ");
        String documento = scanner.nextLine().trim();

        System.out.print("Teléfono: ");
        String telefono = scanner.nextLine().trim();

        Dueno dueno = new Dueno(nombre, documento, telefono);
        sistema.registrarDueno(dueno);
    }


    private static void registrarMascotaInteractivo() {
        System.out.println("\n--- Registro de Mascota ---");

        System.out.print("Documento del dueño: ");
        String documento = scanner.nextLine().trim();
        Dueno dueno = sistema.getDuenios().get(documento);

        if (dueno == null) {
            System.out.println("❌ Dueño no registrado. Registre primero al dueño.");
            return;
        }

        System.out.print("Nombre de la mascota: ");
        String nombre = scanner.nextLine().trim();

        System.out.print("Especie: ");
        String especie = scanner.nextLine().trim();

        System.out.print("Edad (en años): ");
        String edadStr = scanner.nextLine().trim();
        int edad;
        try {
            edad = Integer.parseInt(edadStr);
        } catch (NumberFormatException e) {
            System.out.println("⚠️ Edad inválida.");
            return;
        }

        Mascota mascota = new Mascota(nombre, especie, edad, dueno);
        sistema.registrarMascota(mascota);
    }


    private static void registrarControlInteractivo() {
        System.out.println("\n--- Registro de Control Veterinario ---");

        System.out.print("Documento del dueño: ");
        String documento = scanner.nextLine().trim();

        System.out.print("Nombre de la mascota: ");
        String nombreMascota = scanner.nextLine().trim();


        String clave = documento + "|" + nombreMascota.toLowerCase().trim();
        if (!sistema.getMascotas().containsKey(clave)) {
            System.out.println("❌ Mascota no encontrada. Registre primero la mascota.");
            return;
        }


        Date fecha = new Date();

        List<TipoControl> tipos = new ArrayList<>();
        boolean agregarMas = true;
        while (agregarMas) {
            System.out.print("Ingrese nombre del tipo de control (Ej: Vacuna): ");
            String nombreTipo = scanner.nextLine().trim();
            System.out.print("Descripción: ");
            String desc = scanner.nextLine().trim();

            tipos.add(new TipoControl(nombreTipo, desc));

            System.out.print("¿Agregar otro tipo de control? (s/n): ");
            String r = scanner.nextLine().trim().toLowerCase();
            agregarMas = r.equals("s");
        }

        System.out.print("Observaciones: ");
        String observaciones = scanner.nextLine().trim();

        ControlVeterinario control = new ControlVeterinario(fecha, tipos, observaciones, null);
        sistema.registrarControlVeterinario(documento, nombreMascota, control);
    }

    private static void mostrarHistorial() {
        System.out.println("\n--- Historial Médico ---");
        System.out.print("Documento del dueño: ");
        String documento = scanner.nextLine().trim();

        System.out.print("Nombre de la mascota: ");
        String nombreMascota = scanner.nextLine().trim();

        String historial = sistema.historialMedico(documento, nombreMascota);
        System.out.println(historial);
    }


    private static void mostrarResumen() {
        System.out.println("\n--- Resumen de Mascota ---");
        System.out.print("Documento del dueño: ");
        String documento = scanner.nextLine().trim();

        System.out.print("Nombre de la mascota: ");
        String nombreMascota = scanner.nextLine().trim();

        String resumen = sistema.generarResumen(documento, nombreMascota);
        System.out.println(resumen);
    }
}
