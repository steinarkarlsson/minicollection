'use client'

import {useEffect, useState} from 'react';
import CoffeeButton from "./CoffeeButton";
import MiniCollectionIcon from "./MiniCollectionIcon";
import GoogleSignIn from "../GoogleSignIn";
import {createClient} from "../../utils/supabase/client";
import {User} from "@supabase/supabase-js";
import UserProfileIcon from "./UserProfileIcon";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, [user]);

    return (
        <header>
            <nav className="fixed w-full pt-10 ml-[-16px] px-4 lg:px-6 py-2.5 lg:bg-opacity-50 bg-black">
                <div className="flex flex-wrap justify-between items-center mx-auto w-full max-w-screen-xl ">
                    <a href="/" className="flex items-center">
                        <MiniCollectionIcon/>
                        <span
                            className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">MiniCollection</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <button
                            data-collapse-toggle="mobile-menu-2"
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mobile-menu-2"
                            aria-expanded={isMenuOpen}
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className={`w-6 h-6 ${isMenuOpen ? 'hidden' : 'block'}`} fill="currentColor"
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                      clipRule="evenodd"></path>
                            </svg>
                            <svg className={`w-6 h-6 ${isMenuOpen ? 'block' : 'hidden'}`} fill="currentColor"
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div
                        className={`justify-between bg-black items-center text-2xl lg:text-md  w-full lg:flex lg:w-auto lg:order-1 ${isMenuOpen ? 'block' : 'hidden'}`}
                        id="mobile-menu-2">
                        <ul className="flex flex-col fixed lg:static ml-[-16px] w-full font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <a href="/"
                                   className="block bg-black py-2 pr-4 pl-3 lg:text-2xl text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-300 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                   aria-current="page">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/miniatures"
                                   className="block bg-black py-2 pr-4 pl-3 lg:text-2xl text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-300 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                    Miniatures
                                </a>
                            </li>
                            <li>
                                <a href="/sets"
                                   className="block bg-black py-2 pr-4 pl-3 lg:text-2xl text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-300 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                    Sets
                                </a>
                            </li>
                            <li className="block bg-black py-2 pr-4 pl-3 lg:text-2xl text-gray-900 border-b border-gray-100 lg:border-0 lg:p-0 dark:text-gray-600 dark:border-gray-700">
                                Terrain
                            </li>
                            <li className="block bg-black py-2 pr-4 pl-3 lg:text-2xl text-gray-900 border-b border-gray-100 lg:border-0 lg:p-0 dark:text-gray-600 dark:border-gray-700">
                                Print
                            </li>
                            <li className="flex bg-black py-2 pr-4 pl-3 lg:text-2xl text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-300 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                <CoffeeButton/>
                            </li>
                            <li className="block bg-black py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 lg:border-0 lg:p-0 dark:text-gray-300 dark:border-gray-700">
                                {user ? <UserProfileIcon user={user} /> : <GoogleSignIn/>}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}