import React, {useEffect} from 'react';
import {googleSignIn} from "../app/actions";


export default function GoogleSignIn() {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <form action={googleSignIn}>
            <div className="items-center justify-start font-sans">
                <button
                    className="text-sm px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 dark:bg-gray-800 ">
                    <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy"
                         alt="google logo"/>
                    <span className='whitespace-nowrap'>Login with Google</span>
                </button>
            </div>
        </form>
    );
}

