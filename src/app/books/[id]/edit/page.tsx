"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function EditBookPage() {
    const { id } = useParams();
    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const auth = useAuth();

    useEffect(() => {
        if (auth.user?.role !== "admin") {
            alert("Unauthorized access.");
            router.push(`/books/${id}`);
            return;
        }

        (async () => {
            try {
                const r = await api.get(`/api/v1/books/${id}`);
                setBook(r.data?.data || r.data);
            } catch (e) {
                console.error("Failed to fetch book", e);
                alert("Failed to load book data");
                router.push(`/books/${id}`);
            } finally {
                setLoading(false);
            }
        })();
    }, [id, auth.user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await api.put(`/api/v1/books/${id}`, book);
            alert("Book updated successfully!");
            router.push(`/books/${id}`);
        } catch (e: any) {
            alert(e.response?.data?.message || "Failed to update");
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen text-gray-500">
                Loading book data...
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
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
                    Edit Book
                </h2>

                <div className="space-y-3">
                    {[
                        "title",
                        "author",
                        "publisher",
                        "ISBN",
                        "availableAmount",
                    ].map((field) => (
                        <div key={field}>
                            <label className="block font-semibold capitalize">
                                {field}:
                            </label>
                            <input
                                type={
                                    field === "availableAmount"
                                        ? "number"
                                        : "text"
                                }
                                name={field}
                                value={book[field] || ""}
                                onChange={handleChange}
                                className="w-full border rounded px-2 py-1 mt-1"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 mt-6">
                    <button
                        onClick={handleUpdate}
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => router.push(`/books/${id}`)}
                        className="flex-1 border border-gray-400 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
