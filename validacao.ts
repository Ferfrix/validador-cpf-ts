function limparCPF(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

function formatarCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function todosDigitosIguais(cpf: string): boolean {
  return /^(\d)\1{10}$/.test(cpf);
}

function calcularDigitoVerificador(cpf: string, pesoInicial: number): number {
  let soma = 0;
  for (let i = 0; i < cpf.length; i++) {
    soma += parseInt(cpf[i]) * (pesoInicial - i);
  }
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

function cpfValido(cpfOriginal: string): boolean {
  const cpf = limparCPF(cpfOriginal);
  if (!cpf || cpf.length !== 11 || todosDigitosIguais(cpf)) return false;

  const d1 = calcularDigitoVerificador(cpf.slice(0, 9), 10);
  const d2 = calcularDigitoVerificador(cpf.slice(0, 9) + d1, 11);

  return cpf[9] === d1.toString() && cpf[10] === d2.toString();
}

function processarCPFs(lista: string[]): { validos: string[]; invalidos: string[] } {
  const validos: string[] = [];
  const invalidos: string[] = [];

  for (const cpf of lista) {
    if (typeof cpf !== 'string') {
      invalidos.push(cpf);
      continue;
    }

    if (cpfValido(cpf)) {
      validos.push(formatarCPF(limparCPF(cpf)));
    } else {
      invalidos.push(cpf);
    }
  }

  return { validos, invalidos };
}

// Teste
const cpfs = [
  "529.982.247-25",
  "111.111.111-11",
  "39845632744",
  "12345678900",
  "00000000000",
  "52998224725"
];

const resultado = processarCPFs(cpfs);

console.log(" CPFs válidos formatados:");
console.log(resultado.validos);

console.log("\n CPFs inválidos:");
console.log(resultado.invalidos);
