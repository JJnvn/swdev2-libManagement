"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const menu = [
        { name: "Library Books", href: "/books" },
        { name: "My Reservations", href: "/books/reservations" },
    ];

    return (
        <aside className="w-64 bg-indigo-700 text-white flex flex-col py-6 px-4 space-y-4">
            <h2 className="text-xl font-semibold mb-6">Library Menu</h2>
            {menu.map((item) => {
                const active = pathname === item.href;
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`block py-2.5 px-3 rounded-lg transition ${
                            active
                                ? "bg-indigo-500 font-semibold"
                                : "hover:bg-indigo-600"
                        }`}
                    >
                        {item.name}
                    </Link>
                );
            })}
        </aside>
    );
}
