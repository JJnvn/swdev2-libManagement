"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const r = await api.get(`/api/v1/books/${id}`);
                setBook(r.data?.data || r.data);
            } catch (err) {
                console.error("Failed to load book", err);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    const reserve = async () => {
        if (!auth.user) return alert("Please login first");
        try {
            await api.post("/api/v1/reservations", {
                book: id,
                borrowDate: new Date(Date.now()).toISOString(),
                pickupDate: new Date(Date.now() + 7 * 86400000).toISOString(),
            });
            alert("Reservation created successfully!");
            router.push("/books");
        } catch (e: any) {
            alert(e.response?.data?.message || "Failed to reserve");
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen text-gray-500">
                Loading book details...
            </div>
        );

    if (!book)
        return (
            <div className="flex justify-center items-center h-screen text-gray-500">
                Book not found.
            </div>
        );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-4">
                    {book.title}
                </h2>
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Author:</span> {book.author}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Publisher:</span>{" "}
                    {book.publisher || "Unknown"}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">ISBN:</span>{" "}
                    {book.ISBN || "-"}
                </p>
                <p className="text-gray-700 mb-6">
                    <span className="font-semibold">Available:</span>{" "}
                    {book.availableAmount ?? 0}
                </p>

                <button
                    onClick={reserve}
                    disabled={book.availableAmount <= 0}
                    className={`w-full py-2 rounded-lg text-white font-semibold transition-colors duration-200 ${
                        book.availableAmount > 0
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                    {book.availableAmount > 0
                        ? "Reserve this Book"
                        : "Unavailable"}
                </button>

                <button
                    onClick={() => router.push("/books")}
                    className="mt-4 w-full border border-red-500 text-red-500 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-200"
                >
                    Back to Books
                </button>
            </div>
        </div>
    );
}
