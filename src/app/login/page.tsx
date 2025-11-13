"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();
    const router = useRouter();

    const submit = async (e: any) => {
        e.preventDefault();
        try {
            await auth.login(email, password);
            router.push("/");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <form onSubmit={submit} className="max-w-md mx-auto p-4">
            <h2 className="text-xl">Login</h2>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                type="password"
            />
            <button type="submit">Login</button>
        </form>
    );
}
