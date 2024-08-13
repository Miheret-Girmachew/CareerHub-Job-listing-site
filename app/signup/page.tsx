"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; 
import { signIn } from 'next-auth/react';
import { useUserContext } from "../context/UserContext";

const SignupPage: React.FC = () => {
  const { userData, setUserData } = useUserContext();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    // Name validation pattern
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(data.name)) {
      alert('Name can only contain letters and spaces');
      return;
    }

    // Email validation pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(data.email)) {
      alert('Invalid email address');
      return;
    }

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('https://akil-backend.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data, role:"user"}),
      });

      if (response.ok) {
        alert("Accepted! Please check your email to verify your account.");
        setUserData(data);
        router.push('/verify');
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert("An error occurred during registration or you already have an account. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 max-w-lg">
        <h2 className="pb-4 font-poppins text-[32px] font-black leading-[38.4px] text-center font-[#25324B]">
          Sign Up Today!
        </h2>
        <button onClick={() => signIn('google')} className="flex text-[#3833b2] font-bold items-center justify-center bg-white border border-[#CCCCF5] rounded-lg p-2 w-full mb-4 gap-2">
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.6712 8.36788H18V8.33329H10.5V11.6666H15.2096C14.5225 13.607 12.6762 15 10.5 15C7.73874 15 5.49999 12.7612 5.49999 9.99996C5.49999 7.23871 7.73874 4.99996 10.5 4.99996C11.7746 4.99996 12.9342 5.48079 13.8171 6.26621L16.1742 3.90913C14.6858 2.52204 12.695 1.66663 10.5 1.66663C5.89791 1.66663 2.16666 5.39788 2.16666 9.99996C2.16666 14.602 5.89791 18.3333 10.5 18.3333C15.1021 18.3333 18.8333 14.602 18.8333 9.99996C18.8333 9.44121 18.7758 8.89579 18.6712 8.36788Z" fill="#FFC107"/>
<path d="M3.12749 6.12121L5.8654 8.12913C6.60624 6.29496 8.4004 4.99996 10.5 4.99996C11.7746 4.99996 12.9342 5.48079 13.8171 6.26621L16.1742 3.90913C14.6858 2.52204 12.695 1.66663 10.5 1.66663C7.29915 1.66663 4.52332 3.47371 3.12749 6.12121Z" fill="#FF3D00"/>
<path d="M10.5 18.3333C12.6525 18.3333 14.6083 17.5095 16.0871 16.17L13.5079 13.9875C12.6432 14.6451 11.5865 15.0008 10.5 15C8.33251 15 6.49209 13.6179 5.79876 11.6891L3.08126 13.7829C4.46043 16.4816 7.26126 18.3333 10.5 18.3333Z" fill="#4CAF50"/>
<path d="M18.6713 8.36796H18V8.33337H10.5V11.6667H15.2096C14.8809 12.5902 14.2889 13.3972 13.5067 13.988L13.5079 13.9871L16.0871 16.1696C15.9046 16.3355 18.8333 14.1667 18.8333 10C18.8333 9.44129 18.7758 8.89587 18.6713 8.36796Z" fill="#1976D2"/>
</svg>
          Sign Up with Google
        </button>
        <div className="flex items-center mb-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-[#8f9197]">Or Sign Up with Email</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="font-epilogue text-base font-semibold leading-[25.6px] text-left text-[#515B6F]">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={userData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="font-epilogue text-base font-semibold leading-[25.6px] text-left text-[#515B6F]">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={userData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="font-epilogue text-base font-semibold leading-[25.6px] text-left text-[#515B6F]">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={userData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="font-epilogue text-base font-semibold leading-[25.6px] text-left text-[#515B6F]">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Enter password again"
              value={userData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#2d298e] text-white py-2 rounded-full"
          >
            Continue
          </button>
        </form>
        <p className="mt-4 text-[#8f9197]">
          Already have an account? <a href="/login" className="text-[#2d298e] font-semibold">Login</a>
        </p>
        <p className="text-xs text-[#8f9197] mt-4">
          By clicking 'Continue', you acknowledge that you have read and accepted our <a href="/terms" className="text-[#2d298e]">Terms of Service</a> and <a href="/privacy" className="text-[#2d298e]">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
