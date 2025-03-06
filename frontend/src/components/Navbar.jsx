import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return(
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
            <div className="w-full flex py-4 px-25 justify-between items-center font-inter">
                <div className="text-2xl font-bold bg-gradient-to-b from-[var(--primary-color)] to-[var(--secondary-color)] text-transparent bg-clip-text">
                    <Link href="/">SmartSched</Link>
                </div>

                <div className="flex gap-5 font-semibold text-[var(--primary-color)]">
                    <Link href="/">Home</Link>
                    <Link href="/tasks">Tasks</Link>
                    <Link href="/settings">Settings</Link>

                    <div>
                        <Link
                        href="/auth"
                        className="bg-[var(--primary-color)] font-normal text-white px-6 py-2 rounded-full hover:bg-[var(--secondary-color)] transition"
                        >
                        Sign In or Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}