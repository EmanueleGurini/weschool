import React from 'react';

interface TableProps {
    headers: string[];
    data: any[];
    renderRow: (item: any) => React.ReactNode;
}

const Table: React.FC<TableProps> = ({ headers, data, renderRow }) => {
    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-10">
                <div className="p-8 bg-lightGray bg-opacity-70 rounded-[10px] shadow-lg">
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden bg-white">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        {headers.map((header, index) => (
                                            <th
                                                key={index}
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            {renderRow(item)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
