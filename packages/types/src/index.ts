export interface Product {
  id: string;
  name: string;
  price: number; // Utilizar en centavos
  stock: number;
  categoryId: string;
  createdAt: Date;
}

export type CreateProduct = Omit<Product, "id" | "createdAt">; // Crea un tipo de la interfaz de producto pero sin los campos dados

export type Role = "admin" | "cashier";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface CartItem {
  product: Product;
  quantity: number;
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
