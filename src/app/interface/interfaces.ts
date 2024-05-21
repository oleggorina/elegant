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

export interface ProductInterface {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  characteristics: string;
  sku: string;
  category: string;
  images: {url: string}[];
  colors: {name: string, url: string}[];
}

export interface ProductCartInterface {
  id: string;
  title: string;
  color: string;
  image: string;
  price: number;
  discount: number;
  count: number;
}

export interface OrderInfo {
  contact: {
    name: string;
    surname: string;
    phonenumber: string;
    email: string;
  };
  delivery: {
    address: string;
    city: string;
    country: string;
    state: string;
    zip: string;
  };
  payment: {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
  }
}