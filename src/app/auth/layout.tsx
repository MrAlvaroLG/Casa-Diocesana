import "../globals.css"

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en">
            <body className="w-dvw h-dvh flex justify-center items-center">
                {children}
            </body>
        </html>
    );
}