<!-- layouts/default.vue -->
<template>
  <Navbar />
  <main class="min-h-screen">
    <slot />
  </main>

  <Footer />
</template>

<script setup>
import Footer from "~/components/Footer.vue";
import Navbar from "~/components/Navbar.vue";
</script>
