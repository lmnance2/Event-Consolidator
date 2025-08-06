"use server";

import prisma from "@/lib/db";

export default async function createUser(formData: FormData){
  
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const location = formData.get("zip code") as string;

  if (!name || !email || !password || !location) {
    throw new Error("Missing required fields");
  }

  await prisma.user.create({
    data: {
      name: name,
      email: email,
      hashedPassword: password,
      location_default: location
    }
  });
}