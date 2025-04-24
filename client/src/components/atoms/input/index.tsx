import { InputProps } from "./type"

export default function Input({placeholder, value, onChange, type = "text"}: InputProps) {
  return (
    <div className="w-2/3">
      <input
        type={type} 
        placeholder={placeholder} 
        onChange={onChange} value={value} 
        className="bg-white p-4 border-b-blue-400 border-b-2 w-full hover:border-b-blue-500"
      />
    </div>
  )
}