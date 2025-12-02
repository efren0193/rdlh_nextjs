export default function CustomSpin({block=false, isAdmin=false}) {
    return (
        <span className={`${block ? " block ": " flex "} ${ isAdmin ? " text-dark": "text-white"} justify-between items-center  `}>
            <svg className={`animate-spin h-5 w-5 rounded-full border-t ${isAdmin ? "border-dark" : "border-white"} mr-3`} viewBox="0 0 24 24"></svg>
            <span>Procesando...</span>
        </span>
    )
}