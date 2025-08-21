import { Product } from "./product.model";

export interface LikedProducts{
    likedProductObjs: Product[];
}


export interface LikedProductIds{
    likedProducts: string[];
}

export interface LikeResult{
    isLiked: boolean;
}