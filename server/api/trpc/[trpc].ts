
import { BlogChallenge } from '@prisma/client'
import { createNuxtApiHandler } from 'trpc-nuxt'
import { z } from 'zod'
import { prisma } from '~/prisma'
import { publicProcedure, router } from '~/server/trpc/trpc'

export const appRouter = router({
    blogPosts: publicProcedure.query(async () => {
        try {
            const blogPosts: BlogChallenge[] = await prisma.blogChallenge.findMany()
            return blogPosts
        } catch (error) {
            console.log("database error:", error);
            throw new Error("Failed to fetch the blog posts ")


        }
    })


})

export type AppRouter = typeof appRouter;

export default createNuxtApiHandler({
    router: appRouter,
    createContext: () => ({}),
})
