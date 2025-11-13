"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api, { setAuthToken } from "@/lib/api";

type User = {
    id: string;
    name: string;
    email: string;
    role: "admin" | "member";
} | null;

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const t = localStorage.getItem("token");
        if (t) {
            try {
                const payload: any = jwtDecode(t);
                setUser({
                    id: payload.sub,
                    name: payload.name,
                    email: payload.email,
                    role: payload.role,
                });
                setToken(t);
                setAuthToken(t);
            } catch (e) {
                console.warn("invalid token", e);
                logout();
            }
        }
    }, []);

    const login = async (email: string, password: string) => {
        const res = await api.post("/api/v1/auth/login", { email, password });
        const t = res.data.token;
        localStorage.setItem("token", t);
        setAuthToken(t);
        const payload: any = jwtDecode(t);
        setUser({
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            role: payload.role,
        });
        setToken(t);
    };

    const register = async (payload: any) => {
        await api.post("/api/v1/auth/register", payload);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setAuthToken(null);
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
