import { PrismaClient } from "@prisma/client";

// let prisma:PrismaClient

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {

//   }
//   prisma = global.prisma;
// }

// export { prisma };


export const prisma = globalThis.prisma ?? new PrismaClient()

if (process.env.NODE_ENV === 'production') {
  globalThis.prisma = prisma
}
