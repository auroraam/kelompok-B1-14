import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState } from "react";


export default function Home() {
  const user = {
    name: "Jane Doe",
    avatarUrl: "/profileimage.png" }
  
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      username: "",
      displayName: "",
      password: "******",
    });
    const [pushEnabled, setPushEnabled] = useState(false);
  
    const handleEditClick = () => {
      if (isEditing) {
        // Save logic here (e.g., API call)
        // For now, just disable editing
        setIsEditing(false);
      } else {
        setIsEditing(true);
      }
    };
  
    const handleCancelClick = () => {
      // Reset form or revert changes if needed
      setIsEditing(false);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const togglePush = () => {
      setPushEnabled((prev) => !prev);
    };

  return (
    
    <main className="pt-15 relative">  {/* This is the main container for the page */}
      <Navbar user={user} />
      <div className="relative w-full h-[30vh] flex text-white"> {/* This is the top or header section of the page */}
        <div className="inset-0 -z-10">
          <Image
            src="/settingsbg.png"
            alt="Landing Image"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[var(--primary-color)] via-transparent to-transparent"></div>
        </div>

        <div className="flex flex-grow justify-center items-center">
            <h1 className="text-5xl text-white font-bold drop-shadow-xl">
              Settings
            </h1>
        </div>
      </div>

      {/* Settings Section Starts Here*/}
      <div className="bg-white max-w-[1920px] mx-auto px-6 md:px-12 py-6">
      <div className="max-w-[1520px] w-full mx-auto flex justify-between items-center px-6 md:px-12 py-6">
        <div className="w-56 text-sky-400 text-3xl font-bold font-sans leading-loose">
          Profile Name
        </div>
        <div className="w-[480px] text-zinc-900 text-sm font-normal font-sans leading-tight">
          Joined at <span className="font-bold font-['Inter']">DD/MM/YYYY</span>
        </div>
        <button onClick={handleEditClick}
            className="w-36 px-3 py-5 bg-sky-400 rounded-3xl flex justify-center items-center gap-2 text-white text-sm font-medium font-['Inter'] leading-tight"
          >
            {isEditing ? "Save" : "Edit Profile"}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
        {isEditing && (
            <button
              onClick={handleCancelClick}
              className="ml-4 px-3 py-5 bg-gray-300 rounded-3xl text-gray-700 text-sm font-medium font-['Inter'] leading-tight"
            >
              Cancel
            </button>
          )}
      </div>

      <hr className="border-stone-300 border-[1px] w-full max-w-[1520px] mx-auto" />

      {/* Account Details */}
      <section className="max-w-[1520px] w-full mx-auto relative px-6 md:px-12 py-8">
        <h2 className="text-black text-xl font-bold font-['Inter'] leading-normal mb-2">
          Account Details
        </h2>
        <p className="w-[480px] text-gray-500 text-sm font-normal font-['Inter'] leading-tight mb-6">
          This will edit your profile name, username, and password if you wish to do so!{" "}
          <strong>Note: If you can’t edit the field, please click the edit profile button beforehand.</strong>
        </p>

        {/* Fields side by side */}
        <div className="flex flex-wrap gap-6 max-w-[580px]">
            <div className="flex-1 min-w-[180px]">
              <label className="block text-gray-500 text-sm font-semibold font-['Inter'] leading-tight mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="e.g. JohnDoe123"
                disabled={!isEditing}
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full h-12 rounded-lg border px-3 font-normal font-['Inter'] leading-normal ${
                  isEditing ? "border-gray-400 text-black" : "border-gray-400 text-gray-400"
                }`}
              />
            </div>

            <div className="flex-1 min-w-[180px]">
              <label className="block text-gray-500 text-sm font-semibold font-['Inter'] leading-tight mb-1">
                Display Name
              </label>
              <input
                type="text"
                name="displayName"
                placeholder="e.g. Johnny Doe"
                disabled={!isEditing}
                value={formData.displayName}
                onChange={handleInputChange}
                className={`w-full h-12 rounded-lg border px-3 font-normal font-['Inter'] leading-tight ${
                  isEditing ? "border-gray-400 text-black" : "border-gray-400 text-gray-400"
                }`}
              />
            </div>

            <div className="flex-1 min-w-[180px]">
              <label className="block text-gray-500 text-sm font-semibold font-['Inter'] leading-tight mb-1">
                Password
              </label>
              <div className="relative w-full h-12 rounded-lg border border-gray-400 overflow-hidden">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className={`w-full h-full px-3 font-normal font-['Work_Sans'] leading-normal bg-transparent ${
                    isEditing ? "text-black" : "text-gray-400"
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  aria-label="Toggle password visibility"
                  disabled={!isEditing}
                >
                  {/* Eye icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-stone-300 border-[1px] w-full max-w-[1520px] mx-auto" />

      {/* Push Notifications */}
      <section className="max-w-[1520px] w-full mx-auto flex justify-between items-center bg-white py-4 px-6 md:px-12">
          <div className="w-[493px] flex flex-col gap-1">
            <h3 className="text-black text-xl font-bold font-['Inter'] leading-loose">
              Push Notifications
            </h3>
            <p className="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">
              This will allow our website to reach you via notifications to remind the task that you should be doing.
            </p>
          </div>

          {/* Toggle Switch */}
          <div
            onClick={togglePush}
            className={`relative w-20 h-7 rounded-3xl cursor-pointer transition-colors duration-300 ${
              pushEnabled ? "bg-blue-400" : "bg-neutral-600"
            }`}
          >
            <div
              className={`absolute w-6 h-6 bg-white rounded-full top-0.5 left-0.5 transition-transform duration-300 ${
                pushEnabled ? "translate-x-[13px]" : "translate-x-0"
              }`}
            />
          </div>

        </section>

        <hr className="border-stone-300 border-[1px] w-full max-w-[1520px] mx-auto" />

      {/* Task Prioritization */}
      <section className="max-w-[1520px] w-full mx-auto flex justify-start items-start gap-[453px] bg-white py-4 px-6 md:px-12">
        <div className="w-[493px] flex flex-col gap-1">
          <h3 className="text-black text-xl font-bold font-sans leading-loose">
            Task Prioritization
          </h3>
          <p className="text-gray-500 text-sm font-normal font-sans leading-tight">
            This will change how our artificial intelligence will help you in determining which task to complete first.
          </p>
        </div>

        {/* Example cards aligned right */}
        <div className="flex gap-6">
          <div className="w-60 h-40 bg-gray-100 rounded-lg shadow p-4">
            {/* Card 1 content */}
            Card 1
          </div>
          <div className="w-60 h-40 bg-gray-100 rounded-lg shadow p-4">
            {/* Card 2 content */}
            Card 2
          </div>
        </div>
      </section>
      </div>

     {/* Footer */}
        <div  className="relative w-full h-[10vh] flex">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/image (2).png"
              alt="Footer"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
            />
          </div>
  
          <div className="mx-auto my-auto text-white text-xl">
            <span className="font-bold">SmartSched,</span> Your Partner for Every Scheduling Needs
          </div>
        </div>
    </main>
  );
}