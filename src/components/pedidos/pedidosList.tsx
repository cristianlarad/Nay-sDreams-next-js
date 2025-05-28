"use client";

import { RiOrderPlayFill } from "@remixicon/react";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

import { formatAmount } from "@/lib/utils";
import { IPedidos } from "@/types/pedidos";

import { ListDataTable } from "../data-table/ListDataTable";
import FormatDate from "../formatDate";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import { Button } from "../ui/button";

import StatusType from "./StatusType";

const column: ColumnDef<IPedidos, unknown>[] = [
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/comfirm/${row.original.pedidoId}`}>
              <Button variant="ghost" size="icon">
                <RiOrderPlayFill />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ver Pedido</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/products/${row.original.productId}`}>
              <Button variant="ghost" size="icon">
                <ShoppingBagIcon />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ver Producto</p>
          </TooltipContent>
        </Tooltip>
      </div>
    ),
  },
  {
    accessorKey: "imageUrl",
    header: "Imagen",
    cell: ({ row }) => (
      <div>
        <img
          src={row.original.imageUrl}
          alt={row.original.productTitle}
          className="w-20 h-20 object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "productTitle",
    header: "Titulo",
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
  },
  {
    accessorKey: "user.name",
    header: "Nombre",
  },

  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => <StatusType status={row.original.status} />,
  },
  {
    accessorKey: "created",
    header: "Fecha",
    cell: ({ row }) => <FormatDate date={row.original.created} />,
  },
  {
    accessorKey: "total",
    header: () => <span className="flex justify-end">Total</span>,
    cell: ({ row }) => (
      <div className="flex justify-end">{formatAmount(row.original.total)}</div>
    ),
  },
];

interface IPedidosList {
  pedidos: IPedidos[];
}

const PedidosList = ({ pedidos }: IPedidosList) => {
  return (
    console.log(pedidos),
    (
      <div>
        <Link href="/addPedido">
          <Button variant="link">
            <Plus />
            Agregar un pedido
          </Button>
        </Link>
        <ListDataTable columns={column} data={pedidos ?? []} />
        <div>
          Total :{" "}
          {formatAmount(
            pedidos.reduce((total, pedido) => total + pedido.total, 0)
          )}
        </div>
      </div>
    )
  );
};

export default PedidosList;
