
interface ActionButtonProps {
    label: string,
    children: React.ReactNode,
}

const ActionButton = ({label, children}: ActionButtonProps) => {
    return (
        <div className="flex flex-row justify-end p-1">
            <div className="flex items-center p-2 text-sm text-gray-300">{label}</div>
            <button
                onClick={() => console.log("Added to collection")}
                className="h-10 w-10 items-center rounded-full bg-gray-700 text-white transition-opacity group-hover:opacity-100">
                {children}
            </button>
        </div>
    );
}

export default ActionButton;