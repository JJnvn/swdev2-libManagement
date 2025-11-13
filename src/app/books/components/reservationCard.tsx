"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface ReservationCardProps {
    reservation: any;
}

export default function ReservationCard({ reservation }: ReservationCardProps) {
    const { user } = useAuth();

    return (
        <div className="bg-white shadow-md rounded-xl p-5 flex justify-between items-center hover:shadow-lg transition">
            <div>
                <h3 className="text-lg font-semibold text-gray-800">
                    {reservation.book.title || "Unknown Book"}
                </h3>
                <p className="text-sm text-gray-600">
                    Borrow Date:{" "}
                    <span className="font-medium">
                        {reservation.borrowDate
                            ? new Date(
                                  reservation.borrowDate
                              ).toLocaleDateString()
                            : "-"}
                    </span>
                </p>
                <p className="text-sm text-gray-600">
                    Pickup Date:{" "}
                    <span className="font-medium">
                        {reservation.pickupDate
                            ? new Date(
                                  reservation.pickupDate
                              ).toLocaleDateString()
                            : "-"}
                    </span>
                </p>

                {user?.role === "admin" && (
                    <p className="text-sm text-gray-500 mt-1">
                        👤 Reserved by:{" "}
                        <span className="font-medium">
                            {reservation.userName}
                        </span>
                    </p>
                )}
            </div>

            <Link
                href={`/books/reservations/${reservation.id}`}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
                View Detail
            </Link>
        </div>
    );
}
