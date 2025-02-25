<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const alreadyHaveAccount = ref(false);

const signUp = async () => {
  const $supabase = useNuxtApp().$supabase;

  try {
    const { user, error } = await $supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      console.error(error);
    }
    if (user) {
      return navigateTo("/");
    }
  } catch (error) {
    console.error(error);
  }
};

const login = async () => {
  const $supabase = useNuxtApp().$supabase;

  try {
    const { data, error } = await $supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      console.error(error);
    }
    if (data) {
      return navigateTo("/"); // Redirect to home page
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div
    class="bg-[#00778c] h-lvh gap-y-28 flex justify-center items-center flex-col"
  >
    <div class="flex justify-center">
      <h1 class="text-white text-4xl font-bold font-montserrat">
        <span class="text-[#69ccef]">Blog</span>Challenge
      </h1>
    </div>

    <template v-if="!alreadyHaveAccount">
      <div
        class="bg-[#ffffff] mt-10 shadow-2xl rounded-lg ml-auto mr-auto w-[28rem] px-5 py-8 xs:w-96"
      >
        <h2
          class="text-center pb-4 text-[#00778c] text-3xl font-medium capitalize"
        >
          Create New Account
        </h2>

        <form
          class="flex flex-col w-full items-center"
          @submit.prevent="signUp"
        >
          <div class="flex-1 w-full relative">
            <input
              autoComplete="off"
              type="email"
              name="email"
              :value="email"
              @input="email = $event.target.value"
              placeholder="Email"
              class="p-2 border text-sm rounded-md input-bordered my-5 focus:border-none border-gray-400 placeholder:capitalize w-full max-w-md"
            />
          </div>

          <div class="flex-1 w-full relative">
            <input
              autoComplete="off"
              type="password"
              name="password"
              :value="password"
              @input="password = $event.target.value"
              placeholder="Password"
              class="p-2 border text-sm rounded-md input-bordered my-5 focus:border-none border-gray-400 placeholder:capitalize w-full max-w-md"
            />
          </div>

          <button
            type="submit"
            class="p-1 rounded-md hover:bg-[#00778cd8] bg-[#00778c] w-full text-white mt-8 text-lg font-medium"
          >
            Sign Up
          </button>
        </form>

        <div class="flex justify-center mt-4">
          <button
            @click="alreadyHaveAccount = !alreadyHaveAccount"
            class="text-sky-950 hover:underline text-sm"
          >
            Already have an account?
          </button>
        </div>
      </div>
    </template>

    <template v-else>
      <div
        class="bg-[#ffffff] mt-10 shadow-2xl rounded-lg ml-auto mr-auto w-[28rem] px-5 py-8 xs:w-96"
      >
        <h2
          class="text-center pb-4 text-[#00778c] text-3xl font-medium capitalize"
        >
          Login
        </h2>

        <form class="flex flex-col w-full items-center" @submit.prevent="login">
          <div class="flex-1 w-full relative">
            <input
              autoComplete="off"
              type="email"
              name="email"
              :value="email"
              @input="email = $event.target.value"
              placeholder="Email"
              class="p-2 border text-sm rounded-md input-bordered my-5 focus:border-none border-gray-400 placeholder:capitalize w-full max-w-md"
            />
          </div>

          <div class="flex-1 w-full relative">
            <input
              autoComplete="off"
              type="password"
              name="password"
              :value="password"
              @input="password = $event.target.value"
              placeholder="Password"
              class="p-2 border text-sm rounded-md input-bordered my-5 focus:border-none border-gray-400 placeholder:capitalize w-full max-w-md"
            />
          </div>

          <button
            type="submit"
            class="p-1 rounded-md hover:bg-[#00778cd8] bg-[#00778c] w-full text-white mt-8 text-lg font-medium"
          >
            Log In
          </button>
        </form>

        <div class="flex justify-center mt-4">
          <button
            @click="alreadyHaveAccount = !alreadyHaveAccount"
            class="text-sky-950 hover:underline text-sm"
          >
            Don't have an account?
          </button>
        </div>
      </div>
    </template>
  </div>
</template>
