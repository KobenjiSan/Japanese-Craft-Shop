export interface LikedByUserResponse{
    likedByUserIds: UserToId[];
}

export interface UserToId{
    id: string;
    username: string;
}