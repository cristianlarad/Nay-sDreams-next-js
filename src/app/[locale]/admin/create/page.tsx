"use client";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";
import { useState } from "react";



export default function CreatePage() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
    titleEn: "",
    descriptionEn: "",
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", newProduct.title);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price.toString());
      formData.append("titleEn", newProduct.titleEn);
      formData.append("descriptionEn", newProduct.descriptionEn);

      for (const image of imageFiles) {
        formData.append("images", image);
      }

      const record = await pb.collection("products").create(formData);
      alert("Producto creado ✔️");
      router.push(`/products/${record.id}`);
    } catch (error) {
      alert("Error al crear producto ❌");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleCreate} className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold text-center">Crear producto</h1>

      <input
        name="title"
        value={newProduct.title}
        onChange={handleChange}
        placeholder="Título"
        className="w-full border p-2"
        required
      />

      <textarea
        name="description"
        value={newProduct.description}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full border p-2"
        required
      />

      <input
        name="price"
        type="number"
        value={newProduct.price}
        onChange={handleChange}
        placeholder="Precio"
        className="w-full border p-2"
        required
      />

      <input
        name="titleEn"
        value={newProduct.titleEn}
        onChange={handleChange}
        placeholder="Título en Inglés"
        className="w-full border p-2"
      />

      <textarea
        name="descriptionEn"
        value={newProduct.descriptionEn}
        onChange={handleChange}
        placeholder="Descripción en Inglés"
        className="w-full border p-2"
      />

      {/* Selector de imágenes múltiples */}
      <div className="space-y-2">
        <label className="font-semibold block">Subir imágenes</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2"
        />

        {/* Vista previa de imágenes */}
        <div className="flex flex-wrap gap-2 pt-2">
          {imageFiles.map((file, idx) => (
            <div key={idx} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${idx}`}
                className="w-24 h-24 object-cover border"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Creando..." : "Crear producto"}
      </button>
    </form>
  );
}
