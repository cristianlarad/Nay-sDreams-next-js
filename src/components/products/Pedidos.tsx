"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "../input";
import { Textarea } from "../ui/textarea";

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

  const handleQuantityChange = (value: string) => {
    const newQuantity = parseInt(value);
    setQuantity(newQuantity);
    setTotal(price * newQuantity);
  };

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

    const imageUrl = `https://nays-dream.pockethost.io/api/files/${collectionId}/${id}/${selectedImage}`;
    const message =
      `¡Hola! Quiero hacer un pedido de:\n\n` +
      `Usuario:* ${username}\n` +
      `Correo:* ${userEmail}\n` +
      `*Producto:* ${title}\n` +
      `*Cantidad:* ${quantity}\n` +
      `*Total:* $${total.toFixed(2)}\n\n` +
      `Imagen de referencia: ${imageUrl}\n\n` +
      `Adicional:* ${aditional}`;

    const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;

    window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
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
              Seleccionar imagen
            </label>
            <Select onValueChange={handleImageSelect} value={selectedImage}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una imagen" />
              </SelectTrigger>
              <SelectContent>
                {imagesUrl.map((image, index) => (
                  <SelectItem key={index} value={image}>
                    <img
                      src={`https://nays-dream.pockethost.io/api/files/${collectionId}/${id}/${image}`}
                      alt={title}
                      className="w-10 h-5 object-cover"
                    />
                    Imagen {index + 1}
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
        <CardFooter>
          <Button type="submit" className="w-full" disabled={!selectedImage}>
            Realizar pedido
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
