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
            <p>{placeholder}:</p>
            <Input className="my-4" type={type} placeholder={placeholder} />
        </div>
    );
}

export default function Home() {
    return (
        <div className="w-dvw sm:w-lg">
            <Card>
                <CardHeader>
                    <CardTitle className="sm: text-2xl flex justify-center">Iniciar Sesión</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <InputDemo type="email" placeholder="Correo Electrónico" />
                    <InputDemo type="password" placeholder="Contraseña" />
                    <Button type="submit" className="w-full">Iniciar Sesión</Button>
                </CardContent>
                <CardFooter>
                    
                </CardFooter>
            </Card>
        </div>
    );
}
