"use client";

import { useForm } from "react-hook-form";
import api from "@/lib/api";
import {
  CreateProductFormType,
  createProductSchema,
} from "@/schemas/productShema";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateProductFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function CreateProductForm({
  onSuccess,
  onClose,
}: CreateProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductFormType>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = async (data: CreateProductFormType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnail", data.thumbnail[0]);

    try {
      await api.post("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Produto criado com sucesso!");
      onSuccess();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      alert("Não foi possivel criar o produto");
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
          placeholder="Ex: Camiseta Verde"
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
          className="textarea textarea-bordered"
          placeholder="Fale sobre seu produto..."
          {...register("description")}
        ></textarea>
        {errors.description && (
          <p className="mt-1 text-xs text-error">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Imagem do Produto</span>
        </label>
        <input
          type="file"
          className="file-input file-input-bordered w-full"
          accept="image/png, image/jpeg, image/webp"
          {...register("thumbnail")}
        />
        {errors.thumbnail && (
          <p className="mt-1 text-xs text-error">
            {errors.thumbnail.message as string}
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
          {isSubmitting ? "Salvando..." : "Salvar Produto"}
        </button>
      </div>
    </form>
  );
}
