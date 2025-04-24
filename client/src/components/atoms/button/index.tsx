
import { ButtonProps } from "./type"

export default function Button({text, disabled, onClick, type}: ButtonProps) {
  return(
    <div className="w-1/2">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="bg-blue-400 p-4 rounded-4xl text-white font-bold w-full cursor-pointer hover:bg-blue-500"
      >
        {text}
      </button>
    </div>
  )
}