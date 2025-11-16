"use client";
import useSWR from "swr";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import BookCard from "./components/bookCard";
import Link from "next/link";

const fetcher = (url: string) => api.get(url).then((r) => r.data.data);

export default function BooksPage() {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;

    // SWR handles caching + dedupe + auto-reload
    const {
        data: books,
        isLoading,
        mutate,
    } = useSWR("/api/v1/books", fetcher, {
        dedupingInterval: 60000, // 1 minute cache, prevents 429 spam
        revalidateOnFocus: false, // prevents extra fetches
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full text-gray-600">
                Loading books...
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
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

            {!books || books.length === 0 ? (
                <p className="text-gray-500">No books available right now.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book: any) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            mutateBooks={mutate} // pass mutate to card
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
