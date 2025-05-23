import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function TaskCard2({ title, description, priority, subtasks = [], difficulty, onEdit, onDelete }) {
	const difficultyColors = {
	  Hard: "bg-[var(--red-one)]",
	  Medium: "bg-[var(--orange-one)]",
	  Easy: "bg-[var(--green-one)]",
	};

	const imageUrl = "/image (8).png";

	return (
	  <div className="flex bg-white shadow-md rounded-2xl items-center gap-4 w-full">
		<div className={`w-20 h-20 relative flex items-center justify-center rounded-lg ${difficultyColors[difficulty]}`}>
		  <Image src={imageUrl} alt="Task Image" width={80} height={80} className="p-2 rounded-lg h-full w-full object-cover" />
		</div>
  
		<div className="flex-1 p-2">
		  <h3 className="text-xl text-black font-bold">{title}</h3>
		  <p className="text-gray-600 text-xs font-bold">Sub-Tasks: {subtasks.length}</p>
		  <p className="text-gray-600 text-xs text-justify">{description}</p>
		</div>
  
		<div className="flex space-x-1 p-4">
		  <button
			onClick={onEdit}
			className="p-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--secondary-color)] transition"
		  >
			<FaEdit size={14} />
		  </button>
  
		  <button
			onClick={onDelete}
			className="p-2 bg-[var(--red-one)] text-white rounded-lg hover:bg-[var(--red-two)] transition"
		  >
			<FaTrash size={14} />
		  </button>
		</div>
	  </div>
	);
  }
  