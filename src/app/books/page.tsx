import api from "@/lib/api";
import Link from "next/link";

export default async function BooksPage() {
    const res = await api.get("/api/v1/books");
    const books = res.data;
    return (
        <div className="p-4">
            <h2>Books</h2>
            <ul>
                {books.map((b: any) => (
                    <li key={b.id}>
                        <Link href={`/books/${b.id}`}>
                            {b.title} - {b.author}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
