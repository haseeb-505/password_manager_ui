import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  
  plugins: [
    tailwindcss(),
    react()
  ],
  base: "https://github.com/haseeb-505/password_manager_ui",
  
})
