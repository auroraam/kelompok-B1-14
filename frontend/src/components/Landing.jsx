import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center text-white">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/imag.jpeg"
          alt="Landing Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="max-w-3xl text-left px-6">
        <h1 className="text-5xl font-extrabold leading-tight">
          <span className="text-secondary">SmartSched, Schedule with Care!</span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-black">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        {/* Call To Action Button */}
        <Link href="/auth">
          <button className="mt-8 bg-primary text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-secondary transition">
            Get Started Now!
          </button>
        </Link>
      </div>
    </div>
  );
}