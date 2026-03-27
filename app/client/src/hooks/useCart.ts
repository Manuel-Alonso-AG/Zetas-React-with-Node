import { useReducer } from "react"; // Se utilizara useReducer para las accines del carrito. useState se tendria que modificar el estado directamente
import type { Product, CartItem } from "@zetas/types";
import { IVA } from "@zetas/config";

interface Cart {
  items: CartItem[];
}

type CartAction =
  | { type: "Add"; payload: Product }
  | { type: "Remove"; payload: string }
  | { type: "clear" };

// Se controla que se ejecuta de una accion
function cartReducer(cart: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "Add":
      const exists = cart.items.find((i) => i.product.id === action.payload.id);

      break;
    case "Remove":
      return {
        items: cart.items.filter((i) => i.product.id === action.payload),
      };
      break;
    case "clear":

    default:
      break;
  }
  const items: CartItem[] = [];

  return {
    items,
  };
}
