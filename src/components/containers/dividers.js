import DividerStyles from "./divider.module.css";

export function Divider() {
  return (
    <div className="w-full flex items-center my-4">
      <hr className="flex-grow border-t border-gray-300" />
    </div>
  );
}
