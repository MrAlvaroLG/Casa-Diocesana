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
                    <InputDemo type="email" placeholder="Correo Electrónico" />
                    <InputDemo type="password" placeholder="Contraseña" />
                    <Button type="submit" className="w-full md:h-10">Iniciar Sesión</Button>
                </CardContent>
                <CardFooter className="flex flex-col justify-center">
                    <a href="/auth/signup" className="my-1 text-blue-600 hover:text-blue-800 hover:decoration-blue-800 ">
                        No tienes una cuenta?
                    </a>
                    <a href="" className="my-1 text-blue-600 hover:text-blue-800 hover:decoration-blue-800 ">
                        Olvidaste tu Contraseña?
                    </a>
                </CardFooter>
            </Card>
        </div>
    );
}
