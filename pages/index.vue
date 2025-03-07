<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";
import Footer from "~/components/Footer.vue";
import Hero from "~/components/Hero.vue";

const posts = ref([]);
const openCreatePost = ref(false);
const title = ref("");
const description = ref("");
const image = ref(null);
const imagePreview = ref(null);
const isLoading = ref(false);
const isLoadingCreate = ref(false);

const { $supabase, $trpc } = useNuxtApp();

onMounted(async () => {
  try {
    isLoading.value = true;
    const blogs = await $trpc.blogPosts.query();
    posts.value = blogs;
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
  <div class="">
    <div class="sticky top-0 z-50 w-full bg-white shadow-md"></div>
    <section
      class="text-gray-600 body-font h-screen flex bg-gray-900 bg-svg-constellation-gray-100 relative"
    >
      <Hero />
    </section>
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
    <Blog v-else :posts="posts" />
    <div class="relative p-4">
      <div class="max-w-3xl mx-auto">
        <div
          class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal"
        >
          <div class="">
            <h1 href="#" class="text-gray-900 font-bold text-4xl">
              My Journey in Software Development: Lessons from the Early Days
            </h1>
            <div class="py-5 text-sm font-regular text-gray-900 flex">
              <span class="mr-3 flex flex-row items-center">
                <svg
                  class="text-indigo-600"
                  fill="currentColor"
                  height="13px"
                  width="13px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  style="enable-background: new 0 0 512 512"
                  xml:space="preserve"
                >
                  <g>
                    <g>
                      <path
                        d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256
			c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128
		                   	c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"
                      ></path>
                    </g>
                  </g>
                </svg>
                <span class="ml-1">6 months ago</span>
              </span>

              <button
                class="flex flex-row items-center hover:text-indigo-600 mr-3"
              >
                <svg
                  class="text-indigo-600"
                  fill="currentColor"
                  height="16px"
                  aria-hidden="true"
                  role="img"
                  focusable="false"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  ></path>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
                <span class="ml-1">Jakin israel Havyarimana</span>
              </button>

              <button class="flex flex-row items-center hover:text-indigo-600">
                <svg
                  class="text-indigo-600"
                  fill="currentColor"
                  height="16px"
                  aria-hidden="true"
                  role="img"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 18 18"
                >
                  <path
                    fill=""
                    d="M15.4496399,8.42490555 L8.66109799,1.63636364 L1.63636364,1.63636364 L1.63636364,8.66081885 L8.42522727,15.44178 C8.57869221,15.5954158 8.78693789,15.6817418 9.00409091,15.6817418 C9.22124393,15.6817418 9.42948961,15.5954158 9.58327627,15.4414581 L15.4486339,9.57610048 C15.7651495,9.25692435 15.7649133,8.74206554 15.4496399,8.42490555 Z M16.6084423,10.7304545 L10.7406818,16.59822 C10.280287,17.0591273 9.65554997,17.3181054 9.00409091,17.3181054 C8.35263185,17.3181054 7.72789481,17.0591273 7.26815877,16.5988788 L0.239976954,9.57887876 C0.0863319284,9.4254126 0,9.21716044 0,9 L0,0.818181818 C0,0.366312477 0.366312477,0 0.818181818,0 L9,0 C9.21699531,0 9.42510306,0.0862010512 9.57854191,0.239639906 L16.6084423,7.26954545 C17.5601275,8.22691012 17.5601275,9.77308988 16.6084423,10.7304545 Z M5,6 C4.44771525,6 4,5.55228475 4,5 C4,4.44771525 4.44771525,4 5,4 C5.55228475,4 6,4.44771525 6,5 C6,5.55228475 5.55228475,6 5,6 Z"
                  ></path>
                </svg>
                <span class="ml-1">activewear</span>
              </button>
            </div>
            <hr />
            <p class="text-base leading-8 my-5">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
