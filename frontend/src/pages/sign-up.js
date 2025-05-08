import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeCard, setActiveCard] = useState('fast-paced'); // default active card

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary-color)] to-[var(--secondary-color)] z-0" />

      {/* Card Form */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Illustration */}
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

        {/* Right Form */}
        <div className="flex-1 flex justify-center items-center">
          <div className="justify-center flex flex-col h-full w-[40vw] bg-white rounded-l-3xl shadow-lg p-10">
            <div className="items-center ">
              <h2 className="text-3xl font-bold primary-text mb-3">Create an Account</h2>
              <p className="text-gray-500 mb-3">
                Start your journey with us! Smartly adjust your schedule now by using Smartsched.
              </p>

              <form>
                {/* Email */}
                <div className="mb-1">
                  <label htmlFor="email" className="block mb-2 text-gray-600">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="text"
                    placeholder="e.g. youremail@mail.abc.com"
                    className="w-full p-3 placeholder-gray-400 border border-gray-400 text-cyan-900 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Username */}
                <div className="mb-2 relative">
                  <label htmlFor="username" className="block mb-2 text-gray-600">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="e.g. JohnDoe123"
                    className="w-full p-3 placeholder-gray-400 border border-gray-400 text-cyan-900 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                  />                  
                </div>

                {/* Display Name */}
                <div className="mb-1 relative">
                  <label htmlFor="name" className="block mb-1 text-gray-600">
                    Display Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Johnny Doe"
                    className="w-full p-3 placeholder-gray-400 border border-gray-400 rounded-lg text-cyan-900 bg-white focus:ring-2 focus:ring-blue-500"
                  />                  
                </div>

                {/* Password */}
                <div className="mb-1 relative">
                  <label htmlFor="password" className="block mb-2 text-gray-600">
                    Password
                  </label>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="*******"
                    className="w-full p-3 placeholder-gray-400 border border-gray-400 rounded-lg text-cyan-900 bg-white focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-12 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="mb-1 relative">
                  <label htmlFor="password" className="block mb-2 text-gray-600">
                    Task Prioritization
                  </label>
                </div>
                {/* Cards container */}
                <div className="flex gap-6 mb-6">
                  {/* Leisure Card */}
                  <div
                    onClick={() => setActiveCard('leisure')}
                    className={`flex flex-col items-center justify-center w-28 h-36 rounded-lg shadow-md p-4 cursor-pointer transition-colors duration-300
                      ${activeCard === 'leisure' ? 'bg-blue-100 border-4 border-blue-300' : 'bg-gray-100 border border-transparent'}
                    `}
                  >
                    <Image
                      src="/leisure.png" // Replace with your actual coffee cup image path
                      alt="Leisure"
                      width={48}
                      height={48}
                      priority
                    />
                    <span className={`mt-3 font-semibold ${activeCard === 'leisure' ? 'text-blue-400' : 'text-gray-700'}`}>
                      Leisure
                    </span>
                  </div>

                  {/* Fast-Paced Card */}
                  <div
                    onClick={() => setActiveCard('fast-paced')}
                    className={`flex flex-col items-center justify-center w-28 h-36 rounded-lg shadow-md p-4 cursor-pointer transition-colors duration-300
                      ${activeCard === 'fast-paced' ? 'bg-blue-100 border-4 border-blue-300' : 'bg-gray-100 border border-transparent'}
                    `}
                  >
                    <Image
                      src="/fast-paced.png" // Replace with your actual clock image path
                      alt="Fast-Paced"
                      width={48}
                      height={48}
                      priority
                    />
                    <span className={`mt-3 font-semibold ${activeCard === 'fast-paced' ? 'text-blue-400' : 'text-gray-700'}`}>
                      Speedrun
                    </span>
                  </div>
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="w-full gradient-button-2 p-3 rounded-lg"
                >
                  Sign Up
                </button>
              </form>

              {/* Login Link */}
              <p className="mt-6 text-bold text-gray-600">
                Already have an account?{' '}
                <Link href="/sign-in" className="primary-text hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
