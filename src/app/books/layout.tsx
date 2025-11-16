"use client";
import { useState } from "react";
import Navbar from "@/app/books/components/navbar";
import Sidebar from "@/app/books/components/sidebar";

export default function Layout({ children }: any) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen">
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            <div className="flex-1 flex flex-col">
                <Navbar setSidebarOpen={setSidebarOpen} />
                <main className="p-6 bg-gray-100">{children}</main>
            </div>
        </div>
    );
}
