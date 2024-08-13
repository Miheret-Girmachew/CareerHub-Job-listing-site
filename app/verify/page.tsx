"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useUserContext } from "../context/UserContext";

interface FormData {
  code0: string;
  code1: string;
  code2: string;
  code3: string;
}

const VerifyPage: React.FC = () => {
  const { userData } = useUserContext();
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      code0: '',
      code1: '',
      code2: '',
      code3: '',
    },
  });

  const [resendTimer, setResendTimer] = useState(30);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleResend = () => {
    if (resendTimer === 0) {
      setResendTimer(30);
      // Logic to resend the code
      axios.post('/api/send-otp', { email: userData.email })
        .then(() => {
          console.log('OTP sent');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const onSubmit = async (data: FormData) => {
    const otpCode = Object.values(data).join('');
    try {
      const response = await fetch('https://akil-backend.onrender.com/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          OTP: otpCode,
        }),
      });
      if (response.status === 200) {
        console.log('Code validated successfully');
        alert("Sign up success");
        router.push('/login');
      } else {
        setError('Invalid code. Please try again.');
        alert('Invalid code. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid code. Please try again.');
      alert('Invalid code. Please try again.');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (resendTimer > 0) {
        setResendTimer(resendTimer - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const codeFields: Array<keyof FormData> = ['code0', 'code1', 'code2', 'code3'];

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white w-96 mr-auto ml-auto">
        <h2 className="pb-8 font-poppins text-[32px] font-black leading-[38.4px] text-center font-[#25324B]">Verify Email</h2>
        <p className="leading-[22.4px] text-[#7C8493] mb-16">
          We've sent a verification code to the email address you provided. To complete the verification process, please enter the code here.
        </p>
        <form className="flex flex-col items-center mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between mb-4">
            {codeFields.map((field, index) => (
              <Controller
                key={index}
                name={field}
                control={control}
                rules={{ required: true, pattern: /^\d$/ }}
                render={({ field }) => (
                  <input
                    {...field}
                    id={`code-${index}`}
                    className="w-20 h-14 border-[#b1aff1] text-center text-2xl font-extrabold border-[2px] outline-none rounded focus:border-blue-600 p-5"
                    type="text"
                    maxLength={1}
                    placeholder="0"
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        field.onChange(e);
                        if (e.target.value && index < 3) {
                          const nextInput = document.getElementById(`code-${index + 1}`);
                          nextInput?.focus();
                        }
                      }
                    }}
                  />
                )}
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <p className="text-gray-600 text-sm mb-8 text-center text-[#7C8493]">
            You can request to <button className="text-[#2d298e] font-semibold" type="button" onClick={handleResend} disabled={resendTimer > 0}>Resend code</button> in <span className="font-semibold text-[#2d298e]">{resendTimer}</span>
          </p>
          <button
            className="bg-[#c7c6f5] text-white hover:text-[#2d298e] font-bold py-2 px-4 rounded-full w-full"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyPage;
