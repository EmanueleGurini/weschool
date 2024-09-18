import React from "react";

interface FormattedDateProps {
  date: Date;
  format: "day-month-year" ; 
  className?: string;
}

const FormattedDate: React.FC<FormattedDateProps> = ({ date, format , className}) => {
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return <span className="font-bold text-l text-color100">{formatDate(date)}</span>;
};

export default FormattedDate;
