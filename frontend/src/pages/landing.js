import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import TaskCardPopUp from "@/components/TaskCardPopup";
import FeatureCard from "@/components/featureCard";
import TaskCard2 from "@/components/Task-card-2";
import EditTaskModal from "@/components/EditTaskModal";
import TaskDeletePopUp from "@/components/TaskDeletePopUp";
import { useEffect } from 'react';
import { isAuthenticated } from '../auth';
import { useRouter } from 'next/router';
import axios from "axios";
import TaskPopUp from '@/components/popup';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "Jane Doe",
    avatarUrl: "/profileimage.png",
  });
  const [Popup, setPopup] = useState({
    isOpen: false,
    status: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.replace(`${process.env.NEXT_PUBLIC_FRONTEND_BASEURL}`);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserName(token);
      fetchTasks(token);
    }
  }, [token]);

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

  const features = [
    {
      imageSrc: "/ai-powered.png",
      title: "AI-Powered Prioritization",
      description: "No more guesswork! Let AI determine which tasks need your attention first",
    },
    {
      imageSrc: "/smart-reminders.png",
      title: "Smart Reminders & Notifications",
      description: "Never miss a deadline with intelligent reminders tailored to your habits",
    },
    {
      imageSrc: "/task-syncing.png",
      title: "Seamless Task Syncing",
      description: "Integrate with your calendar and to-do lists for a smooth workflow",
    },
    {
      imageSrc: "/minimalist-design.png",
      title: "Minimalist & User-Friendly Design",
      description: "Stay productive with a clean and distraction-free interface",
    },
  ]
  const [selectedTask, setSelectedTask] = useState(null);
  
	const fetchTasks = async (storedToken) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/task/user`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const data = response.data;

      // Gabungkan semua tasks
      const allTasks = [
        ...(data.High || []),
        ...(data.Medium || []),
        ...(data.Low || [])
      ];

      // Urutkan berdasarkan deadline terdekat
      const sortedTasks = allTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

      // Ambil 2 task dengan deadline paling dekat
      const topTwoTasks = sortedTasks.slice(0, 2);

      setTasks(topTwoTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };  

  
	const handleEditClick = (task) => {
	  setSelectedTask(task);
	  setIsEditModalOpen(true);
	};
  
	const handleCloseEditModal = () => {
	  setIsEditModalOpen(false);
	  setSelectedTask(null);
	};
  
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
	
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [taskStatus, setTaskStatus] = useState(null); // null | "loading" | "success" | "error"
		
	// Simulate task creation process
	
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

  return (
    <main className="pt-16">
      <Navbar user={user} />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] text-white flex items-center">
  <div className="absolute inset-0 -z-10">
    <Image
      src="/imag.jpeg"
      alt="Landing Image"
      layout="fill"
      objectFit="cover"
      quality={100}
      priority
    />
    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white via-transparent to-transparent" />
  </div>

  {/* Centered container with max width and padding */}
  <div className="container mx-auto px-6 md:px-12 py-20">
    <h1 className="text-5xl font-extrabold text-blue-400 drop-shadow-lg max-w-3xl">
      Your AI-Powered Task Manager for Maximum Efficiency
    </h1>

    <p className="mt-6 max-w-3xl text-lg leading-relaxed drop-shadow-lg">
      Struggling with deadlines? Overwhelmed by your to-do list? SmartSched is here to revolutionize the way you manage your time. Powered by AI, our smart task manager helps you prioritize, organize, and optimize your daily tasks effortlessly. Start focusing on what truly matters—let SmartSched handle the rest!
    </p>

    <div className="mt-8 flex gap-4 flex-wrap">
      <Link
        href="/sign-in"
        className="gradient-button font-normal px-6 py-2"
      >
        Get Started Now!
      </Link>

      {/* <button
        onClick={() => setShowPopup(true)}
        className="gradient-button font-normal px-6 py-2"
      >
        Test Pop Up
      </button> */}
    </div>
  </div>
  {showPopup && (
            <TaskCardPopUp
              status="success" // change to "loading" or "success" to test
              onClose={() => setShowPopup(false)}
              onRetry={() => alert("Retry clicked!")}
            />
          )}
</section>


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
              <div className="w-full">
                <h3 className="bg-[var(--primary-color)] text-white rounded-full px-2 py-1 inline-block mb-2">
                  Upcoming Deadlines
                </h3>
                <div className="flex flex-col w-full mb-3 space-y-2">
                  {tasks
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

            <div className="mt-6 flex">
              <Link
              href="/task-user"
              className="gradient-button font-normal px-6 py-2 ml-auto"
              >
              Check All of My To-Do List
              </Link>
            </div>
          </div>
        </div>
      </div>


{/* About Section */}
      <section className="relative w-full h-[80vh] overflow-hidden">
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
        

        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 h-full text-white">
          <div className="max-w-2xl space-y-6">
            <h2 className="text-3xl font-bold">What Are We?</h2>
            <p>
              SmartSched is an AI-driven task management platform designed to help students, professionals, and teams stay ahead of their schedules. Whether you are managing assignments, work projects, or daily tasks, SmartSched analyzes deadlines, urgency, and workload to provide a smart, efficient, and personalized scheduling experience.
            </p>

            <h2 className="text-3xl font-bold mt-8">Who Is SmartSched For?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Students – Organize assignments, exams, and projects easily</li>
              <li>Professionals – Manage work tasks, meetings, and deadlines</li>
              <li>Teams – Collaborate on projects and share schedules</li>
            </ul>
          </div>

          <div className="relative w-full max-w-lg h-[45vh] rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/image.jpeg"
              alt="Planner"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="bg-white">
      <section className="bg-white max-w-6xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {features.map(({ imageSrc, title, description }) => (
        <FeatureCard
          key={title}
          imageSrc={imageSrc}
          title={title}
          description={description}
        />
      ))}
    </section>
    </div>


      {/* Footer Section */}
      <footer className="relative w-full h-[10vh] flex items-center justify-center text-white text-xl">
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
        <div className="max-w-5xl mx-auto font-semibold drop-shadow-2xl">
          <span>SmartSched,</span> Your Partner for Every Scheduling Needs!
        </div>
      </footer>
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