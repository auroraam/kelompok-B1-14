import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/router';
import TaskPopUp from '@/components/popup';

export default function Navbar({ user }) {
  // user: null or user object (e.g. { name, avatarUrl })

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const router = useRouter();
  const [Popup, setPopup] = useState({
    isOpen: false,
    status: "",
    title: "",
    message: "",
  });

  const handleLogout = async () => {
    setPopup({
      isOpen: true,
      status: "loading",
      title: "Signing Out...",
      message: "Please wait while we sign you out.",
    });
    try {
      const response = await axios.get('http://localhost:3500/user/logout', {}, {
        withCredentials: true, // agar cookie (token) ikut dikirim dan bisa dihapus
      });

      if (response.status === 200) {
        localStorage.removeItem("token");
        setPopup({
          isOpen: true,
          status: "success",
          title: "Sign out successfull",
          message: "You have been successfully signed out!",
        });
        setTimeout(() => {
          router.push('http://localhost:3000/sign-in');
        }, 1500);
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Error.";
      setPopup({
        isOpen: true,
        status: "error",
        title: "Login Failed",
        message: msg,
      });
    }
  };

  // Close popup if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="w-full flex py-4 px-6 md:px-12 justify-between items-center font-inter">
        {/* Logo */}
        <div className="text-2xl font-bold gradient-text">
          <Link href="/">SmartSched</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-5 font-semibold primary-text items-center relative">
          <Link href="/">Home</Link>
          <Link href="/task-user">Tasks</Link>
          <Link href="/settings">Settings</Link>

          {/* User Section */}
          {!user ? (
            <Link
              href="/sign-in"
              className="gradient-button font-normal px-6 py-2"
            >
              Sign In or Sign Up
            </Link>
          ) : (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 focus:outline-none"
                aria-label="User menu"
              >
                <Image
                  src={user.avatarUrl}
                  alt="User Profile"
                  width={40}
                  height={40}
                  objectFit="cover"
                />
              </button>

              {/* Popup card */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-blue-400 rounded-md shadow-lg p-4 text-sm z-50">
                  <p className="px-2 py-1 font-bold text-white bg-blue-400">Hello, {user.name}!</p>
                  <Link
                    href="/profile"
                    className="block px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-2 py-1 hover:bg-red-100 rounded mt-2 text-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <TaskPopUp
        isOpen={Popup.isOpen}
        status={Popup.status}
        title={Popup.title}
        message={Popup.message}
        onClose={() => setPopup({ ...Popup, isOpen: false })}
      />
    </nav>
  );
}
