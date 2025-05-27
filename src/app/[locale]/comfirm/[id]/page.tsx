import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/app/[locale]/actions/auth";
import ConfirmOrder from "@/components/products/ConfirmOrder";

export const metadata: Metadata = {
  title: "Confirmar - Nay's Dreams",
  description: "Confirmar tu pedido en Nay's Dreams",
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ConfirmPage({ params }: Props) {
  // Obtener el usuario actual usando la función existente
  const user = await getCurrentUser();
  const { id } = await params;

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    redirect("/login?redirect=/comfirm/" + id);
  }

  // Verificar si el usuario es administrador
  // Nota: Asegúrate de que el campo se llame 'isAdmin' en tu base de datos
  const isAdmin = user?.isAdmin === true || user?.isAdmin === "true";

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Acceso denegado
          </h1>
          <p className="mb-4">
            No tienes permisos de administrador para acceder a esta página.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ConfirmOrder pedidoId={id} />
    </div>
  );
}
