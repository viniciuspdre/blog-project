// import type { Metadata } from "next";

import LoginForm from "@/components/organisms/loginForm";

// export const metadata: Metadata = {
//   title: "Realize seu Login",
//   description: "Realize o login no blog para ler artigos."
// }

export default function Home() {
  return (
    <div className="flex h-screen flex-row items-center">
      <div className="h-screen flex flex-col justify-center items-center w-1/2">
        <h1 className="text-center">blog</h1>
        <h2 className="text-center w-96">A plataforma virtual para expandir seu conhecimento e fortalecer seu networking.</h2>
      </div>
      <div className="bg-gray-50 flex h-screen w-1/2 justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
