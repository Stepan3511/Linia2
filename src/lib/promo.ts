export function normalizePromoCodeInput(value: string): string {
  return value
    .replace(/\s+/g, "")
    .replace(/[^a-zA-Zа-яА-Я0-9-]/g, "")
    .toLowerCase();
}
