import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Если вы будете деплоить на GitHub Pages в репозиторий с именем, например, "smart-shadow"
// то base должен быть "/smart-shadow/". Для кастомного домена smartshadow.su оставьте "/".
export default defineConfig({
  plugins: [react()],
  base: '/', // ← измените на "/smart-shadow/" если репозиторий называется иначе
});