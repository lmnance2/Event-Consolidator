'use client'
import React, {useState, FormEvent, useEffect, useRef} from 'react';
import {useRouter} from "next/navigation";
//import prisma from "@/lib/db";
import {LogIn, SignUp} from '@/auth/nextjs/actions';

export default function LoginPage(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [zipCode, setZipCode] = useState('');

  const router = useRouter();

  // Handle submit call with storing in database via API Post call, later
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setEmail('');
    setPassword('');
    setIsLogin(true);
    setName('');
    setZipCode('');
    let result;
    const formData = new FormData(e.currentTarget);
    if(!isLogin) {
      try {
        await SignUp(formData);
      } catch (err){
        console.log(`Error signing up: ${err}`);
      }
    } else {
      try {
        result = await LogIn(formData);
        console.log(result);
      } catch (err){
        console.log(`Error signing up: ${err}`);
      }
    }
    
    console.log(`Submitted account information with \n Email: ${email}\n Password: ${password}`);
    
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

        <form onSubmit={handleSubmit} className="space-y-4">
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
          minLength={5}
          maxLength={5}
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

          { isLogin && (
            <button 
            type="button"
            onClick={() => window.location.href = "/api/auth/google"}
            className="w-full flex items-center justify-center border border-gray-300 rounded-lg bg-white text-gray-700 font-medium py-2 hover:bg-gray-50 transition"
            >
              <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.21 3.6l6.85-6.85C35.64 2.72 30.13 0 24 0 14.64 0 6.4 5.37 2.57 13.11l7.98 6.19C12.43 13.05 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.1 24.5c0-1.57-.14-3.07-.39-4.5H24v9h12.63c-.54 2.94-2.16 5.42-4.63 7.08l7.17 5.57C43.19 38.55 46.1 31.92 46.1 24.5z"/>
                <path fill="#FBBC05" d="M10.55 28.92c-.48-1.43-.75-2.94-.75-4.42s.27-2.99.75-4.42l-7.98-6.19C.92 17.34 0 20.57 0 24s.92 6.66 2.57 9.42l7.98-6.19z"/>
                <path fill="#34A853" d="M24 48c6.13 0 11.64-2.03 15.52-5.51l-7.17-5.57c-2 1.35-4.6 2.14-8.35 2.14-6.26 0-11.57-3.55-13.45-8.8l-7.98 6.19C6.4 42.63 14.64 48 24 48z"/>
              </svg>              Sign in with Google
            </button>
          )}
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