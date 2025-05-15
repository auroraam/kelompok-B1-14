import { useState, useEffect } from "react";
import Image from "next/image";

export default function EditTaskModal({ isOpen, onClose, task, onSubmit }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    description: "",
    deadline: "",
    priority: "High",
    difficulty: "Hard",
    subTasks: ["", ""],
  });

  // Initialize form data when modal opens or task changes
  useEffect(() => {
    if (task && isOpen) {
      setFormData({
        _id:task._id,
        title: task.title || "",
        description: task.description || "",
        deadline: task.deadline || "",
        priority: task.priority || "High",
        difficulty: task.difficulty || "Hard",
        subtasks: task.subtasks && task.subtasks.length > 0 ? task.subtasks : ["", ""],
      });
      setStep(1);
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubTaskChange = (index, value) => {
    const newSubTasks = [...formData.subtasks];
    newSubTasks[index] = value;
    setFormData((prev) => ({
      ...prev,
      subtasks: newSubTasks,
    }));
  };

  const addSubTask = () => {
    setFormData((prev) => ({
      ...prev,
      subtasks: [...prev.subtasks, ""],
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
    onSubmit(formData);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-30 z-40"></div>

      {/* Modal */}
      <div className="fixed inset-0 flex justify-center items-center z-50 p-12 overflow-auto">
        <div className="bg-white rounded-lg max-w-4xl w-full p-6 flex gap-6 border border-blue-400">
          {/* Left side - Illustration */}
          <div className="flex-1 flex flex-col justify-center items-center text-left">
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-blue-400 mb-2">
                Edit Task
              </h2>
              <p className="text-sm text-cyan-900 max-w-xs">
                Update your task details below. We will adjust recommendations based on your changes.
              </p>
            </div>
            <Image
              src="/addtask.png"
              alt="Illustration"
              width={500}
              height={350}
              objectFit="contain"
            />
          </div>

          {/* Right side - Form */}
          <form
            className="flex-1 flex flex-col gap-4"
            onSubmit={step === 1 ? handleNext : handleSubmit}
          >
            {step === 1 && (
              <>
                <label className="text-blue-400 font-semibold" htmlFor="title">
                  Task Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-md p-2 bg-slate-200 text-cyan-900"
                  placeholder="Enter task title"
                  required
                />

                <label
                  className="text-blue-400 font-semibold"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-md p-2 bg-slate-200 text-cyan-900"
                  placeholder="Enter task description"
                  rows={3}
                  required
                />

                <label className="text-blue-400 font-semibold" htmlFor="deadline">
                  Due Date
                </label>
                <input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-md p-2 bg-slate-200 text-cyan-900"
                  required
                />

                <fieldset>
                  <legend className="text-blue-400 font-semibold mb-1">
                    Category
                  </legend>
                  <div className="flex gap-4 text-cyan-900">
                    {["High", "Medium", "Low"].map(
                      (cat) => (
                        <label key={cat} className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="priority"
                            value={cat}
                            checked={formData.priority === cat}
                            onChange={handleChange}
                            className="accent-cyan-900"
                          />
                          <span
                            className={
                              formData.category === cat
                                ? "text-cyan-900 font-semibold"
                                : ""
                            }
                          >
                            {cat}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-blue-400 font-semibold mb-1">
                    Task Difficulty
                  </legend>
                  <p className="text-xs italic mb-2 text-cyan-900">
                    *This will help us determine which task to recommend doing
                    first.
                  </p>
                  <div className="flex gap-4 text-cyan-900">
                    {["Easy", "Medium", "Hard"].map((level) => (
                      <label key={level} className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="difficulty"
                          value={level}
                          checked={formData.difficulty === level}
                          onChange={handleChange}
                          className="accent-cyan-900"
                        />
                        <span
                          className={
                            formData.difficulty === level
                              ? "text-cyan-900 font-semibold"
                              : ""
                          }
                        >
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
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

                <p className="text-sm mt-2 text-blue-400 font-semibold">
                  Step 1 of 2
                </p>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-3xl font-bold text-blue-400 mb-2">
                  Edit Task
                </h2>
                <p className="text-sm mb-4 text-cyan-900">
                  Update your task details below. We will adjust recommendations
                  based on your changes.
                </p>

                {formData.subtasks.map((subtasks, index) => (
                  <div key={index}>
                    <label
                      className="text-blue-400 font-semibold"
                      htmlFor={`subtasks-${index}`}
                    >
                      Sub-Task {index + 1}
                    </label>
                    <input
                      id={`subtasks-${index}`}
                      type="text"
                      value={subtasks}
                      onChange={(e) =>
                        handleSubTaskChange(index, e.target.value)
                      }
                      className="border border-gray-400 rounded-md p-2 bg-slate-200 text-cyan-900 w-full"
                      placeholder={`Enter sub-task ${index + 1}`}
                      required
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addSubTask}
                  className="text-blue-400 underline text-sm mb-4 self-start hover:text-blue-500 transition"
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
                      className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Save Changes
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

                <p className="text-sm mt-2 text-blue-400 font-semibold">
                  Step 2 of 2
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
