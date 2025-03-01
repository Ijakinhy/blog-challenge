export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    private: {
      supabaseServiceRole: process.env.SUPABASE_SERVICE_ROLE_KEY,
      postgresUrl: process.env.POSTGRES_URL,

    }
  },

  plugins: ['~/plugins/supabase.client.ts', { src: '@/plugins/supabase.client.ts', mode: 'client' }],
  buildDir: "dist",
});
