"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function BookDetail({ params }: any) {
    const { id } = params;
    const [book, setBook] = useState<any>(null);
    const auth = useAuth();

    useState(() => {
        (async () => {
            const r = await api.get(`/api/v1/books/${id}`);
            setBook(r.data);
        })();
    });

    const reserve = async () => {
        if (!auth.user) return alert("Please login");
        try {
            await api.post("/api/v1/reservations", {
                bookId: id,
                borrowDate: new Date().toISOString().slice(0, 10),
                returnDate: new Date(Date.now() + 7 * 86400000)
                    .toISOString()
                    .slice(0, 10),
            });
            alert("Reservation created");
        } catch (e: any) {
            alert(e.response?.data?.message || "Failed");
        }
    };

    if (!book) return <div>Loading...</div>;
    return (
        <div>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <button onClick={reserve}>Reserve</button>
        </div>
    );
}
