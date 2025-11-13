"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function BookCard({ book }: { book: any }) {
    const { user } = useAuth();

    return (
        <div className="bg-white shadow rounded-xl p-4 flex flex-col justify-between hover:shadow-lg transition">
            <div>
                <img
                    src={book.coverPicture}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                    {book.title}
                </h3>
                <p className="text-sm text-gray-500">by {book.author}</p>
                <p className="text-xs text-gray-400 mt-1">ISBN: {book.ISBN}</p>
            </div>

            <div className="flex justify-between mt-3 text-sm">
                <Link
                    href={`/books/${book.id}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                    View
                </Link>
                {user?.role === "admin" && (
                    <Link
                        href={`/books/${book.id}/delete`}
                        className="text-red-500 hover:text-red-700 font-medium"
                    >
                        Delete
                    </Link>
                )}
            </div>
        </div>
    );
}
