import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import TaskCard2 from "@/components/Task-card-2";
import { useState } from "react";
import CreateTaskModal from "@/components/CreateTaskModal";
import EditTaskModal from "@/components/EditTaskModal";
import TaskDeletePopUp from "@/components/TaskDeletePopUp";

export default function Home() {

	const [selectedTask, setSelectedTask] = useState(null);
  
	const tasks = [
	  {
		id: 1,
		title: "Example Task",
		description: "This is a sample task description.",
		priority: "High",
		imageUrl: "/image (8).png",
		dueDate: "2024-05-10",
		category: "Housework",
		difficulty: "Hard",
		subTasks: ["Subtask 1", "Subtask 2"],
	  },
	];
  
	const handleEditClick = (task) => {
	  setSelectedTask(task);
	  setIsModalOpen(true);
	};
  
	const handleCloseModal = () => {
	  setIsModalOpen(false);
	  setSelectedTask(null);
	};
  
	const handleSave = (updatedTask) => {
	  console.log("Save updated task:", updatedTask);
	  // Update your tasks state here accordingly
	  handleCloseModal();
	};
	
	const [isModalOpen, setIsModalOpen] = useState(false);
	const user = {
		name: "Jane Doe",
		avatarUrl: "/profileimage.png" }
	const [taskStatus, setTaskStatus] = useState(null); // null | "loading" | "success" | "error"
		
	// Simulate task creation process
	const handleTaskSubmit = async (taskData) => {
		setTaskStatus("loading");
	
		try {
		  // Replace with your real API call
		  await new Promise((resolve) => setTimeout(resolve, 3000));
	
		  setTaskStatus("success");
		  setIsModalOpen(false);
		} catch (error) {
		  setTaskStatus("error");
		}
	  };
	
	  const handleCloseStatus = () => {
		setTaskStatus(null);
	  };
	
	  const handleRetry = () => {
		setTaskStatus("loading");
		// You can retry the API call here or re-open the create modal
	  };

	  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const openDeletePopup = (task) => {
    setTaskToDelete(task);
    setDeletePopupOpen(true);
    setDeleteError(false);
  };

  const closeDeletePopup = () => {
    setDeletePopupOpen(false);
    setTaskToDelete(null);
    setDeleteLoading(false);
    setDeleteError(false);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    setDeleteError(false);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Remove the task from the list
      setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));

      closeDeletePopup();
    } catch (error) {
      setDeleteError(true);
      setDeleteLoading(false);
    }
};

	  
	return (
		<main className="pt-15">
			<Navbar user={user}/>

			<div className="relative w-full h-[30vh] flex text-white">
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
				<div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-4xl mb-5">
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

					<button className="flex-1 gradient-button font-normal px-6 py-2 min-h-full" onClick={() => setIsModalOpen(true)} >
						Create A Task Now
					</button>
				</div>

				<div>
					<div className="flex flex-col items-center mt-4">
						<div>
							<h3 className="bg-[var(--red-one)] text-white rounded-full px-3 py-1 inline-block mb-3">
								Urgent-Level Tasks
							</h3>

							<div className="flex flex-col mb-3 space-y-2">
							{tasks.map((task) => (
								<TaskCard2
									key={task.id}s
									{...task}
									onEdit={() => handleEditClick(task)}
									onDelete={() => openDeletePopup(task)}
								/>
								))}
						
								{isModalOpen && selectedTask && (
								<EditTaskModal
									isOpen={isModalOpen}
									onClose={handleCloseModal}
									task={selectedTask}
									onSubmit={handleSave}
								/>
		)}
								<TaskCard2
									title="Task One"
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

			<CreateTaskModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleTaskSubmit} // Pass submit handler to modal 
				/>
			<TaskDeletePopUp
        isOpen={deletePopupOpen}
        onClose={closeDeletePopup}
        onDelete={handleDelete}
        loading={deleteLoading}
        error={deleteError}
      />
		</main>
	);
}