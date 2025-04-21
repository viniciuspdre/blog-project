
interface ButtonProps {
  text?: string;
}

export default function Button({text}: ButtonProps) {
  return(
    <div className="w-1/2">
      <button className="bg-blue-400 p-4 rounded-4xl text-white font-bold w-full">{text}</button>
    </div>
  )
}