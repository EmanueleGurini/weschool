export default function Loading() {
    return (
      <div className="container mx-auto p-6 animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-6 bg-gray-300 rounded w-1/6"></div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
        <div className="mb-4">
          <div className="p-8 bg-lightGray bg-opacity-70 rounded-[10px]">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden bg-white">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-5 py-3 border-b-2 border-gray-200"></th>
                      <th className="px-5 py-3 border-b-2 border-gray-200"></th>
                      <th className="px-5 py-3 border-b-2 border-gray-200"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <tr key={index} className="last:rounded-bl-lg last:rounded-br-lg">
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                          <div className="h-4 bg-gray-300 rounded w-1/6"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-block rounded-lg bg-gray-300 py-3 px-6 w-1/6"></div>
      </div>
    );
  }