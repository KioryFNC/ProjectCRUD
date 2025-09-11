"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { LoginFormType, loginSchema } from "../../../schemas/authSchema";
import api from "../../../lib/api";

import { useAuthStore } from "../../../store/authStore";

export default function LoginPage() {
  const router = useRouter();

  const { setToken } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      const response = await api.post("/auth/login", data);

      const token = response.data.token;

      setToken(token);

      alert("Login realizado com sucesso!");
      router.push("/dashboard/products");
    } catch (error) {
      alert("E-mail ou senha inválidos.");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-bold">Login</h1>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              className="input input-bordered"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-error">{errors.email.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Senha</span>
            </label>
            <input
              type="password"
              placeholder="Sua senha"
              className="input input-bordered"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-error">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
