"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminBooks() {
    const [books, setBooks] = useState<any[]>([]);
    useEffect(() => {
        (async () => {
            const r = await api.get("/admin/books");
            setBooks(r.data);
        })();
    }, []);
    return (
        <div>
            <h2>Admin: Books</h2>
            <ul>
                {books.map((b) => (
                    <li key={b.id}>{b.title}</li>
                ))}
            </ul>
        </div>
    );
}
