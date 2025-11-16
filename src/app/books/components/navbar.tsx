"use client";
import { Menu, Library } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar({ setSidebarOpen }: any) {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    return (
        <nav className="bg-white shadow flex items-center justify-between px-6 py-3 border-b">
            {/* LEFT: Hamburger + Logo */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => setSidebarOpen((prev: boolean) => !prev)}
                    className="
                        p-2 rounded-lg cursor-pointer
                        bg-indigo-500 hover:bg-indigo-600
                        transition text-white
                    "
                >
                    <Menu size={26} />
                </button>

                <h1 className="text-xl font-semibold text-indigo-600 flex items-center gap-2">
                    <Library size={22} />
                    Library Dashboard
                </h1>
            </div>

            {/* RIGHT: User */}
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
                            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition cursor-pointer"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <p className="text-sm text-gray-600 text-center">
                        Can't reserve a book? Try{" "}
                        <Link
                            href="/login"
                            className="text-indigo-600 font-medium hover:underline"
                        >
                            logging in
                        </Link>
                        .
                    </p>
                )}
            </div>
        </nav>
    );
}
