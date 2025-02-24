import { createClient } from "@supabase/supabase-js";
import { prisma } from "./blog";

const supabase = createClient(
  process.env.NUXT_PUBLIC_SUPABASE_URL,
  process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY // Ensure this key is available
);

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      return { error: "Unauthorized" };
    }

    const token = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return { error: "Invalid user authentication" };
    }

    const userId = user.id;
    const formData = await readMultipartFormData(event);

    const title = formData.find((f) => f.name === "title")?.data.toString();
    const description = formData
      .find((f) => f.name === "description")
      ?.data.toString();
    const file = formData.find((f) => f.name === "image");

    if (!file) {
      return { error: "no file uploaded" };
    }

    const fileExtension = file.filename.split(".").pop();
    const fileName = `blog_post_images/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExtension}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, file.data, {
        contentType: file.type,
      });

    if (error) {
      return { error: "Error uploading image" };
    }

    const imageUrl = `${process.env.NUXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${fileName}`;

    const newPost = {
      title,
      description,
      created_at: new Date(),
      post_image: imageUrl,
      own_id: userId,
    };

    const { data: post, error: dbError } = await supabase
      .from("blog_challenge")
      .insert([
        {
          title: formData.find((f) => f.name === "title")?.data.toString(),
          description: formData
            .find((f) => f.name === "description")
            ?.data.toString(),
          post_image: imageUrl,
          created_at: new Date(),
          own_id: userId,
        },
      ])
      .select()
      .single();

    if (dbError) {
      return { error: "Failed to save post", details: dbError };
    }

    return post;
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to create post" };
  } finally {
    await prisma.$disconnect();
  }
});
