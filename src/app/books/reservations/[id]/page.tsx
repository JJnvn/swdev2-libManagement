"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export default function ReservationDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [reservation, setReservation] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const res = await api.get(`/api/v1/reservations/${id}`);
                setReservation(res.data.data);
            } catch (err) {
                console.error("Failed to fetch reservation:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchReservation();
    }, [id]);

    const handleUpdate = async () => {
        try {
            setUpdating(true);
            await api.put(`/api/v1/reservations/${id}`, {
                borrowDate: reservation.borrowDate,
                pickupDate: reservation.pickupDate,
            });
            alert("✅ Reservation updated successfully!");
            router.push("/books/reservations");
        } catch (err) {
            alert("❌ Failed to update reservation.");
            console.error(err);
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this reservation?"))
            return;
        try {
            await api.delete(`/api/v1/reservations/${id}`);
            alert("🗑️ Reservation deleted successfully!");
            router.push("/books/reservations");
        } catch (err) {
            alert("❌ Failed to delete reservation.");
            console.error(err);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen text-gray-500">
                Loading reservation...
            </div>
        );

    if (!reservation)
        return (
            <div className="p-6 text-center text-gray-500">
                Reservation not found.
            </div>
        );

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6 mt-10">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-indigo-600">
                    Reservation Detail
                </h1>
                <button
                    onClick={() => router.push("/books/reservations")}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
                >
                    ← Back
                </button>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Book Title :
                    </label>
                    <p className="text-gray-800">{reservation.book.title}</p>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Borrow Date :
                    </label>
                    <input
                        type="date"
                        value={
                            reservation.borrowDate
                                ? new Date(reservation.borrowDate)
                                      .toISOString()
                                      .slice(0, 10)
                                : ""
                        }
                        onChange={(e) =>
                            setReservation({
                                ...reservation,
                                borrowDate: e.target.value,
                            })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Pickup Date :
                    </label>
                    <input
                        type="date"
                        value={
                            reservation.pickupDate
                                ? new Date(reservation.pickupDate)
                                      .toISOString()
                                      .slice(0, 10)
                                : ""
                        }
                        onChange={(e) =>
                            setReservation({
                                ...reservation,
                                pickupDate: e.target.value,
                            })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {reservation.userName && (
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Reserved By
                        </label>
                        <p className="text-gray-800">{reservation.userName}</p>
                    </div>
                )}
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={handleUpdate}
                    disabled={updating}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    {updating ? "Updating..." : "Update Reservation"}
                </button>

                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Delete Reservation
                </button>
            </div>
        </div>
    );
}
