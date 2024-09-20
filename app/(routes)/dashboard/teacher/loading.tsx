export default function Loading() {
  return (
    <div className="p-6 bg-white animate-pulse">
    
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-48 h-48 border-4 ] rounded-full overflow-hidden bg-gray-300"></div>

        <div className="font-extrabold p-4 space-y-4">
          <div className="w-3/4 h-8 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>

      
      <div className="w-1/4 h-6 bg-gray-300 rounded text-right mb-8"></div>

      
      <div className="px-4 sm:px-8 bg-color10">
        <div className="py-10">
          <div className="p-8 bg-lightGray bg-opacity-70 rounded-[10px] ">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full rounded-lg overflow-hidden bg-white">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                        <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                        <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                        <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <tr key={index} className="last:rounded-bl-lg last:rounded-br-lg">
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                          <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                          <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                          <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
