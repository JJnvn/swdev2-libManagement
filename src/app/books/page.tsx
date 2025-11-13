"use client";
import api from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BooksPage() {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await api.get("/api/v1/books");
                console.log(res.data);
                console.log(Array.isArray(res.data));
                setBooks(Array.isArray(res.data.data) ? res.data.data : []);
            } catch (err) {
                console.error("Failed to load books", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-600">
                Loading books...
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-lg">
                <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
                    📚 Library Books
                </h1>

                {books.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No books available right now.
                    </p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {books.map((b) => (
                            <li
                                key={b.id}
                                className="py-3 flex justify-between items-center hover:bg-gray-50 px-2 rounded-lg transition"
                            >
                                <div>
                                    <p className="text-lg font-medium text-gray-800">
                                        {b.title}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        by {b.author || "Unknown Author"}
                                    </p>
                                </div>
                                <Link
                                    href={`/books/${b.id}`}
                                    className="text-red-500 hover:text-red-600 font-medium text-sm"
                                >
                                    View
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="text-sm text-gray-600 hover:text-red-500 transition"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
