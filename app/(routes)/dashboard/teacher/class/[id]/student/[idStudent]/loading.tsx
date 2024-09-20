export default function Loading() {
    return (
      <div className="max-w-4xl mx-auto p-6 flex flex-col gap-6 animate-pulse">
        <div className="bg-gray-300 shadow-md rounded-lg p-6 mb-6 flex justify-between items-center">
          <div className="h-6 bg-gray-400 rounded w-1/3"></div>
          <div className="h-6 bg-gray-400 rounded w-1/6"></div>
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
  
        <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
  
        <div className="mb-4">
          <div className="inline-block rounded-lg bg-gray-400 py-3 px-6 w-32"></div>
        </div>
      </div>
    );
  }
  