import { HTMLAttributes } from "react";

interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export const Field = (props: FieldProps) => {
  return <div className="flex flex-col gap-1" {...props} />;
};
