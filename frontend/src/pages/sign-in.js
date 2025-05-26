'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/router';
import TaskPopUp from '@/components/popup';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [Popup, setPopup] = useState({
    isOpen: false,
    status: "",
    title: "",
    message: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopup({
      isOpen: true,
      status: "loading",
      title: "Signing In...",
      message: "Please wait while we sign you in.",
    });
    try {
      // Kirim data login ke API route Next.js
      const response = await axios.post('http://localhost:3500/user/login', {
        username,
        passwordHash: password,
      });

      localStorage.setItem('userId', response.data.data.id);
      localStorage.setItem('token', response.data.token);

      setPopup({
        isOpen: true,
        status: "success",
        title: "Sign In Successful",
        message: "You have been successfully signed in!",
      });

      // Delay redirect
      setTimeout(() => {
        router.push('http://localhost:3000/landing');
      }, 1500);
    } catch (error) {
      const msg = error?.response?.data?.message || "Error.";
      setPopup({
        isOpen: true,
        status: "error",
        title: "Sign In Failed",
        message: msg,
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary-color)] to-[var(--secondary-color)] z-0" />

      {/* Card Form */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left side illustration */}
        <div className="px-40 flex-1 flex flex-col justify-center text-white">
          <h1 className="text-5xl font-bold mb-2">SmartSched</h1>
          <p className="text-2xl">Schedule Smartly.</p>
          <Image
            src="/image (7).png"
            alt="Illustration"
            width={500}
            height={500}
            priority
          />
        </div>

        {/* Right side form */}
        <div className="flex-1 flex justify-center items-center">
          <div className="justify-center flex flex-col h-full w-[40vw] bg-white rounded-l-3xl shadow-lg p-10">
            <div className="items-center">
              <h2 className="text-3xl font-bold text-blue-400 mb-3">Sign In</h2>
              <p className="text-cyan-900 mb-3">
                Congratulations! You are one step ahead to use our services.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="mb-4">
                  <label htmlFor="username" className="block mb-2 text-blue-400 font-semibold">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="e.g. JohnDoe123"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 placeholder-gray-400 border border-gray-400 rounded-md bg-white text-cyan-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Password */}
                <div className="mb-6 relative">
                  <label htmlFor="password" className="block mb-2 text-blue-400 font-semibold">
                    Password
                  </label>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="*******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 placeholder-gray-400 border border-gray-400 rounded-md bg-white text-cyan-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-12 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-400 text-white p-3 rounded-md hover:bg-blue-600 transition"
                >
                  Sign In
                </button>
              </form>

              {/* Link to Sign Up */}
              <p className="mt-6 text-gray-600 font-normal">
                Don't have an account?{' '}
                <Link href="/sign-up" className="text-blue-400 hover:underline font-semibold">
                  Sign Up First
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <TaskPopUp
        isOpen={Popup.isOpen}
        status={Popup.status}
        title={Popup.title}
        message={Popup.message}
        onClose={() => setPopup({ ...Popup, isOpen: false })}
      />
    </div>
  );
}
