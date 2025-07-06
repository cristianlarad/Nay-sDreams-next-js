"use client";
import PocketBase from "pocketbase";
import { useState } from "react";

import { ItemProductsList } from "@/types/Products";

import { Input } from "../input";
import { Label } from "../label";
import { Textarea } from "../textarea";

export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

interface Props {
  products: ItemProductsList;
}
async function fetchImageAsFile(recordId: string, fileName: string) {
  const url = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/products/${recordId}/${fileName}`;
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], fileName, { type: blob.type });
}
export default function EditProduct({ products }: Props) {
  const [product, setProduct] = useState<ItemProductsList | null>(products);
  const [loading, setLoading] = useState(false);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", product!.title);
      formData.append("description", product!.description);
      formData.append("price", product!.price.toString());
      formData.append("titleEn", product!.titleEn);
      formData.append("descriptionEn", product!.descriptionEn);
      console.log(formData);

      // 🔁 Añadir imágenes existentes (como texto)
      for (const imgName of product!.images) {
        const file = await fetchImageAsFile(product!.id, imgName);
        formData.append("images", file);
      }

      // 📤 Añadir nueva imagen como archivo
      if (newImageFile) {
        formData.append("images", newImageFile);
      }

      const updated = await pb
        .collection("products")
        .update(products.id, formData);
      setProduct(updated as unknown as ItemProductsList);
      setNewImageFile(null);
      alert("Producto actualizado ✔️");
    } catch (error) {
      alert("Error al actualizar ❌");
      console.error(error);
    }

    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewImageFile(e.target.files[0]);
    }
  };

  const handleImageDelete = (index: number) => {
    setProduct((prev) =>
      prev
        ? {
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
          }
        : prev
    );
  };
  const handleDelete = async () => {
    const confirmar = confirm(
      "¿Estás seguro de que quieres eliminar este producto?"
    );
    if (!confirmar) return;

    setLoading(true);
    try {
      await pb.collection("products").delete(products.id);
      alert("Producto eliminado correctamente ✔️");
      // Aquí puedes redirigir, refrescar o limpiar el estado
      setProduct(null);
    } catch (error) {
      alert("Error al eliminar ❌");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      <div>
        <Label>Titulo</Label>
        <Input
          name="title"
          value={product?.title || ""}
          onChange={handleChange}
          placeholder="Título"
        />
      </div>
      <div>
        <Label>Titulo en Ingles</Label>
        <Input
          name="titleEn"
          value={product?.titleEn || ""}
          onChange={handleChange}
          placeholder="Título en Inglés"
        />
      </div>
      <div>
        <Label>Descripcion</Label>
        <Textarea
          name="description"
          value={product?.description || ""}
          onChange={handleChange}
          placeholder="Descripción"
          className="w-full border p-2"
        />
      </div>
      <div>
        <Label>Descripcion en ingles</Label>
        <Textarea
          name="descriptionEn"
          value={product?.descriptionEn || ""}
          onChange={handleChange}
          placeholder="Descripción en Inglés"
          className="w-full border p-2"
        />
      </div>
      <div>
        <Label>Precio</Label>
        <Input
          name="price"
          type="number"
          value={product?.price || ""}
          onChange={handleChange}
          placeholder="Precio"
          className="w-full border p-2"
        />
      </div>

      {/* Galería de imágenes actuales */}
      <div className="space-y-2">
        <label className="font-semibold">Imágenes actuales</label>
        <div className="flex flex-wrap gap-2">
          {product?.images.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={`${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/products/${product.id}/${img}`}
                alt={`img-${i}`}
                className="w-24 h-24 object-cover border"
              />
              <button
                type="button"
                onClick={() => handleImageDelete(i)}
                className="absolute top-0 right-0 bg-white text-red-500 rounded-full px-2"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Input para subir nueva imagen */}
      <div className="space-y-1">
        <label className="font-semibold block">Agregar nueva imagen</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-pink-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Actualizando..." : "Guardar"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Eliminar
        </button>
      </div>
    </form>
  );
}
