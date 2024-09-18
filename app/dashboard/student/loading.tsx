export default function Loading() {
  return (
    <div className="p-2 bg-white animate-pulse">
      <div className="w-48 h-48 rounded-full bg-gray-300 mb-4 border-4 border-[#f18f01]"></div>

      <div className="mb-6">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>

      <div className="flex flex-col items-center justify-start mt-16 space-y-6">
        <div className="w-full max-w-lg space-y-4 bg-gray-200 p-4 rounded-lg shadow-lg">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-32 h-4 bg-gray-300 rounded"></div>
              <div className="w-full h-4 bg-gray-400 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1024px] mx-auto mt-6">
        <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
}
