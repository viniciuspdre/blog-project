'use client';

// import Input from '../../atoms/input'
import Button from '../../atoms/button'
import Link from 'next/link'
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/providers/auth/context';

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  const handleSignIn = async (data: any) => {
    await signIn(data);
  }

  return (
    <div className='flex gap-6 flex-col w-2/3 justify-center items-center bg-white h-2/3 rounded-3xl shadow-2xl'>
      <h3>Seja bem-vindo</h3>
      <form onSubmit={handleSubmit(handleSignIn)} className='flex flex-col gap-4 w-full items-center justify-center'>
        <input 
          placeholder='Digite seu email'
          type='email' 
          {...register('email')} 
          name='email' 
          required 
          className="bg-white p-4 border-b-blue-400 border-b-2 hover:border-b-blue-500 w-2/3"
        />
        <input 
          placeholder='Digite sua senha' 
          type='password' 
          {...register('password_hash')} 
          name='password_hash' 
          required 
          className="bg-white p-4 border-b-blue-400 border-b-2 hover:border-b-blue-500 w-2/3"
        />
        <p className='text-center'>Ainda não tem um conta? <br /><Link className='text-blue-500 text-center' href={`/register`}>Cadastre-se</Link></p>
        <Button text='Realizar Login' type='submit'></Button>
      </form>
    </div>
  )
}