
import { BlogChallenge } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import { createNuxtApiHandler } from 'trpc-nuxt'
import { z } from 'zod'
import { prisma } from '~/prisma'
import { publicProcedure, router } from '~/server/trpc/trpc'


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)
export const appRouter = router({
    blogPosts: publicProcedure.query(async () => {
        try {
            const blogPosts: BlogChallenge[] = await prisma.blogChallenge.findMany()
            return blogPosts
        } catch (error) {
            console.log("database error:", error);
            throw new Error("Failed to fetch the blog posts ")

        }
    }),

    createPost: publicProcedure
        .input(
            z.object({
                title: z.string(),
                description: z.string(),
                image: z.string(),
                token: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const { title, description, image, token } = input;

            try {

                const { data: authData, error: authError } = await supabase.auth.getUser(token);

                if (authError || !authData?.user) {
                    throw new Error('Invalid user authentication');
                }

                const userId = authData.user.id;

                const buffer = Buffer.from(image.split(',')[1], 'base64');
                const fileName = `blog_post_images/${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;

                const { data, error: uploadError } = await supabase.storage
                    .from('images')
                    .upload(fileName, buffer, {
                        contentType: 'image/jpeg',
                    });

                if (uploadError) {
                    throw new Error('Error uploading image');
                }

                const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;


                const post = await prisma.blogChallenge.create({
                    data: {
                        title,
                        description,
                        post_image: imageUrl,
                        created_at: new Date(),
                        own_id: userId,
                    },
                });

                return post;
            } catch (error) {
                console.error('Error creating post:', error);
                throw new Error(`Failed to create post: ${error}`);
            } finally {
                await prisma.$disconnect();
            }
        }),



})

export type AppRouter = typeof appRouter;

export default createNuxtApiHandler({
    router: appRouter,
    createContext: () => ({}),
})
