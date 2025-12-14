export interface IClients {
  id: string;
  email: string;
  promoCodesUsed: {
    promoCodeId: string;
    promoCodeName: string | null;
  }[];
}
