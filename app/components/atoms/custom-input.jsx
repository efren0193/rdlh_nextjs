export default function CustomInput({
  label,
  name,
  value,
  type = "text",
  onChange,
  disabled = false,
  placeholder = "",
  options = [] // <-- para radios
}) {
  const renderType = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            name={name}
            className="rounded-xl w-full border border-gray-300 shadow-md p-2 text-dark dark:text-white"
            value={value}
            onChange={onChange}
            rows={3}
          />
        );

      case "radio":
        return (
          <div className="flex gap-4">
            {options.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={onChange}
                  disabled={disabled}
                  className="h-4 w-4 text-dark dark:text-white"
                />
                <span className="text-dark dark:text-white">{opt.label}</span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            type={type}
            name={name}
            className="rounded-xl h-10 w-full border border-gray-300 shadow-md p-4 text-dark dark:text-white focus-visible:outline-0"
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className="mb-4 w-full">
      <label className="block mb-2 font-bold text-gray-700">{label}</label>
      {renderType()}
    </div>
  );
}
