"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ItemProductsList } from "@/types/Products";

interface AddPedidoProps {
  products: ItemProductsList[];
}

export default function AddPedido({ products }: AddPedidoProps) {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [customerName, setCustomerName] = useState("");
  const [customerUsername, setCustomerUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [customerAddress, setCustomerAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedImage) {
      toast("Por favor selecciona una imagen");
      return;
    }

    setIsLoading(true);

    try {
      const pedidoData = {
        pedidoId: uuid(),
        user: {
          name: customerName,
          email: customerUsername,
        },
        total: selectedProductData?.price
          ? selectedProductData?.price * quantity
          : 0,
        product: selectedProduct,
        productTitle: selectedProductData?.title || "",
        productTitleEn: selectedProductData?.titleEn || "",
        imageUrl: `https://nays-dream.pockethost.io/api/files/${selectedProductData?.collectionId}/${selectedProductData?.id}/${selectedImage}`,
        status: "2",
        price: selectedProductData?.price || 0,
        productId: selectedProductData?.id || "",
        collectionId: selectedProductData?.collectionId || "",
        quantity,
        aditional: customerAddress,
      };

      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedidoData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el pedido");
      }

      await response.json();

      toast("Pedido creado correctamente");
      router.push("/admin/pedidos");
    } catch (error) {
      console.error("Error creating order:", error);
      toast("No se pudo crear el pedido");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedProductData = products.find((p) => p.id === selectedProduct);
  const productImages = selectedProductData?.images || [];

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nuevo Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="customerName">Nombre del Cliente</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerUsername">Correo</Label>
                <Input
                  id="customerUsername"
                  value={customerUsername}
                  onChange={(e) => setCustomerUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerAddress">Direccion</Label>
                <Input
                  id="customerAddress"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Cantidad</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2 w-full">
                <Label>Producto</Label>
                <div className="relative w-full">
                  <Select
                    value={selectedProduct}
                    onValueChange={(value) => {
                      setSelectedProduct(value);
                      setSelectedImage("");
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Selecciona un producto"
                        className="truncate text-left"
                      />
                    </SelectTrigger>
                    <SelectContent
                      className="w-[var(--radix-select-trigger-width)] max-w-[350px] max-h-[300px] overflow-y-auto"
                      align="start"
                    >
                      {products.map((product) => (
                        <SelectItem
                          key={product.id}
                          value={product.id}
                          className="min-h-[2.5rem] py-2"
                        >
                          <div className="flex flex-col w-full">
                            <span className="font-medium break-words max-w-full">
                              {product.title}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {selectedProductData && (
                <div className="space-y-2">
                  <Label>Precio</Label>
                  <div className="text-lg font-semibold">
                    ${selectedProductData.price.toFixed(2)}
                  </div>
                </div>
              )}
            </div>

            {selectedProduct && productImages.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Selecciona un diseño</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {productImages.map((image, index) => (
                    <div
                      key={index}
                      className={`relative aspect-square border-2 rounded-md overflow-hidden cursor-pointer transition-all ${
                        selectedImage === image
                          ? "border-primary ring-2 ring-primary"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedImage(image)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://nays-dream.pockethost.io/api/files/${selectedProductData?.collectionId}/${selectedProductData?.id}/${image}`}
                        alt={`Diseño ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedImage && (
              <div className="space-y-4 pt-4">
                <Label>Vista Previa del Diseño Seleccionado</Label>
                <div className="relative w-full max-w-md aspect-square border rounded-md overflow-hidden">
                  <img
                    src={`https://nays-dream.pockethost.io/api/files/${selectedProductData?.collectionId}/${selectedProductData?.id}/${selectedImage}`}
                    alt="Diseño seleccionado"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="submit"
                disabled={isLoading || !selectedImage}
                className="min-w-[150px]"
              >
                {isLoading ? "Guardando..." : "Guardar Pedido"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
