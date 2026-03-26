import { useState, useEffect, useMemo } from "react";
import type { Product } from "@zetas/types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
}
