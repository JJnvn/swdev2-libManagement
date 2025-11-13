"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import ReservationCard from "@/app/books/components/reservationCard";

export default function ReservationPage() {
    const [reservations, setReservations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const maxReservations = 3;

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const res = await api.get("/api/v1/reservations");
                setReservations(res.data.data || []);
            } catch (err) {
                console.error("Failed to fetch reservations:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen text-gray-500">
                Loading reservations...
            </div>
        );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-indigo-600 flex items-center">
                    📖 Reservations
                </h1>
                {!user?.role || user.role === "member" ? (
                    <span className="text-sm text-gray-400">
                        current reservations: {reservations.length}/
                        {maxReservations}
                    </span>
                ) : null}
            </div>

            {reservations.length === 0 ? (
                <p className="text-gray-500">No reservations found.</p>
            ) : (
                <div className="space-y-4">
                    {reservations.map((r) => (
                        <ReservationCard key={r.id} reservation={r} />
                    ))}
                </div>
            )}
        </div>
    );
}
