export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
}

export type Role = "admin" | "cashier";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  cashierId: string;
  createdAt: Date;
}

export interface SaleItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}
