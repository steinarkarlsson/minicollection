import {useSession, signIn, signOut} from "next-auth/react"
import Image from 'next/image';
const buttonStyle = 'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow';

const LoginButton = () => {
    const {data: session} = useSession()
    if (session?.user) {
        return (
            <>
                <Image src={session.user.image || ''}  alt='Profile Picture' width={20} height={20}/>
                <button onClick={() => signOut()} className={buttonStyle}>Sign out</button>
            </>
        )
    }
    return (
        <>
            <button onClick={() => signIn()}  className={buttonStyle}>Sign in</button>
        </>
    )
}
export default LoginButton;