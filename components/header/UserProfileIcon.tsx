import React, { useState } from 'react';
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import { createClient } from "../../utils/supabase/client";
import {useRouter} from "next/navigation";

export default function UserProfileIcon({ user }: { user: User }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const profileImagePath = user.identities ? user.identities[0].identity_data?.picture : '';
    const router = useRouter();

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut().then(() => {
            console.log('User logged out');
            router.push('/');
        });
    };

    return (
        <div className="relative">
            <Image
                className='rounded-full cursor-pointer'
                width={40}
                height={40}
                src={profileImagePath || '/icon'}
                alt='Profile Picture'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
                <div className="absolute left-0 bg-gray-800 mt-2 w-48 text-lg rounded-md shadow-lg z-10 hover:bg-gray-700 transition duration-200">
                    <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-sm text-white "
                    >
                        Log out
                    </button>
                </div>
            )}
        </div>
    );
}