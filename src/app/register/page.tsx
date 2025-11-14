"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function RegisterPage() {
    const [payload, setPayload] = useState({
        name: "",
        email: "",
        tel: "",
        role: "member",
        password: "",
    });
    const auth = useAuth();
    const router = useRouter();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await auth.register(payload);
            alert("✅ Registered successfully! Please login.");
            router.push("/login");
        } catch (err) {
            alert("❌ Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                    📝 Create an Account
                </h2>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={payload.name}
                            onChange={(e) =>
                                setPayload({ ...payload, name: e.target.value })
                            }
                            placeholder="Your full name"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={payload.email}
                            onChange={(e) =>
                                setPayload({
                                    ...payload,
                                    email: e.target.value,
                                })
                            }
                            placeholder="you@example.com"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Telephone
                        </label>
                        <input
                            type="tel"
                            value={payload.tel}
                            onChange={(e) =>
                                setPayload({ ...payload, tel: e.target.value })
                            }
                            placeholder="e.g. 0812345678"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Role
                        </label>
                        <select
                            value={payload.role}
                            onChange={(e) =>
                                setPayload({ ...payload, role: e.target.value })
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={payload.password}
                            onChange={(e) =>
                                setPayload({
                                    ...payload,
                                    password: e.target.value,
                                })
                            }
                            placeholder="••••••••"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6 text-sm">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>

            <footer className="mt-10 text-sm text-gray-500">
                © {new Date().getFullYear()} Library Reservation System
            </footer>
        </div>
    );
}
