interface CardBadgeProps {
    type?: 'unreleased' | 'released' | 'announced' | null
}

function CardBadge({type}: CardBadgeProps) {
    return (
        type ? <div className="text-s text-${}gray-300">{type}</div> : null
    )
}

export default CardBadge;