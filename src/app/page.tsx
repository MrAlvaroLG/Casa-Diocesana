import { redirect } from 'next/navigation';

export default function Home() {
    redirect('/main/home');
    return null;
}