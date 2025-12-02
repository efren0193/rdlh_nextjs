import CustomSpin from "./custom-spin";

export default function CustomButton({type='button', text, iconL='', iconR='', onClick, loading=false}) {
    return (
        <button 
            type={type}
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
                        <CustomSpin/>
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