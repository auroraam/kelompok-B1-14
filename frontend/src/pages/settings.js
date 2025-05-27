import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { isAuthenticated } from '../auth';
import TaskPopUp from '@/components/popup';
import { useRouter } from "next/router";

export default function Home() {
  const [token, setToken] = useState(null);
  const [Popup, setPopup] = useState({
    isOpen: false,
    status: "",
    title: "",
    message: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('http://localhost:3000'); // redirect kalau belum login
    }
  }, []);

  const user = {
    name: "Jane Doe",
    avatarUrl: "/profileimage.png",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    password: "******",
    prioritization: "",
  });
  const [pushEnabled, setPushEnabled] = useState(false);

  // New state for active card in Task Prioritization
  const [activeCard, setActiveCard] = useState("Leisure");

  const fetchUserData = async (storedToken) => {
    try {
      const response = await axios.get("http://localhost:3500/user/id", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const data = response.data; // gunakan .data, bukan .json()
      setFormData({
        username: data.username,
        displayName: data.dname,
        password: "******",
        prioritization: data.prioritization,
      });
      setActiveCard(data.prioritization);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEditClick = () => {
    if (!isEditing && (!formData.username || !formData.displayName)) {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchUserData(storedToken);
    }
  }
  setIsEditing(true);
  };

  const handleCancelClick = () => {
    // Reset form or revert changes if needed
    setIsEditing(false);
  };

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const handleSave = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      const response = await axios.patch(
        "http://localhost:3500/user",
        {
          username: formData.username,
          dname: formData.displayName,
          passwordHash: formData.password !== "******" ? formData.password : undefined,
          prioritization: formData.prioritization,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      setPopup({
        isOpen: true,
        status: "success",
        title: "Update Successful",
        message: "Your data has been successfully updated!",
      });

      setFormData({
        username: "",
        displayName: "",
        password: "******",
        prioritization: "",
      });

      setIsEditing(false);
    } catch (error) {
      const msg = error?.response?.data?.message || "Error.";
      setPopup({
        isOpen: true,
        status: "error",
        title: "Update Failed",
        message: msg,
      });
    }
  };


  const togglePush = () => {
    setPushEnabled((prev) => !prev);
  };

  return (
    <main className="pt-15 relative">
      {/* Navbar */}
      <Navbar user={user} />

      {/* Header Section */}
      <div className="relative w-full h-[30vh] flex text-white">
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
          <h1 className="text-5xl text-white font-bold drop-shadow-xl">Settings</h1>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white max-w-[1920px] mx-auto px-6 md:px-12 py-6">
        <div className="max-w-[1520px] w-full mx-auto flex justify-between items-center px-6 md:px-12 py-6">
          <div className="w-56 text-sky-400 text-3xl font-bold font-sans leading-loose">
            Profile Name
          </div>
          {/* <div className="w-[480px] text-zinc-900 text-sm font-normal font-sans leading-tight">
            Joined at <span className="font-bold font-['Inter']">DD/MM/YYYY</span>
          </div> */}
          <button
            onClick={isEditing ? handleSave : handleEditClick}
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
        <section className="max-w-[1520px] w-full mx-auto px-6 md:px-12 py-8 flex gap-12">
          {/* Left side - Description */}
          <div className="flex-1 max-w-[480px]">
            <h2 className="text-black text-xl font-bold font-['Inter'] leading-normal mb-2">Account Details</h2>
            <p className="text-gray-700 text-sm font-normal font-['Inter'] leading-tight">
              This will edit your profile name, username, and password if you wish to do so!{" "}
              <strong>Note: If you can’t edit the field, please click the edit profile button beforehand.</strong>
            </p>
          </div>

          {/* Right side - Form fields */}
          <div className="flex-1 max-w-[580px] flex flex-col gap-6">
            <div>
              <label className="block text-gray-500 text-sm font-semibold font-['Inter'] leading-tight mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="e.g. JohnDoe123"
                disabled={!isEditing}
                value={formData.username}
                onChange={handleChange}
                className={`w-full h-12 rounded-lg border px-3 font-normal font-['Inter'] leading-normal ${
                  isEditing ? "border-blue-400 text-blue-400" : "border-gray-400 text-gray-400"
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-500 text-sm font-semibold font-['Inter'] leading-tight mb-1">
                Display Name
              </label>
              <input
                type="text"
                name="displayName"
                placeholder="e.g. Johnny Doe"
                disabled={!isEditing}
                value={formData.displayName}
                onChange={handleChange}
                className={`w-full h-12 rounded-lg border px-3 font-normal font-['Inter'] leading-tight ${
                  isEditing ? "border-blue-400 text-blue-400" : "border-gray-400 text-gray-400"
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-500 text-sm font-semibold font-['Inter'] leading-tight mb-1">
                Password
              </label>
              <div
                className={`relative w-full h-12 rounded-lg border overflow-hidden ${
                  isEditing ? "border-blue-400" : "border-gray-400"
                }`}
              >
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  disabled={!isEditing}
                  onChange={handleChange}
                  className={`w-full h-full px-3 font-normal font-['Work_Sans'] leading-normal bg-transparent ${
                    isEditing ? "text-blue-400" : "text-gray-400"
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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


        {/* Task Prioritization */}
        <section className="max-w-[1520px] w-full mx-auto flex justify-start items-start gap-[453px] bg-white py-4 px-6 md:px-12">
          <div className="w-[493px] flex flex-col gap-1">
            <h3 className="text-black text-xl font-bold font-sans leading-loose">Task Prioritization</h3>
            <p className="text-gray-500 text-sm font-normal font-sans leading-tight">
              This will change how our artificial intelligence will help you in determining which task to complete first.
            </p>
          </div>

          {/* Cards container */}
          <div className="flex gap-6">
            {/* Leisure Card */}
            <div
              onClick={() => {
                setActiveCard("Leisure");
                setFormData((prev) => ({ ...prev, prioritization: "Leisure" }));
              }}
              className={`flex flex-col items-center justify-center w-28 h-36 rounded-lg shadow-md p-4 cursor-pointer transition-colors duration-300
                ${
                  activeCard === "Leisure"
                    ? "bg-blue-100 border-4 border-blue-300"
                    : "bg-gray-100 border border-transparent"
                }
              `}
            >
              <Image src="/leisure.png" alt="Leisure" width={48} height={48} priority />
              <span
                className={`mt-3 font-semibold ${
                  activeCard === "Leisure" ? "text-blue-400" : "text-gray-700"
                }`}
              >
                Leisure
              </span>
            </div>

            {/* Fast-Paced Card */}
            <div
              onClick={() => {
                setActiveCard("Speedrun");
                setFormData((prev) => ({ ...prev, prioritization: "Speedrun" }));
              }}
              className={`flex flex-col items-center justify-center w-28 h-36 rounded-lg shadow-md p-4 cursor-pointer transition-colors duration-300
                ${
                  activeCard === "Speedrun"
                    ? "bg-blue-100 border-4 border-blue-300"
                    : "bg-gray-100 border border-transparent"
                }
              `}
            >
              <Image src="/fast-paced.png" alt="Fast-Paced" width={48} height={48} priority />
              <span
                className={`mt-3 font-semibold ${
                  activeCard === "Speedrun" ? "text-blue-400" : "text-gray-700"
                }`}
              >
                Speedrun
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="relative w-full h-[10vh] flex">
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
      <TaskPopUp
        isOpen={Popup.isOpen}
        status={Popup.status}
        title={Popup.title}
        message={Popup.message}
        onClose={() => setPopup({ ...Popup, isOpen: false })}
      />
    </main>
  );
}
