import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: "Montserrat, sans-serif",
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                laranja: "#FFA12B",
                vermelho: "#BB0000",
                azul: "#003960",
                branco: "#fafafa",
            },
        },
    },
    plugins: [],
};
export default config;
