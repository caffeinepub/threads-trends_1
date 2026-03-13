import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export enum Category {
    accessories = "accessories",
    tops = "tops",
    bottoms = "bottoms"
}
export interface backendInterface {
    addProduct(name: string, description: string, price: bigint, category: Category, imageUrl: string): Promise<void>;
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    clearCart(): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCart(): Promise<Array<CartItem>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    removeFromCart(productId: bigint): Promise<void>;
    updateCartItem(productId: bigint, quantity: bigint): Promise<void>;
}
