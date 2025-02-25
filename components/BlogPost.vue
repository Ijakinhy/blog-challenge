<script setup>
import { ref } from "vue";

defineProps({
  post: Object,
});
</script>

<template>
  <div class="rounded-xl shadow-lg">
    <div class="p-5 flex flex-col">
      <div class="rounded-xl h-80 overflow-hidden">
        <img :src="post.post_image" alt="" class="w-full h-full object-cover" />
      </div>
      <h5 class="text-2xl md:text-3xl font-medium mt-3">
        {{ post.title }}
      </h5>
      <p class="text-[#535d68] text-lg mt-3">{{ post.description }}</p>
    </div>
  </div>
</template>
