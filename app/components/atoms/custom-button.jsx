
export default function CustomButton({text, iconL='', iconR=''}) {
    return (
        <button className="bg-primary 
            dark:bg-secondaryDark shadow-sm 
            px-4 py-3 rounded-lg text-dark dark:text-light font-semibold
            hover:opacity-90 flex justify-between
            ">
            <div className="flex justify-center items-center ">
                {iconL}&nbsp;{text}&nbsp;{iconR}
            </div>
        </button>
    )
}