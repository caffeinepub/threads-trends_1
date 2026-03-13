import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Category } from "../backend";
import type { CartItem, Product } from "../backend";
import { useActor } from "./useActor";

export type { Product, CartItem };
export { Category };

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCart() {
  const { actor, isFetching } = useActor();
  return useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCart();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (p: {
      name: string;
      description: string;
      price: bigint;
      category: Category;
      imageUrl: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.addProduct(
        p.name,
        p.description,
        p.price,
        p.category,
        p.imageUrl,
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useAddToCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: { productId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error("No actor");
      return actor.addToCart(productId, quantity);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useUpdateCartItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: { productId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateCartItem(productId, quantity);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useRemoveFromCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.removeFromCart(productId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useClearCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.clearCart();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
}
