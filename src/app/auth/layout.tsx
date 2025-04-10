import "../globals.css"

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en">
            <body className="h-screen w-screen flex justify-center items-center">
                {children}
            </body>
        </html>
    );
}