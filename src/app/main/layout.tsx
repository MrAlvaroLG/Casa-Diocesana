"use client"

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [isGuiaMenuOpen, setIsGuiaMenuOpen] = useState(false);
    const menuTriggerRef = useRef<HTMLButtonElement>(null);
    const submenuRef = useRef<HTMLDivElement>(null);
    
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
    
    useEffect(() => {
        const menuTrigger = document.querySelector('[data-menu-trigger="guia-diocesana"]');
        if (!menuTrigger) return;
        
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === "data-state") {
                    const isOpen = (mutation.target as HTMLElement).getAttribute("data-state") === "open";
                    setIsGuiaMenuOpen(isOpen);
                }
            });
        });
        
        observer.observe(menuTrigger, { attributes: true });
        
        return () => {
            observer.disconnect();
        };
    }, []);
    
    const handleMobileSubmenuToggle = (e: React.MouseEvent) => {
        if (!isMobile) return;
        
        e.preventDefault();
        setOpenSubmenu(openSubmenu === 'guia' ? null : 'guia');
    };
    
    return (
        <html lang="en">
            <header>
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
                        ${isMobile ? 'flex-col absolute w-full z-10 transition-all duration-300 ease-in-out' : 'justify-center'}
                        ${isMobile && !menuOpen ? 'opacity-0 -translate-y-5 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                    <MenubarMenu>
                        <MenubarTrigger className={`${isMobile ? 'w-full text-center' : ''}`}>
                            <Link href="/" onClick={() => isMobile && setMenuOpen(false)}>Home</Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                    
                    {isMobile ? (
                        <div className="w-full">
                            <div 
                                className="flex justify-between items-center px-2 py-1 cursor-pointer text-sm md:text-base font-medium"
                                onClick={handleMobileSubmenuToggle}
                            >
                                <span>Guía Diocesana</span>
                                <ChevronDown 
                                    className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                                        openSubmenu === 'guia' ? 'transform rotate-180' : ''
                                    }`} 
                                />
                            </div>
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openSubmenu === 'guia' ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                                }`}
                                ref={submenuRef}
                            >
                                <div className="bg-gray-50 w-full rounded-md pl-4">
                                    <div className="py-1.5">
                                        <Link 
                                            href="../main/guia-diocesana/horarios-de-misa" 
                                            onClick={() => setMenuOpen(false)}
                                            className="block w-full text-sm font-medium"
                                        >
                                            Horarios de Misa
                                        </Link>
                                    </div>
                                    <div className="py-1.5">
                                        <Link 
                                            href="../main/guia-diocesana/sacerdotes" 
                                            onClick={() => setMenuOpen(false)}
                                            className="block w-full text-sm font-medium"
                                        >
                                            Sacerdotes
                                        </Link>
                                    </div>
                                    <div className="py-1.5">
                                        <Link 
                                            href="../main/guia-diocesana/obispo" 
                                            onClick={() => setMenuOpen(false)}
                                            className="block w-full text-sm font-medium"
                                        >
                                            Obispo
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Menú normal para desktop
                        <MenubarMenu>
                            <MenubarTrigger 
                                data-menu-trigger="guia-diocesana"
                                ref={menuTriggerRef}
                                className="flex justify-between items-center"
                            >
                                <span>Guía Diocesana</span>
                                <ChevronDown 
                                    className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                                        isGuiaMenuOpen ? 'transform rotate-180' : ''
                                    }`} 
                                />
                            </MenubarTrigger>
                            <MenubarContent className="animate-in fade-in-50 zoom-in-95 duration-200">
                                <MenubarItem>   
                                    <Link href="../main/guia-diocesana/horarios-de-misa">Horarios de Misa</Link>
                                </MenubarItem>
                                <MenubarItem>   
                                    <Link href="../main/guia-diocesana/sacerdotes">Sacerdotes</Link>
                                </MenubarItem>
                                <MenubarItem>   
                                    <Link href="../main/guia-diocesana/obispo">Obispo</Link>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    )}
                    
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
