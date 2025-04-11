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
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const menuTriggerRef = useRef<HTMLButtonElement>(null);
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    const handleMobileSubmenuToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpenSubmenu(openSubmenu === 'guia' ? null : 'guia');
    };
    
    return (
        <html lang="en">
            <header className="py-2 lg:py-5">
                <div className="lg:hidden flex items-center justify-start h-12">
                    <button 
                        onClick={toggleMenu} 
                        className="ml-2 focus:outline-none"
                        aria-label="Menú"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="absolute right-3">
                        <Button className="mx-3 text-xs" variant="secondary">
                            <Link href="/auth/signup">Crear Cuenta</Link>
                        </Button>
                        <Button className="mx-3 text-xs">
                            <Link href="/auth/login">Iniciar Sesion</Link>
                        </Button>
                    </div>
                </div>
                
                <Menubar 
                    className={`border-none shadow-none transition-all duration-300 ease-in-out
                        lg:ml-10 lg:flex-row lg:static lg:w-auto lg:opacity-100 lg:translate-y-0 
                        absolute w-full z-10 flex-col
                        ${menuOpen 
                            ? 'opacity-100 translate-y-0 pointer-events-auto' 
                            : 'opacity-0 -translate-y-5 pointer-events-none lg:pointer-events-auto'
                        }`}>
                    <MenubarMenu>
                        <MenubarTrigger className="lg:w-auto w-full text-center">
                            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                    
                    <div className="lg:hidden w-full">
                        <div 
                            className="flex justify-between items-center px-3 py-2 cursor-pointer text-sm md:text-base font-medium hover:bg-accent/80 hover:text-accent-foreground rounded-sm"
                            onClick={handleMobileSubmenuToggle}
                        >
                            <span>Guía Diocesana</span>
                            <ChevronDown 
                                className={`mr-3 h-4 w-4 transition-transform duration-300 ${
                                    openSubmenu === 'guia' ? 'rotate-180' : ''
                                }`} 
                            />
                        </div>
                        <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                openSubmenu === 'guia' ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <div className="border-l-2 w-full ml-4 pl-2">
                                {['horarios-de-misa', 'sacerdotes', 'obispo'].map((item) => (
                                    <div key={item}>
                                        <Link 
                                            href={`../main/guia-diocesana/${item}`}
                                            onClick={() => setMenuOpen(false)}
                                            className="block w-full text-sm py-1.5 font-medium hover:bg-accent/80 hover:text-accent-foreground rounded-sm px-2"
                                        >
                                            {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="hidden lg:block">
                        <MenubarMenu>
                            <MenubarTrigger 
                                ref={menuTriggerRef}
                                className="flex justify-between items-center group"
                            >
                                <span>Guía Diocesana</span>
                                <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                            </MenubarTrigger>
                            <MenubarContent className="animate-in fade-in-50 zoom-in-95 duration-200">
                                {['horarios-de-misa', 'sacerdotes', 'obispo'].map((item) => (
                                    <MenubarItem key={item}>   
                                        <Link href={`../main/guia-diocesana/${item}`}>
                                            {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                        </Link>
                                    </MenubarItem>
                                ))}
                            </MenubarContent>
                        </MenubarMenu>
                    </div>
                    
                    <MenubarMenu>
                        <MenubarTrigger className="lg:w-auto w-full text-center">
                            <Link href="../main/hoespedaje" onClick={() => setMenuOpen(false)}>Hospedaje</Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className="lg:w-auto w-full text-center">
                            <Link href="../main/acerca" onClick={() => setMenuOpen(false)}>Acerca de Nosotros</Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <div className="hidden lg:block absolute right-7">
                        <Button className="mx-3" variant="secondary">
                            <Link href="/auth/signup">Crear Cuenta</Link>
                        </Button>
                        <Button className="mx-3">
                            <Link href="/auth/login">Iniciar Sesion</Link>
                        </Button>
                    </div>
                </Menubar>
            </header>
            <body>
                {children}
            </body>
        </html>
    );
}
