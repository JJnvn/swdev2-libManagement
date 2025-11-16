"use client";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useAuth } from "@/context/AuthContext";
import ReservationCard from "@/app/books/components/reservationCard";
import Link from "next/link";

export default function ReservationPage() {
    const { user, loading: authLoading } = useAuth();
    const maxReservations = 3;

    const {
        data: reservations,
        error,
        isLoading,
    } = useSWR("/api/v1/reservations", fetcher, {
        dedupingInterval: 5000,
        revalidateOnFocus: false,
    });

    // Show loading while auth or data is loading
    if (authLoading || isLoading)
        return (
            <div className="flex justify-center items-center h-screen text-gray-500">
                Loading reservations...
            </div>
        );

    // Handle errors
    if (error) {
        // @ts-ignore
        if (error.status === 401) {
            return (
                <p className="text-gray-600 text-center mt-10">
                    Cannot load reservations. Please{" "}
                    <Link
                        href="/login"
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        login
                    </Link>{" "}
                    to view your reservations.
                </p>
            );
        }
        return (
            <div className="text-red-500 p-6 text-center">
                Failed to load reservations.
            </div>
        );
    }

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
                <p className="text-gray-500 text-center">
                    You have no reservations yet.
                </p>
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
