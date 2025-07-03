export default function CustomInput({ label, name, value, type = 'text', onChange, disabled=false, placeholder='' }) {
    
    return (
      <div className="mb-4 w-full">
        <label className="block mb-2 font-bold text-gray-700">{label}</label>
        {type === 'textarea' ? (
          <textarea
            name={name}
            className="rounded-lg  w-full border border-gray-300 shadow-md p-2 text-dark dark:text-white"
            value={value}
            onChange={onChange}
            rows={3}
          />
        ) : (
          <input
            type={type}
            name={name}
            className="rounded-lg h-10 w-full border border-gray-300 shadow-md p-2 text-dark dark:text-white"
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
          />
        )}
      </div>
    );
  }