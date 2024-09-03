import Image from "next/image";
import {DetailedFigure} from "../../types";

interface DetailsTableRowProps {
    figure: DetailedFigure;
}

const ItemDetailsTableRow: React.FC<DetailsTableRowProps> = ({ figure }) => {
    return (
        <tr className="border-b border-gray-700">
            <td className="text-md p-2">{figure.mainName}</td>
            {figure.image && figure.image.asset ? (
                <Image
                    src={`https://cdn.sanity.io/images/4llymfg7/production/${figure.image.asset._ref.slice(6).slice(0, -4)}.png`}
                    alt=''
                    width={50}
                    height={50}
                    style={{ objectFit: 'contain', width: 'auto', maxHeight: '100%' }}
                />
            ) : null}
        </tr>
    );
};

export default ItemDetailsTableRow;