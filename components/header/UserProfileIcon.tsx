import Image from "next/image";
import {User} from "@supabase/supabase-js";

export default function UserProfileIcon (user: {user: User}) {

    console.log('user: ', user)

    const profileImagePath = user.user.identities ? user.user.identities[0].identity_data?.picture : '';
    console.log(profileImagePath);

    return (
        profileImagePath ?
            <Image className='rounded-full' width={40} height={40} src={profileImagePath} alt='Profile Picture'/> :
            <Image className='rounded-full' src='/icon' width={20} height={20} alt='Profile Picture'/>
    )
}