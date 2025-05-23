// Estado actual del pedido
export enum PedidoEstado {
  // eslint-disable-next-line no-unused-vars
  PENDIENTE = "1",

  // eslint-disable-next-line no-unused-vars
  CONFIRMADO = "2",

  // eslint-disable-next-line no-unused-vars
  EN_PROCESO = "3",

  // eslint-disable-next-line no-unused-vars
  ENTREGADO = "4",

  // eslint-disable-next-line no-unused-vars
  CANCELADO = "5",
}

// Mapeo de estados a texto legible
export const ESTADOS_PEDIDO = {
  [PedidoEstado.PENDIENTE]: "Pendiente",
  [PedidoEstado.CONFIRMADO]: "Confirmado",
  [PedidoEstado.EN_PROCESO]: "En proceso",
  [PedidoEstado.ENTREGADO]: "Entregado",
  [PedidoEstado.CANCELADO]: "Cancelado",
} as const;

// Tipo para el estado del pedido
export type EstadoPedido = keyof typeof ESTADOS_PEDIDO;

// Función para obtener el texto de un estado
export function obtenerTextoEstado(estado: string): string {
  return ESTADOS_PEDIDO[estado as PedidoEstado] || "Desconocido";
}

// Colores para cada estado
export const COLOR_ESTADO = {
  [PedidoEstado.PENDIENTE]: "bg-yellow-100 text-yellow-800",
  [PedidoEstado.CONFIRMADO]: "bg-blue-100 text-blue-800",
  [PedidoEstado.EN_PROCESO]: "bg-purple-100 text-purple-800",
  [PedidoEstado.ENTREGADO]: "bg-green-100 text-green-800",
  [PedidoEstado.CANCELADO]: "bg-red-100 text-red-800",
} as const;
