import { memo } from "react"; // memo hace que se evite actualizar todo el componente si sus pops no cambiaron
import type { Product } from "@zetas/types";
import { CURRENCY } from "@zetas/config";

interface Props {
  product: Product;
  isInCart: boolean;
}

function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString("es-MX", {
    style: "currency",
    currency: CURRENCY,
  });
}

export const ProductCard = memo(function ProductCard({
  product,
  isInCart,
}: Props) {
  return (
    <article>
      <h3>{product.name}</h3>
      <p>{formatPrice(product.price)}</p>
      <p>{product.stock}</p>
      <button disabled={isInCart}>
        {isInCart ? "En el carrito" : "Agregar al carrito"}
      </button>
    </article>
  );
});
