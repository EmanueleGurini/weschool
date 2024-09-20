export default function Loading() {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 bg-gray-100 animate-pulse">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">

          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
          </div>
  
          <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
  
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
  
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
  
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
  
          <div className="h-10 bg-gray-400 rounded w-full"></div>
        </div>
      </div>
    );
  }
  