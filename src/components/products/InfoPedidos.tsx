"use client";

import { Truck, Clock, Shield, Package, Heart } from "lucide-react";

export default function InfoPedidos() {
  return (
    <div className="space-y-4 mb-6">
      <div className="rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-white">
            <Truck className="w-6 h-6 text-pink-500" />
            <div>
              <h4 className="font-medium text-sm text-pink-600">Envío</h4>
              <p className="text-sm text-muted-foreground">
                Entrega a toda Lincoln
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-white">
            <Clock className="w-6 h-6 text-pink-500" />
            <div>
              <h4 className="font-medium text-sm text-pink-600">
                Entrega Rápida
              </h4>
              <p className="text-sm text-muted-foreground">2-3 días hábiles</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-white">
            <Shield className="w-6 h-6 text-pink-500" />
            <div>
              <h4 className="font-medium text-sm text-pink-600">Seguro</h4>
              <p className="text-sm text-muted-foreground">
                Seguimiento incluido
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-white">
            <Package className="w-6 h-6 text-pink-500" />
            <div>
              <h4 className="font-medium text-sm text-pink-600">Empaquetado</h4>
              <p className="text-sm text-muted-foreground">Cuidado especial</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-white">
            <Heart className="w-6 h-6 text-pink-500" />
            <div>
              <h4 className="font-medium text-sm text-pink-600">Atención</h4>
              <p className="text-sm text-muted-foreground">Personalizada</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
