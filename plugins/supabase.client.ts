import { createClient } from "@supabase/supabase-js"

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    if (!config.public.supabaseUrl || !config.public.supabaseKey) {
        console.error("Supabase URL or Key is missing in runtime config.");
        return;
    }

    const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey);

    nuxtApp.provide("supabase", supabase);
});
