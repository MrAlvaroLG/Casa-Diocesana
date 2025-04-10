"use client"

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        };
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    return (
        <html lang="en">
            <header className="relative">
                {isMobile && (
                    <div className="flex justify-start p-4">
                        <button 
                            onClick={toggleMenu} 
                            className="focus:outline-none"
                            aria-label="Menú"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                )}
                
                <Menubar 
                    className={`flex border-none shadow-none 
                        ${isMobile ? 'flex-col absolute w-full' : 'justify-center'}
                        ${isMobile && !menuOpen ? 'hidden' : 'flex'}`}>
                    <MenubarMenu>
                        <MenubarTrigger className={`${isMobile ? 'w-full text-center' : ''}`}>
                            <Link href="/" onClick={() => isMobile && setMenuOpen(false)}>Home</Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className={`${isMobile ? 'w-full text-center' : ''}`}>Guía Diocesana</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>   
                                <Link href="../main/guia-diocesana/horarios-de-misa" onClick={() => isMobile && setMenuOpen(false)}>Horarios de Misa</Link>
                            </MenubarItem>
                            <MenubarItem>   
                                <Link href="../main/guia-diocesana/sacerdotes" onClick={() => isMobile && setMenuOpen(false)}>Sacerdotes</Link>
                            </MenubarItem>
                            <MenubarItem>   
                                <Link href="../main/guia-diocesana/obispo" onClick={() => isMobile && setMenuOpen(false)}>Obispo</Link>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className={`${isMobile ? 'w-full text-center' : ''}`}>
                            <Link href="../main/hoespedaje" onClick={() => isMobile && setMenuOpen(false)}>Hospedaje</Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className={`${isMobile ? 'w-full text-center' : ''}`}>
                            <Link href="../main/acerca" onClick={() => isMobile && setMenuOpen(false)}>Acerca de Nosotros</Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                </Menubar>
            </header>
            <body>
                {children}
            </body>
        </html>
    );
}
