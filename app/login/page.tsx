"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';
import Link from 'next/link';



const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://akil-backend.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert("login successfully")
        localStorage.setItem("accessToken" , data.data.accessToken);
        console.log(data.data.accessToken)
        Cookie.set('currentUser', data.data.accessToken, { expires: 30/1440, path: '/' });
          router.push('/listing');
        

      } else {
        console.error("Signin error", data.message);
      }
    } catch (error) {
      console.error("Error during signin", error);
    }
  };

  return (
    <div className="flex flex-col mt-20 items-end mr-60">
      <div className="bg-white p-10 w-1/3">
        <h2 className="text-2xl font-bold mb-4 font-black">Welcome Back,</h2>
        <div className="flex items-center mb-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-32 text-[#8f9197]"></span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#515b6f] text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg"
              id="email"
              type="email"
              placeholder="Enter email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#515b6f] text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg"
              id="password"
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-[#2d298e] text-white py-2 rounded-full"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-gray-600 text-sm mt-4">
          Don’t have an account? 
          <Link href="/signup" className="text-[#2d298e] font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
