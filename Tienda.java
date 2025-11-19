package ejercicioTienda;

import java.util.Scanner;

public class Tienda {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        final double DESC_ROPA = 0.10;
        final double DESC_TECNO = 0.15;
        final double DESC_ALIM = 0.05;
        final double UMBRAL = 500000.0;
        final double DESC_ADIC = 0.05;

        int productos = 0;
        while (productos < 1) {
            System.out.print("Ingresar el numero de productos a comprar (minimo 1): ");
            productos = sc.nextInt();
        }

        double[] precios = new double[productos];
        int[] tipos = new int[productos];
        sc.nextLine();

        for (int i = 0; i < productos; i++) {
            System.out.println("\nProducto: # " + (i + 1));
            System.out.print("Nombre del producto: ");
            String nombre = sc.nextLine();
            int tipo = 0;
            while (tipo < 1 || tipo > 3) {
                System.out.print("Tipo (1: ropa, 2: tecnología, 3: alimentos): ");
                tipo = sc.nextInt();
            }
            tipos[i] = tipo;
            double precio = -1;
            while (precio < 0) {
                System.out.print("Precio (valor positivo): ");
                precio = sc.nextDouble();
            }
            precios[i] = precio;
            sc.nextLine();
        }

        double totalSinDescuento = 0.0;
        double totalConDescuento = 0.0;

        for (int i = 0; i < productos; i++) {
            totalSinDescuento += precios[i];
            double tasa = 0.0;
            switch (tipos[i]) {
                case 1: tasa = DESC_ROPA; break;
                case 2: tasa = DESC_TECNO; break;
                case 3: tasa = DESC_ALIM; break;
            }
            double precioConDesc = precios[i] * (1 - tasa);
            totalConDescuento += precioConDesc;
        }

        if (totalSinDescuento > UMBRAL) {
            totalConDescuento = totalConDescuento * (1 - DESC_ADIC);
        }

        double ahorro = totalSinDescuento - totalConDescuento;

        System.out.printf("\nTotal sin descuento: $%.2f%n", totalSinDescuento);
        System.out.printf("Total con descuento: $%.2f%n", totalConDescuento);
        System.out.printf("Ahorro: $%.2f%n", ahorro);

        sc.close();
    }
}
