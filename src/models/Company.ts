import { Category } from "./Category";

export interface Company {
  cid: string;
  title: string;
  owner: string;
  created: Date;
  image: string;
  url: string;
  phone: PhoneNumber;
  category: Category;
  email: string;
  address: string;
  wysiwyg: string;
  shortDescription: string;
  isShown: boolean;
}

export interface PhoneNumber {

}