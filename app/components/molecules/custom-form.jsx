export default function CustomForm({children, onSubmit}){
    return (
        <form 
            className="border border-gray-400 rounded-md p-4"
            onSubmit={onSubmit}
        >
            {children}
        </form>
    )
}