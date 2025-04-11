import "../globals.css"

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="es">
            <body className="min-h-screen w-full flex justify-center items-center bg-gray-50">
                <main className="w-full max-w-md px-4">
                    {children}
                </main>
            </body>
        </html>
    );
}