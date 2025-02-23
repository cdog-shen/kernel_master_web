export function NormalInput({
  type = "text",
  placeholder = "text",
  value,
  onChange = () => {
    console.log("nothing bind on");
  },
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={onChange}
    />
  );
}

export function CommonButton({
  label = "CommonButton",
  style = {},
  onClick = () => {
    console.log("not binding any call");
  },
}) {
  return (
    <button
      type="submit"
      className="w-full px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      style={style}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export function NormalCheckBox({
  label = "NormalCheckBox",
  defaultChecked = false,
}) {
  return (
    <div className="flex justify-between items-center mb-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="mr-2 focus:ring-2 focus:ring-blue-500"
        />
        <span className="">{label}</span>
      </label>
    </div>
  );
}
