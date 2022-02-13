// Survey schema
export interface ISurvey {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  age: number;
  aggrement: boolean;
  comment: string;
  token: string;
  created_at: Date;
  updated_at: Date;
}
