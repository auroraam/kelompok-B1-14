import Navbar from "@/components/Navbar";
import TaskCard from "@/components/Task-card";
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
              SmartSched, Schedule with Care!
            </h1>

          <p className="flex text-justify mt-4 text-lg leading-relaxed text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
          aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
          qui officia deserunt mollit anim id est laborum.
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
              Here Is Your To Do List
            </h2>
            
            <p className="text-black mt-3">
              Goodluck! We know you could do this
            </p>
            
            <div className="flex flex-col items-center mt-3">
              <div>
                <h3 className="bg-[var(--primary-color)] text-white rounded-full px-2 py-1 inline-block mb-2">
                  Due Today
                </h3>

                <TaskCard
                  title="Task One"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat."
                  priority="High"
                  imageUrl="/image (8).png" // Ganti dengan path gambarmu
                />
              </div>
            </div>

            <div className="flex flex-col items-center mt-3">
              <div>
                <h3 className="bg-[var(--primary-color)] text-white rounded-full px-2 py-1 inline-block mb-2">
                  Due Tomorrow
                </h3>

                <TaskCard
                  title="Task Two"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat."
                  priority="High"
                  imageUrl="/image (8).png" // Ganti dengan path gambarmu
                />
              </div>
            </div>

            <div className="mt-6 flex">
              <Link
              href="/tasks"
              className="gradient-button font-normal px-6 py-2 ml-auto"
              >
              Check All of My To-Do List
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p className="text-white mt-2 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id est laborum.
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