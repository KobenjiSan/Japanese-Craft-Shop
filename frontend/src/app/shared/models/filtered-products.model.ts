export interface FilteredProducts{
    category: string;
    minPrice: number;
    maxPrice: number;
    byNewest: boolean;
    byStock: boolean;
    byFeatured: boolean;
}