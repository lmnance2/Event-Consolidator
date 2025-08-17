"use server";

import { cookies } from "next/headers";
import prisma from "../../lib/db";

import { hashPassword, generateSalt, comparePasswords } from "../core/passwordHasher";
import { createUserSession, removeUserFromSession } from "../core/session";

export async function SignUp(formData: FormData){

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const location = formData.get("zip code") as string;

  if (!name || !email || !password || !location) {
    throw new Error("Missing required fields");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if(existingUser) return "Account already exists for this user";

  try{

    const salt = generateSalt();

    const hashedPassword = await hashPassword(password, salt);

    console.log(hashedPassword);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        hashedPassword: hashedPassword,
        salt: salt,
        location_default: location
      }
    });

    if (user == null) return "Unable to create account";

    await createUserSession(user, await cookies());
  } catch {
    return "Unable to create account";
  }
  
}

export async function LogIn(formData:FormData){
  const email = formData.get("email") as string;
  const userPassword = formData.get("password") as string;

  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    if(!user) return "Incorrect Email";
  } catch {
    return "Incorrect Email";
  }
  const expPassword = user?.hashedPassword as string;
  console.log(expPassword);
  const expSalt = user?.salt as string;
  console.log(expSalt);

  let pwMatch;
  try{
    pwMatch = await comparePasswords(expPassword, userPassword, expSalt);
  } catch {
    return "incorrect password";
  }

  if (!pwMatch){
    return "Incorrect password";
  }

  if (user) await createUserSession(user, await cookies());

  console.log("LOgin successful");

  return "Login successful";
  
}

export async function LogOut(){
  await removeUserFromSession(await cookies());

  console.log("Logged out");
}

