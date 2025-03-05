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
  <div class="rounded-xl shadow-lg">
    <div class="p-5 flex flex-col">
      <div class="rounded-xl h-80 overflow-hidden">
        <img :src="post.post_image" alt="" class="w-full h-full object-cover" />
      </div>
      <h5
        class="text-2xl md:text-xl leading-none tracking-tight font-medium mt-2"
      >
        {{ post.title }}
      </h5>
      <p class="text-[#535d68] text-[18px] font-medium leading-none">
        {{ post.description }}
      </p>
      <h4 class="mt-3">
        posted by <strong class="text-[#00778c]">{{ post.userHandle }}</strong>
      </h4>
      <span class="text-sm text-right font-bold text-gray-500">
        created At: {{ createdAt.toLocaleString() }}</span
      >
      <div v-if="isUserPage" class="flex flex-wrap">
        <button
          @click="deletePost"
          class="bg-red-600 rounded-tl-full rounded-br-full text-white font-medium text-xs text-center self-center px-4 py-2"
        >
          delete
        </button>
      </div>
    </div>
  </div>
</template>
