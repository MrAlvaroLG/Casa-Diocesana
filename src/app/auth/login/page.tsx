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

export function InputDemo({ type, placeholder }: { type: string; placeholder: string }) {
    return (
        <div>
            <p><b>{placeholder}:</b></p>
            <Input className="my-4 md:h-10 md:text-base" type={type} placeholder={placeholder} />
        </div>
    );
}

export default function Home() {
    return (
        <div className="w-dvw sm:w-lg ">
            <Card>
                <CardHeader>
                    <CardTitle className="sm: text-2xl flex justify-center">Iniciar Sesión</CardTitle>
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
                        />
                    </div>
                    <div className="mb-4">
                        <p><b>Contraseña:</b></p>
                        <Input 
                            className="mt-2 mb-2 md:h-10 md:text-base" 
                            type="password" 
                            name="password"
                            placeholder="Contraseña" 
                        />
                    </div>
                    <Button type="submit" className="w-full text-xl md:h-12 mt-6 mb-2"> Iniciar Sesion </Button>
                </CardContent>
                <CardFooter className="flex flex-col justify-center">
                    <a href="/auth/signup" className=" mb-1 text-blue-600 hover:text-blue-800 hover:decoration-blue-800 ">
                        No tienes una cuenta?
                    </a>
                    <a href="" className="mt-1 text-blue-600 hover:text-blue-800 hover:decoration-blue-800 ">
                        Olvidaste tu Contraseña?
                    </a>
                </CardFooter>
            </Card>
        </div>
    );
}
