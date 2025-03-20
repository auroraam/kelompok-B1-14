import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="pt-15">
      <Navbar />

      <div className="relative w-full h-[50vh] flex text-white">
        <div className="inset-0 -z-10">
          <Image
            src="/image (1).jpeg"
            alt="Landing Image"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[var(--primary-color)] via-transparent to-transparent"></div>
        </div>

        <div className="flex flex-grow justify-center items-center">
            <h1 className="text-5xl text-white font-bold">
              Tasks
            </h1>
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