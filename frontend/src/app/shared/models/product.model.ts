export interface Product{
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrls: string[];
    category: string;
    isFeatured: boolean;
    stock: number;
    lastUpdated: Date;
    CreatedAt: Date;
}