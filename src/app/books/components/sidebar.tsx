"use client";
import Link from "next/link";
import { Menu, BookOpen, CalendarCheck } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar({ open, setOpen }: any) {
    const pathname = usePathname();

    const menu = [
        { name: "Library Books", href: "/books", icon: BookOpen },
        {
            name: "My Reservations",
            href: "/books/reservations",
            icon: CalendarCheck,
        },
    ];

    return (
        <>
            {/* SLIDING SIDEBAR */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-indigo-700 text-white py-3 px-6 space-y-4
                    transform transition-transform duration-300 z-40
                    ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Header + Hamburger */}
                <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setOpen(false)}
                            className="p-2 rounded-lg hover:bg-indigo-600 transition cursor-pointer"
                        >
                            <Menu size={26} />
                        </button>

                        <h2 className="text-xl font-semibold">Library Menu</h2>
                    </div>

                    {/* White Divider Line */}
                    <div className="w-full h-px bg-white/40 mt-1"></div>
                </div>

                {/* MENU LIST */}
                {menu.map((item) => {
                    const active = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`
                                flex items-center gap-3 py-2.5 px-3 rounded-lg transition
                                ${
                                    active
                                        ? "bg-indigo-500 font-semibold"
                                        : "hover:bg-indigo-600"
                                }
                            `}
                        >
                            <Icon size={20} />
                            {item.name}
                        </Link>
                    );
                })}
            </aside>

            {/* BACKDROP */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-30"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
}
