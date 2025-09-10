/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Adicionamos os caminhos para todas as nossas pastas com componentes
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  // Aqui ativamos o plugin DaisyUI para termos componentes prontos
  plugins: [require("daisyui")],
};
