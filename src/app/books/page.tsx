"use client";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import BookCard from "./components/bookCard";
import Link from "next/link";

export default function BooksPage() {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await api.get("/api/v1/books");
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
            <div className="flex justify-center items-center h-full text-gray-600">
                Loading books...
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Library Books
                </h2>
                {user?.role === "admin" && (
                    <Link
                        href="/books/create"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                    >
                        + Add New Book
                    </Link>
                )}
            </div>

            {books.length === 0 ? (
                <p className="text-gray-500">No books available right now.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
}
