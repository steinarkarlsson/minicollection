'use client'

function CoffeeButton() {
    return (
        <div className="flex">
                <div className="flex mx-auto text-center">
                        <img className="mx-auto h-10 transition delay-75 ease-in-out hover:scale-110"
                             src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                             alt="Buy Me a Coffee"
                             onClick={() => window.open('https://buymeacoffee.com/steinarkaro')}
                        />
                </div>
        </div>
    )
}

export default CoffeeButton