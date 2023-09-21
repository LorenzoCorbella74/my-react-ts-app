export interface Product {
    id: string;
    title: string;
    description: string;
    rating: number;
    count: number;
    color: "black" | "silver" | "white";
    cost: number
}

export interface CartProduct {
    id: string;
    title: string;
    count: number;
    cost: number;
}