export interface UserInterface {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  shipping: {
    telephone: number;
    address: string;
  }
  billing: {
    card: number,
    expDate: number
  }
}