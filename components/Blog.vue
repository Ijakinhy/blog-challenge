<script setup>
import { BlogPost } from "#components";

defineProps({
  posts: Array,
});
</script>

<template>
  <section>
    <div class="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div class="relative mx-auto max-w-7xl">
        <div class="text-center">
          <h2
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            My projects
          </h2>
          <p class="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Every Minute Counts—Write Code That Matters
          </p>
        </div>
        <div
          class="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3"
        >
          <BlogPost v-for="post in posts" :key="post.id" :post />
        </div>
      </div>
    </div>
  </section>
</template>
