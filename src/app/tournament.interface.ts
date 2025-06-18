export interface Tournament {
  id: string;
  name: string;
  date: string;
  location: string;
  teams: string | number;
  notes: string;
  rules: string;
  private: boolean;
  format: string;
  organizer: string;
  fee: string;
  participants: any[];
  bracket: any;
  results: any[];
  schedule: any[];
}
