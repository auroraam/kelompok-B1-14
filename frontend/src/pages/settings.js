import Navbar from "@/components/Navbar";
import Image from "next/image";


export default function Home() {
  return (
    <main>
      <Navbar />
      <div class="self-stretch h-80 relative bg-white border-t border-sky-400 overflow-hidden">
    <div class="w-0 h-[2124px] left-[-50px] top-[-70.94px] absolute origin-top-left -rotate-90 bg-gradient-to-r from-black to-black/0"></div>
                <Image
                  src="/image (1).jpeg"
                  alt="Landing Image"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  priority
                />
      <div class="w-[1941px] h-[507.67px] left-[-10px] top-[128px] absolute bg-gradient-to-b from-blue-500/0 to-blue-500"></div>
      <div class="w-[1941px] h-[507.67px] left-[-10px] top-[128px] absolute bg-gradient-to-b from-blue-500/0 to-blue-500"></div>
      <div class="w-[1941px] h-[507.67px] left-[-10px] top-[-54.67px] absolute bg-neutral-950/10"></div>
      <div class="left-[780px] top-[150px] absolute inline-flex flex-col justify-end items-center">
          <div class="text-center justify-start text-white text-5xl font-bold font-['Inter']">Settings</div>
    </div>
      </div>

    <div class='self-stretch h-2000 relative bg-white border-t border-sky-400 overflow-hidden'>
    </div>
    
      
    </main>
  );
}