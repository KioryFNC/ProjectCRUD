import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(3, "O nome precisa ter no minimo 3 caracteres"),
    email: z.string().email("Por favor, insira um e-mail válido"),
    password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
    verifyPassword: z.string(),
  })

  .refine((data) => data.password === data.verifyPassword, {
    message: "As senhas não coincidem.",
    path: ["verifyPassword"],
  });

export type SignupFormType = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email("Por favor, insira um e-mail válido."),
  password: z.string().min(1, "a Senha é obrigatória."),
});

export type LoginFormType = z.infer<typeof loginSchema>;
