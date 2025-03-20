import Image from "next/image";

export default function TaskCard({ title, description, priority, imageUrl }) {
  return (
    <div className="flex bg-white shadow-md rounded-2xl p-4 items-center gap-4 w-full max-w-2xl">
      {/* Task Image */}
      <div className="w-20 h-20 relative">
        <Image src={imageUrl} alt="Task Image" width={80} height={80} className="rounded-lg" />
      </div>

      {/* Task Details */}
      <div className="flex-1">
        <h3 className="text-xl text-black font-bold">{title}</h3>
        <p className="text-gray-600 text-xs text-justify">{description}</p>
      </div>

      {/* Priority Badge */}
      <span className={`text-white text-xs px-4 py-1 rounded-full bg-[var(--primary-color)]`}>
        Priority: {priority}
      </span>
    </div>
  );
}