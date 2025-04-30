export default function FeatureCard({ imageSrc, title, description }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-xs flex flex-col border border-blue-400">
        <div className="mb-4">
          <img src={imageSrc} alt={title} className="w-full h-40 object-contain" />
        </div>
        <h3 className="text-lg text-blue-400 font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 flex-grow">{description}</p>
      </div>
    );
  }
  