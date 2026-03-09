import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            '/api': {
                // target: 'http://3.34.200.203',
                target: 'http://localhost:8000',
            },
            '/sanctum/csrf-cookie': {
                // target: 'http://3.34.200.203',
                target: 'http://localhost:8000',
            }
        },
    },
});
