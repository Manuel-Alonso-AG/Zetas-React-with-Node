import { useState, useMemo } from "react";
import type { Product } from "@zetas/types";

const _MOCK_PRODUCTS: Product[] = [
  {
    id: "PRO1",
    name: "Coca-Cola 600ml",
    price: 1800,
    stock: 24,
    categoryId: "bebidas",
    createdAt: new Date(),
  },
  {
    id: "PRO2",
    name: "Sabritas Original",
    price: 2200,
    stock: 15,
    categoryId: "snacks",
    createdAt: new Date(),
  },
  {
    id: "PRO3",
    name: "Agua 1L",
    price: 1200,
    stock: 50,
    categoryId: "bebidas",
    createdAt: new Date(),
  },
  {
    id: "PRO4",
    name: "Leche Lala 1L",
    price: 2800,
    stock: 8,
    categoryId: "lacteos",
    createdAt: new Date(),
  },
  {
    id: "PRO5",
    name: "Pan Bimbo",
    price: 4500,
    stock: 12,
    categoryId: "panaderia",
    createdAt: new Date(),
  },
  {
    id: "PRO6",
    name: "Jugo Del Valle",
    price: 1600,
    stock: 0,
    categoryId: "bebidas",
    createdAt: new Date(),
  },
];
interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export function useProducts(): UseProductsReturn {
  return {
    products: _MOCK_PRODUCTS,
    isLoading: false,
    error: null,
  };
}
