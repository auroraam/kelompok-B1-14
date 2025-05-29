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
import TaskPopUp from '@/components/popup';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  // State for selected task to edit
  const [selectedTask, setSelectedTask] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("priority"); // atau "difficulty"


  // Separate state variables for create and edit modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSortOption, setSortSelectedOption] = useState("asc");
  const [Popup, setPopup] = useState({
    isOpen: false,
    status: "",
    title: "",
    message: "",
  });
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({
    name: "Jane Doe",
    avatarUrl: "/profileimage.png",
  });
  const [showHiddenTasks, setShowHiddenTasks] = useState(false);
  const [showDoneTask, setShowDoneTask] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.replace(`${process.env.NEXT_PUBLIC_FRONTEND_BASEURL}/tasks`);
    }
  }, []);

  useEffect(() => {
    if (token) {
      updateLateStatus(token).then(() => {
        fetchTasks(token);
        fetchUserName(token)
      });
    }
  }, [token]);

  const updateLateStatus = async (storedToken) => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/task/late`, {}, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      console.log("Late status update result:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating late status:", error);
      throw error;
    }
  };

  const fetchTasks = async (storedToken) => {
    setLoading(true); 
    setPopup({
      isOpen: true,
      status: "loading",
      title: "Loading...",
      message: "Please wait.",
    }); 
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/task/user`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }); // Sesuaikan dengan route kamu
        const data = response.data;
        setPopup({isOpen: false})

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

  const fetchUserName = async (storedToken) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/user/id`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const data = response.data; // gunakan .data, bukan .json()

      setUser((prevUser) => ({
      ...prevUser,
      name: data.dname,
    }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.deadline);
    const dateB = new Date(b.deadline);
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
    setPopup({
      isOpen: true,
      status: "loading",
      title: "Updating...",
      message: "Please wait while we update the task.",
    });
    try {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      if (!updatedTask._id) {
      console.error("Error: updatedTask._id is undefined!");
      console.log(updatedTask)
      return;
    }
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/task?taskId=${updatedTask._id}`,
        {
    title: updatedTask.title,
    description: updatedTask.description,
    deadline: updatedTask.deadline,
    difficulty: updatedTask.difficulty,
    priority: updatedTask.priority,
    subtasks: updatedTask.subtasks,
  }, {
    headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
  }
      );

    const updated = response.data.task;

    // Update task di state lokal
    setTasks(prev =>
      prev.map(task => (task._id === updated._id ? updated : task)));
      handleCloseEditModal();
    
    setPopup({
      isOpen: true,
      status: "success",
      title: "Update Successful",
      message: "Your task have been successfully updated!",
    });
    // Delay redirect
    setTimeout(() => {
    }, 1500);
    } catch (error) {
      const msg = error?.response?.data?.message || "Error.";
      setPopup({
        isOpen: true,
        status: "error",
        title: "Update Failed",
        message: msg,
      });
    }
  };

  const handleToggleDone = async (doneTask, currentIsDone) => {
    try {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/task/done?taskId=${doneTask._id}`,
        { isDone: !currentIsDone },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const updated = response.data.task;

      setTasks(prev =>
      prev.map(task => (task._id === updated._id ? updated : task)));

      setPopup({
        isOpen: true,
        status: "success",
        title: "Mark Done Successful",
        message: "Your task have been successfully marked as done!",
      });
    } catch (error) {
      const msg = error?.response?.data?.message || "Error.";
      setPopup({
        isOpen: true,
        status: "error",
        title: "Mark Failed",
        message: msg,
      });
    }
  };

  // Handle task creation submission
  const handleTaskSubmit = async (taskData) => {
    setPopup({
      isOpen: true,
      status: "loading",
      title: "Creating...",
      message: "Please wait while we create the task.",
    });

    try {
      // Simulate API call delay
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/task`, taskData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });

      const newTask = response.data;

      // Add new task to tasks list (assign a new id)
      setTasks((prev) => [...prev, newTask]);
      handleCloseCreateModal();

      setPopup({
      isOpen: true,
      status: "success",
      title: "Create Task Successful",
      message: "Your task have been successfully created!",
    });
    // Delay redirect
    setTimeout(() => {
      router.reload();
    }, 1500);
    } catch (error) {
      const msg = error?.response?.data?.message || "Error.";
      setPopup({
        isOpen: true,
        status: "error",
        title: "Create Task Failed",
        message: msg,
      });
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
        `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/task?taskId=${deletedTask._id}`,
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
    console.log("Selected sort option:", option);
    setSortSelectedOption(option);
    setIsSortOpen(false);
  };

  const renderTaskSection = (priority, colorClass, label) => {
    const filteredTasks = tasks
      .filter((task) => task.priority === priority && !task.isDone && !task.isLate);

    if (filteredTasks.length === 0) return null;

    return (
      <div className="w-full">
        <h3 className={`bg-[var(${colorClass})] text-white rounded-full px-3 py-1 inline-block mb-3 ${priority !== "High" ? "mt-2" : ""}`}>
          {label}
        </h3>

        <div className="flex flex-col mb-3 w-full space-y-2">
          {filteredTasks
            .sort((a, b) => new Date(a.deadline) - new Date(b.deadline) * (selectedSortOption === "asc" ? 1 : -1))
            .map((task) => (
              <TaskCard2
                key={task.id}
                {...task}
                onEdit={() => handleEditClick(task)}
                onDelete={() => openDeletePopup(task)}
                onToggleDone={() => handleToggleDone(task, task.isDone)}
              />
            ))}
        </div>
      </div>
    );
  };

  const renderHiddenTasksSection = () => {
    const filteredTasks = tasks.filter((task) => task.isLate && !task.isDone);

    if (filteredTasks.length === 0) return null;

    return (
      <div className="w-full">
        <h3 className="bg-gray-600 text-white rounded-full px-3 py-1 inline-block mb-3">
          Hidden Tasks (Late & Not Done)
        </h3>
        <div className="flex flex-col mb-3 w-full space-y-2">
          {filteredTasks
            .sort((a, b) =>
              (selectedSortOption === "asc" ? 1 : -1) * (new Date(a.deadline) - new Date(b.deadline))
            )
            .map((task) => (
              <TaskCard2
                key={task.id}
                {...task}
                onEdit={() => handleEditClick(task)}
                onDelete={() => openDeletePopup(task)}
                onToggleDone={() => handleToggleDone(task, task.isDone)}
              />
            ))}
        </div>
      </div>
    );
  };

  const renderDoneTasksSection = () => {
    const filteredTasks = tasks.filter((task) => task.isDone);

    if (filteredTasks.length === 0) return null;

    return (
      <div className="w-full">
        <h3 className="bg-blue-500 text-white rounded-full px-3 py-1 inline-block mb-3">
          Completed Tasks
        </h3>
        <div className="flex flex-col mb-3 w-full space-y-2">
          {filteredTasks
            .sort((a, b) =>
              (selectedSortOption === "asc" ? 1 : -1) * (new Date(a.deadline) - new Date(b.deadline))
            )
            .map((task) => (
              <TaskCard2
                key={task.id}
                {...task}
                onEdit={() => handleEditClick(task)}
                onDelete={() => openDeletePopup(task)}
                onToggleDone={() => handleToggleDone(task, task.isDone)}
              />
            ))}
        </div>
      </div>
    );
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
        <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-6xl mb-5">
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
          <button
            className="flex-1 gradient-button font-normal px-6 py-2 min-h-full"
            onClick={() => setSortBy(sortBy === "priority" ? "difficulty" : "priority")}
            >
              Sort by: {sortBy === "priority" ? "Priority" : "Difficulty"}
          </button>
          <button
            className="flex-1 gradient-button font-normal px-6 py-2 min-h-full"
            onClick={() => setShowDoneTask(!showDoneTask)}
          >
            {showDoneTask ? "Hide Done Tasks" : "Show Done Tasks"}
          </button>
          <button
            className="flex-1 bg-[var(--red-one)] text-white rounded-full hover:bg-[var(--red-two)] transition font-normal px-6 py-2 min-h-full"
            onClick={() => setShowHiddenTasks(!showHiddenTasks)}
          >
            {showHiddenTasks ? "Hide Hidden Tasks" : "Show Hidden Tasks"}
          </button>
        </div>

        <div>
          <div className="flex flex-col w-full mt-4">
            {renderTaskSection("High", "--red-one", "Urgent-Level Tasks")}
            {renderTaskSection("Medium", "--orange-one", "Moderate-Level Tasks")}
            {renderTaskSection("Low", "--green-one", "Chill-Level Tasks")}
            {showDoneTask && renderDoneTasksSection()}
            {showHiddenTasks && renderHiddenTasksSection()}
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

      <TaskPopUp
        isOpen={Popup.isOpen}
        status={Popup.status}
        title={Popup.title}
        message={Popup.message}
        onClose={() => setPopup({ ...Popup, isOpen: false })}
      />
    </main>
  );
}
