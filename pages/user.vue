<script setup>
definePageMeta({
  middleware: "auth",
});

import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";
import BlogPost from "~/components/BlogPost.vue";

const posts = ref([]);
const openCreatePost = ref(false);
const title = ref("");
const description = ref("");
const image = ref(null);
const imagePreview = ref(null);
const isLoading = ref(false);
const isLoadingCreate = ref(false);
const { $supabase, $trpc } = useNuxtApp();
const router = useRouter();
onMounted(async () => {
  try {
    isLoading.value = true;
    const {
      data: { session },
    } = await $supabase.auth.getSession();
    const token = session.access_token;
    const blogs = await $trpc.getUserDetails.query(token);
    posts.value = blogs.userPosts;
    posts.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  } finally {
    isLoading.value = false;
  }
});

// Handle image selection
const handleUploadImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    image.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const createPost = async () => {
  try {
    isLoadingCreate.value = true;
    const { data: userData, error } = await $supabase.auth.getUser();
    if (error || !userData) {
      console.error("User not authenticated");
      return;
    }

    const {
      data: { session },
    } = await $supabase.auth.getSession();
    const token = session.access_token;

    // Convert image
    let base64Image = null;
    if (image.value) {
      base64Image = await convertToBase64(image.value);
    }

    // Create the post using tRPC
    const res = await $trpc.createPost.mutate({
      title: title.value,
      description: description.value,
      image: base64Image,
      token: token,
    });

    posts.value.unshift(res);
    title.value = "";
    description.value = "";
    image.value = null;
    imagePreview.value = null;
    openCreatePost.value = false;
    isLoadingCreate.value = false;
    console.log("Post created successfully!");
  } catch (error) {
    console.error("Error creating post:", error);
    isLoadingCreate.value = false;
  }
};
</script>

<template>
  <div class="relative">
    <div class="sticky top-0 z-50 w-full bg-white shadow-md">
      <Navbar v-model="openCreatePost" />
    </div>
    <div
      v-if="openCreatePost"
      class="fixed right-6 z-50 p-10 mt-10 w-[32rem] bg-white shadow-xl shadow-black/20"
    >
      <form @submit.prevent="createPost">
        <input
          type="text"
          name="title"
          placeholder="Title"
          :value="title"
          @input="title = $event.target.value"
          class="p-2 border text-sm rounded-md input-bordered my-5 focus:border border-gray-400 focus:outline-none placeholder:capitalize w-full max-w-md"
        />

        <textarea
          :value="description"
          @input="description = $event.target.value"
          class="px-3 py-2 h-32 w-full text-black border border-gray-500 bg-transparent rounded-md focus:outline-none placeholder:text-[28px]"
          placeholder="Write something..."
        />

        <label
          class="flex items-center justify-center w-full h-12 border border-gray-300/20 rounded-md text-sm bg-gray-400/20 text-slate-900 cursor-pointer"
        >
          <input type="file" class="hidden" @change="handleUploadImage" />
          Add Image
        </label>

        <!-- Image preview -->
        <div v-if="imagePreview" class="mt-3">
          <img
            :src="imagePreview"
            alt="Preview"
            class="w-full h-40 object-contain rounded-md border"
          />
        </div>

        <button
          :disabled="isLoading || !description || !image || !title"
          type="submit"
          class="bg-sky-800 disabled:bg-sky-800/60 disabled:cursor-not-allowed text-gray-200 w-full mt-4 py-2 rounded-md"
        >
          {{ isLoadingCreate ? "Loading... " : " Post" }}
        </button>
      </form>
    </div>
    <h1
      v-if="isLoading"
      class="text-gray-500 font-bold text-center mt-60 text-5xl"
    >
      Loading ....
    </h1>
    <h1 class="text-4xl text-[#535d68] font-bold text-center my-40">
      your Posts
    </h1>
    <div class="container mx-auto flex items-center justify-center mb-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogPost v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>
