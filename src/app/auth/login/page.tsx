"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      setToken(response.data.token);
      router.push("/dashboard/products");
    } catch (error) {
      alert("E-mail ou senha inválidos.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-6">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <form className="card-body space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center text-3xl font-extrabold text-primary">
            Bem-vindo!
          </h1>
          <p className="text-center text-base-content/70">
            Faça login para continuar
          </p>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              className="input input-bordered focus:input-primary"
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
              className="input input-bordered focus:input-primary"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-error">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Entrar
            </button>
          </div>

          <div className="text-center text-sm">
            <span>Não tem uma conta? </span>
            <Link href="/auth/signup" className="link link-primary">
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
