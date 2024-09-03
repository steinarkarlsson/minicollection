'use client'

function CoffeeButton() {
    return (
        <div className="flex">
                <div className="flex mx-auto text-center">
                        <img className="mx-auto h-11 border rounded-lg border-yellow-500 hover:border-yellow-50"
                             src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                             alt="Buy Me a Coffee"
                             onClick={() => window.open('https://buymeacoffee.com/steinarkaro')}
                        />
                </div>
        </div>
    )
}

export default CoffeeButton