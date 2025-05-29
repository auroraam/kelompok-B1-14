import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function TaskCard2({ title, description, priority, subtasks = [], difficulty, deadline, onEdit, onDelete, isDone, onToggleDone }) {
	const difficultyColors = {
	  Hard: "bg-[var(--red-one)]",
	  Medium: "bg-[var(--orange-one)]",
	  Easy: "bg-[var(--green-one)]",
	};

	const imageUrl = "/image (8).png";

	const formatDate = (isoString) => {
  		const date = new Date(isoString);
  		const day = String(date.getDate()).padStart(2, '0');
  		const month = String(date.getMonth() + 1).padStart(2, '0');
  		const year = date.getFullYear();
  		return `${day}/${month}/${year}`;
	};

	return (
	  <div className="flex bg-white shadow-md rounded-2xl items-center gap-4 w-full">
		<div className={`w-24 flex flex-col items-center justify-start py-1 ${difficultyColors[difficulty]} rounded-lg`}>
  		  	<div className="w-15 h-13 rounded-lg overflow-hidden">
  		  	  	<Image
  		  	  	  	src={imageUrl}
  		  	  	  	alt="Task Image"
  		  	  	  	width={64}
  		  	  	  	height={64}
  		  	  	  	className="object-cover w-full h-full"
  		  	  	/>
  		  	</div>
  		  	<h3 className="text-white text-sm mt-0">{difficulty}</h3>
  		</div>
  
		<div className="flex-1 p-2">
		  <h3 className="text-xl text-black font-bold">{formatDate(deadline)} — {title}</h3>
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
		  <button
		    onClick={onToggleDone}
		    className={`px-3 py-2 rounded-lg transition text-sm font-medium ${
    		  isDone
    		    ? 'bg-gray-500 text-white hover:bg-gray-500'
    		    : 'bg-green-600 text-white hover:bg-green-400'
    		}`}
		  >
		    {isDone ? 'Undo Done' : 'Mark as Done'}
		  </button>
		</div>
	  </div>
	);
  }
  