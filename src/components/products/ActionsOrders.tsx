"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { PedidoEstado } from "@/lib/enums/enums";

interface IActionsOrders {
  id: string;
  status: PedidoEstado;
}

const ActionsOrders = ({ id, status }: IActionsOrders) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/pedidos/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: PedidoEstado.CONFIRMADO,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al confirmar el pedido");
      }

      toast.success("¡Pedido confirmado exitosamente!", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#10B981",
          color: "#fff",
        },
      });

      // Opcional: Recargar la página o actualizar el estado
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocurrió un error al confirmar el pedido", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleConfirm}
      disabled={isLoading || status === PedidoEstado.CONFIRMADO}
      className={`px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isLoading
        ? "Confirmando..."
        : status === PedidoEstado.CONFIRMADO
        ? "Pedido Confirmado"
        : "Confirmar Pedido"}
    </button>
  );
};

export default ActionsOrders;
