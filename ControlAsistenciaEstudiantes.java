package EjercicioJava;

import java.util.Scanner;

public class ControlAsistenciaEstudiantes {

	private static final int DIAS_SEMANA = 5;
    private static final int NUM_ESTUDIANTES = 4;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String[][] asistencia = new String[NUM_ESTUDIANTES][DIAS_SEMANA];
        int[] totalAsistencias = new int[NUM_ESTUDIANTES]; 
        boolean salir = false;

        capturarAsistencia(scanner, asistencia, totalAsistencias);

        while (!salir) {
            System.out.println("\nMenu Principal:");
            System.out.println("1. Ver asistencia individual");
            System.out.println("2. Ver resumen general");
            System.out.println("3. Volver a registrar");
            System.out.println("4. Salir");
            System.out.print("Seleccione una opcion: ");
            int opcion = scanner.nextInt();

            switch (opcion) {
                case 1:
                    for (int i = 0; i < NUM_ESTUDIANTES; i++) {
                        System.out.print("Asistencia del estudiante " + (i + 1) + ": ");
                        for (int j = 0; j < DIAS_SEMANA; j++) {
                            System.out.print(asistencia[i][j] + " ");
                        }
                        System.out.println();
                    }
                    break;

                case 2:
                    for (int i = 0; i < NUM_ESTUDIANTES; i++) {
                        System.out.println("Estudiante " + (i + 1) + ": " + totalAsistencias[i] + " asistencias.");
                    }
                    System.out.println("Estudiantes que asistieron todos los dias:");
                    for (int i = 0; i < NUM_ESTUDIANTES; i++) {
                        if (totalAsistencias[i] == DIAS_SEMANA) {
                            System.out.println("Estudiante " + (i + 1));
                        }
                    }
                    int[] ausenciasPorDia = new int[DIAS_SEMANA];
                    for (int j = 0; j < DIAS_SEMANA; j++) {
                        for (int i = 0; i < NUM_ESTUDIANTES; i++) {
                            if (asistencia[i][j].equals("A")) {
                                ausenciasPorDia[j]++;
                            }
                        }
                    }
                    int maxAusencias = 0;
                    for (int j = 0; j < DIAS_SEMANA; j++) {
                        if (ausenciasPorDia[j] > maxAusencias) {
                            maxAusencias = ausenciasPorDia[j];
                        }
                    }
                    System.out.println("Dias con mayor numero de ausencias:");
                    for (int j = 0; j < DIAS_SEMANA; j++) {
                        if (ausenciasPorDia[j] == maxAusencias) {
                            System.out.println("Dia " + (j + 1) + ": " + maxAusencias + " ausencias.");
                        }
                    }
                    break;

                case 3:
                    System.out.println("Se esta reiniciando el registro de asistencia...");
                    capturarAsistencia(scanner, asistencia, totalAsistencias);
                    break;

                case 4:
                    salir = true;
                    System.out.println("Saliendo del programa.");
                    break;

                default:
                    System.out.println("Error. Intente de nuevo.");
            }
        }

        scanner.close();
    }

    private static void capturarAsistencia(Scanner scanner, String[][] asistencia, int[] totalAsistencias) {
        for (int i = 0; i < NUM_ESTUDIANTES; i++) {
            System.out.println("Registro de asistencia para el estudiante " + (i + 1) + ":");
            for (int j = 0; j < DIAS_SEMANA; j++) {
                String estado;
                do {
                    System.out.print("Día " + (j + 1) + " (P/A): ");
                    estado = scanner.next().toUpperCase();
                } while (!estado.equals("P") && !estado.equals("A"));
                asistencia[i][j] = estado;
                if (estado.equals("P")) {
                    totalAsistencias[i]++;
                }
            }
        }
    }
}
