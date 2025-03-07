
import { BlogChallenge } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import { navigateTo } from 'nuxt/app'
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

                const userHandle = await prisma.user.findFirst({
                    where: {
                        user_id: userId
                    }
                })

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
                        userHandle: userHandle?.username
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

    createAccount: publicProcedure.input(z.object({
        email: z.string().email(),
        password: z.string(),
        username: z.string()
    })).mutation(async ({ input }) => {
        const { email, password, username } = input

        const { data, error } = await supabase.auth.signUp({ email, password })

        if (error) {
            console.log("error while creating accout", error);
        }

        const res = await prisma.user.create({
            data: {
                joined_at: new Date(),
                email: email,
                username: username,
                user_id: data.user?.id
            }
        })
        return res
    }),


    getUserDetails: publicProcedure.input(z.string()).query(async ({ input }) => {
        const token = input
        try {
            const { data, error } = await supabase.auth.getUser(token)

            if (!data?.user?.id) {
                throw new Error('User not authenticated');
            }

            if (error) {
                console.log(error);
                throw new Error(error.message)

            }
            const user = await prisma.user.findFirst({
                where: {
                    user_id: data.user?.id
                }
            })
            const userPosts = await prisma.blogChallenge.findMany({
                where: {
                    userHandle: user?.username,
                    own_id: user?.user_id
                }
            })

            return {
                user,
                userPosts
            }
        } catch (error) {
            console.log(error);
        }
    }),

    deletePost: publicProcedure.input(z.object({
        token: z.string(),
        postId: z.number()
    })).mutation(async ({ input }) => {
        const { token, postId } = input
        try {
            const { data: { user }, error } = await supabase.auth.getUser(token)

            if (error || !user) {
                throw new Error("User is not authenticated or token is invalid");
            }
            const post = await prisma.blogChallenge.findUnique({
                where: {
                    id: postId
                }
            })
            if (!post) {
                throw new Error("Post not found");
            }

            // Ensure that the authenticated user is the owner of the post
            if (post.own_id !== user.id) {
                throw new Error("You do not have permission to delete this post");
            }

            const deletePost = await prisma.blogChallenge.delete({
                where: {
                    id: postId
                }
            })

            return deletePost
        } catch (error) {
            console.log(error);


        }

    })

})

export type AppRouter = typeof appRouter;

export default createNuxtApiHandler({
    router: appRouter,
    createContext: () => ({}),
})
