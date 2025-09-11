"use client";

import { Product } from "@/interfaces/Product";
import api from "@/lib/api";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import CreateProductForm from "../components/CreateProductForm";
import EditProductForm from "../components/EditProductForm";
import MetricsChart from "../components/MetricsChart";

export default function ProductsPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();

  const fetchProducts = async () => {
    if (!isLoading) setIsLoading(true);
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
  useEffect(() => {
    if (token) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleSucess = () => {
    setIsModalOpen(false);
    fetchProducts();
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleDelete = async (productId: string) => {
    if (!window.confirm("Você tem certeza que deseja deletar este produto? ")) {
      return;
    }

    try {
      await api.delete(`/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Produto deletado com sucesso!");
      fetchProducts();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      alert("Não foi possivel deletar o produto");
    }
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <span className="loading loading-lg loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Meus Produtos</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Adicionar Produto
        </button>
      </div>

      <div className="mt-8">
        <MetricsChart />
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
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          width={64}
                          height={64}
                          className="rounded"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded bg-base-200 text-xs text-base-content/60">
                          <span>Sem Imagem</span>
                        </div>
                      )}
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
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleOpenEditModal(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(product.id)}
                  >
                    Deletar
                  </button>
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
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Adicionar Novo Produto</h3>
            <div className="py-4">
              <CreateProductForm
                token={token}
                onSuccess={handleSucess}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </dialog>
      )}

      {isEditModalOpen && editingProduct && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">
              Editando Produto: {editingProduct.title}
            </h3>

            <div className="py-4">
              <EditProductForm
                product={editingProduct}
                token={token}
                onSuccess={handleEditSuccess}
                onClose={() => setIsEditModalOpen(false)}
              />
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
