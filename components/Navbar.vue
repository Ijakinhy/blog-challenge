<script setup>
const props = defineProps({
  modelValue: Boolean,
});
const openCreatePost = ref(props.modelValue);
const emit = defineEmits();

watch(openCreatePost, (newVal) => {
  emit("update:modelValue", newVal);
});

const handleLogout = async () => {
  const $supabase = useNuxtApp().$supabase;
  const { error } = await $supabase.auth.signOut();

  if (error) {
    console.log(error.message);
  }

  console.log("sign out successfully");
  navigateTo("/login");
};
</script>

<template>
  <nav class="bg-[#00778c] p-3">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <h1 class="text-white text-4xl font-bold font-montserrat">
          <span class="text-[#69ccef]">Blog</span>Challenge
        </h1>
      </div>
      <div class="flex space-x-2">
        <button></button>
        <button
          class="text-white hover:bg-[#69ccef] hover:font-bold rounded-md text-[17px] font-medium py-2 px-2"
          @click="openCreatePost = !openCreatePost"
        >
          create post
        </button>
        <button
          @click="handleLogout"
          class="text-white hover:bg-[#69ccef] hover:font-bold rounded-md text-[17px] font-medium py-2 px-2"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>
