import Link from "next/link";

export default function CustomLink({text='', iconL='', iconR='', href}) {
    return (
        <Link 
        href={href}
        className="bg-gradient-to-r 
            from-dark via-secondaryDark to-secondaryDark 
            dark:from-dark dark:to-gray-500
            hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-secondary 
            font-medium rounded-lg text-sm px-5 py-2.5 text-center text-light"
        >
                <div className="flex justify-center items-center ">
                    {iconL}&nbsp;{text}&nbsp;{iconR}
                </div>
        </Link>
    )
}