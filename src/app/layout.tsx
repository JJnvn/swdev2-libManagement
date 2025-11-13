import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="th">
            <body>
                <AuthProvider>
                    <main>{children}</main>
                </AuthProvider>
            </body>
        </html>
    );
}
