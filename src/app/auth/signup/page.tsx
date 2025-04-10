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
} from "../../../lib/validators/authValidation";
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface ApiErrors {
  name?: string;
  number?: string;
  userType?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formErrors, setFormErrors] = useState<ApiErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatusMessage, setApiStatusMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const validateForm = () => {
    const clientErrors = {
      name: validateName(name),
      number: validateNumber(number),
      userType: validateUserType(userType),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    };
    const filteredErrors: ApiErrors = {};
    for (const key in clientErrors) {
        const error = clientErrors[key as keyof typeof clientErrors];
        if (error !== null) {
            filteredErrors[key as keyof ApiErrors] = error as string | undefined;
        }
    }
    setFormErrors(filteredErrors);
    return Object.values(clientErrors).every((error) => error === null);
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setApiStatusMessage(null);
    setFormErrors({});

    if (!validateForm()) console.log("Errores de validación del cliente encontrados.");
    setIsLoading(true);

    const formData = {
      name,
      number,
      userType,
      email,
      password,
      confirmPassword,
    };

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setApiStatusMessage({ type: 'success', message: data.message || '¡Registro exitoso!' });
        console.log("Registro exitoso");
        setName(''); setNumber(''); 
        setUserType(''); setEmail(''); 
        setPassword(''); setConfirmPassword('');
        setTimeout(() => {
          router.push('/'); 
        }, 2500);

      } else {
        setApiStatusMessage({ type: 'error', message: data.message || 'Ocurrió un error en el registro.' });
        if (data.errors) {
          setFormErrors(data.errors);
          console.log("Errores específicos del backend:", data.errors);
        }
      }

    } catch (error) {
      console.error("Error en la petición fetch:", error);
      setApiStatusMessage({ type: 'error', message: 'No se pudo conectar con el servidor. Inténtalo de nuevo.' });
      setFormErrors({});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl mt-2 flex justify-center">
            Crear Cuenta
          </CardTitle>
        </CardHeader>
        <CardContent>
          {apiStatusMessage && (
            <div className={`mb-4 p-3 rounded text-center ${
              apiStatusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {apiStatusMessage.message}
            </div>
          )}
          {formErrors.general && <p className="text-red-500 mb-2">{formErrors.general}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <Input
                className={`mt-5 mb-2 md:h-12 md:text-base ${formErrors.name ? 'border-red-500' : ''}`}
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                placeholder="Nombre y Apellidos"
                disabled={isLoading}
              />
              {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
            </div>
            <div>
              <Input
                className={`mt-5 mb-2 md:h-12 md:text-base ${formErrors.number ? 'border-red-500' : ''}`}
                type="tel"
                name="number"
                placeholder="Número de Teléfono"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required 
                disabled={isLoading}
              />
              {formErrors.number && <p className="text-red-500">{formErrors.number}</p>}
            </div>
            <div>
              <Select onValueChange={setUserType} value={userType} disabled={isLoading} >
                <SelectTrigger className={`w-full text-base mt-5 mb-2 data-[size=default]:h-9 md:data-[size=default]:h-12 md:text-base ${formErrors.userType ? 'border-red-500' : ''}`}>
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
              {formErrors.userType && <p className="text-red-500">{formErrors.userType}</p>}
            </div>
            <div>
              <Input
                className={`mt-5 mb-2 md:h-12 md:text-base ${formErrors.email ? 'border-red-500' : ''}`}
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                disabled={isLoading}
              />
              {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
            </div>
            <div className="relative">
              <Input
                className={`mt-5 mb-2 md:h-12 md:text-base pr-10 ${formErrors.password ? 'border-red-500' : ''}`}
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
              >
              <Image
                src={showPassword ? "/icons/eye-slash.svg" : "/icons/eye.svg"}
                alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                width={20}
                height={20}
              />
              </button>
            </div>
            {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
            <div className="relative">
              <Input
                className={`mt-5 mb-2 md:h-12 md:text-base pr-10 ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
              <Image
                src={showConfirmPassword ? "/icons/eye-slash.svg" : "/icons/eye.svg"}
                alt={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                width={20}
                height={20}
              />
              </button>
            </div>
            {formErrors.confirmPassword && <p className="text-red-500">{formErrors.confirmPassword}</p>}
            <Button
              className="md:py-7 mt-5 w-full h-12 text-xl"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Creando Cuenta...' : 'Crear Cuenta'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
          <a
            href="/auth/login" 
            className=" text-blue-600 hover:text-blue-800 hover:decoration-blue-800"
          >
            ¿Ya tienes una cuenta?
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}