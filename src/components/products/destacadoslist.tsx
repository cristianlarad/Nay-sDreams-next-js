"use client";

import { useEffect, useState } from "react";

import Loading from "@/app/[locale]/products/loading";
import { IDestacados } from "@/types/Products";

import DestacadosCard from "./destacadosCard";
interface ApiResponse {
  success: boolean;
  data: IDestacados[];
}

const Destacadoslist = () => {
  const [destacados, setDestacados] = useState<IDestacados[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/destacados");
        if (!response.ok) {
          throw new Error("Error al cargar los productos destacados");
        }
        const data: ApiResponse = await response.json();
        setDestacados(data.data || []);
      } catch (err) {
        console.error("Error:", err);
        setError("Error al cargar los productos destacados");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (destacados.length === 0) return null;

  return (
    <div>
      {" "}
      {destacados.length !== 0 && (
        <section className="py-4">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-pink-700 text-center mb-12">
              Productos Destacados
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {destacados.map((producto) => (
                <div key={producto.id} className="w-full">
                  <DestacadosCard product={producto} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Destacadoslist;
