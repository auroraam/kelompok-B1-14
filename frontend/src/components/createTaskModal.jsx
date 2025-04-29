import { useState } from "react";
import Image from "next/image";

export default function CreateTaskModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "Housework",
    difficulty: "Hard",
    subTasks: ["", ""], // start with two empty sub-tasks
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubTaskChange = (index, value) => {
    const newSubTasks = [...formData.subTasks];
    newSubTasks[index] = value;
    setFormData((prev) => ({
      ...prev,
      subTasks: newSubTasks,
    }));
  };

  const addSubTask = () => {
    setFormData((prev) => ({
      ...prev,
      subTasks: [...prev.subTasks, ""],
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add your submit logic here (e.g., API call)
    console.log("Submitting task:", formData);
    onClose();
    setStep(1);
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      category: "Housework",
      difficulty: "Hard",
      subTasks: ["", ""],
    });
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-30 z-40"></div>

      {/* Modal */}
      <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full p-6 flex gap-6 border border-blue-400 max-h-[90vh] overflow-auto">
          {/* Left side - Illustration */}
          <div className="flex-1 flex justify-center items-center">
            <Image
              src="/placeholder-illustration.png" // Replace with your image path
              alt="Illustration"
              width={300}
              height={300}
              objectFit="contain"
            />
          </div>

          {/* Right side - Form */}
          <form className="flex-1 flex flex-col gap-4" onSubmit={step === 1 ? handleNext : handleSubmit}>
            {step === 1 && (
              <>
                <h2 className="text-3xl font-bold text-blue-600 mb-2">Add New Task</h2>
                <p className="text-sm mb-4">
                  Welcome! Here, you will add the task you want to do. Then, we will try to adjust and give you recommendations based on the{" "}
                  <strong>sub-tasks available, due date, and task difficulty!</strong>
                </p>

                <label className="text-blue-600 font-semibold" htmlFor="title">
                  Task Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 bg-gray-100"
                  placeholder="Enter task title"
                  required
                />

                <label className="text-blue-600 font-semibold" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 bg-gray-100"
                  placeholder="Enter task description"
                  rows={3}
                  required
                />

                <label className="text-blue-600 font-semibold" htmlFor="dueDate">
                  Due Date
                </label>
                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 bg-gray-100"
                  required
                />

                <fieldset>
                  <legend className="text-blue-600 font-semibold mb-1">Category</legend>
                  <div className="flex gap-4">
                    {["School/College Work", "Housework", "Miscellaneous"].map((cat) => (
                      <label key={cat} className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="category"
                          value={cat}
                          checked={formData.category === cat}
                          onChange={handleChange}
                          className="accent-blue-600"
                        />
                        <span className={formData.category === cat ? "text-blue-600 font-semibold" : ""}>{cat}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-blue-600 font-semibold mb-1">Task Difficulty</legend>
                  <p className="text-xs italic mb-2">
                    *This will help us determine which task to recommend doing first.
                  </p>
                  <div className="flex gap-4">
                    {["Easy", "Medium", "Hard"].map((level) => (
                      <label key={level} className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="difficulty"
                          value={level}
                          checked={formData.difficulty === level}
                          onChange={handleChange}
                          className="accent-blue-600"
                        />
                        <span className={formData.difficulty === level ? "text-blue-600 font-semibold" : ""}>{level}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Next
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      setStep(1);
                    }}
                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                </div>

                <p className="text-sm mt-2 text-blue-600 font-semibold">Step 1 of 2</p>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-3xl font-bold text-blue-600 mb-2">Add New Task</h2>
                <p className="text-sm mb-4">
                  Welcome! Here, you will add the task you want to do. Then, we will try to adjust and give you recommendations based on the{" "}
                  <strong>sub-tasks available, due date, and task difficulty!</strong>
                </p>

                {formData.subTasks.map((subTask, index) => (
                  <div key={index}>
                    <label className="text-blue-600 font-semibold" htmlFor={`subTask-${index}`}>
                      Sub-Task {index + 1}
                    </label>
                    <input
                      id={`subTask-${index}`}
                      type="text"
                      value={subTask}
                      onChange={(e) => handleSubTaskChange(index, e.target.value)}
                      className="border border-gray-300 rounded-md p-2 bg-gray-100 w-full"
                      placeholder={`Enter sub-task ${index + 1}`}
                      required
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addSubTask}
                  className="text-blue-600 underline text-sm mb-4 self-start"
                >
                  Add More Sub-tasks?
                </button>

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
                  >
                    Back
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Add New Task
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        setStep(1);
                      }}
                      className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <p className="text-sm mt-2 text-blue-600 font-semibold">Step 2 of 2</p>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
