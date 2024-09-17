export default function CustomButton({text, iconL='', iconR='', onClick}) {
    return (
        <button 
            className="bg-gradient-to-r 
            from-dark via-secondaryDark to-secondaryDark 
            dark:from-dark dark:to-gray-500
            hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-secondary 
            font-medium rounded-lg text-sm px-5 py-2.5 text-center text-light"
            onClick={onClick}
        >
            <div className="flex justify-center items-center ">
                {iconL}&nbsp;{text}&nbsp;{iconR}
            </div>
        </button>
    )
}