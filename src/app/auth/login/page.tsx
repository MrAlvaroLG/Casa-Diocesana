import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="w-dvw sm:w-lg ">
            <Card>
                <CardHeader>
                    <CardTitle className="sm: text-2xl flex justify-center">Iniciar Sesión</CardTitle>
                </CardHeader>
                <CardContent>
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
                    <Button 
                        type="submit" 
                        className="w-full text-xl h-12 md:h-16 my-6"> 
                        Iniciar Sesion 
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col justify-center">
                    <a  
                        href="/auth/signup" 
                        className=" mb-1 text-blue-600 hover:text-blue-800 hover:decoration-blue-800 ">
                        No tienes una cuenta?
                    </a>
                    <a 
                        href="" 
                        className="mt-1 text-blue-600 hover:text-blue-800 hover:decoration-blue-800 ">
                        Olvidaste tu Contraseña?
                    </a>
                </CardFooter>
            </Card>
        </div>
    );
}
