"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    setIsLoading(true); 
    setError(null);    

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al iniciar sesión');
      console.log('Inicio de sesión exitoso:', data.data);
      router.push('/'); 

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error en handleSubmit:', err);
        setError(err.message || 'Ocurrió un error inesperado');
      } else {
        console.error('Error desconocido en handleSubmit:', err);
        setError('Ocurrió un error inesperado');
      }
    } finally {
      setIsLoading(false); 
    }
  };
  
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl text-center">
          Iniciar Sesión
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && ( 
          <p className="mb-4 p-3 rounded text-center bg-red-100 text-red-800">
            {error} 
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              className="h-11 md:h-12 md:text-base"
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
              disabled={isLoading} 
            />
          </div>
          <div className="relative">
            <Input
              className="h-11 md:h-12 md:text-base pr-10"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Contraseña"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading} 
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <Image
                src={showPassword ? "/icons/eye-slash.svg" : "/icons/eye.svg"}
                alt=""
                width={20}
                height={20}
              />
            </button>
          </div>
          <Button
            className="w-full h-12 text-lg font-medium"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        <Link
          href="/auth/signup"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          ¿No tienes una cuenta?
        </Link>
        <Link
          href="/auth/forgot-password"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </CardFooter>
    </Card>
  );
}