export interface UserInterface {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  profileImage: string;
  shipping: {
    telephone: number;
    address: string;
  }
  billing: {
    card: number,
    month: number,
    year: number
  }
}

export interface BlogInterface {
  id: string;
  title: string;
  mainDescr: string;
  mainImage: string;
  subtitle: string;
  descr2: string;
  image2?: string;
  image3?: string;
  subtitle2?: string;
  descr3?: string;
  image4?: string;
  subtitle3?: string;
  descr4?: string;
  createdAt: string;
}