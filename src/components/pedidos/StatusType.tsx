import React from "react";

import { obtenerTextoEstado } from "@/lib/enums/enums";

interface IStatusType {
  status: string;
}

const StatusType = ({ status }: IStatusType) => {
  return (
    <div className=" text-pink-600 text-sm font-semibold">
      {obtenerTextoEstado(status)}
    </div>
  );
};

export default StatusType;
