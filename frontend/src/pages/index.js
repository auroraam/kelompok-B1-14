import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import TaskCardPopUp from "@/components/TaskCardPopup";
import FeatureCard from "@/components/featureCard";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const user = {
    name: "Your display name",
    avatarUrl: "/profileimage.png",
  };
  const features = [
    {
      imageSrc: "/ai-powered.png",
      title: "AI-Powered Prioritization",
      description: "No more guesswork! Let AI determine which tasks need your attention first",
    },
    {
      imageSrc: "/smart-reminders.png",
      title: "Smart Reminders & Notifications",
      description: "Never miss a deadline with intelligent reminders tailored to your habits",
    },
    {
      imageSrc: "/task-syncing.png",
      title: "Seamless Task Syncing",
      description: "Integrate with your calendar and to-do lists for a smooth workflow",
    },
    {
      imageSrc: "/minimalist-design.png",
      title: "Minimalist & User-Friendly Design",
      description: "Stay productive with a clean and distraction-free interface",
    },
  ]
  

  return (
    <main className="pt-16">
      <Navbar user={user} />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] text-white flex items-center">
  <div className="absolute inset-0 -z-10">
    <Image
      src="/imag.jpeg"
      alt="Landing Image"
      layout="fill"
      objectFit="cover"
      quality={100}
      priority
    />
    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white via-transparent to-transparent" />
  </div>

  {/* Centered container with max width and padding */}
  <div className="container mx-auto px-6 md:px-12 py-20">
    <h1 className="text-5xl font-extrabold text-blue-400 drop-shadow-lg max-w-3xl">
      Your AI-Powered Task Manager for Maximum Efficiency
    </h1>

    <p className="mt-6 max-w-3xl text-lg leading-relaxed drop-shadow-lg">
      Struggling with deadlines? Overwhelmed by your to-do list? SmartSched is here to revolutionize the way you manage your time. Powered by AI, our smart task manager helps you prioritize, organize, and optimize your daily tasks effortlessly. Start focusing on what truly matters—let SmartSched handle the rest!
    </p>

    <div className="mt-8 flex gap-4 flex-wrap">
      <Link
        href="/sign-in"
        className="gradient-button font-normal px-6 py-2"
      >
        Get Started Now!
      </Link>
    </div>
  </div>
  {showPopup && (
            <TaskCardPopUp
              status="success" // change to "loading" or "success" to test
              onClose={() => setShowPopup(false)}
              onRetry={() => alert("Retry clicked!")}
            />
          )}
</section>


      {/* Login Prompt Section */}
      <section className="bg-white py-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <Image
            src="/image (1).png"
            width={300}
            height={300}
            alt="Illustration"
            className="w-72"
          />

          <div>
            <h2 className="text-3xl font-bold text-blue-400">
              To Unlock This List, <br /> You Should Login First
            </h2>

            <p className="text-cyan-900 mt-4 max-w-md">
              Try logging in firsthand to experience our AI-driven priority-deciding system!
            </p>

            <div className="mt-6">
              <Link
                href="/sign-in"
                className="gradient-button font-normal px-6 py-2"
              >
                Log In Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        <div className="absolute inset-0 -z-10 scale-[1.01]">
          <Image
            src="/image.jpg"
            alt="Background"
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            quality={100}
          />
        </div>
        

        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 h-full text-white">
          <div className="max-w-2xl space-y-6">
            <h2 className="text-3xl font-bold">What Are We?</h2>
            <p>
              SmartSched is an AI-driven task management platform designed to help students, professionals, and teams stay ahead of their schedules. Whether you are managing assignments, work projects, or daily tasks, SmartSched analyzes deadlines, urgency, and workload to provide a smart, efficient, and personalized scheduling experience.
            </p>

            <h2 className="text-3xl font-bold mt-8">Who Is SmartSched For?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Students – Organize assignments, exams, and projects easily</li>
              <li>Professionals – Manage work tasks, meetings, and deadlines</li>
              <li>Teams – Collaborate on projects and share schedules</li>
            </ul>
          </div>

          <div className="relative w-full max-w-lg h-[45vh] rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/image.jpeg"
              alt="Planner"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="bg-white">
      <section className="bg-white max-w-6xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {features.map(({ imageSrc, title, description }) => (
        <FeatureCard
          key={title}
          imageSrc={imageSrc}
          title={title}
          description={description}
        />
      ))}
    </section>
    </div>


      {/* Footer Section */}
      <footer className="relative w-full h-[10vh] flex items-center justify-center text-white text-xl">
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
        <div className="max-w-5xl mx-auto font-semibold drop-shadow-2xl">
          <span>SmartSched,</span> Your Partner for Every Scheduling Needs!
        </div>
      </footer>
    </main>
  );
}
