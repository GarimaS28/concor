// tokendatamodel.model.ts (better name than service)
export interface TokenData {
  serialNumber: string;
  cnName: string;
  thumbprint: string;
  validFrom: string;
  validTo: string;
}
