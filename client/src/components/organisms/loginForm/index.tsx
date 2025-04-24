'use client';

import Input from '../../atoms/input'
import Button from '../../atoms/button'
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password_hash, setPasswordHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    const loginData = {
      email,
      password_hash,
    }

    try {
      const response = await axios.post('api/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      const token = response.data.body.token;
      const user = response.data.body.user;

      localStorage.setItem('jwtToken', token);

    } catch (axiosError: any) {
      console.error('Resposta de erro no servidor:', axiosError.response.data);

      if (axiosError.response) {
        console.error('Resposta de erro do servidor');
        setError(axiosError.response.data.body?.message || `Erro ${axiosError.response.status}: ${axiosError.response.statusText}`);

      } else if (axiosError.request) {
        setError('Erro de rede ou servidor não respondeu.')
      } else {
        setError('Erro ao configurar a requisição de login.')
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='flex gap-6 flex-col w-2/3 justify-center items-center bg-white h-2/3 rounded-3xl shadow-2xl'>
      <h3>Seja bem-vindo</h3>
      <form action="post" onSubmit={handleLogin} className='flex flex-col gap-4 w-full items-center justify-center'>
        <Input placeholder='Digite seu email' type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
        <Input placeholder='Digite sua senha' type='password' onChange={(e) => setPasswordHash(e.target.value)} value={password_hash} />
        <p className='text-center'>Ainda não tem um conta? <br /><Link className='text-blue-500 text-center' href={`/register`}>Cadastre-se</Link></p>
        <Button text={isLoading ? 'Entrando...' : 'Realizar Login'} type='submit'></Button>
      </form>
    </div>
  )
}