<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const username = ref("");
const isLoading = ref(false);

const signUp = async () => {
  isLoading.value = true;
  const { $trpc } = useNuxtApp();

  try {
    const res = await $trpc.createAccount.mutate({
      email: email.value,
      password: password.value,
      username: username.value,
    });

    console.log("successful");
  } catch (error) {
    console.log(error);
  } finally {
    email.value = "";
    password.value = "";
    isLoading.value = false;
    navigateTo("/login");
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

    <div
      class="bg-[#ffffff] shadow-2xl rounded-lg ml-auto mr-auto w-[28rem] px-5 py-8 xs:w-96"
    >
      <h2
        class="text-center pb-4 text-[#00778c] text-3xl font-medium capitalize"
      >
        Create New Account
      </h2>

      <form class="flex flex-col w-full items-center" @submit.prevent="signUp">
        <div class="flex-1 w-full relative">
          <input
            autoComplete="off"
            type="text"
            name="username"
            :value="username"
            required
            @input="username = $event.target.value"
            placeholder="username"
            class="p-2 border text-sm rounded-md input-bordered my-5 focus:border-none border-gray-400 placeholder:capitalize w-full max-w-md"
          />
        </div>
        <div class="flex-1 w-full relative">
          <input
            autoComplete="off"
            type="email"
            name="email"
            :value="email"
            required
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
            required
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
          {{ isLoading ? "Loading..." : "Sign up" }}
        </button>
      </form>

      <div class="flex justify-center mt-4">
        <button
          @click="navigateTo('/login')"
          class="text-sky-950 hover:underline text-sm"
        >
          Already have an account?
        </button>
      </div>
    </div>
  </div>
</template>
