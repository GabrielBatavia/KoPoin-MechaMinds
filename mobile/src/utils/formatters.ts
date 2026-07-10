const numberFormatter = new Intl.NumberFormat("id-ID");

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatKopoin(value: number): string {
  return `${formatNumber(value)} Kopoin`;
}

export function formatRupiah(value: number): string {
  return `Rp${formatNumber(value)}`;
}
