import Link from "next/link";

function Footer() {
    return (
        <footer className='flex flex-row w-full space-x-10 justify-center border-2'>
            <Link href='/contact'>Contact</Link>
            <Link href='/privacy'>Privacy Policy</Link>
            <Link href='/copyright'>Copyright</Link>
        </footer>
    );
}

export default Footer;