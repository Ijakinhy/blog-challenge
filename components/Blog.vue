<script setup>
import { BlogPost } from "#components";

defineProps({
  posts: Array,
});
</script>

<template>
  <section>
    <h1 class="text-4xl text-[#535d68] font-bold text-center my-40">
      Trending Posts
    </h1>
    <div class="container mx-auto flex items-center justify-center mb-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogPost v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
  </section>
</template>
