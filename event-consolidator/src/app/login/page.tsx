'use client'
import React, {useState, FormEvent, useEffect, useRef} from 'react';
import {useRouter} from "next/navigation";
//import prisma from "@/lib/db";
import createUser from "@/actions/actions";

export default function LoginPage(){
  const [users, setUsers] = useState({})
  /*useEffect(() => {
    async function fetchData(){
      const userList = await prisma.user.findMany();
      setUsers(userList);
    }
    fetchData();
  }, []); */

  const isFirstRender = useRef(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [formData, setFormData] = useState(new FormData());

  useEffect(() => {
    console.log("In posting use effect");
    if(isFirstRender.current){
      isFirstRender.current = false;
      return;
    }
    async function postUser(){
      console.log("In postUsers");
      await createUser(formData);
      console.log("After user created (hopefully)");
    }
    postUser();
  }, [formData])

  const router = useRouter();

  // Handle submit call with storing in database via API Post call, later
  function onSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log("Shown submitted");
    const newFormData = new FormData(e.currentTarget);
    if(!isLogin) {
      console.log("In sign up area");
      setFormData(newFormData);
      console.log("Set form data changed");
    }
    console.log(`Submitted account information with \n Email: ${email}\n Password: ${password}`);
    //router.push("/dashboard")
  }

  return(
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        <h1 className="text-3xl font-bold text-center mb-2 text-green-700 drop-shadow-sm">
          {isLogin ? "Welcome Back" : "Join Us Today"}
        </h1>
        <p className="text-center text-gray-500 mb-6">
          {isLogin ? "Login to your account" : "Create a new account"}
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          {!isLogin && (
          <input 
          type="num" 
          name="zip code"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          )}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-green-700 font-medium hover:underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-green-700 font-medium hover:underline"
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );

}