'use client'

import { useEffect, useState} from "react";
import { AuthProviderProps, SignInData, User } from "./types";
import axios from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies"
import { AuthContext } from "./context";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axiosInstance";


export function AuthProvider({children}: AuthProviderProps) {

  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated: boolean = !!user;
  const router = useRouter();

  useEffect(() => {
  
    const loadUserFromToken = async () => {
      const { 'blog.token': token } = parseCookies();

      try {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        

        const response = await axiosInstance.get(`/api/user/${user?.id}`);
        const { user: currentUser } = response.data;
        console.log(currentUser);
        setUser(currentUser);

      } catch (error) {
        if(axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
          destroyCookie(undefined, 'blog.token', {path: '/'}); // remove o token se expirar ou for invalido
          console.log("Token destroyed by invalidation or expiration.")
        }

        setUser(null);
        delete axiosInstance.defaults.headers.common['Authorization'];
      }
    }

    loadUserFromToken();

    return () => {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
    
  }, [])

  const signIn = async ({email, password_hash}: SignInData) => {

    const response = await axiosInstance.post('/api/auth/login', {email, password_hash});

    const { token, user }= response.data;


    setCookie(undefined, 'blog.token', token, {
      maxAge: 60 * 60 * 24 // 1 day
    });

    setUser(user);
    console.log(token, user);
    router.push('/home');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}U
    </AuthContext.Provider>
  )
}