
import { createNuxtApiHandler } from 'trpc-nuxt'
import { z } from 'zod'
import { publicProcedure, router } from '~/server/trpc/trpc'

export const appRouter = router({
    hello: publicProcedure

        .input(
            z.object({
                text: z.string().nullish(),
            }),
        )
        .query(({ input }) => {

            if (!input) {
                throw new Error("Input is required");
            }

            const greetingText = input.text || 'world';
            return {
                greeting: `hello ${greetingText}`,
            };
        }),
})

export type AppRouter = typeof appRouter;

export default createNuxtApiHandler({
    router: appRouter,
    createContext: () => ({}),
})
