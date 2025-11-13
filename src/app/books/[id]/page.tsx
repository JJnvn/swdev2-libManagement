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
                borrowDate: new Date().toISOString(),
                pickupDate: new Date(Date.now() + 7 * 86400000).toISOString(),
            });
            alert("Reservation created successfully!");
            router.push("/books/reservation");
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

    const isAdmin = auth.user?.role === "admin";

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Back Button */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => router.push("/books")}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
                >
                    Back
                </button>
            </div>

            <div className="bg-white shadow-lg rounded-2xl flex flex-col md:flex-row max-w-4xl mx-auto overflow-hidden">
                {/* Left: Image */}
                <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
                    {book.coverPicture ? (
                        <img
                            src={book.coverPicture}
                            alt={book.title}
                            className="object-contain h-64 md:h-full"
                        />
                    ) : (
                        <div className="text-gray-400">No Image</div>
                    )}
                </div>

                {/* Right: Details */}
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div className="space-y-3">
                        <h2 className="text-2xl font-bold">{book.title}</h2>
                        <p>
                            <span className="font-semibold">Author:</span>{" "}
                            {book.author}
                        </p>
                        <p>
                            <span className="font-semibold">Publisher:</span>{" "}
                            {book.publisher || "Unknown"}
                        </p>
                        <p>
                            <span className="font-semibold">ISBN:</span>{" "}
                            {book.ISBN || "-"}
                        </p>
                        <p>
                            <span className="font-semibold">Available:</span>{" "}
                            {book.availableAmount ?? 0}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col md:flex-row gap-3">
                        {!isAdmin && (
                            <button
                                onClick={reserve}
                                disabled={book.availableAmount <= 0}
                                className={`flex-1 py-2 rounded-lg text-white font-semibold transition-colors duration-200 ${
                                    book.availableAmount > 0
                                        ? "bg-indigo-500 hover:bg-indigo-600"
                                        : "bg-gray-400 cursor-not-allowed"
                                }`}
                            >
                                {book.availableAmount > 0
                                    ? "Reserve this Book"
                                    : "Unavailable"}
                            </button>
                        )}

                        {isAdmin && (
                            <button
                                onClick={() => router.push(`/books/${id}/edit`)}
                                className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
                            >
                                Edit Book
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
