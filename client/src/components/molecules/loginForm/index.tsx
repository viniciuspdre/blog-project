import Input from '../../atoms/input'
import Button from '../../atoms/button'
import Link from 'next/link'

export default function LoginForm() {
  return (
    <div className='flex gap-6 flex-col w-2/3 justify-center items-center bg-white h-2/3 rounded-3xl'>
      <h3>Seja bem-vindo</h3>
      <Input placeholder='Digite seu email'/>
      <Input placeholder='Digite sua senha'/>
      <p className='text-center'>Ainda não tem um conta? <br /><Link className='text-blue-500 text-center' href={`/register`}>Cadastre-se</Link></p>
      <Button text='Realizar Login'></Button>
    </div>
  )
}