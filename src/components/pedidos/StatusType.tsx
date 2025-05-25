import React from "react";

import { obtenerTextoEstado, PedidoEstado } from "@/lib/enums/enums";
import { cn } from "@/lib/utils";

interface IStatusType {
  status: PedidoEstado;
}

const StatusType = ({ status }: IStatusType) => {
  return (
    <div
      className={cn(" text-sm font-semibold", {
        "text-green-600": status === PedidoEstado.CONFIRMADO,
        "text-yellow-600": status === PedidoEstado.EN_PROCESO,
        "text-blue-600": status === PedidoEstado.ENTREGADO,
        "text-red-600": status === PedidoEstado.CANCELADO,
      })}
    >
      {obtenerTextoEstado(status)}
    </div>
  );
};

export default StatusType;
