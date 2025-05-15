import Navbar from "@/components/Navbar";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import TaskCard2 from "@/components/Task-card-2";
import { useEffect, useState } from "react";
import CreateTaskModal from "@/components/CreateTaskModal";
import EditTaskModal from "@/components/EditTaskModal";
import TaskDeletePopUp from "@/components/TaskDeletePopUp";
import axios from "axios";
import { isAuthenticated } from '../auth';
import { useRouter } from "next/router";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  // State for selected task to edit
  const [selectedTask, setSelectedTask] = useState(null);
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // Separate state variables for create and edit modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSortOption, setSortSelectedOption] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('http://localhost:3000/tasks'); // redirect kalau belum login
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) {
          router.replace('http://localhost:3000/tasks'); // redirect kalau belum login
    } else{const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      fetchTasks(storedToken);
    }
  }, []);

  const fetchTasks = async (storedToken) => {
      try {
        const response = await axios.get("http://localhost:3500/task/user", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }); // Sesuaikan dengan route kamu
        const data = response.data;

        // Jika data bentuknya dikelompokkan berdasarkan priority
        const allTasks = [
          ...(data.High || []),
          ...(data.Medium || []),
          ...(data.Low || [])
        ];

        setTasks(allTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return selectedSortOption === "asc"
      ? dateA - dateB
      : selectedSortOption === "desc"
      ? dateB - dateA
      : 0;
  });

  const groupedTasks = {
    High: sortedTasks.filter((task) => task.priority === "High"),
    Medium: sortedTasks.filter((task) => task.priority === "Medium"),
    Low: sortedTasks.filter((task) => task.priority === "Low"),
  };

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
  const handleSave = async (updatedTask) => {
    try {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      if (!updatedTask._id) {
      console.error("Error: updatedTask._id is undefined!");
      console.log(updatedTask)
      return;
    }
      const response = await axios.patch(
        `http://localhost:3500/task?taskId=${updatedTask._id}`,
        {
    title: updatedTask.title,
    description: updatedTask.description,
    deadline: updatedTask.deadline,
    difficulty: updatedTask.difficulty,
    priority: updatedTask.priority,
    subtasks: updatedTask.subtasks,
  },
        {
          
          
        }
      );

    const updated = response.data.task;

    // Update task di state lokal
    setTasks(prev =>
      prev.map(task => (task._id === updated._id ? updated : task)));
      handleCloseEditModal();
      router.reload();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Handle task creation submission
  const handleTaskSubmit = async (taskData) => {
    setTaskStatus("loading");

    try {
      // Simulate API call delay
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      const response = await axios.post("http://localhost:3500/task", taskData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });

      const newTask = response.data;

      // Add new task to tasks list (assign a new id)
      setTasks((prev) => [...prev, newTask]);
      setTaskStatus("success");
      handleCloseCreateModal();
      router.reload();
    } catch (error) {
      console.error("Error:", error);
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
    console.log("Task to delete:", task);
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

  const handleDelete = async (deletedTask) => {
    if (!deletedTask?._id) {
    console.error("No task ID provided for deletion");
    return;
  }
    setDeleteLoading(true);
    setDeleteError(false);
    try {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      if (!deletedTask._id) {
      console.error("Error: deletedTask._id is undefined!");
      console.log(deletedTask)
      }
      const response = await axios.delete(
        `http://localhost:3500/task?taskId=${deletedTask._id}`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Remove the task from the list
      setTasks((prev) => prev.filter((t) => t._id !== deletedTask._id));

      closeDeletePopup();
    } catch (error) {
      console.error("Delete error:", error);
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
          <div className="flex flex-col w-full mt-4">
            <div className="w-full">
              <h3 className="bg-[var(--red-one)] text-white rounded-full px-3 py-1 inline-block mb-3">
                Urgent-Level Tasks
              </h3>

              <div className="flex flex-col w-full mb-3 space-y-2">
                {tasks
                .filter((task) => task.priority === "High")
                .map((task) => (
                  <TaskCard2
                    key={task.id}
                    {...task}
                    onEdit={() => handleEditClick(task)}
                    onDelete={() => openDeletePopup(task)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full">
              <h3 className="bg-[var(--orange-one)] text-white rounded-full px-3 py-1 inline-block mb-3 mt-2">
                Moderate-Level Tasks
              </h3>

              <div className="flex flex-col mb-3 w-full space-y-2">
                {tasks
                .filter((task) => task.priority === "Medium")
                .map((task) => (
                  <TaskCard2
                    key={task.id}
                    {...task}
                    onEdit={() => handleEditClick(task)}
                    onDelete={() => openDeletePopup(task)}
                  />
                ))}
              </div>
            </div>

            <div className="w-full">
              <h3 className="bg-[var(--green-one)] text-white rounded-full px-3 py-1 inline-block mb-3 mt-2">
                Chill-Level Tasks
              </h3>

              <div className="flex flex-col mb-3 w-full space-y-2">
                {tasks
                .filter((task) => task.priority === "Low")
                .map((task) => (
                  <TaskCard2
                    key={task.id}
                    {...task}
                    onEdit={() => handleEditClick(task)}
                    onDelete={() => openDeletePopup(task)}
                  />
                ))}
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
      {deletePopupOpen && taskToDelete && (
        <TaskDeletePopUp
        isOpen={deletePopupOpen}
        onClose={closeDeletePopup}
        onDelete={handleDelete}
        loading={deleteLoading}
        error={deleteError}
        task={taskToDelete}
      />
      )}
    </main>
  );
}
