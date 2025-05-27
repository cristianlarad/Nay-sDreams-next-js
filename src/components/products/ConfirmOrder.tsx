import { format } from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { obtenerTextoEstado } from "@/lib/enums/enums";
import { getPocketBase } from "@/lib/pocketbase";

import ActionsOrders from "./ActionsOrders";
import ChangeStatusPedidos from "./ChangeStatusPedidos";
interface IConfirmOrder {
  pedidoId: string;
}

const ConfirmOrder = async ({ pedidoId }: IConfirmOrder) => {
  const pb = await getPocketBase();

  try {
    const pedido = await pb
      .collection("pedido")
      .getFirstListItem(`pedidoId="${pedidoId}"`);

    const fecha = new Date(pedido.created);
    const fechaFormateada = format(fecha, "PPPpp", { locale: es });

    return (
      <div className="w-auto mx-auto">
        <div className="bg-white rounded-xl shadow-md">
          {/* Encabezado */}
          <div className="bg-pink-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Pedido</h1>
              </div>
              <div className="bg-white text-pink-600 px-4 py-2 rounded-full text-sm font-semibold">
                {obtenerTextoEstado(pedido.status)}
              </div>
            </div>
          </div>
          <Image
            src={pedido.imageUrl}
            alt={pedido.productTitle}
            width={500}
            height={500}
            className="w-full h-48 object-cover"
          />
          {/* Información del pedido */}
          <div className="p-6 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Información del Pedido
              </h2>
              <div className="space-y-3">
                <div className="grid md:flex justify-between">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="font-medium">{fechaFormateada}</span>
                </div>
                <div className="grid md:flex justify-between">
                  <span className="text-gray-600">Producto:</span>
                  <span className="font-medium">{pedido.productTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cantidad:</span>
                  <span className="font-medium">{pedido.quantity}</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
                  <span>Total:</span>
                  <span className="text-pink-600">
                    ${parseFloat(pedido.total).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Detalles adicionales */}
              {pedido.aditional && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Notas adicionales:
                  </h3>
                  <p className="bg-gray-50 p-3 rounded-lg text-gray-600">
                    {pedido.aditional}
                  </p>
                </div>
              )}
            </div>

            {/* Información del cliente */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Información del Cliente
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600">Nombre</p>
                  <p className="font-medium">
                    {pedido.user?.name || "No especificado"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">
                    {pedido.user?.email || "No especificado"}
                  </p>
                </div>
                {pedido.user?.phone && (
                  <div>
                    <p className="text-gray-600">Teléfono</p>
                    <p className="font-medium">{pedido.user.phone}</p>
                  </div>
                )}
              </div>

              {/* Imagen de referencia */}
              {pedido.selectedImage && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Imagen de referencia:
                  </h3>
                  <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={pedido.selectedImage}
                      alt="Referencia del pedido"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Acciones */}
          <div className="bg-gray-50 grid py-4 md:flex md:justify-end md:space-x-4 space-y-4 px-4 border-t">
            <ChangeStatusPedidos id={pedido.id} initialStatus={pedido.status} />
            <ActionsOrders id={pedido.id} status={pedido.status} />
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.error("Error al obtener el pedido:", err);
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Pedido no encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            No se pudo encontrar el pedido con ID: {pedidoId}
          </p>
          <Link
            href="/admin/pedidos"
            className="inline-block px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Volver a la lista de pedidos
          </Link>
        </div>
      </div>
    );
  }
};

export default ConfirmOrder;
