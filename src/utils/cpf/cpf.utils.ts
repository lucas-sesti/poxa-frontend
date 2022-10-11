export function cleanCpfMask(cpf: string) {
  return cpf.replace(/\.|-/g, "");
}
