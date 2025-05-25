import { format } from "date-fns";
import { es } from "date-fns/locale";
import React from "react";

interface IFormatDate {
  date: string;
}

const FormatDate = ({ date }: IFormatDate) => {
  return <div>{format(date, "dd/MM/yyyy", { locale: es })}</div>;
};

export default FormatDate;
