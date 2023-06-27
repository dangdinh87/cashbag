import { Photo } from '.';
export interface BankCard {
  _id: string;
  bank: Bank;
  branch: string;
  cardNumber: string;
  cardHolderName: string;
  branchName: string;
}

export interface Bank {
  _id: string;
  logo: Photo;
  name: string;
  shortName: string;
  isBranchRequired: boolean;
}

export interface Branch {
  _id: string;
  city: Photo;
  name: string;
  bank: string;
}
