import {updateCollection} from "../app/actions";

interface ActionButtonProps {
    label: string;
    children: React.ReactNode;
    itemId: string;
    operation: 'add' | 'remove';
    onUpdateOwnedFigures: (itemId: string, operation: 'add' | 'remove') => void;
}

const ActionButton = ({label, children, itemId, operation, onUpdateOwnedFigures}: ActionButtonProps) => {
    const handleClick = async (event: React.MouseEvent) => {
        event.stopPropagation();
        await updateCollection(itemId, operation);
        onUpdateOwnedFigures(itemId, operation);
    };

    return (
        <div className="flex flex-row justify-end">
            <div className="flex items-center text-sm">{label}</div>
            <button
                onClick={handleClick}
                className="h-10 w-10 items-center rounded-full border-2 border-gray-700 text-gray-400 hover:text-white hover:border-gray-400 transition-opacity delay-200">
                {children}
            </button>
        </div>
    );
}

export default ActionButton;