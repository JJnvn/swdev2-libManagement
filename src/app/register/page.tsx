"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
    const [payload, setPayload] = useState({
        name: "",
        email: "",
        tel: "",
        role: "member",
        password: "",
    });
    const auth = useAuth();
    const router = useRouter();

    const submit = async (e: any) => {
        e.preventDefault();
        try {
            await auth.register(payload);
            alert("Registered. Please login");
            router.push("/login");
        } catch (err) {
            alert("Register failed");
        }
    };

    return (
        <form onSubmit={submit} className="max-w-md mx-auto p-4">
            <h2>Register</h2>
            <input
                value={payload.name}
                onChange={(e) =>
                    setPayload({ ...payload, name: e.target.value })
                }
                placeholder="name"
            />
            <input
                value={payload.email}
                onChange={(e) =>
                    setPayload({ ...payload, email: e.target.value })
                }
                placeholder="email"
            />
            <input
                value={payload.tel}
                onChange={(e) =>
                    setPayload({ ...payload, tel: e.target.value })
                }
                placeholder="tel"
            />
            <select
                value={payload.role}
                onChange={(e) =>
                    setPayload({ ...payload, role: e.target.value })
                }
            >
                <option value="member">member</option>
                <option value="admin">admin</option>
            </select>
            <input
                value={payload.password}
                onChange={(e) =>
                    setPayload({ ...payload, password: e.target.value })
                }
                placeholder="password"
                type="password"
            />
            <button type="submit">Register</button>
        </form>
    );
}
