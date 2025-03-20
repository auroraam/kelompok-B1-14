import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import TaskCard2 from "@/components/Task-card-2";

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

			<div className="flex flex-col items-center justify-center bg-white p-5">
				<div className="flex flex-wrap items-center items-stretch justify-center gap-4 w-full max-w-4xl mb-5">
					<div className="flex flex-1 items-center border border-blue-400 rounded-full px-4 py-2 min-h-full">
						<FaSearch className="text-blue-400 mr-2" />
						<input
							type="text"
							placeholder="Search Tasks Here"
							className="outline-none bg-transparent text-blue-400 placeholder-blue-400 w-full"
						/>
					</div>

					<div className="flex flex-1 items-center border border-blue-400 rounded-full px-4 py-2 cursor-pointer min-h-full">
						<span className="text-blue-400">Sort By</span>
						<IoIosArrowDown className="text-blue-400 ml-2" />
					</div>

					<button className="flex-1 gradient-button font-normal px-6 py-2 min-h-full">
						Create A Task Now
					</button>
				</div>

				<div>
					<div className="flex flex-col items-center mt-4">
						<div>
							<h3 className="bg-[var(--red-one)] text-white rounded-full px-3 py-1 inline-block mb-3">
								Urgent-Level Tasks
							</h3>

							<div className="flex flex-col mb-3">
								<TaskCard2
									title="Task One"
									description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
									dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat."
									priority="High"
									imageUrl="/image (8).png" 
								/>
							</div>

							<div className="flex flex-col mb-3">
								<TaskCard2
									title="Task Two"
									description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
									dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat."
									priority="High"
									imageUrl="/image (8).png" 
								/>
							</div>

							<div className="flex flex-col mb-3">
								<TaskCard2
									title="Task Three"
									description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
									dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat."
									priority="High"
									imageUrl="/image (8).png" 
								/>
							</div>

							<div className="flex flex-col mb-3">
								<TaskCard2
									title="Task Four"
									description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
									dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat."
									priority="High"
									imageUrl="/image (8).png" 
								/>
							</div>
						</div>
						<div>
							<h3 className="bg-[var(--orange-one)] text-white rounded-full px-3 py-1 inline-block mb-3 mt-2">
								Moderate-Level Tasks
							</h3>

							<div className="flex flex-col mb-3">
								<TaskCard2
									title="Task One"
									description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
									dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat."
									priority="Medium"
									imageUrl="/image (8).png" 
								/>
							</div>

							<div className="flex flex-col mb-3">
								<TaskCard2
									title="Task Two"
									description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
									dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat."
									priority="Medium"
									imageUrl="/image (8).png" 
								/>
							</div>

							<div className="flex flex-col mb-3">
								<TaskCard2
									title="Task Three"
									description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
									dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat."
									priority="Medium"
									imageUrl="/image (8).png" 
								/>
							</div>

							<div className="flex flex-col mb-3">
								<TaskCard2
									title="Task Four"
									description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
									dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat."
									priority="Medium"
									imageUrl="/image (8).png" 
								/>
							</div>
						</div>
						<div>
							<h3 className="bg-[var(--green-one)] text-white rounded-full px-3 py-1 inline-block mb-3 mt-2">
								Chill-Level Tasks
							</h3>

							<div className="flex flex-col mb-3">
								<TaskCard2
									title="Task One"
									description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
									dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat."
									priority="Low"
									imageUrl="/image (8).png" 
								/>
							</div>

							<div className="flex flex-col mb-3">
								<TaskCard2
									title="Task Two"
									description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
									dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat."
									priority="Low"
									imageUrl="/image (8).png" 
								/>
							</div>

							<div className="flex flex-col mb-3">
								<TaskCard2
									title="Task Three"
									description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
									dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat."
									priority="Low"
									imageUrl="/image (8).png" 
								/>
							</div>

							<div className="flex flex-col mb-3">
								<TaskCard2
									title="Task Four"
									description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
									dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                  consequat."
									priority="Low"
									imageUrl="/image (8).png" 
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

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
		</main>
	);
}