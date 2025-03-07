<template>
  <div
    class="container mx-auto flex px-5 py-12 items-center justify-center flex-col"
  >
    <div class="lg:w-2/3 w-full animate-fade-in-down">
      <!-- Change the heading text -->
      <h1
        class="md:text-6xl text-3xl mb-2 font-bold text-white tracking-tight leading-tight"
      >
        Hello, I'm Jakin.
      </h1>
      <!-- Change the subheading text -->
      <h1
        class="md:text-6xl text-3xl mb-4 font-bold text-white tracking-tight leading-tight"
      >
        I’m here to assist
        <span class="border-b-4 border-green-400 -mb-20"></span>with your
        questions.
      </h1>
      <!-- Change the paragraph text -->
      <p
        class="mt-8 mb-16 md:leading-relaxed leading-normal text-white tracking-tight text-xl"
      >
        A frontend developer passionate about building modern, interactive web
        applications with React, Vue, and Firebase. I enjoy solving problems,
        exploring new technologies, and sharing my web development journey.
      </p>
      <!-- Update the button texts and links -->
      <NuxtLink to='/contact'
        class="uppercase rounded-sm bg-red-400 font-bold text-white px-8 py-4 mx-auto mr-4 hidden md:inline"
     
        >Contact Me</NuxtLink to='/contact' >
      <NuxtLink to='/about'
        class="uppercase rounded-sm bg-green-400 font-bold text-white px-8 py-4 mx-auto hidden md:inline"
      
        >About Me</NuxtLink>
    </div>
  </div>
</template>
