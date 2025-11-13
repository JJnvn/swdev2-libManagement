"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    return (
        <nav className="bg-white shadow flex justify-between items-center px-6 py-3 border-b">
            {/* Left side: App name */}
            <h1 className="text-2xl font-semibold text-indigo-600">
                📚 Library Dashboard
            </h1>

            {/* Right side: User info + logout */}
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <div className="text-right">
                            <p className="font-medium text-gray-800">
                                {user.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>

                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user.name
                            )}`}
                            alt="user avatar"
                            className="w-10 h-10 rounded-full border object-cover"
                        />

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <p className="text-gray-500 text-sm">Not logged in</p>
                )}
            </div>
        </nav>
    );
}
