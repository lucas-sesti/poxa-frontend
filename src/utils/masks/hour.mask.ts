import React from "react";

export function hour(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 5;
  let value = e.currentTarget.value;
  // console.log(e);
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d{2})/, "$1:$2");
  // console.log(value);
  e.currentTarget.value = value;
  return e;
}
