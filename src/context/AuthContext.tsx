"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "@/lib/api";

type User = {
    id: string;
    name: string;
    email: string;
    role: "admin" | "member";
} | null;

type AuthContextType = {
    user: User;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (payload: any) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // ================
    // LOAD TOKEN + USER
    // ================
    useEffect(() => {
        const t = localStorage.getItem("token");
        if (!t) {
            setLoading(false);
            return;
        }

        setAuthToken(t);

        (async () => {
            try {
                const res = await api.get("/api/v1/auth/me");
                setUser({
                    id: res.data.data._id,
                    name: res.data.data.name,
                    email: res.data.data.email,
                    role: res.data.data.role,
                });
                setToken(t);
            } catch (err) {
                console.error("Auth me failed", err);
                localStorage.removeItem("token");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // ================
    // LOGIN
    // ================
    const login = async (email: string, password: string) => {
        // Step 1: login → get token only
        const res = await api.post("/api/v1/auth/login", { email, password });
        const { token } = res.data;

        // Step 2: save token
        localStorage.setItem("token", token);
        setAuthToken(token);
        setToken(token);

        // Step 3: fetch correct user data (including role)
        const me = await api.get("/api/v1/auth/me");

        setUser({
            id: me.data.data._id,
            name: me.data.data.name,
            email: me.data.data.email,
            role: me.data.data.role,
        });
    };

    // REGISTER
    const register = async (payload: any) => {
        await api.post("/api/v1/auth/register", payload);
    };

    // LOGOUT
    const logout = () => {
        localStorage.removeItem("token");
        setAuthToken(null);
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, token, loading, login, logout, register }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)!;
