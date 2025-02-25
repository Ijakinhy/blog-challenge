<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import Blog from "../components/Blog.vue";

definePageMeta({
  middleware: "auth-navigation",
});

const posts = ref([]);
const openCreatePost = ref(false);
const title = ref("");
const description = ref("");
const image = ref(null);
const imagePreview = ref(null);
const { $supabase } = useNuxtApp();
onMounted(async () => {
  try {
    const res = await axios.get("/api/blog");
    posts.value = res.data;
    posts.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const {
      data: { user },
    } = await $supabase.auth.getUser();
  } catch (error) {
    console.error(error);
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

const createPost = async () => {
  try {
    const { data: userData, error } = await $supabase.auth.getUser();
    if (error || !userData) {
      console.error("User not authenticated");
      return;
    }

    const {
      data: { session },
    } = await $supabase.auth.getSession();
    const token = session.access_token;
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("description", description.value);
    formData.append("image", image.value);

    const res = await axios.post("/api/createPost", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    //  add item to  th state

    posts.value.unshift(res.data);
    // Clear form fields
    title.value = "";
    description.value = "";
    image.value = null;
    imagePreview.value = null;
    openCreatePost.value = false;
  } catch (error) {
    console.error("Error creating post:", error);
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
          v-model="title"
          placeholder="Title"
          class="p-2 border text-sm rounded-md input-bordered my-5 focus:border border-gray-400 focus:outline-none placeholder:capitalize w-full max-w-md"
        />

        <textarea
          v-model="description"
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
          type="submit"
          class="disabled:bg-gray-400/20 bg-sky-800 text-gray-200 w-full mt-4 py-2 rounded-md"
        >
          Post
        </button>
      </form>
    </div>
    <Blog :posts="posts" />
  </div>
</template>
