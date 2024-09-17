export function PulseAnimation() {
    return (
        <div className="shadow-lg rounded-md p-4 max-w-sm w-full mx-auto 
                    bg-gradient-to-b from-white via-white to-darkSecondary dark:from-dark dark:via-dark dark:to-secondaryDark 
                    dark:border border-gray-500">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-400 dark:bg-secondaryDark h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-gray-400 dark:bg-secondaryDark rounded"></div>
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-gray-400 dark:bg-secondaryDark rounded col-span-2"></div>
                    <div className="h-2 bg-gray-400 dark:bg-secondaryDark rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-gray-400 dark:bg-secondaryDark rounded"></div>
                </div>
                </div>
            </div>
        </div>
    )
}