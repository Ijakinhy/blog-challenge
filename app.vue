<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Navbar from './components/Navbar.vue';
import Blog from './components/Blog.vue';
import Login from './components/Login.vue';

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
   <!-- <Navbar/> -->
  <!-- <Blog :posts="posts" /> -->
   <Login/>
  </div>
</template>
