import Link from "next/link";

function Footer() {
    return (
        <footer className='flex flex-row w-full space-x-10 pb-5 justify-center'>
            <Link href='/contact'>Contact</Link>
            {/*<Link href='/privacy'>Privacy Policy</Link>*/}
            <Link href='/copyright'>Copyright Disclaimer</Link>
        </footer>
    );
}

export default Footer;