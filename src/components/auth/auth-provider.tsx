"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase-client";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOutUser: () => Promise<void>;
  createTestAccount: () => Promise<{ email: string; password: string }>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

const githubProvider = new GithubAuthProvider();

githubProvider.addScope("user:email");

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    async signUpWithEmail(email, password) {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    },
    async signInWithEmail(email, password) {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    },
    async signInWithGoogle() {
      await signInWithPopup(firebaseAuth, googleProvider);
    },
    async signInWithGithub() {
      await signInWithPopup(firebaseAuth, githubProvider);
    },
    async signOutUser() {
      await signOut(firebaseAuth);
    },
    async createTestAccount() {
      const email = `agent.tester+${Date.now()}@example.com`;
      const password = `Test${Math.random().toString(36).slice(-6)}!A1`;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      return { email, password };
    },
  }), [loading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
