"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function CreateBookPage() {
    const router = useRouter();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        ISBN: "",
        publisher: "",
        availableAmount: "",
        coverPicture: "",
    });

    const [loading, setLoading] = useState(false);

    // Prevent unauthorized access
    if (!user || user.role !== "admin") {
        return (
            <div className="min-h-screen flex justify-center items-center text-gray-600">
                You are not authorized to access this page.
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const body = {
                title: formData.title,
                author: formData.author,
                ISBN: formData.ISBN,
                publisher: formData.publisher,
                availableAmount: parseInt(formData.availableAmount, 10),
                coverPicture: formData.coverPicture,
            };

            await api.post("/api/v1/books", body);
            alert("Book created successfully!");
            router.push("/books");
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to create book");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
                    🆕 Create a New Book
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: "Title", name: "title", type: "text" },
                        { label: "Author", name: "author", type: "text" },
                        { label: "ISBN", name: "ISBN", type: "text" },
                        { label: "Publisher", name: "publisher", type: "text" },
                        {
                            label: "Available Amount",
                            name: "availableAmount",
                            type: "number",
                        },
                        {
                            label: "Cover Picture URL",
                            name: "coverPicture",
                            type: "text",
                        },
                    ].map(({ label, name, type }) => (
                        <div key={name}>
                            <label
                                htmlFor={name}
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                {label}
                            </label>
                            <input
                                type={type}
                                id={name}
                                name={name}
                                value={(formData as any)[name]}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 ${
                            loading
                                ? "opacity-70 cursor-not-allowed"
                                : "hover:bg-indigo-700"
                        }`}
                    >
                        {loading ? "Creating..." : "Create Book"}
                    </button>
                </form>

                <button
                    onClick={() => router.push("/books")}
                    className="mt-4 w-full border border-indigo-600 text-indigo-600 font-semibold py-2 rounded-lg hover:bg-indigo-50 transition"
                >
                    Back to Books
                </button>
            </div>
        </div>
    );
}
