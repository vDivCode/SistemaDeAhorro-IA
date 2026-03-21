'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircle, Target, Briefcase, GraduationCap, Calendar } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    trabajo: '',
    estudios: '',
    edad: '',
    meta: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving profile data
    // In the future: await supabase.from('profiles').insert([formData])
    localStorage.setItem('sa_profile', JSON.stringify(formData));
    router.push('/'); // Go to dashboard
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <Card className="w-full max-w-xl shadow-lg border-slate-100">
        <CardHeader className="text-center space-y-2 bg-emerald-600 text-white rounded-t-xl py-8">
          <CardTitle className="text-3xl font-bold">¡Cuentanos sobre ti!</CardTitle>
          <CardDescription className="text-emerald-100 text-base">
            La Inteligencia Artificial necesita conocerte para darte mejores recomendaciones financieras.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nombre" className="flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-emerald-600" />
                  Nombre Completo
                </Label>
                <Input 
                  id="nombre" name="nombre" 
                  placeholder="Ej. David Pérez" 
                  value={formData.nombre} onChange={handleChange} required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edad" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Edad
                </Label>
                <Input 
                  id="edad" name="edad" type="number" 
                  placeholder="Ej. 28" 
                  value={formData.edad} onChange={handleChange} required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trabajo" className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  Profesión o Trabajo
                </Label>
                <Input 
                  id="trabajo" name="trabajo" 
                  placeholder="Ej. Desarrollador de Software" 
                  value={formData.trabajo} onChange={handleChange} required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estudios" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  Estudios (Nivel/Carrera)
                </Label>
                <Input 
                  id="estudios" name="estudios" 
                  placeholder="Ej. Ingeniería de Sistemas" 
                  value={formData.estudios} onChange={handleChange} required
                />
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              <Label htmlFor="meta" className="flex items-center gap-2 text-lg font-medium text-slate-800">
                <Target className="w-5 h-5 text-emerald-600" />
                ¿Cuál es tu meta financiera principal?
              </Label>
              <p className="text-sm text-slate-500 mb-2">Ej: Comprar un auto, ahorrar para una laptop, fondo de emergencias.</p>
              <Input 
                id="meta" name="meta" 
                placeholder="Ej. Comprar una Casa en 5 años" 
                value={formData.meta} onChange={handleChange} required
                className="h-12 text-lg"
              />
            </div>

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg mt-4">
              Comenzar a Ahorrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
