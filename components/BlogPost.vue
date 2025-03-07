<script setup>
import { ref } from "vue";

const props = defineProps({
  post: Object,
  isUserPage: Boolean,
  deletePost: Function,
});

const createdAt = new Date(props.post.created_at);
</script>

<template>
  <div class="flex flex-col overflow-hidden rounded-lg shadow-lg">
    <div class="flex-shrink-0">
      <img class="h-48 w-full object-cover" :src="post.post_image" alt="" />
    </div>
    <div class="flex flex-1 flex-col justify-between bg-white p-6">
      <div class="flex-1">
        <p class="text-sm font-medium text-indigo-600">
          <a href="#" class="hover:underline">Case Study</a>
        </p>
        <a href="#" class="mt-2 block">
          <p class="text-xl font-semibold text-gray-900">
            {{ post.title }}
          </p>
          <p class="mt-3 text-base text-gray-500">
            {{ post.description }}
          </p>
        </a>
      </div>
      <div class="mt-6 flex items-center">
        <div class="flex-shrink-0">
          <a href="#">
            <span class="sr-only">Jakin</span>
            <img
              class="h-10 w-10 rounded-full"
              src="../assets/jakin.jpg"
              alt=""
            />
          </a>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">
            <a href="#" class="hover:underline">Jakin Israel Havyarimana</a>
          </p>
          <div class="flex space-x-1 text-sm text-gray-500">
            <time datetime="2020-02-12">{{ createdAt.toUTCString() }}</time>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
