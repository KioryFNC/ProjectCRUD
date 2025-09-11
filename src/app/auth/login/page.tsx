"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// 1. Importamos o schema e o tipo de LOGIN
import { LoginFormType, loginSchema } from "../../schemas/authSchema";
import api from "../../lib/api";

// 2. Importamos nosso "cofre" (store) do Zustand
import { useAuthStore } from "../../store/authStore";

export default function LoginPage() {
  const router = useRouter();

  // 3. Pegamos a função "setToken" do nosso store para salvar a chave
  const { setToken } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    // 4. Usamos o resolver do Zod com o schema de LOGIN
    resolver: zodResolver(loginSchema),
  });

  // 5. Função de submissão do formulário de login
  const onSubmit = async (data: LoginFormType) => {
    try {
      // 6. Enviamos os dados para a rota de LOGIN
      const response = await api.post("/auth/login", data);

      // 7. A API nos devolve um token. Pegamos ele da resposta.
      const token = response.data.token;

      // 8. ESTE É O PASSO CRUCIAL: Salvamos o token no nosso "cofre"
      setToken(token);

      alert("Login realizado com sucesso!");
      // 9. Redirecionamos o usuário para a página de produtos
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

          {/* CAMPO E-MAIL */}
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

          {/* CAMPO SENHA */}
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

          {/* BOTÃO DE ENVIAR */}
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
