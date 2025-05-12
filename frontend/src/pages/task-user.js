import Navbar from "@/components/Navbar";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import TaskCard2 from "@/components/Task-card-2";
import { useState } from "react";
import CreateTaskModal from "@/components/CreateTaskModal";
import EditTaskModal from "@/components/EditTaskModal";
import TaskDeletePopUp from "@/components/TaskDeletePopUp";

export default function Home() {
  // State for selected task to edit
  const [selectedTask, setSelectedTask] = useState(null);

  // Separate state variables for create and edit modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSortOption, setSortSelectedOption] = useState(null);

  // Tasks list state (added setter to allow deletion)
  const [tasks, setTasks] = useState([
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
  ]);

  // User info
  const user = {
    name: "Jane Doe",
    avatarUrl: "/profileimage.png",
  };

  // Task creation status
  const [taskStatus, setTaskStatus] = useState(null); // null | "loading" | "success" | "error"
  const toggleDropdown = () => setIsSortOpen(!isSortOpen);

  // Delete popup states
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  // Open edit modal and set selected task
  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  // Close edit modal and clear selected task
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  // Close create modal
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  // Handle saving edited task (you can update your tasks state here)
  const handleSave = (updatedTask) => {
    console.log("Save updated task:", updatedTask);
    // Example: update the task in the tasks list
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    handleCloseEditModal();
  };

  // Handle task creation submission
  const handleTaskSubmit = async (taskData) => {
    setTaskStatus("loading");

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Add new task to tasks list (assign a new id)
      setTasks((prev) => [
        ...prev,
        { ...taskData, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
      ]);

      setTaskStatus("success");
      handleCloseCreateModal();
    } catch (error) {
      setTaskStatus("error");
    }
  };

  const handleCloseStatus = () => {
    setTaskStatus(null);
  };

  const handleRetry = () => {
    setTaskStatus("loading");
    // Retry logic here if needed
  };

  // Delete popup handlers
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

  const handleOptionClick = (option) => {
    setSortSelectedOption(option);
    setIsSortOpen(false);
    if (onSortChange) onSortChange(option);
  };

  

  return (
    <main className="pt-15">
      <Navbar user={user} />

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
          <h1 className="text-5xl text-white font-bold">Tasks</h1>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-white p-5">
        <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-4xl mb-5">
        <div className="relative inline-block text-left flex-1">
  {/* Dropdown trigger */}
  <div
    className="flex justify-between items-center border border-blue-400 rounded-full px-4 py-2 cursor-pointer min-h-full w-full"
    onClick={toggleDropdown}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter') toggleDropdown(); }}
  >
    <span className="text-blue-400">
      {selectedSortOption === 'asc'
        ? 'Date Ascending'
        : selectedSortOption === 'desc'
        ? 'Date Descending'
        : 'Sort By'}
    </span>
    <IoIosArrowDown className="text-blue-400 ml-2" />
  </div>

  {/* Dropdown menu */}
  {isSortOpen && (
    <div className="absolute right-0 mt-2 w-full bg-white border border-blue-400 rounded-2xl shadow-lg z-10">
      <ul className="py-1">
        <li
          className="px-4 py-2 text-blue-400 hover:bg-blue-50 cursor-pointer"
          onClick={() => handleOptionClick('asc')}
        >
          Date Ascending
        </li>
        <li
          className="px-4 py-2 text-blue-400 hover:bg-blue-50 cursor-pointer"
          onClick={() => handleOptionClick('desc')}
        >
          Date Descending
        </li>
      </ul>
    </div>
  )}
</div>


          <button
            className="flex-1 gradient-button font-normal px-6 py-2 min-h-full"
            onClick={() => setIsCreateModalOpen(true)}
          >
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
                    key={task.id}
                    {...task}
                    onEdit={() => handleEditClick(task)}
                    onDelete={() => openDeletePopup(task)}
                  />
                ))}

                {/* Example static task card (optional) */}
                <TaskCard2
                  title="Task One"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          onSubmit={handleTaskSubmit}
        />
      )}

      {/* Edit Task Modal */}
      {isEditModalOpen && selectedTask && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          task={selectedTask}
          onSubmit={handleSave}
        />
      )}

      {/* Delete Task Popup */}
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
