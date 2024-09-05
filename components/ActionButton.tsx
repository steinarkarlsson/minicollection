import {addToCollection} from "../app/actions";

interface ActionButtonProps {
    label: string,
    children: React.ReactNode,
    itemId: string
}



const ActionButton = ({label, children, itemId }: ActionButtonProps) => {

    const handleClick = async () => {
        await addToCollection(itemId);
        console.log("Added to collection");
    };

    return (
        <div className="flex flex-row justify-end p-1">
            <div className="flex items-center p-2 text-sm text-gray-300">{label}</div>
            <button
                onClick={handleClick}
                className="h-10 w-10 items-center rounded-full bg-gray-700 text-white transition-opacity group-hover:opacity-100">
                {children}
            </button>
        </div>
    );
}

export default ActionButton;