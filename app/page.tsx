'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { signIn } from 'next-auth/react';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-10 max-w-sm w-full rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
          CareerHub
        </h1>
        <button
          onClick={handleSignUp}
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 mb-4"
        >
          Sign Up
        </button>
        <button
          onClick={handleSignIn}
          className="w-full bg-gray-700 text-white py-3 rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default HomePage;
