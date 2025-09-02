export interface User{
    sub: string;
    id: string;
    email: string;
    unique_name: string;
    role: string;
}

export interface UserResponse{
    userId: string;
    username: string;
    email: string;
    likedProductIds: string[];
    role: string;
}