import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createProductSchema = z.object({
  title: z.string().min(3, "O titulo precisa ter no minimo 3 caracteres."),
  description: z
    .string()
    .min(10, "A descrição precisa ter no minimo 10 caracteres."),

  thumbnail: z
    .any()
    .refine((files) => files?.length == 1, "A imagem é obrigatoria.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `O tamanho máximo da imagem é 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Apenas os formatos .jpb, .jpeg, .png e .webp são aceitos"
    ),
});

export type CreateProductFormType = z.infer<typeof createProductSchema>;
