'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Biru Fullscreen */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-300 z-0" />

      {/* Card Form di Atas Background */}
      <div className="relative z-10 flex min-h-screen">
        {/* Bagian Kiri: Ilustrasi */}
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

        {/* Bagian Kanan: Form Sign In */}
        <div className="flex-1 flex justify-center items-center">
          <div className="justify-center flex flex-col h-full w-[40vw] bg-white rounded-l-3xl shadow-lg p-10">
            <div className="items-center ">
              <h2 className="text-3xl font-bold text-blue-600 mb-3">Sign In</h2>
              <p className="text-gray-500 mb-3">
                Congratulations! You are one step ahead to use our services.
              </p>

              <form>
                {/* Input Username */}
                <div className="mb-2">
                  <label htmlFor="username" className="block mb-2 text-gray-600">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="e.g. JohnDoe123"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Input Password */}
                <div className="mb-6 relative">
                  <label htmlFor="password" className="block mb-2 text-gray-600">
                    Password
                  </label>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="*******"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-10 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Tombol Sign In */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                >
                  Sign In
                </button>
              </form>

              {/* Link ke Sign Up */}
              <p className="mt-6 text-bold text-gray-600">
                Don't have an account?{' '}
                <Link href="/sign-up" className="text-blue-600 hover:underline">
                  Sign Up First
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
