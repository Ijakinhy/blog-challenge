<script setup  ></script>




<template>
    <div class="bg-[#00778c] h-lvh  gap-y-28 flex justify-center items-center flex-col" > 
         <div class="flex justify-center">
            <h1 class="text-white text-4xl font-bold font-montserrat">
                <span class="text-[#69ccef]">Blog</span>Challenge
            </h1>
        </div>
      <div class="bg-[#ffffff] mt-10  shadow-2xl rounded-lg ml-auto mr-auto w-[28rem] px-5  py-8  xs:w-96 ">
        <h2 class="text-center pb-4 text-[#00778c]   text-3xl font-medium capitalize">
          create new account
        </h2>

        <form
          action=""
          class="flex flex-col w-full items-center "
        
        >
          <div class=" flex-1 w-full relative">
            <input
              autoComplete="off"
              type="email"
              name="email"
              placeholder="email"
              class="p-2 border text-sm rounded-md input-bordered my-5  focus:border-none border-gray-400 placeholder:capitalize    w-full max-w-md"
          
            />
            
          </div>

          <div class=" flex-1 w-full relative">
            <input
              autoComplete="off"
              type="password"
              name="password"
              placeholder="password"
              class="p-2 border text-sm rounded-md input-bordered my-5   focus:border-none border-gray-400 placeholder:capitalize    w-full max-w-md"
      
            />
           
          </div>
 
          <button
            type="submit"
            class="p-1 rounded-md hover:bg-[#00778cd8] bg-[#00778c] w-full  text-white mt-8   text-lg font-medium"
          >
            
              Sign up
             </button>
        </form>
        <div class="flex justify-center mt-4">
          <a to="/login" class="text-sky-950 hover:underline text-sm">
            Already have an account
          </a>
        </div>
      </div>
    </div>
</template>