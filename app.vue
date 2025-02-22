<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Navbar from './components/Navbar.vue';
import Blog from './components/Blog.vue';
import Login from './components/Login.vue';

const posts = ref([]); 
const openCreatePost = ref(false);

onMounted(async () => {
  try {
    const res = await axios.get("/api/blog");  
    posts.value = res.data;
      console.log(posts);
      
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="relative">

  <div class="sticky top-0 z-50 w-full bg-white shadow-md">
     <Navbar v-model="openCreatePost" />
  </div>
        <div v-if="openCreatePost" className="fixed right-6 z-50  p-10 mt-10 w-[32rem] bg-white shadow-xl shadow-black/20">
              <form action="" >
                <textarea
                
                  className="px-3 py-2 h-32 w-full text-black border border-gray-500  bg-transparent rounded-md focus:outline-none placeholder:text-[28px]"
                />
                <label htmlFor="uploadImage" className="flex items-center justify-center w-full h-12 border border-gray-300/20 rounded-md text-sm bg-gray-400/20 text-slate-900">
                  <input
                    type="file"
                    id="uploadImage"
                    className="hidden"
              
                  />
          
                    <!-- <img src={imageIcon} alt="" className="mr-4" /> -->
                    Add image 
                
                </label>
                <button
                  
                  type="submit"
                  className="disabled:bg-gray-400/20 bg-sky-800 text-gray-200 w-full  mt-4 py-2 rounded-md"
                >
                  Post
                </button>
              </form>
            </div>
  <Blog :posts="posts" />
   <!-- <Login/> -->
  </div>
</template>
