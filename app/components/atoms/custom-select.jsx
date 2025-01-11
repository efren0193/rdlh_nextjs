export default function CustomSelect({label, name, options, value}) {
    return (
        <div className="mb-4 w-full">
            <label className="block mb-2 font-bold text-gray-700">{label}</label>
            <select 
                value={value}
                name={name} 
                className="rounded-lg h-10 w-full border border-gray-300 shadow-md p-2 text-dark"
            >
                <option value={''}>-- Seleccione una opción --</option>
                {
                    options && options.length && 
                    options.map((o, i) => (
                        <option key={i} value={o.value}>{o.text}</option>
                    ))
                }
            </select>
        </div>
    )
}