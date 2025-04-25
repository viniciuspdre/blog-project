'use client'

import { createContext, useState} from "react";
import { AuthContextType, AuthProviderProps, SignInData, User } from "./types";
import axios from "axios";
import { setCookie } from "nookies"
import Router from "next/router";

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: AuthProviderProps) {

  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated: boolean = !!user;

  const signIn = async ({email, password_hash}: SignInData) => {
    const response = await axios.post('/api/auth/login', {email, password_hash});

    const token = response.data.body.token;
    const userResponse = response.data.body.user;

    setCookie(undefined, 'blog.token', token, {
      maxAge: 60 * 60 * 24 // 1 day
    });

    setUser(userResponse);
    Router.push('/home');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}