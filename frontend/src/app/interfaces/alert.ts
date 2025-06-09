export interface Alert {
     id?: number;
  citizenId: number;
  message: string;
  disasterType: string;
  region: string;
  alertTime?: string;
}
