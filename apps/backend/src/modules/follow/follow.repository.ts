export interface FollowRepository {
    create(followerId: string, followingId: string): Promise<any | null>;
    delete(followerId: string, followingId: string): Promise<any | null>;
    findFollow(followerId: string, followingId: string): Promise<any | null>;
    findFollowers(followingId: string): Promise<any | null>;
    findFollowings(followerId: string): Promise<any | null>;
    findMutualFollowings(followerId1: string, followerId2: string): Promise<any | null>;
}