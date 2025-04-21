
interface InputProps {
  placeholder?: string
}

export default function Input({placeholder}: InputProps) {
  return (
    <div className="w-2/3">
      <input type="text" placeholder={placeholder} className="bg-white p-4 border-b-blue-400 border-b-2 w-full hover:border-b-blue-500"/>
    </div>
  )
}