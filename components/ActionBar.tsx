import React from 'react';
import ActionButton from './ActionButton';

interface ActionBarProps {
    figureId: string;
    onUpdateOwnedFigures: (itemId: string, operation: 'add' | 'remove') => void;
}

const ActionBar = ({ figureId, onUpdateOwnedFigures }: ActionBarProps) => {
    return (
        <div className="action-buttons-container opacity-0 flex group-hover:opacity-100 transition-opacity duration-200 ease-in-out flex-col items-center space-y-2 py-2">
            <div className="text-md text-gray-400 tolkien-font text-center ">Add to Collection</div>
            <div className="flex space-x-2">
                <ActionButton label={''} children={'+'} itemId={figureId} operation={'add'} onUpdateOwnedFigures={onUpdateOwnedFigures} />
                <ActionButton label={''} children={'-'} itemId={figureId} operation={'remove'} onUpdateOwnedFigures={onUpdateOwnedFigures} />
            </div>
        </div>
    );
}

export default ActionBar;