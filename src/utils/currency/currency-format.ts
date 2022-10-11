export function currencyFormatter(value: number, showPrefix = true) {
  if (!Number(value)) return "";

  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);

  if (showPrefix) {
    return amount;
  }

  return `${amount.substring(2)}`;
}

export function currencyFormatterWithoutPrefix(value: number) {
  if (!Number(value)) return "";

  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);

  return `${amount.substring(2)}`;
}
