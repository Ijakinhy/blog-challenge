// import { supabase } from "@/utils/supabaseClient";

// export default defineEventHandler(async (event) => {
//   const body = await readBody(event);
//   const { email, password } = body;
//   const { user, session, error } = await supabase.auth.signUp({
//     email,
//     password,
//   });

//   if (error) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify({ error: error.message }),
//     };
//   }

//   return { user, session };
// });
