export default function CustomButton({text, iconL='', iconR='', onClick, loading=false}) {
    return (
        <button 
            className="bg-gradient-to-r 
            from-dark via-secondaryDark to-secondaryDark 
            dark:from-dark dark:to-gray-500
            hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-secondary 
            font-medium rounded-lg text-sm px-5 py-2.5 text-center text-light"
            onClick={onClick}
            disabled={loading}
        >
            <div className="flex justify-center items-center ">
                {
                    loading ? (
                        <span className="flex justify-between items-center text-white">
                            <svg class="animate-spin h-5 w-5 rounded-full border-t border-white mr-3" viewBox="0 0 24 24"></svg>
                            Processing...
                        </span>
                    ):(
                        <span className="flex justify-center items-center">
                            {iconL}&nbsp;{text}&nbsp;{iconR}
                        </span>
                    )
                }
            </div>
        </button>
    )
}