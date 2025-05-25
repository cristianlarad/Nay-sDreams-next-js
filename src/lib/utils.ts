import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatea un número como una cantidad de dinero
 * @param amount - La cantidad a formatear
 * @param currency - La moneda a mostrar (por defecto: 'PEN' para Soles Peruanos)
 * @returns La cantidad formateada como string
 */
export function formatAmount(amount: number, currency: string = "USD"): string {
  const formatter = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
}

/**
 * Formatea un número con separadores de miles
 * @param number - El número a formatear
 * @returns El número formateado como string con separadores de miles
 */
export function formatNumber(number: number): string {
  return new Intl.NumberFormat("es-PE").format(number);
}
