"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  validateName,
  validateNumber,
  validateUserType,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "./validation";
import Image from "next/image";

export default function SignUp() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<{
    nameError?: string | null;
    numberError?: string | null;
    userTypeError?: string | null;
    emailError?: string | null;
    passwordError?: string | null;
    confirmPasswordError?: string | null;
  }>({});

  const validateForm = () => {
    const errors = {
      nameError: validateName(name),
      numberError: validateNumber(number),
      userTypeError: validateUserType(userType),
      emailError: validateEmail(email),
      passwordError: validatePassword(password),
      confirmPasswordError: validateConfirmPassword(password, confirmPassword),
    };
    setError(errors);
    return Object.values(errors).every((error) => error === null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      console.log({ name, number, userType, email, password, confirmPassword });
    }
  };

  return (
    <div className="w-dvw sm:w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl mt-2 flex justify-center">
            Crear Cuenta
          </CardTitle>
        </CardHeader>
        <CardContent>       
          <form onSubmit={handleSubmit}>
            <div>
              <Input
                className={`mt-8 mb-2 md:h-12 md:text-base ${error.nameError ? 'border-red-500' : ''}`}
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre y Apellidos"
              />
              {error.nameError && <p className="text-red-500">{error.nameError}</p>}
            </div>
            <div>
              <Input
                className={`mt-8 mb-2 md:h-12 md:text-base ${error.numberError ? 'border-red-500' : ''}`}
                type="tel"
                name="number"
                placeholder="Número de Teléfono"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              {error.numberError && <p className="text-red-500">{error.numberError}</p>}
            </div>
            <div>
              <Select onValueChange={setUserType}>
                <SelectTrigger className={`w-full text-base mt-8 mb-2 data-[size=default]:h-9 md:data-[size=default]:h-12 md:text-base ${error.userTypeError ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Seleccionar tipo de usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="md:h-10 md:text-base" value="Laico"> Laico </SelectItem>
                  <SelectItem className="md:h-10 md:text-base" value="Religiosa"> Religiosa </SelectItem>
                  <SelectItem className="md:h-10 md:text-base" value="Religioso"> Religioso </SelectItem>
                  <SelectItem className="md:h-10 md:text-base" value="Diacono"> Diacono </SelectItem>
                  <SelectItem className="md:h-10 md:text-base" value="Sacerdote"> Sacerdote </SelectItem>
                </SelectContent>
              </Select>
              {error.userTypeError && <p className="text-red-500">{error.userTypeError}</p>}
            </div>
            <div>
              <Input
                className={`mt-8 mb-2 md:h-12 md:text-base ${error.emailError ? 'border-red-500' : ''}`}
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error.emailError && <p className="text-red-500">{error.emailError}</p>}
            </div>
            <div className="relative">
              <Input
                className={`mt-8 mb-2 md:h-12 md:text-base pr-10 ${error.passwordError ? 'border-red-500' : ''}`}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
              <Image
                src={showPassword ? "/icons/eye-slash.svg" : "/icons/eye.svg"}
                alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                width={20}
                height={20}
              />
              </button>
            </div>
            {error.passwordError && <p className="text-red-500">{error.passwordError}</p>}
            <div className="relative">
              <Input
                className={`mt-8 mb-2 md:h-12 md:text-base pr-10 ${error.confirmPasswordError ? 'border-red-500' : ''}`}
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
              <Image
                src={showConfirmPassword ? "/icons/eye-slash.svg" : "/icons/eye.svg"}
                alt={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                width={20}
                height={20}
              />
              </button>
            </div>
            {error.confirmPasswordError && <p className="text-red-500">{error.confirmPasswordError}</p>}
            <Button 
              className="md:py-7 mt-8 mb-2 w-full h-12 text-xl" 
              type="submit">
              Crear Cuenta
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          <a
            href="/auth/login"
            className="my-1 text-blue-600 hover:text-blue-800 hover:decoration-blue-800"
          >
            ¿Ya tienes una cuenta?
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}