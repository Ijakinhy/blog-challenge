<script setup>
import { ref, defineProps } from "vue";

defineProps({
  post: Object,
});
</script>

<template>
  <div class="max-w-md rounded overflow-hidden shadow-xl  transition-shadow duration-300">
    
              <div class="h-80 w-full bg-cover p-4">
              <img
                :src="post.post_image"
                alt="post.title"
                
                class=" h-full w-full object-contain"
              />
            </div>

              
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ post.title }}</div>
      <p class="text-gray-700 text-base">
        {{ post.description }}
      </p>
    </div>
  </div>
</template>
