"use client";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useAuth } from "@/context/AuthContext";
import ReservationCard from "@/app/books/components/reservationCard";

export default function ReservationPage() {
    const { user, loading } = useAuth();
    const maxReservations = 3;

    if (loading) return <div>Loading...</div>;

    const {
        data: reservations,
        error,
        isLoading,
    } = useSWR("/api/v1/reservations", fetcher, {
        dedupingInterval: 5000, // prevent duplicate requests
        revalidateOnFocus: false, // don't refetch on page focus
    });

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen text-gray-500">
                Loading reservations...
            </div>
        );

    if (error)
        return (
            <div className="text-red-500 p-6">Failed to load reservations.</div>
        );

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center">
                    Reservations
                </h1>
                {!user?.role || user.role === "member" ? (
                    <span className="text-sm text-gray-400">
                        current reservations: {reservations?.length || 0}/
                        {maxReservations}
                    </span>
                ) : null}
            </div>

            {!reservations || reservations.length === 0 ? (
                <p className="text-gray-500">No reservations found.</p>
            ) : (
                <div className="space-y-4">
                    {reservations.map((r: any) => (
                        <ReservationCard key={r.id} reservation={r} />
                    ))}
                </div>
            )}
        </div>
    );
}
