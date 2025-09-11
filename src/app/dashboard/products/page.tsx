"use client";

import { Product } from "@/interfaces/Product";
import api from "@/lib/api";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useAuthStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        alert("Não foi possivel carregar os produtos");
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      fetchProducts();
    }
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <span className="loading loading-lg loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Meus Produtos</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            console.log("Botão 'Adicionar Produto' foi clicado!");
            setIsModalOpen(true);
          }}
        >
          Adicionar Produto
        </button>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="table-zebra table">
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Titulo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="avatar">
                    <div className="w-16 rounded">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        width={64}
                        height={64}
                        className="rounded"
                      />
                    </div>
                  </div>
                </td>
                <td className="font-bold">{product.title}</td>
                <td>
                  {product.status ? (
                    <div className="badge badge-success">Ativo</div>
                  ) : (
                    <div className="badge badge-error">Inativo</div>
                  )}
                </td>
                <td className="space-x-2">
                  <button className="btn btn-sm btn-info">Editar</button>
                  <button className="btn btn-sm btn-error">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="py-8 text-center">Nenhum cadastrado ainda</p>
        )}
      </div>
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Adicionar Novo Produto</h3>
            <p className="py-4">Formulario em construção...</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Fechar
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
