import { ReactNode } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface SignInData {
  email: string;
  password_hash: string;
}

export interface User {
  id: number,
  email: string,
  name: string,
  profile_picture_url: string,
  password_hash: string,
  role: string
}