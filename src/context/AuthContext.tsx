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
            setAuthToken(t);
            (async () => {
                const res = await api.get("/api/v1/auth/me");
                setUser({
                    id: res.data.data._id,
                    name: res.data.data.name,
                    email: res.data.data.email,
                    role: res.data.data.role,
                });
                setToken(t);
            })();
        }
    }, []);

    const login = async (email: string, password: string) => {
        const res = await api.post("/api/v1/auth/login", { email, password });
        const { token, _id, name, res_email } = res.data;

        localStorage.setItem("token", token);
        setAuthToken(token);
        const payload: any = jwtDecode(token);
        setUser({
            id: _id,
            name,
            email: res_email,
            role: payload.role,
        });
        setToken(token);
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
