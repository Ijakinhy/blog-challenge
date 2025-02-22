<script setup>
import { defineProps } from 'vue';
import { BlogPost } from '#components';

 defineProps({
    posts: Array
});


</script>

<template>
    <section>
        <h1 class="text-4xl text-[#535d68] font-bold text-center mt-40">Trending  Posts</h1>
        <div class="container mx-auto flex gap-6">
          <BlogPost v-for="post in posts" :key="post.id" :post="post" />
        </div>

    </section>
</template>