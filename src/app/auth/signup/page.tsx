"use client";

import { SignupFormType, signupSchema } from "../../schemas/authSchema";
import api from "../../lib/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignupPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormType) => {
    try {
      await api.post("/users", data);
      alert(
        "Cadastro realizado com sucesso! Você será redirecionado para o login."
      );
      router.push("/auth/login");
    } catch (error) {
      alert("Erro ao realizar o cadastro. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl">Crie sua conta</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input
              type="text"
              placeholder="Seu nome"
              className="input input-bordered"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-error">{errors.name.message}</p>
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
            <button type="submit" className="btn btn-bg-primary">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
