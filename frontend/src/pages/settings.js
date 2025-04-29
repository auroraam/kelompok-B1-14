import Navbar from "@/components/Navbar";
import Image from "next/image";


export default function Home() {
  const user = {
    name: "Jane Doe",
    avatarUrl: "/images/profile.jpg" }
  return (
    <main className="pt-15">
      <Navbar user={user} />
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
    {/* Settings Starts Here  */}
    {/* Profile Section */}
      <div class="self-stretch h-[905px] px-25 py-7 bg-white inline-flex flex-col justify-start items-start gap-5">
          <div class="w-[1520px] inline-flex justify-between items-center">
        <div class="w-56 justify-center text-sky-400 text-3xl font-bold font-sans leading-loose">Profile Name</div>
        <div class="w-[479.80px] justify-start"><span class="text-zinc-900 text-sm font-normal font-sans leading-tight">Joined at </span><span class="text-zinc-900 text-sm font-bold font-['Work_Sans'] leading-tight">DD/MM/YYYY</span></div>
        <img class="w-32 h-28 rounded-full shadow-[0px_4px_10px_0px_rgba(19,33,19,0.12)]" src="https://placehold.co/126x120" />
        <div class="w-28 h-28 rounded-full"></div>
        <div class="w-32 h-28 rounded-full shadow-[0px_4px_10px_0px_rgba(19,33,19,0.12)] border-4 border-blue-500"></div>
        <div class="w-36 px-3 py-5 bg-sky-400 rounded-3xl flex justify-center items-center gap-2">
            <div class="text-right justify-center text-white text-sm font-medium font-['Work_Sans'] leading-tight">Edit Profile</div>
            <div class="w-4 h-4 relative">
                <div class="w-3 h-3 left-[4.07px] top-[0.51px] absolute bg-white border-white"></div>
                <div class="w-3.5 h-3.5 left-[1.02px] top-[1.02px] absolute bg-white border-white"></div>
            </div>
        </div>
    </div>
    <div class="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-stone-300" />  {/*Line 1 */}


    {/*Edit Section */}
    <div class="w-[1520px] h-[300px] relative" >
    <div class="w-72 left-0 top-0 absolute justify-center text-black text-xl font-bold font-['Inter'] leading-normal">Account Details</div>
    <div class="w-[480px] h-14 left-0 top-[26px] absolute text-justify justify-start"><span class="text-gray-500 text-sm font-normal font-['Inter'] leading-tight">This will edit your profile name, username, and password if you wish to do so! </span><span class="text-gray-500 text-sm font-bold font-['Inter'] leading-tight">Note: If you can’t edit the field, please click the edit profile button beforehand.</span></div>
    <div class="w-[579.67px] left-[940.33px] top-0 absolute bg-white inline-flex flex-col justify-start items-start gap-3">
        <div class="w-[580px] flex flex-col justify-start items-start gap-2">
            <div class="w-64 justify-start text-gray-500 text-sm font-semibold font-['Inter'] leading-tight">Username</div>
            <div class="w-[580px] h-12 relative rounded-lg outline-[1.40px] outline-offset-[-1.40px] outline-gray-400 overflow-hidden">
                <div class="w-64 left-[12px] top-[12px] absolute justify-start text-gray-400 text-base font-normal font-['Inter'] leading-normal">e.g. JohnDoe123</div>
            </div>
        </div>
        <div class="flex flex-col justify-start items-start gap-2">
            <div class="w-64 justify-start text-gray-500 text-sm font-semibold font-['Inter'] leading-tight">Display Name</div>
            <div class="w-[579px] h-12 relative rounded-lg outline-[1.40px] outline-offset-[-1.40px] outline-gray-400 overflow-hidden">
                <div class="w-64 left-[12px] top-[12px] absolute justify-start text-gray-400 text-base font-normal font-['Inter'] leading-tight">e.g. Johnny Doe</div>
            </div>
        </div>
        <div class="self-stretch flex flex-col justify-start items-start gap-1">
            <div class="w-64 justify-start text-gray-500 text-sm font-semibold font-['Inter'] leading-tight">Password</div>
            <div class="w-[580px] h-12 relative rounded-lg outline outline-[1.40px] outline-offset-[-1.40px] outline-gray-400 overflow-hidden">
                <div class="w-[539px] left-[11.67px] top-[12px] absolute inline-flex justify-between items-center">
                    <div class="w-64 justify-start text-gray-400 text-base font-normal font-['Work_Sans'] leading-normal">******</div>
                    <div class="w-6 h-6 relative">
                        <div class="w-6 h-3.5 left-[0.75px] top-[4.50px] absolute bg-gray-400"></div>
                        <div class="w-2 h-2 left-[7.50px] top-[7.50px] absolute bg-gray-400"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  <div class="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-stone-300" />  {/*Line 1 */}
    {/*Push Notifications */}
    <div class="self-stretch bg-white inline-flex justify-between items-center">
    <div class="w-[493px] inline-flex flex-col justify-start items-start gap-0.5">
        <div class="justify-center text-black text-xl font-bold font-['Inter'] leading-loose">Push Notifications</div>
        <div class="w-[480px] h-14 justify-start text-gray-500 text-sm font-normal font-['Inter'] leading-tight">This will allow our website to reach you via notifications to remind the task that you should be doing.</div>
    </div>
    <div class="w-20 h-7 bg-neutral-600 rounded-3xl"></div>
    <div class="w-6 h-6 bg-white rounded-full"></div>
    <div class="w-6 h-6 bg-red-600 rounded-full"></div>
    <div class="w-3 h-2 text-center justify-start text-blue-600 text-[7.20px] font-normal font-sans">ON<br/></div>
    <div class="w-4 h-2 text-center justify-start text-neutral-600 text-[7.20px] font-normal font-sans">OFF</div>
</div>
  <div class="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-stone-300" />  {/*Line 1 */}
    <div class="self-stretch bg-white inline-flex justify-start items-start gap-[453px]">
        <div class="w-[493px] inline-flex flex-col justify-start items-start gap-0.5">
            <div class="justify-center text-black text-xl font-bold font-sans leading-loose">Task Prioritization</div>
            <div class="w-[480px] h-14 justify-start text-gray-500 text-sm font-normal font-sans leading-tight">This will change how our artificial intelligence will help you in determining which task to complete first.</div>
        </div>
    </div>
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