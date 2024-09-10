import Link from "next/link";

export default function CustomLink({text, href}) {
    return (
        <Link 
        href={href}
        className="bg-primary 
            dark:bg-secondaryDark shadow-sm 
            px-4 py-3 rounded-lg text-dark dark:text-light font-semibold
            hover:opacity-90 flex justify-between
            ">
            {text}
        </Link>
    )
}