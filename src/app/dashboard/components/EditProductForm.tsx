"use client";

import { Product } from "@/interfaces/Product";
import api from "@/lib/api";
import { EditProductFormType, editProductSchema } from "@/schemas/productShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface EditProductFormProps {
  product: Product;
  token: string | null;
  onSuccess: () => void;
  onClose: () => void;
}

export default function EditProductForm({
  product,
  token,
  onSuccess,
  onClose,
}: EditProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProductFormType>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      title: product.title,
      description: product.description,
    },
  });

  const onSubmit = async (data: EditProductFormType) => {
    try {
      await api.put(`/products/${product.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Produto atualizado com sucesso!");
      onSuccess();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Não foi possivel atualizar o produto");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Titulo do Produto</span>
        </label>
        <input
          type="text"
          className="input input-bordered"
          {...register("title")}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-error">{errors.title.message}</p>
        )}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Descrição</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-24"
          {...register("description")}
        ></textarea>
        {errors.description && (
          <p className="mt-1 text-xs text-error">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="modal-action">
        <button type="button" className="btn" onClick={onClose}>
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </form>
  );
}
