
export function formatCOP(value) {
  // Redondea hacia arriba y muestra sin decimales, con separador de miles
  const number = Math.round(Number(value) || 0);
  const fmt = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  return fmt.format(number);
}

export default formatCOP;
