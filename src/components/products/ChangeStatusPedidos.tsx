"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

import { PedidoEstado } from "@/lib/enums/enums";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface IChangeStatusPedidos {
  id: string;
  initialStatus?: PedidoEstado;
}

const ChangeStatusPedidos = ({
  id,
  initialStatus = PedidoEstado.CONFIRMADO,
}: IChangeStatusPedidos) => {
  const [status, setStatus] = useState<PedidoEstado>(initialStatus);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChangeStatus = async (value: PedidoEstado) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/pedidos/changeStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: value,
          id,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el estado");
      }

      setStatus(value);
      toast.success("Estado actualizado correctamente");
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al actualizar el estado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-w-[180px]">
      <Select
        value={status}
        onValueChange={handleChangeStatus}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccionar estado" />
        </SelectTrigger>
        <SelectContent defaultValue={initialStatus}>
          <SelectItem value={PedidoEstado.CONFIRMADO}>Confirmado</SelectItem>
          <SelectItem value={PedidoEstado.EN_PROCESO}>En Proceso</SelectItem>
          <SelectItem value={PedidoEstado.ENTREGADO}>Entregado</SelectItem>
          <SelectItem value={PedidoEstado.CANCELADO}>Cancelado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ChangeStatusPedidos;
