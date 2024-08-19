import React from 'react';

interface DetailsTableRowProps {
    header: string;
    data: string | undefined;
}

const DetailsTableRow: React.FC<DetailsTableRowProps> = ({ header, data }) => {
    return (
        <tr className="border-b border-gray-700">
            <td className="text-lg font-bold p-2">{header}</td>
            <td className="text-md p-2">{data}</td>
        </tr>
    );
};

export default DetailsTableRow;