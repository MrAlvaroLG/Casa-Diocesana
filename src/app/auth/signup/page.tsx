"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
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
import { validateSignupForm, SignupFormData, ValidationErrors, hasErrors } from "./validation";

// Componente para mostrar errores
const FormError = ({ error }: { error?: string }) => {
    if (!error) return null;
    return <p className="text-sm text-red-500 mb-1">{error}</p>;
};

export default function Home() {
    const [formData, setFormData] = useState<SignupFormData>({
        email: "",
        rol: "",
        password: "",
        confirmPassword: ""
    });
    
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRolChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            rol: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const validationErrors = validateSignupForm(formData);
        setErrors(validationErrors);

        if (!hasErrors(validationErrors)) {
            // Enviar el formulario al servidor
            console.log("Formulario válido:", formData);
            // Aquí iría la lógica para enviar los datos al servidor
        }
        
        setIsSubmitting(false);
    };

    return (
        <div className="w-dvw sm:w-lg">
            <Card>
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="sm: text-2xl flex justify-center">Crear Cuenta</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <p><b>Correo Electrónico:</b></p>
                            <Input 
                                className="mt-2 mb-2 md:h-10 md:text-base" 
                                type="email" 
                                name="email"
                                placeholder="Correo Electrónico" 
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <FormError error={errors.email} />
                        </div>
                        
                        <div className="mb-4">
                            <p><b>Rol en la Iglesia:</b></p>
                            <Select value={formData.rol} onValueChange={handleRolChange}>
                                <SelectTrigger className="w-full mt-2 mb-2 md:h-10 md:text-base">
                                    <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Laico">Laico</SelectItem>
                                    <SelectItem value="Religiosa">Religiosa</SelectItem>
                                    <SelectItem value="Religioso">Religioso</SelectItem>
                                    <SelectItem value="Diacono">Diacono</SelectItem>
                                    <SelectItem value="Sacerdote">Sacerdote</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormError error={errors.rol} />
                        </div>
                        
                        <div className="mb-4">
                            <p><b>Contraseña:</b></p>
                            <Input 
                                className="mt-2 mb-2 md:h-10 md:text-base" 
                                type="password" 
                                name="password"
                                placeholder="Contraseña" 
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <FormError error={errors.password} />
                        </div>
                        
                        <div className="mb-4">
                            <p><b>Confirma tu Contraseña:</b></p>
                            <Input 
                                className="mt-2 mb-2 md:h-10 md:text-base" 
                                type="password" 
                                name="confirmPassword"
                                placeholder="Contraseña" 
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <FormError error={errors.confirmPassword} />
                        </div>
                        
                        {errors.general && <FormError error={errors.general} />}
                        
                        <Button 
                            type="submit" 
                            className="w-full text-xl md:h-12 my-6" 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creando..." : "Crear Cuenta"}
                        </Button>
                    </CardContent>
                    <CardFooter className="flex flex-col justify-center">
                        <a href="/auth/login" className="my-1 text-blue-600 hover:text-blue-800 hover:decoration-blue-800">
                            Ya Tienes una Cuenta?
                        </a>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}