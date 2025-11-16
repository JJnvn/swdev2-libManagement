"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();
    const router = useRouter();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await auth.login(email, password);
            router.push("/books");
        } catch (err) {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                    Login to Your Account
                </h2>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6 text-sm">
                    Don’t have an account?{" "}
                    <Link
                        href="/"
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>

            <footer className="mt-10 text-sm text-gray-500">
                © {new Date().getFullYear()} Library Reservation System
            </footer>
        </div>
    );
}
