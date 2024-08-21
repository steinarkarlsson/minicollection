'use client'
import React from "react";

function CoffeeButton() {
    return (
        <div className="flex align-right ml-auto m-2">
            <div className="mx-auto">
                <div className="mx-auto text-center">
                    <div className="mt-4">
                        <img className="mx-auto h-12 transition delay-75 ease-in-out hover:scale-110"
                             src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                             alt="Buy Me a Coffee"
                             onClick={() => window.open('https://buymeacoffee.com/steinarkaro')}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoffeeButton