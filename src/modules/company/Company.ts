export interface Company {
  cid: string;
  title: string;
  owner: string;
  created: Date;
  comments?: Comment[];
  image?: string;
  url: string;
  phone: PhoneNumber;
  category: number;
  email: string;
  address: string;
  wysiwyg: string;
  shortDescription: string;
  isShown: boolean;
  rating?: number;
}

export interface CompanyPreview {
  cid: string;
  title: string;
  image?: string;
  category: number;
  shortDescription: string;
  rating?: number;
}

export interface PhoneNumber {

}