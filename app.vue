<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const posts = ref([]); // Using `ref` to make `posts` reactive

onMounted(async () => {
  try {
    const res = await axios.get("/api/blog");  // Wait for the API response
    posts.value = res.data;
      console.log(posts);
      
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div>
    <h1 class="text-red-700">hellooooooooo</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.description }}</li>
    </ul>
  </div>
</template>
