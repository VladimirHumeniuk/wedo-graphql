import { Category } from "../../models/Category";

export interface Company {
  cid: string;
  title: string;
  owner: string;
  created: Date;
  comments?: Comment[];
  image: string;
  url: string;
  phone: PhoneNumber;
  category: Category;
  email: string;
  address: string;
  wysiwyg: string;
  shortDescription: string;
  isShown: boolean;
  rating?: number;
}

export interface PhoneNumber {

}