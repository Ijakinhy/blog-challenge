import { createClient } from "@supabase/supabase-js";
import { prisma } from "~/prisma";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default defineEventHandler(async (event) => {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader) {
      return { error: "Unauthorized" };
    }

    const token = authHeader.replace("Bearer ", "");

    // Get the authenticated user
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
      return { error: "No file uploaded" };
    }

    // Generate unique filename
    const fileExtension = file.filename.split(".").pop();
    const fileName = `blog_post_images/${userId}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExtension}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, file.data, {
        contentType: file.type,
      });

    if (error) {
      return { error: "Error uploading image", details: error };
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${fileName}`;

    // Insert post into the database
    const { data: post, error: dbError } = await supabase
      .from("blog_challenge")
      .insert([
        {
          title,
          description,
          post_image: imageUrl,
          created_at: new Date(),
          own_id: userId,
        },
      ])
      .select("*")
      .single();

    if (dbError) {
      return { error: "Failed to save post", details: dbError };
    }

    return post;
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to create post", details: error.message };
  } finally {
    await prisma.$disconnect();
  }
});
