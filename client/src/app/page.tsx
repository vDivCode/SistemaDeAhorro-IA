'use client';
import { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Wallet, 
  Lightbulb,
  TrendingUp,
  History,
  Settings,
  LogOut
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Movement = {
  id: string;
  desc: string;
  cat: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
};

export default function Dashboard() {
  const [sueldo, setSueldo] = useState<number>(0);
  const [movimientos, setMovimientos] = useState<Movement[]>([]);
  
  // Modals state
  const [isSueldoOpen, setIsSueldoOpen] = useState(false);
  const [sueldoInput, setSueldoInput] = useState('');
  
  const [isMovOpen, setIsMovOpen] = useState(false);
  const [movInput, setMovInput] = useState({ desc: '', amount: '', type: 'expense', cat: 'General' });

  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  // Example simple persistence with localStorage until Supabase is hooked up fully
  useEffect(() => {
    setIsMounted(true);
    const email = localStorage.getItem('sa_user');
    
    if (!email) {
      router.push('/login');
      return;
    }
    setUserEmail(email);

    const savedProfile = localStorage.getItem(`sa_profile_${email}`);
    if (!savedProfile) {
      router.push('/onboarding');
      return;
    }
    setProfile(JSON.parse(savedProfile));

    const savedSueldo = localStorage.getItem(`sa_sueldo_${email}`);
    const savedMovs = localStorage.getItem(`sa_movimientos_${email}`);
    if (savedSueldo) setSueldo(Number(savedSueldo));
    if (savedMovs) setMovimientos(JSON.parse(savedMovs));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('sa_user');
    router.push('/login');
  };

  if (!isMounted || !profile) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Cargando...</div>;
  }

  const saveSueldo = () => {
    const val = Number(sueldoInput);
    if (!isNaN(val) && val >= 0) {
      setSueldo(val);
      localStorage.setItem(`sa_sueldo_${userEmail}`, val.toString());
      setIsSueldoOpen(false);
      setSueldoInput('');
    }
  };

  const saveMovimiento = () => {
    const val = Number(movInput.amount);
    if (movInput.desc && !isNaN(val) && val > 0) {
      const newMov: Movement = {
        id: Math.random().toString(36).substr(2, 9),
        desc: movInput.desc,
        amount: val,
        type: movInput.type as 'income' | 'expense',
        cat: movInput.cat,
        date: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })
      };
      const updated = [newMov, ...movimientos];
      setMovimientos(updated);
      localStorage.setItem(`sa_movimientos_${userEmail}`, JSON.stringify(updated));
      setIsMovOpen(false);
      setMovInput({ desc: '', amount: '', type: 'expense', cat: 'General' });
    }
  };

  // Calculations
  const totalIngresosExtras = movimientos.filter(m => m.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const ingresosTotales = sueldo + totalIngresosExtras;
  const totalGastos = movimientos.filter(m => m.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const saldoTotal = ingresosTotales - totalGastos;
  
  const formatter = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' });

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Hola, {profile.nombre.split(' ')[0]}</h1>
            <p className="text-slate-500">
              Aquí tienes el resumen de tu salud financiera hoy como <span className="text-slate-700 font-medium">{profile.trabajo}</span>.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <Button variant="ghost" className="text-slate-500 hover:text-slate-900" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Salir
            </Button>
            <Dialog open={isSueldoOpen} onOpenChange={setIsSueldoOpen}>
              <DialogTrigger render={
                <Button variant="outline" className="gap-2 border-slate-300" />
              }>
                <Settings className="w-4 h-4 text-slate-600" />
                {sueldo > 0 ? 'Editar Sueldo' : 'Ingresar Sueldo'}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Configurar Sueldo Mensual</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Sueldo (S/)</Label>
                    <Input 
                      type="number" 
                      placeholder="Ej. 3500" 
                      value={sueldoInput}
                      onChange={(e) => setSueldoInput(e.target.value)}
                    />
                  </div>
                  <Button onClick={saveSueldo} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    Guardar Sueldo
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isMovOpen} onOpenChange={setIsMovOpen}>
              <DialogTrigger render={
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2" />
              }>
                <PlusCircle className="w-4 h-4" />
                Nuevo Movimiento
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Registrar Nuevo Movimiento</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <select 
                      className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                      value={movInput.type}
                      onChange={(e) => setMovInput({...movInput, type: e.target.value as any})}
                    >
                      <option value="expense">Gasto</option>
                      <option value="income">Ingreso Extra</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Descripción</Label>
                    <Input 
                      placeholder="Ej. Compra supermercado" 
                      value={movInput.desc}
                      onChange={(e) => setMovInput({...movInput, desc: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoría</Label>
                    <Input 
                      placeholder="Ej. Alimentación" 
                      value={movInput.cat}
                      onChange={(e) => setMovInput({...movInput, cat: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Monto (S/)</Label>
                    <Input 
                      type="number" 
                      placeholder="Ej. 150" 
                      value={movInput.amount}
                      onChange={(e) => setMovInput({...movInput, amount: e.target.value})}
                    />
                  </div>
                  <Button onClick={saveMovimiento} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    Registrar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none shadow-sm bg-white border-slate-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Total Disponible</CardTitle>
              <Wallet className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${saldoTotal >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>
                {formatter.format(saldoTotal)}
              </div>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-1">
                Basado en tu sueldo y movimientos
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white border-slate-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Ingresos Totales</CardTitle>
              <ArrowUpCircle className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{formatter.format(ingresosTotales)}</div>
              <p className="text-xs text-slate-400 mt-1">Sueldo: {formatter.format(sueldo)}</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white border-slate-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Gastos Realizados</CardTitle>
              <ArrowDownCircle className="h-4 w-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{formatter.format(totalGastos)}</div>
              {sueldo > 0 && (
                <p className="text-xs mt-1 text-slate-500">Equivale al {Math.round((totalGastos / sueldo) * 100)}% de tu sueldo base</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-emerald-50 border-emerald-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-800">Estado de Ahorro</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-900">
                {sueldo > 0 ? `${Math.max(0, 100 - Math.round((totalGastos / ingresosTotales) * 100))}%` : '0%'}
              </div>
              <p className="text-xs text-emerald-700 font-medium mt-1">Tasa de ahorro actual</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          
          {/* AI Insight Box */}
          <Card className="lg:col-span-4 border-none shadow-sm overflow-hidden border-slate-100">
            <CardHeader className="bg-slate-900 text-white">
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                Predicción de la IA (Need)
              </CardTitle>
              <CardDescription className="text-slate-400">Análisis basado en tus movimientos reales</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 bg-white">
              {movimientos.length === 0 ? (
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 text-sm text-center">
                  Comienza a registrar tus gastos para recibir consejos personalizados de la IA.
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-900 text-sm leading-relaxed">
                    <strong>🎯 Tu Meta Principal:</strong> Para lograr <strong>"{profile.meta}"</strong> intenta mantener un ahorro del 20% mensual en base a tu edad actual de {profile.edad} años. La IA optimizará este porcentaje según tus futuros ingresos.
                  </div>
                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-100 text-amber-900 text-sm leading-relaxed">
                    <strong>💡 Tip General:</strong> Tienes {movimientos.filter(m => m.type === 'expense').length} gastos registrados. La IA está aprendiendo de tus patrones para darte recomendaciones exactas.
                  </div>
                  {sueldo > 0 && totalGastos > sueldo * 0.8 && (
                    <div className="p-4 rounded-lg bg-rose-50 border border-rose-100 text-rose-900 text-sm leading-relaxed">
                      <strong>⚠️ Atención:</strong> Has gastado más del 80% de tu sueldo base. Intenta reducir gastos no esenciales este mes.
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-3 border-none shadow-sm bg-white border-slate-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <History className="w-5 h-5 text-slate-400" />
                Últimos Movimientos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {movimientos.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-4">No hay movimientos registrados</p>
                ) : (
                  movimientos.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-md transition-colors">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-900">{item.desc}</p>
                        <p className="text-xs text-slate-500">{item.cat}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className={`text-sm font-semibold ${item.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                          {item.type === 'income' ? '+' : '-'} {formatter.format(item.amount)}
                        </p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">{item.date}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
