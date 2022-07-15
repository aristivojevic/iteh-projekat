
export function chunk<T>(niz: T[], duzina = 4): T[][] {

  let rez: T[][] = [];
  const broj = Math.ceil(niz.length / duzina);
  for (let i = 0; i < broj; i++) {
    rez.push(niz.slice(i * duzina, (i + 1) * duzina));
  }
  return rez;
}