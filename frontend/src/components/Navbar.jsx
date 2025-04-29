import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ user }) {
  // user: null or user object (e.g. { name, avatarUrl })

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

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
          <Link href="/tasks">Tasks</Link>
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
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg p-4 text-sm z-50">
                  <p className="font-semibold mb-2">Hello, {user.name}!</p>
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
                      // Add your sign-out logic here
                    }}
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded mt-2 text-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
