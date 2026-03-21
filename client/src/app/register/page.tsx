'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate register
    // In the future: const { error } = await supabase.auth.signUp({ email, password })
    localStorage.setItem('sa_user', email);
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-100">
        <CardHeader className="space-y-4 items-center text-center">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
            <Wallet className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold">Crea tu cuenta</CardTitle>
          <CardDescription>Comienza a mejorar tu salud financiera con IA</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="tu@correo.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">Crear Cuenta</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4 mt-4">
          <p className="text-sm text-slate-500">
            ¿Ya tienes una cuenta? <Link href="/login" className="text-emerald-600 font-medium hover:underline">Inicia Sesión</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
