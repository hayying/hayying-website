export type User = {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  id: string;
  jwt: string;
  address: string;
  title: string;
  tcIdentificationNumber: string;
  diploma: boolean;
};

export type ProductProps = {
  id: number;
  name: string;
  image: string;
  price: number;
};
