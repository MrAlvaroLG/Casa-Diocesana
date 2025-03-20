"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Home() {
    return (
        <div className="w-dvw sm:w-lg">
            <Card>
                <CardHeader>
                    <CardTitle className="sm: text-2xl flex justify-center">Crear Cuenta</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input 
                        className="my-8 md:h-12 md:text-base" 
                        type="text" 
                        name="name"
                        placeholder="Nombre y Apellidos" 
                    />
                    <Input 
                        className="my-8 md:h-12 md:text-base" 
                        type="tel" 
                        name="number"
                        placeholder="Número de Teléfono" 
                    />
                    <Select>
                        <SelectTrigger className="w-full text-base my-8 data-[size=default]:h-9 md:data-[size=default]:h-12 md:text-base">
                            <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="md:h-10 md:text-base" value="Laico">Laico</SelectItem>
                            <SelectItem className="md:h-10 md:text-base" value="Religiosa">Religiosa</SelectItem>
                            <SelectItem className="md:h-10 md:text-base" value="Religioso">Religioso</SelectItem>
                            <SelectItem className="md:h-10 md:text-base" value="Diacono">Diacono</SelectItem>
                            <SelectItem className="md:h-10 md:text-base" value="Sacerdote">Sacerdote</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input 
                        className="my-8 md:h-12 md:text-base" 
                        type="email" 
                        name="email"
                        placeholder="Correo Electrónico" 
                    />
                    <Input 
                        className="my-8 md:h-12 md:text-base" 
                        type="password" 
                        name="password"
                        placeholder="Contraseña" 
                    />
                    <Input 
                        className="my-8 md:h-12 md:text-base" 
                        type="password" 
                        name="confirmPassword"
                        placeholder="Contraseña" 
                    />
                    <Button 
                        className="w-full text-xl h-12 md:h-16 my-6" 
                        type="submit">
                        Crear Cuenta
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col justify-center">
                    <a href="/auth/login" className="my-1 text-blue-600 hover:text-blue-800 hover:decoration-blue-800">
                        Ya Tienes una Cuenta?
                    </a>
                </CardFooter>
            </Card>
        </div>
    );
}