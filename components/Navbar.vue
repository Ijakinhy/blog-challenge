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
      <div class="flex text-white font-extrabold">
        <a
          class="flex text-white text-base items-center no-underline hover:text-white hover:no-underline"
          href="#"
        >
          <img
            src="../assets/jakin.jpg"
            class="w-10 h-10 rounded-full object-cover"
            alt=""
          />

          <span class="hidden w-0 md:w-auto md:block pl-2"
            >jakin israel Havyarimana
          </span>
        </a>
      </div>
      <div class="flex space-x-2">
        <NuxtLink
          to="/"
          class="text-white hover:bg-[#69ccef] hover:font-bold rounded-md text-[17px] font-medium py-2 px-2"
        >
          Home
        </NuxtLink>

        <NuxtLink
          to="/about"
          class="text-white hover:bg-[#69ccef] hover:font-bold rounded-md text-[17px] font-medium py-2 px-2"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="text-white hover:bg-[#69ccef] hover:font-bold rounded-md text-[17px] font-medium py-2 px-2"
        >
          Contact
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
