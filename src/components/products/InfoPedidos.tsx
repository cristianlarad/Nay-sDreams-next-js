"use client";

import { Truck, Clock, Shield, Package, Heart } from "lucide-react";
import { useTranslations } from "next-intl";

export default function InfoPedidos() {
  const t = useTranslations("InfoOrders");
  return (
    <div className="space-y-4 mb-6">
      <div className="rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-white">
            <Truck className="w-6 h-6 text-pink-500" />
            <div>
              <h4 className="font-medium text-sm text-pink-600">
                {t("Shipment")}
              </h4>
              <p className="text-sm text-muted-foreground">{t("Delivery")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-white">
            <Clock className="w-6 h-6 text-pink-500" />
            <div>
              <h4 className="font-medium text-sm text-pink-600">
                {t("QuickDelivery")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("QuickDeliveryText")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-white">
            <Shield className="w-6 h-6 text-pink-500" />
            <div>
              <h4 className="font-medium text-sm text-pink-600">
                {t("Insurance")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("InsuranceText")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-white">
            <Package className="w-6 h-6 text-pink-500" />
            <div>
              <h4 className="font-medium text-sm text-pink-600">
                {t("Packing")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("PackingText")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-pink-50 to-white">
            <Heart className="w-6 h-6 text-pink-500" />
            <div>
              <h4 className="font-medium text-sm text-pink-600">
                {t("Attention")}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t("AttentionText")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
