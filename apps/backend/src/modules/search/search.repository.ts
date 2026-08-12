export interface SearchRepository {
    searchUsers(query: string, take: number): Promise<any[]>;
    searchCourses(query: string, take: number): Promise<any[]>;
    searchPosts(query: string, take: number): Promise<any[]>;
}
