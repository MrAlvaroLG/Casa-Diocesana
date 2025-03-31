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

export default function SignUp() {
const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-dvw sm:w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl mt-2 flex justify-center">
            Iniciar Sesion
          </CardTitle>
        </CardHeader>
        <CardContent>       
          <form>
            <div>
              <Input
                className={`mt-8 mb-2 md:h-12 md:text-base`}
                type="email"
                name="email"
                placeholder="Correo Electrónico"
              />
            </div>
            <div className="relative">
              <Input
                className={`mt-8 mb-2 md:h-12 md:text-base pr-10`}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Contraseña"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
              <img
                src={showPassword ? "/icons/eye-slash.svg" : "/icons/eye.svg"}
                alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="w-5 h-5"
              />
              </button>
            </div>
            
            <Button 
              className="md:py-7 mt-8 mb-2 w-full h-12 text-xl" 
              type="submit">
              Iniciar Sesion
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          <a
            href="/auth/signup"
            className="my-1 text-blue-600 hover:text-blue-800 hover:decoration-blue-800"
          >
            No tienes una cuenta?
          </a>
          <a
            href="/auth/login"
            className="my-2 text-blue-600 hover:text-blue-800 hover:decoration-blue-800"
          >
            Olvidaste tu contraseña?
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}