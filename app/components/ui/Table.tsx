import React from 'react';

interface TableProps {
    headers: string[];
    data: any[];
    renderRow: (item: any) => React.ReactNode;
}

const Table: React.FC<TableProps> = ({ headers, data, renderRow }) => {
    return (
        <table className="min-w-full leading-normal">
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th
                            key={index}
                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>{renderRow(item)}</tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
