import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="pt-15">
      <Navbar />

      <div className="relative w-full h-[90vh] flex text-white">
        <div className="inset-0 -z-10">
          <Image
            src="/imag.jpeg"
            alt="Landing Image"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        </div>

        <div className="max-w-5xl py-30 px-25">
            <h1 className="text-5xl text-stroke-white-200 font-extrabold gradient-text"
              >
              Your AI-Powered Task Manager for Maximum Efficiency
            </h1>

          <p className="flex text-justify mt-4 text-lg leading-relaxed text-white">
          Struggling with deadlines? Overwhelmed by your to-do list? SmartSched is here to revolutionize the way you manage your time. Powered by AI, our smart task manager helps you prioritize, organize, and optimize your daily tasks effortlessly.
          Start focusing on what truly matters—let SmartSched handle the rest!
          </p>

          <div className="mt-4">
            <Link
            href="/sign-in"
            className="gradient-button font-normal px-6 py-2"
            >
            Get Started Now!
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white py-10 px-4">
        <div className="max-w-5xl mx-auto flex items-center gap-8">
          <img
            src="/image (1).png"
            alt="Illustration"
            className="w-72"
          />

          <div>
            <h2 className="text-3xl font-bold gradient-text">
              To Unlock This List, <br /> You Should Login First
            </h2>
            
            <p className="text-black mt-3">
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
      </div>

      <div  className="relative w-full h-[80vh] flex overflow-hidden">
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

        <div className="px-25 mx-auto flex items-center gap-8 text-justify">
          <div className="max-w-[60%]">
            <h2 className="text-3xl font-bold text-white">
              What Are We?
            </h2>
            
            <p className="text-white mt-3 text-justify">
            SmartSched is an AI-driven task management platform designed to help students, 
            professionals, and teams stay ahead of their schedules. Whether you are managing 
            assignments, work projects, or daily tasks, SmartSched analyzes deadlines, urgency, 
            and workload to provide a smart, efficient, and personalized scheduling experience.
            </p>
            <h2 className="text-3xl font-bold text-white">
              Who Is SmartSched For?
            </h2>

            <p className="text-white mt-2 text-justify">
            Students – Organize assignments, exams, and projects easily
            </p>
            <p className="text-white mt-2 text-justify">
            Professionals – Manage work tasks, meetings, and deadlines
            </p>
            <p className="text-white mt-2 text-justify">
            Teams – Collaborate on projects and share schedules
            </p>

          </div>
          
          <div className="aspect-square w-full h-[45vh] relative">
            <Image
              src="/image.jpeg"
              alt="Planner"
              className="rounded-lg shadow-lg"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
            />
          </div>
        </div>
      </div>

      <div className="bg-white py-15 px-25">
        <h2 className="text-4xl font-bold gradient-text text-center mb-8">
          Why You Should Pick Us!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white shadow-lg rounded-2xl overflow-hidden">
              <div className="relative w-full h-56">
                <div className="absolute inset-0 bg-gray-100 z-0"></div>
                <img
                  src="/image (5).png"
                  alt="Illustration"
                  className="w-full h-56 object-cover relative z-10"
                />
                
              </div>
              

              <div className="p-6">
                <p className="text-gray-500 mb-2">Productivity</p>

                <h3 className="text-black text-xl font-semibold mb-3">
                  Amet minim mollit non deserunt ullamco
                </h3>

                <p className="text-black mb-4">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                  sint. Velit officia consequat duis enim.
                </p>

                <div className="flex justify-between items-center">
                  <a href="#" className="text-blue-600 font-medium ml-auto">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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