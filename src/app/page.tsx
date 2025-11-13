"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
                <h1 className="text-3xl font-bold text-indigo-600 mb-4">
                    📚 Library Reservation
                </h1>

                {user ? (
                    <div className="space-y-2">
                        <p className="text-gray-700">
                            Welcome{" "}
                            <span className="font-semibold text-indigo-600">
                                {user.name}
                            </span>
                        </p>
                        <p className="text-sm text-gray-500">
                            Manage your bookings and explore available books.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-gray-600">
                            Welcome! Please{" "}
                            <Link
                                href="/login"
                                className="text-indigo-600 font-medium hover:underline"
                            >
                                Login
                            </Link>{" "}
                            or{" "}
                            <Link
                                href="/register"
                                className="text-indigo-600 font-medium hover:underline"
                            >
                                Register
                            </Link>{" "}
                            to continue.
                        </p>
                    </div>
                )}

                <div className="mt-8 flex flex-col items-center space-y-3">
                    <Link
                        href="/books"
                        className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Browse Books
                    </Link>

                    {user?.role === "admin" && (
                        <Link
                            href="/admin/books"
                            className="w-full border border-indigo-600 text-indigo-600 font-medium py-2 px-4 rounded-lg hover:bg-indigo-50 transition"
                        >
                            Admin: Manage Books
                        </Link>
                    )}
                </div>
            </div>

            <footer className="mt-10 text-sm text-gray-500">
                © {new Date().getFullYear()} Library Reservation System
            </footer>
        </div>
    );
}
