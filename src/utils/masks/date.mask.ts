import React from "react";

export function dateMask(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 10;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d{2})(\d{2})/, "$1/$2/$3");
  e.currentTarget.value = value;
  return e;
}
