"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../alert-dialog";
import { Input } from "../input";
import { Textarea } from "../ui/textarea";

import InfoPedidos from "./InfoPedidos";

interface IPedidos {
  imagesUrl: string[];
  price: number;
  title: string;
  id: string;
  collectionId: string;
  username: string;
  userEmail: string;
}

export default function Pedidos({
  collectionId,
  imagesUrl,
  price,
  title,
  username,
  userEmail,
  id,
}: IPedidos) {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [aditional, setAditional] = useState<string>("");
  const [total, setTotal] = useState<number>(price);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleQuantityChange = (value: string) => {
    const newQuantity = parseInt(value);
    setQuantity(newQuantity);
    setTotal(price * newQuantity);
  };
  const pedidoId = uuidv4();
  const handleImageSelect = (value: string) => {
    setSelectedImage(value);
  };

  const handleAditionalChange = (value: string) => {
    setAditional(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Por favor selecciona una imagen");
      return;
    }
    const confirmacionUrl = `${window.location.origin}/comfirm/${pedidoId}`;

    const imageUrl = `https://nays-dream.pockethost.io/api/files/${collectionId}/${id}/${selectedImage}`;
    const message =
      `¡Hola! Quiero hacer un pedido de:\n\n` +
      `Usuario:* ${username}\n` +
      `Correo:* ${userEmail}\n` +
      `*Producto:* ${title}\n` +
      `*Cantidad:* ${quantity}\n` +
      `*Total:* $${total.toFixed(2)}\n\n` +
      `Imagen de referencia: ${imageUrl}\n\n` +
      `Adicional:* ${aditional}` +
      `\n\n` +
      `*PARA EL ADMINISTRADOR*\n` +
      `ID de pedido: ${pedidoId}\n` +
      `Confirmar pedido: ${confirmacionUrl}\n` +
      `---`;

    const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
    window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    try {
      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          quantity,
          total,
          aditional,
          productTitle: title,
          productId: id,
          pedidoId,
          user: {
            name: username,
            email: userEmail,
          },
        }),
      });

      if (!response.ok) {
        console.error("Error al guardar el pedido");
      }
    } catch (error) {
      console.error("Error al guardar el pedido:", error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-2xl font-bold">${price.toFixed(2)}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Seleccionar Diseño
            </label>
            <Select onValueChange={handleImageSelect} value={selectedImage}>
              <SelectTrigger className="flex items-center gap-2">
                {selectedImage ? (
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://nays-dream.pockethost.io/api/files/${collectionId}/${id}/${selectedImage}`}
                      alt={title}
                      className="w-6 h-6 object-cover rounded-sm"
                    />
                    <span>Diseño {imagesUrl.indexOf(selectedImage) + 1}</span>
                  </div>
                ) : (
                  <SelectValue placeholder="Selecciona un Diseño" />
                )}
              </SelectTrigger>
              <SelectContent>
                {imagesUrl.map((image, index) => (
                  <SelectItem
                    key={index}
                    value={image}
                    className="flex items-center gap-2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://nays-dream.pockethost.io/api/files/${collectionId}/${id}/${image}`}
                      alt={title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span>Diseño {index + 1}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Cantidad</label>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="w-20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Adicional
            </label>
            <Textarea
              value={aditional}
              onChange={(e) => handleAditionalChange(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total:</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>

        <InfoPedidos />
        <CardFooter className="grid">
          <CardDescription>
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Alerta:</span> El pedido se
              realizara directamente a whatsapp
            </div>
          </CardDescription>
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowConfirmDialog(true);
            }}
            className="w-full bg-pink-500 hover:bg-pink-600 text-lg"
            disabled={!selectedImage}
          >
            Realizar pedido
          </Button>
        </CardFooter>
      </form>
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Confirmar pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Una vez que confirmes, se le atenderá en breve.
            </AlertDialogDescription>
            <AlertDialogDescription>
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Atención:</span> Sera dirigido a
                WhatsApp. Una vez en la aplicación podrá enviar sus fotos a
                sublimar
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-pink-500 hover:bg-pink-600 text-lg"
              onClick={handleSubmit}
            >
              Confirmar pedido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
