import React from "react";
import { ErrorMessage } from "formik";

interface CustomErrorMsgProps {
  name: string;
}
export default function CustomErrorMsg({ name }: CustomErrorMsgProps) {
  return (
    <div className="text-sm px-2 font-thin text-black ">
      <ErrorMessage name={`${name}`} />
    </div>
  );
}
