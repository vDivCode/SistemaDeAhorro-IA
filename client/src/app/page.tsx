'use client';
import { 
  PlusCircle, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Wallet, 
  Lightbulb,
  TrendingUp,
  History
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Hola, David</h1>
            <p className="text-slate-500">Aquí tienes el resumen de tu salud financiera hoy.</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
              <PlusCircle className="w-4 h-4" />
              Nuevo Gasto
            </Button>
            <Button variant="outline" className="gap-2 border-slate-200">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Need Insight
            </Button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none shadow-sm bg-white border-slate-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Saldo Total</CardTitle>
              <Wallet className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">S/ 4,250.00</div>
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                +12% desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white border-slate-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Ingresos (Mar)</CardTitle>
              <ArrowUpCircle className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">S/ 2,800.00</div>
              <p className="text-xs text-slate-400 mt-1">Meta mensual: S/ 3,000</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white border-slate-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Gastos (Mar)</CardTitle>
              <ArrowDownCircle className="h-4 w-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">S/ 1,240.00</div>
              <p className="text-xs text-rose-500 font-medium mt-1">62% de tu presupuesto</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-emerald-50 border-emerald-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-800">Ahorro Neto</CardTitle>
              <PlusCircle className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-900">S/ 1,560.00</div>
              <p className="text-xs text-emerald-700 font-medium mt-1">¡Buen trabajo este mes!</p>
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
              <CardDescription className="text-slate-400">Análisis basado en tus últimos 3 meses</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 bg-white">
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-100 text-amber-900 text-sm leading-relaxed">
                <strong>💡 Tip de Ahorro:</strong> Hemos detectado que tus gastos en "Comida Delivery" aumentan un 40% los fines de semana. Si reduces solo un pedido por semana, podrías completar tu meta de <strong>"Laptop 2030"</strong> 15 días antes de lo previsto.
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-900 text-sm leading-relaxed">
                <strong>📈 Oportunidad:</strong> Al ritmo actual de ahorro, en Mayo tendrás el fondo de emergencia completo (3 meses de gastos).
              </div>
              <Button variant="outline" className="w-full text-slate-600 border-slate-200">
                Ver análisis detallado
              </Button>
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
                {[
                  { desc: 'Supermercado Plaza Vea', cat: 'Alimentación', amount: '- S/ 150.00', date: 'Hoy' },
                  { desc: 'Pago de Freelance', cat: 'Ingresos', amount: '+ S/ 800.00', date: 'Ayer', positive: true },
                  { desc: 'Suscripción Netflix', cat: 'Ocio', amount: '- S/ 45.00', date: '15 Mar' },
                  { desc: 'Pasaje Transporte', cat: 'Transporte', amount: '- S/ 15.00', date: '14 Mar' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-md transition-colors">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-900">{item.desc}</p>
                      <p className="text-xs text-slate-500">{item.cat}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className={`text-sm font-semibold ${item.positive ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {item.amount}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-slate-500 hover:text-slate-900 text-xs uppercase tracking-widest font-bold">
                Ver todo el historial
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
