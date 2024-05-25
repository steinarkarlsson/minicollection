'use client';
import {supabase} from "../lib/supabase";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Login() {
    const [data, setData] = useState<{
        email: '',
        password: ''
    }>({
        email: '',
        password: ''
    })

    const router = useRouter();

    const login = async () => {
        try {
            let {data: dataUser} = await supabase
                .auth
                .signInWithPassword({
                    email: data.email,
                    password: data.password,
                })
            if (dataUser) {
                router.refresh();
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    }
    return <div className='container mx-auto w-[400px]'>
        <div className='grid'>
            <label>Email</label>
            <input
                type='text'
                name='email'
                className='text-black'
                value={data?.email}
                onChange={handleChange}
            />
        </div>
        <div className='grid'>
            <label>Password</label>
            <input
                type='password'
                name='password'
                className='text-black'
                value={data?.password}
                onChange={handleChange}
            />
        </div>
        <div>
            <button onClick={login}>Login</button>
        </div>
    </div>
}