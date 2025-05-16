export interface Product {
    id: number;
    type: 'hotel' | 'experience';
    name: string;
    city: string;
    price: number;
    rating: number;
    shortDescription: string;
    coverImage: string;
    images: string[];
}